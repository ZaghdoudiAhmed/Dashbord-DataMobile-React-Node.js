const mongoose = require("mongoose");

const GroupeSchema = new mongoose.Schema({
  name: {
    type: String
  }
});
module.exports = mongoose.model("Groupe", GroupeSchema);
