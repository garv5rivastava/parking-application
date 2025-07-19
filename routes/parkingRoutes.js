const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Parking = require('../models/parkingSpot.models');

router.get('/test', auth, (req, res) => {
    res.json({
        message: 'Parking routes are working fine!',
        user: req.user
    });
});

//CRUD parkingSpots for authenticated users

// creating a parking
router.post('/create-parking', auth, async(req, res) =>{
    try{
        const parking = new Parking({
            ...req.body,
            owner: req.user._id
        });
        await parking.save();
        res.status(201).json({parking, message: "Parking spot created successfully!"});
    }
    catch(err) {
        res.status(400).send({error: err});
    }
});



module.exports = router;
