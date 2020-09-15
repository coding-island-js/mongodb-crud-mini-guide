const express = require("express");
const customerModel = require("../models/customer");
const crudModel = require("../models");
const app = express();

//get all
app.get("/customer", async (req, res) => {
  const customer = await customerModel.find({});

  try {
    res.send(customer);
  } catch (error) {
    res.status(500).send(error);
  }
});

//get all address
app.get("/address", async (req, res) => {
  const address = await crudModel.Address.find({});

  try {
    res.send(address);
  } catch (error) {
    res.status(500).send(error);
  }
});

/*
//get one
app.get("/customer/:id", async (req, res) => {
  const customer = await crudModel.Customer.findById(req.params.id);
  customer.populate("address");

  try {
    res.send(customer);
  } catch (error) {
    res.status(500).send(error);
  }
});
*/

// Route for retrieving a Product by id and populating it's Review.
app.get("/customer/:id", function (req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  crudModel.Customer.findById({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("address")
    .then(function (dbCustomer) {
      // If we were able to successfully find an Product with the given id, send it back to the client
      res.json(dbCustomer);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

//add new
app.post("/customer", async (req, res) => {
  const customer = new customerModel(req.body);

  try {
    await customer.save();
    res.send(customer);
  } catch (error) {
    res.status(500).send(error);
  }
});

//add new address and new customer
app.post("/customer/:id", async (req, res) => {
  const address = await crudModel.Address.create(req.body);
  const customer = await crudModel.Customer.findByIdAndUpdate(
    { _id: req.params.id },
    { $push: { address: address } },
    { new: true }
  );

  try {
    await customer.save();
    res.send(customer);
  } catch (error) {
    res.status(500).send(error);
  }
});

//delete one
app.delete("/customer/:id", async (req, res) => {
  try {
    const customer = await customerModel.findByIdAndDelete(req.params.id);
    if (!customer) res.status(404).send("no item found");
    res.status(200).json();
  } catch (error) {
    res.status(500).send(error);
  }
});

//update one

app.patch("/customer/:id", async (req, res) => {
  try {
    await customerModel.findByIdAndUpdate(req.params.id, req.body);
    await customerModel.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
