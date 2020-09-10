const express = require("express");
const customerModel = require("../models/customer");
const app = express();

//get all
app.get("/customer", async (req, res) => {
    const food = await customerModel.find({});
  
    try {
      res.send(food);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  //get one
  app.get("/customer/:id", async (req, res) => {
    const food = await customerModel.findById(req.params.id);
  
    try {
      res.send(food);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  //add new
  app.post("/customer", async (req, res) => {
    const food = new customerModel(req.body);
  
    try {
      await food.save();
      res.send(food);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  //delete one
  app.delete("/customer/:id", async (req, res) => {
    try {
      const food = await customerModel.findByIdAndDelete(req.params.id);
      if (!food) res.status(404).send("no item found");
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
