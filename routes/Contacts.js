const express = require('express')
const router = express.Router()


// @route GET api/contacts
// @desc get all user contacts
// @access Private
router.get('/',(req,res) => {
    res.send('get all contacts')
})

// @route POST api/contacts
// @desc add new contact
// @access Private
router.get('/',(req,res) => {
    res.send('Add contact')
})

// @route PUT  api/contacts/:id
// @desc update contact
// @access Private
router.put('/:id',(req,res) => {
    res.send('Update contact')
})

// @route DELETE  api/contacts/:id
// @desc delete contact
// @access Private
router.delete('/:id',(req,res) => {
    res.send('Delete contact')
})

module.exports = router