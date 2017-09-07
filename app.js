const express = require('express')
const app = express()

// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('db/database.db');
app.set('view engine', 'ejs')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

let index = require('./router/index')
let teacher = require('./router/teacher')
let subject = require('./router/subjects')
let student = require('./router/students')
app.use('/',index)
app.use('/teachers', teacher)
app.use('/subjects', subject)
app.use('/students', student)
// let group = require('./router/groups')
// let profiles = require('./router/profile')
// let address = require('./router/addresses')

// app.use('/groups',group)
// app.use('/profile',profiles)
// app.use('/addresses',address)
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})