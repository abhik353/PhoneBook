const express = require('express')

const app = express()

app.get('/',(req,res) => res.json({msg: 'namaste'}))

// define routes

app.use('/api/users', require('./routes/Users'))
app.use('/api/auth', require('./routes/Auth'))
app.use('/api/contacts', require('./routes/Contacts'))

const PORT = process.env.PORT || 4000

app.listen(PORT, ()=> console.log(`server started on port ${PORT}`))