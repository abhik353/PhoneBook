const express = require('express')
const connectDB = require('./config/db')
const app = express()

//connect mongo database

connectDB()

//use and initialize middleware
app.use(express.json({extended: false}))


app.get('/',(req,res) => res.json({msg: 'namaste'}))

// define routes

app.use('/api/users', require('./routes/Users'))
app.use('/api/auth', require('./routes/Auth'))
app.use('/api/contacts', require('./routes/Contacts'))

const PORT = process.env.PORT || 4000

app.listen(PORT, ()=> console.log(`server started on port ${PORT}`))