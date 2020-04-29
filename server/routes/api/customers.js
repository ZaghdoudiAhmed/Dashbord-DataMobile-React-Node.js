const express = require("express");
const router = express.Router();

//Load customers Modal
const Customer = require("../../models/Customer");
//Load Transaction Modal
const Transaction = require("../../models/Transaction");

// Create a Customer
router.post("/", (req, res, next) => {
  Customer.create(req.body, (error, data) => {
    if (error) {
      return next(error);
      console.log(error);
    } else {
      res.json(data);
    }
  });
});

//Get all Customers
router.get("/", (req, res) => {
  Customer.find(function (error, customers) {
    if (error) {
      res.send(error);
    }
    res.json(customers);
  });
});

//Get Customer by Id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const customer = Customer.findOne({ _id: id })
    .then(function (data) {
      res.json({ success: true, data });
    })
    .catch((error) => {
      return error;
    });
});

//Update Customer
router.put("/:id", (req, res) => {
  //parameter get id
  const { id } = req.params;
  //parameter POST
  const {
    firstName,
    lastName,
    address,
    number,
    solde,
    typedonnee,
    forfait,
    groupe,
  } = req.body;
  //Update Data
  const customer = Customer.findOneAndUpdate(
    { _id: id },
    {
      firstName: firstName,
      lastName: lastName,
      address: address,
      number: number,
      solde: solde,
      typedonnee: typedonnee,
      forfait: forfait,
      groupe: groupe,
    }
  ).catch((error) => {
    return error;
  });
  res.json({
    success: true,
    data: customer,
    message: "Updated ",
  });
});

//Remove Customer
router.get("/:id/delete", (req, res) => {
  Customer.findOneAndRemove(
    {
      _id: req.params.id,
    },
    (err, User) => {
      if (err) {
        res.send("error removing");
      } else {
        res.json({
          success: true,
          message: "Deleted",
          data: Customer,
        });
      }
    }
  );
});

//Get all transactions of a customer with id
router.get("/:id/transactions", (req, res, next) => {
  Transaction.find({ customer_id: req.params.id }, (err, transactions) => {
    if (err) {
      res.send("error get transaction");
    }
    res.json(transactions);
  });
});

//Create a transaction bu customers id
router.post("/:id/transactions", async (req, res, next) => {
  const { id } = req.params;

  const customer = await Customer.findOne({ _id: id }).exec();
  const transaction = new Transaction({
    price: req.body.price,
    type_trans: req.body.type_trans,
    end_date: new Date(req.body.end_date),
    begin_date: new Date(req.body.begin_date),
    customer_id: id,
  });

  if (transaction.price > customer.solde) {
    return res.json({
      message: "no money",
    });
  }
  await transaction.save();
  
  return res.json({
    message: "done",
  });
});

module.exports = router;
