const express = require('express')
const app = express()
require('dotenv').config()
require('./connection')
// const noteRoute = require('./Routes/NotRoutes')

//json middleware
app.use(express.json())

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


