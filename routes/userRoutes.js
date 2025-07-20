const express = require('express');
const User = require('../models/user.models');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.send('User routes are working fine!');
})

//register a user
router.post('/register', async(req, res) => {
try{
    const {name, phone, email, password} = req.body;
    const user = new User({name, phone, email, password});
    await user.save();
res.status(201).send({user, message : "User Created Successfully"});
}

catch(err) {
    res.status(400).send({error: err});
}
});
//login a user
router.post('/login', async (req, res) =>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user) {
            throw new Error('Unable to login, Invalid Credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch) {
            throw new Error('Unable to login, Invalid Credentials');
        }

        const token = jwt.sign({
            _id: user._id.toString()
        }, process.env.JWT_SECRET);

        res.send({user, token, message: "Logged in successfully."});
    }
    catch(err) {
        res.status(400).send({error: err});  
    }
});
module.exports = router;
