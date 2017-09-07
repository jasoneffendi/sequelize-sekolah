let express = require('express')
let router = express.Router()
let model = require('../models')

router.get('/', (req,res) => {
    model.Students.findAll()
    .then(data_student => {
        res.render('students',{data: data_student, title: 'Halaman Students'})
    })
})

router.get('/delete/:id', (req,res) => {
    model.Students.destroy({
        where: {
            id : `${req.params.id}`
        }
    })
    .then(data => {
        res.redirect('/students')
    })
})

router.get('/edit/:id', (req,res) => {
    model.Students.findAll({
        where: {
            id : `${req.params.id}`
        }
    })
    .then(students => {
        res.render('studentsedit', {data: students})
    })
})

router.post('/edit/:id', (req,res) => {
    model.Students.update({
        first_name : `${req.body.first_name}`,
        last_name: `${req.body.last_name}`,
        email: `${req.body.email}`,
        createdAt: new Date(),
        updatedAt: new Date()
    },{
        where: {
            id: `${req.params.id}`
        }
    })
    .then(data => {
        res.redirect('/students')
    })
})

router.get('/add', (req,res) => {
        res.render('studentsadd')
    })

router.post('/add', (req,res) => {
    model.Students.create({
        first_name : `${req.body.first_name}`,
        last_name: `${req.body.last_name}`,
        email: `${req.body.email}`,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    .then(Students => {
        res.redirect('/students')
    })
})

module.exports = router