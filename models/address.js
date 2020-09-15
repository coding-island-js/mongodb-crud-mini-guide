const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  address: {
    type: String,
    trim: true,
  },
});

const Address = mongoose.model("Address", AddressSchema);
module.exports = Address;
