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



/* Retreives all the orders, sorted by oldest date first */
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


exports.read = function(req, res) {
  console.log("req.order: " + req.order);
  var order = req.order;
  console.log("In listings.server.controller.js");
  console.log("exports.read: order: " + order);
  if(order==null)
  {
    console.log("ordel is null?");
    var error = "Order is null in exports.read.";
    res.status(400).send(error);
  }
  else
  {
    User.findOne({id: order._id},function(err){
      if(err){
        console.log("Error in exports.read: " + err);
        res.status(400).send(err);
      } else {
      res.json(order);
      //res.status(200);
      //console.log("email given: " + inputeduser.email);

    }
    
  });

  }

};




exports.orderuserByID = function(req, res, next, id) {
  //var user = id.user;
  //console.log(req);
  var id = JSON.parse(id);
  console.log("orders.server.controller: exports.orderuserByID");
  console.log("id: ");
  console.log(JSON.stringify(id, null, 4));

  User.findOne({id: id._id}).exec(function(err, order) {
    if(err) 
    {
      res.status(404).send(err);
    } 
    else 
    {
      if(order == null)
      {
        res.status(404).send(err);
      }
      else 
      {
        req.order = order;
          console.log("finished findOne");
          console.log("req.order: " + req.order);
          next();
      }    
    }
  });

};