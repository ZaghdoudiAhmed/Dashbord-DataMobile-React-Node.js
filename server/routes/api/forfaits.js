const express = require("express");
const router = express.Router();

//Load Forfaits Modal
const Forfait = require("../../models/Forfait");

// Create a Forfiat
router.post("/", (req, res, next) => {
  Forfait.create(req.body, (error, data) => {
    if (error) {
      return next(error);
      console.log(error);
    } else {
      res.json(data);
    }
  });
});

//Get all Forfaits
router.get("/", (req, res) => {
  Forfait.find(function (error, forfaits) {
    if (error) {
      res.send(error);
    }
    res.json(forfaits);
  });
});
module.exports = router;
