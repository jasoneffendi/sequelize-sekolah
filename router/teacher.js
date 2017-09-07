let express = require('express')
let router = express.Router()
let model = require('../models')

router.get('/', (req,res) => {
   console.log(model)
    model.Teacher.findAll()
    .then(data_teacher => {
        res.render('teachers',{data: data_teacher, title: 'Halaman Teachers'})
    })
})

module.exports = router