const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // role: { type: String, enum: ['user', 'admin'], default: 'user' },
  // location: {
  //   type: { type: String, enum: ['Point'], default: 'Point' },
  //   coordinates: { type: [Number], required: true }, // [longitude, latitude]
  // },
}, { timestamps: true }); 

userSchema.pre('save', async function(next) {
  const user = this;

  if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
})

userSchema.index({ location: "2dsphere" });

module.exports = mongoose.model('User', userSchema);
