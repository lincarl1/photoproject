/* Dependencies */
var mongoose = require('mongoose'),
    User = require('../models/listings.server.model.js');

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message. 
  On success (aka no error), you should send the listing(s) as JSON in the response.
  HINT: if you are struggling with implementing these functions, refer back to this tutorial 
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */

/* Create a listing */
exports.create = function(req, res) {

  /* Instantiate a Listing */
  var user = new User(req.body);

  /* Then save the listing */
  user.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(user);
    }
  });
};


exports.read = function(req, res) {
  var user = req.user;
  console.log("In listings.server.controller.js");
  console.log("exports.read: user: " + user);
  /** TODO **/
  /* Replace the article's properties with the new properties found in req.body */
  //var updated = req.body;
  //var loca = req.results;
  //, password: inputeduser.password
  if(user==null)
  {
    console.log("Email or password is null");
    var error = "Email or password is null.";
    res.status(400).send(error);
  }
  else
  {
    User.findOne({email: user.email, password: user.password},function(err){
      if(err){
        console.log("Error in exports.read: " + err);
        res.status(400).send(err);
      } else {
      //res.json(req.user);
      res.json(user);
      //res.status(200);
      //console.log("exports.login success");
      //console.log("email given: " + inputeduser.email);
      //res.status(200);
      //console.log("send success");

    }
  });
  }



};

/*
exports.read = function(req, res) {
  console.log("listings.server.controller - exports.read")
  //// send back the listing as json from the request
  //res.json(req.user);
  //var user = req.user;
   User.findOne({email: id.email, password: id.password}).exec(function(err, user) {
    if(err) {
      res.status(404).send(err);
    } else {
      req.user = user;
      next();
    }
  });
};
*/

/*
//// Show the current listing 
exports.read = function(req, res) {
  console.log("listings.server.controller - exports.read");
  //console.log(req);
  //// send back the listing as json from the request
  res.json(req.user);
};
*/

exports.login = function(req, res) {
  var user = req.user;
  var inputeduser = req.body;
  var email = "xifak";
  console.log("In listings.server.controller.js");
  console.log("exports.login: req.user: " + req.user);
  console.log("exports.login: req.body: " + req.body);
  /** TODO **/
  /* Replace the article's properties with the new properties found in req.body */
  //var updated = req.body;
  //var loca = req.results;
  //, password: inputeduser.password
  
  User.findOne({email: inputeduser.email, password: inputeduser.password},function(err){
    if(err){
      console.log("Error in exports.login: " + err);
      res.status(400).send(err);
    } else {
      //res.json(req.user);
      res.json(req.body);
      //console.log("exports.login success");
      //console.log("email given: " + inputeduser.email);
      //res.status(200);
      //console.log("send success");

    }
  });


};


/* Update a listing */
exports.update = function(req, res) {
  var user = req.user;

  /** TODO **/
  /* Replace the article's properties with the new properties found in req.body */
  var updated = req.body;
  var loca = req.results;
  

  User.findOne({email: user.email},function(err){
    if(err){
      console.log(err);
      res.status(400).send(err);
    } else {
      user.first = updated.first;
      user.last = updated.last;
      user.email = updated.email;
      user.password = updated.password;
/*
      if(loca){
        user.address.street = loca.lat;
        listing.coordinates.longitude = loca.lng;
      }
*/
    }
  });
  
  
  /* Save the article */
  user.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(user);
    }
  });

};

/* Delete a listing */
exports.delete = function(req, res) {
};



/* Retreives all the directory users, sorted by oldest date first */
exports.list = function(req, res) {
  User.find().sort({created_at: -1}).exec(function(err, user){
    if(err){
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(user);
    }
  });
};

/* 
  Middleware: find a listing by its ID, then pass it to the next request handler. 

  Find the listing using a mongoose query, 
        bind it to the request object as the property 'listing', 
        then finally call next
 */
 /*
exports.userBbyID = function(req, res, next, id) {
  //var user = id.user;
  //console.log(req);
  console.log("listings.server.controller: exports.userByID");
  console.log("id.body: " + id.body);
  console.log("id: " + id);
  console.log("req.user: " + req.user);
  console.log("res.user: " + res.user);
  User.findOne({email: id.email, password: id.password}).exec(function(err, user) {
    if(err) {
      res.status(404).send(err);
    } else {
      //req.user = user;
      req.user = user;
      console.log("success. req.user: " + req.user);
      next();
    }
  });

};

*/







exports.userByID = function(req, res, next, id) {
  //var user = id.user;
  //console.log(req);
  var id = JSON.parse(id);
  console.log("listings.server.controller: exports.userByID");
  console.log("id: ");
  console.log(JSON.stringify(id, null, 4));

  User.findOne({email: id.email, password: id.password}).exec(function(err, user) {
    if(err) {
      res.status(404).send(err);
    } else {
      //res.status(200);
      req.user = user;
      console.log("finished findOne");
      console.log("user: " + user);
      console.log("req.user: " + req.user);
      next();
    }
  });
  /*
  User.findById(id).exec(function(err, user) {
    if(err) {
      res.status(404).send(err);
    } else {
      req.user = user;
      next();
    }
  });
  */
};
