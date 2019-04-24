/* Dependencies */
var mongoose = require('mongoose'),
    Order = require('../models/orders.server.model.js');

/* Create an order */
exports.create = function(req, res) {

  /* Instantiate an Order */
  var order = new Order(req.body);

  /* Then save the order */
  order.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(order);
    }
  });
};



/* Retreives all the orders, sorted by newest date first */
exports.list = function(req, res) {
  Order.find().sort({_id: -1}).exec(function(err, order){
    if(err){
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(order);
    }
  });
};


exports.update = function(req, res) {
  /* Replace the article's properties with the new properties found in req.body */
  var updated = req.body;
  console.log("exports.update updated: " + updated._id);
  res.status(200);
  // Find user by given unique id
  Order.findById(updated._id, function (err, orderfound) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    } else {
      //console.log("orderfound original: " + JSON.stringify(orderfound));
      // update order data
      orderfound.status = updated.status;
      if(updated.size != null)
      {
        orderfound.size = updated.size;
      }
      if(updated.medium != null)
      {
        orderfound.medium = updated.medium;
      }
      if(updated.name != null)
      {
        orderfound.name = updated.name;
      }
      if(updated.email != null)
      {
        orderfound.email = updated.email;
      }
      if(updated.address != null)
      {
        orderfound.address = updated.address;
      }
      
      orderfound.save(function(err) {
        if(err) {
          console.log(err);
          res.status(400).send(err);
        } else {
          //console.log("orderfound after edits: " + JSON.stringify(orderfound));
          res.json(orderfound);
        }
      });
      
    }
});

};


// finds orders given unique user id
exports.read = function(req, res) {
  console.log("req.order: " + req.order);
  var order = req.order;
  console.log("In listings.server.controller.js");
  console.log("req.id: " + req.id);
  var id = req.id;
  console.log("exports.read: id: " + id);
  console.log("exports.read: order: " + order);
  if(id==null)
  {
    console.log("id is null?");
    res.status(400).send(error);
  }
  else
  {
    Order.find({user_id: id}, function(err, orders){
      if(err){
        console.log("Error in exports.read: " + err);
        res.status(400).send(err);
      }
      else
      {
        res.json(orders);
        res.status(200);
      }
    }).sort({_id: -1});
  }
};


// passes along id to read
exports.orderByID = function(req, res, next, id) {
  console.log("made it");
  console.log("orders.server.controller: exports.orderByID");
  console.log("id: " + id);
  req.id = id;
  next();

};
