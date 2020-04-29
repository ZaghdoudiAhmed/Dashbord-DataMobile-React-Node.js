const express = require("express");
const router = express.Router();

//Load Groupes Modal
const Groupe = require("../../models/Groupe");

// Create a Groupe
router.post("/", (req, res, next) => {
  Groupe.create(req.body, (error, data) => {
    if (error) {
      return next(error);
      console.log(error);
    } else {
      res.json(data);
    }
  });
});

//Get all Groupe
router.get("/", (req, res) => {
  Groupe.find(function (error, groupes) {
    if (error) {
      res.send(error);
    }
    res.json(groupes);
  });
});
module.exports = router;
