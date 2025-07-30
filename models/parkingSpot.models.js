const mongoose = require('mongoose');

const parkingSpotSchema = new mongoose.Schema({
  title: { type: String, required: true },
  address: String,
  pricePerHour: Number,
  available: { type: Boolean, default: true },
  description: {type: String, required: true},
  image: { type: String },
  owner: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true 
  },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
  createdAt: { type: Date, default: Date.now }
});

parkingSpotSchema.index({ location: "2dsphere" });

module.exports = mongoose.model('ParkingSpot', parkingSpotSchema);
