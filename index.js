"use strict";
const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({ origin: "https://flexfintx.com" }));
app.use(express.json());

let transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  secure: process.env.NODEMAILER_SECURE,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

app.post("/mail/contact", async (req, res) => {
  if (req.body.email && req.body.name && req.body.message) {
    transporter.sendMail(
      {
        from: '"FlexFinTx" <contact@flexfintx.com>',
        to: "contact@flexfintx.com",
        subject: `Contact Form: ${req.body.name} - ${req.body.email}`,
        text: `
      Received a contact form submission.
      Name: ${req.body.name}
      Email: ${req.body.email}
      Message: ${req.body.message}
      `,
      },
      (err) => {
        if (err) {
          console.error(`Error sending email from ${req.body.email}`);
          return res
            .status(500)
            .json({ error: true, message: "Could not send email " });
        } else {
          return res.status(200).json({ error: false, message: "Sucess" });
        }
      }
    );
  } else {
    res.status(400).json({ message: "Please fill all the fields" });
  }
});

app.post("/mail/quote", async (req, res) => {
  if (req.body.email && req.body.name && req.body.message) {
    transporter.sendMail(
      {
        from: '"FlexFinTx" <contact@flexfintx.com>',
        to: "contact@flexfintx.com",
        subject: `Quote Request: ${req.body.name} - ${req.body.email}`,
        text: `
          Received a request quote form submission.
          Name: ${req.body.name}
          Email: ${req.body.email}
          Message: ${req.body.message}
          `,
      },
      (err) => {
        if (err) {
          console.error(`Error sending email from ${req.body.email}`);
          return res
            .status(500)
            .json({ error: true, message: "Could not send email " });
        } else {
          return res.status(200).json({ error: false, message: "Sucess" });
        }
      }
    );
  } else {
    res.status(400).json({ message: "Please fill all the fields" });
  }
});

app.listen(process.env.API_PORT, () => {
  console.log(`web-api listening on port ${process.env.API_PORT}!`);
});
