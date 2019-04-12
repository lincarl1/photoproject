/* Dependencies */
var mongoose = require('mongoose'),
    Order = require('../models/orders.server.model.js');

/* Create an order */
exports.create = function(req, res) {

  /* Instantiate an Order */
  var order = new Order(req.body);
  // TESTING

  //console.log("exports.create: order.img: " + JSON.stringify(order));
  
  //order.img.data = fs.readFileSync(req.files.userPhoto.path)
  //order.img.data = order.img;
  //order.img.contentType = 'image/png';
  
  // END TESTING
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
  Order.find().sort({created_at: -1}).exec(function(err, order){
    if(err){
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(order);
    }
  });
};

/*
exports.read = function(req, res) {
  var order = req.order;
  Order.find({id: order._id}).sort({created_at: -1}).exec(function(err, order){
    if(err){
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(order);
    }
  });
};
*/

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
    });
  }
};


// passes along id to read
exports.orderByID = function(req, res, next, id) {
  console.log("made it");
  console.log("orders.server.controller: exports.orderByID");
  console.log("id: " + id);
  req.id = id;
  next();
  /*
  Order.find({user_id: id}).exec(function(err, order) {
    if(err) {
      res.status(404).send(err);
    } else {
      req.order = order;
      next();
    }
  });
  */
  
};
