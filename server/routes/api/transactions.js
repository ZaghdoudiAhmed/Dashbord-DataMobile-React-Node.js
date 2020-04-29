const express = require("express");
const router = express.Router();

//Load Transactions Modal
const Transaction = require("../../models/Transaction");

//Load Customers Modal
const Customer = require("../../models/Customer");

// Create a Transaction
router.post("/", (req, res, next) => {
  Transaction.create(req.body, (error, data) => {
    if (error) {
      return next(error);
      console.log(error);
    } else {
      res.json(data);
    }
  });
});

router.get("/", (req, res) => {
  Transaction.find(function (error, transactions) {
    if (error) {
      res.send(error);
    }
    res.json(transactions);
  });
});

module.exports = router;
