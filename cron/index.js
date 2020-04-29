const express = require("express");
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const app = express();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tt5040564@gmail.com",
    pass: "test@2020",
  },
});

cron.schedule("* * * * *", () => {
  console.log("sending email");
  let mailOptions = {
    from: "tt5040564@gmail.com",
    to: "tt5040564@gmail.com",
    subject: "Nodemailer",
    text: "Testing Nodemailer",
    html: "<h1>Testing Nodemailer</h1>",
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("error occurred", err);
    } else {
      console.log("email sent", info);
    }
  });
});

app.listen(8000);
