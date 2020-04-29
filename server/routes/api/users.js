const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const async = require("async");
const crypto = require("crypto");
var jwtDecode = require("jwt-decode");

var multer = require("multer");

const verifyToken = require("../../middleware/VerifyToken");

// Load User model
const User = require("../../models/User");

//Decode Token to get Id of a user
router.post("/decode", verifyToken, (req, res) => {
  res.send({
    message: "Your access token was validated !",
    id: req.userId,
    firstName: req.userfirst,
    lastName: req.userlast,
    email: req.useremail,
    password: req.userpassword,
    roles: req.userroles,
  });
});

////////////////////////////////////////
// get all Users
router.get("/", (req, res) => {
  User.find(function (error, users) {
    if (error) {
      res.send(error);
    }
    res.json(users);
  });
});

////////////////////////////////////////
//remove users
router.get("/:id/delete", (req, res) => {
  User.findOneAndRemove(
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
          data: User,
        });
      }
    }
  );
});

////////////////////////////////////////
//Update User
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password, roles } = req.body;
  const user = User.findOneAndUpdate(
    { _id: id },
    {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      roles: roles,
    }
  ).catch((error) => {
    return error;
  });
  res.json({
    success: true,
    data: user,
    message: "Updated ",
  });
});

////////////////////////////////////////
//Add users
router.post("/", (req, res, next) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    roles: req.body.roles,
  });
  // Hash password before saving in database
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then((user) => res.json(user))
        .catch((err) => console.log(err));
    });
  });
});
////////////////////////////////////////
//Get User by Id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const user = User.findOne({ _id: id })
    .then(function (data) {
      res.json({ success: true, data });
    })
    .catch((error) => {
      return error;
    });
});

/////////////////////////////////////////////////////////
//upload a file and put in local storage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "client/public/images/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage }).single("file");

router.post("/upload-avatar", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

module.exports = router;
