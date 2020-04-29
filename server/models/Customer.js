const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  address: {
    type: String,
  },
  number: {
    type: String,
    required: true,
  },
  solde: {
    type: Number,
  },
  forfait: {
    type: String,
  },
  typedonnee: {
    type: String,
  },
  groupe: {
    type: String,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Customer", CustomerSchema);
