const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator/check')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/Auth')
const User = require('../models/User')


// @route GET api/auth
// @desc Get logged in user
// @access Private
router.get('/',auth, async (req,res) => {
    try{
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    }
    catch(err){
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// @route POST api/auth
// @desc Authorize user & get token
// @access Public
router.post('/',[
    check('email','Please include a valid email').isEmail(),
    check('password','Please enter your password')
],async (req,res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const {email,password} = req.body
        try{
            let user = await User.findOne({email})
            if(!user){
                return res.status(400).json({msg:'invalid credentials'})
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                return res.status(400).json({msg:'invalid credentials'})
            }
            const payload = {
                user:{
                    id: user.id
                }
            }
    
            jwt.sign(payload, config.get('jwtSecret'),{
                expiresIn: 100000000,
    
            }, (err, token) => {
                if(err) throw err
                res.json({token})
            } )
        }
        catch(err){
            console.error(err.message)
            res.status(500).send('Server error')
        }
})


module.exports = router