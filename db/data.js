const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  DeviceId: String,
  DeviceType: String,
  TimeStamp: String,
  Location: String,
});
module.exports = mongoose.model('data', dataSchema);
