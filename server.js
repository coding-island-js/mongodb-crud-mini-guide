require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const customerRouter = require("./routes/customerRoutes");

const dbURL = process.env.DATABASE_URL;
3;
const app = express();

app.use(express.json());

app.use(customerRouter);

mongoose.connect(dbURL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.listen(3000, () => {
  console.log("all systems are a go...");
});
