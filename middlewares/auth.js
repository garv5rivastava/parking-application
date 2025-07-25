const jwt = require('jsonwebtoken');
const User = require('../models/user.models');


const auth = async(req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({
            _id: decoded._id,
        })

        if(!user) {    
            throw new Error('Unable to login, Invalid credentials');
        }

        req.user = user;
        req.token = token;
        next();
        
    }
    catch(error){
        res.status(401).send({error: error.message});
    }
}

module.exports = auth;