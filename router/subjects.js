let express = require('express')
let router = express.Router()
let model = require('../models')

router.get('/', (req,res) => {
   console.log(model)
    model.Subject.findAll()
    .then(data_subject => {
        res.render('subjects',{data: data_subject, title: 'Halaman Subjects'})
    })
})

module.exports = router