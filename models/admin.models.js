const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  permissions: {
    manageUsers: { type: Boolean, default: false },
    manageProperties: { type: Boolean, default: false },
    manageTransactions: { type: Boolean, default: false }
  },
  lastLogin: Date
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
