const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  end_date: {
    type: Date,
    required: true,
  },
  begin_date: {
    type: Date,
    required: true,
  },
  type_trans: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  customer_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
