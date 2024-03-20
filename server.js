require('dotenv').config();
const express = require('express')
const app = express()
require('dotenv').config()
require('./connection')
const DB = require('./config/db.js');

// const noteRoute = require('./Routes/NotRoutes')

//json middleware
app.use(express.json())


// connect DB
const db = new DB(process.env.MONGO_URI)
db.connect()


//use router middleware
// app.use('/note', noteRoute)
app.use('/',(req,res)=>
{
    res.send("hello")
})
//starting server
app.listen(process.env.PORT, () => {
  console.log('Server is running on port', process.env.PORT)
})


