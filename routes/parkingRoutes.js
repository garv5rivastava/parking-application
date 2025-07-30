const express = require('express');
const router  = express.Router();
const auth    = require('../middlewares/auth');
const Parking = require('../models/parkingSpot.models');


router.get('/test', auth, (req, res) => {
  res.json({ message: 'Parking routes OK', user: req.user });
});

// CREATE a parking spot
router.post('/add', auth, async (req, res) => {
  try {
    const { title, address, pricePerHour, description, available = true, location } = req.body;

if (!location || !location.coordinates || location.coordinates.length !== 2) {
  return res.status(400).send({ error: 'Location coordinates are required.' });
}

const parking = new Parking({
  title,
  address,
  pricePerHour,
  description,
  available,
  location,
  owner: req.user._id
});


    await parking.save();   
    res.status(201).send({ parking, message: 'Parking spot created.' });
  } catch (err) {
    res.status(500).send({ error: 'Server error while creating parking.' });
  }
});

module.exports = router;
