const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotEnv = require('dotenv')

const app = express()
app.use(cors())
app.use(bodyParser.json())
dotEnv.config()

const url = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

mongoose.connect(url).then(
    console.log('database connected successfully')
).catch((err)=>{
    console.log('error at connecting to the database',err.message)
})

app.use('/api/add',require('./routes/userRoutes'))
app.use('/api/user',require('./routes/userRoutes'))

app.listen(port,()=>{
    console.log(`port running at ${port}`)
})