let express = require('express');
let router = express.Router();
const models = require('../models')
const convert = require('../helpers/converScore.js')

router.get('/', (req, res)=>{
  models.Subjects.findAll({
    include :[{model: models.Teacher}]
  })
    .then(data_subjects => {
      res.render('subjects', {data_subjects: data_subjects, title: "Halaman Subjects", head: "Subjects"})
    })
})

router.get('/:id/enrolledstudents', (req, res) => {
  
    models.Subjects.findAll({
        where: {
          id: `${req.params.id}`
        },
        include: [
          {model: models.Conjunction,
            include: [{model: models.Student}],
          }
        ],
        order: [[models.Conjunction, models.Student, 'first_name']]
      })
      .then(data_subjects => {
      res.render('subject_enrolled_student', {data_subjects: data_subjects,data_huruf: data_subjects[0].Conjunctions.forEach(row => {
        convert(row.score)
      }), title: "Halaman Enrolled Students"});
      // res.send(data_subjects[0].Conjunctions.score)
      // console.log(data_subjects[0].Conjunctions)
      })
      .catch(err => {
        console.log(err);
      })
  
  })

router.get('/:id/givescore', (req, res) => {
  models.Conjunction.findAll({
      where: {
        id: `${req.params.id}`
      },
      include: [
        {model: models.Student},
        {model: models.Subjects}
      ]
    })
    .then(data_conjunction => {
      res.render('give_score',{data_conjunction: data_conjunction, title: "Halaman Memberi Nilai",head: "GIVE SCORE"})
    })
    .catch(err => {
      console.log(err);
    })
})

router.post('/:id/givescore', (req, res) => {
  models.Conjunction.update({
      score: `${req.body.score}`
    },
    {
      where: {id: `${req.params.id}`}
  })
  .then(data_conjunction => {
    res.redirect('/subjects')
  })
  .catch(err => {
    console.log(err);
  })

})





module.exports = router
