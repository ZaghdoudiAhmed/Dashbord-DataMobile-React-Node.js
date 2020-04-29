const mongoose = require("mongoose");

const ForfaitSchema = new mongoose.Schema({
  name: {
    type: String
  }
});
module.exports = mongoose.model("Forfait", ForfaitSchema);
