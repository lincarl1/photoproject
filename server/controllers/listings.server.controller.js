/* Dependencies */
var mongoose = require('mongoose'),
    User = require('../models/listings.server.model.js');

/*
  This file, uses Mongoose queries in order to retrieve/add/remove/update users.
  On an error, sends a 404 status code, as well as the error message. 
  On success, sends the user(s) as JSON in the response.
 */

/* Create a user */
exports.create = function(req, res) {
  /* Instantiate a User */
  var user = new User(req.body);
  /* Then save the user */
  user.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(user);
    }
  });
};

/* Login- checks if user exists */
exports.read = function(req, res) {
  console.log("req.user: " + req.user);
  var user = req.user;
  console.log("In listings.server.controller.js");
  console.log("exports.read: user: " + user);
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
      res.json(user);
      res.status(200);
    }
    
  });

  }

};


/*
//// Show the current user 
exports.read = function(req, res) {
  console.log("listings.server.controller - exports.read");
  //console.log(req);
  //// send back the user as json from the request
  res.json(req.user);
};
*/



/* Update a user */
exports.update = function(req, res) {
  /* Replace the article's properties with the new properties found in req.body */
  var updated = req.body;
  console.log("exports.update updated: " + updated._id);
  res.status(200);
  // Find user by given unique id
  User.findById(updated._id, function (err, userfound) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    } else {
      console.log("userfound original: " + JSON.stringify(userfound));
      // update user data
      userfound.first = updated.first;
      userfound.last = updated.last;
      userfound.email = updated.email;
      userfound.password = updated.password;
      userfound.address = updated.address;
      userfound.save(function(err) {
        if(err) {
          console.log(err);
          res.status(400).send(err);
        } else {
          console.log("userfound after edits: " + JSON.stringify(userfound));
          res.json(userfound);
        }
      });
      
    }
});

};

/* Delete a listing */
exports.delete = function(req, res) {
};



/* Retreives all users, sorted by oldest date first */
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
  Middleware: find a user by its ID, then pass it to the next request handler. 

  Find the listing using a mongoose query, 
  bind it to the request object as the property 'listing', 
  then finally call next
 */


exports.userByID = function(req, res, next, id) {
  var id = JSON.parse(id);
  console.log("listings.server.controller: exports.userByID");
  console.log("id: ");
  console.log(JSON.stringify(id, null, 4));

  User.findOne({email: id.email}).exec(function(err, user) {
    if(err) {
      res.status(404).send(err);

    } else {
      if(user == null){
        res.status(404).send(err);
      }
      else {
      user.comparePassword(id.password, user.password, function(err, isMatch) {
        if(err){
          console.log("err in compare");
          res.status(404).send(err);
        }
        else if(!isMatch){
          console.log("pass incorrect");
          res.status(404).send(err);
        }
        else {
          req.user = user;
          console.log("finished findOne");
          console.log("req.user: " + req.user);
          next();
        }
        // test
        //id.password = user.password;
        //res.status(200);
        
      });
    }

      
    }
  });
};

/*
//ORIGINAL
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
      console.log("req.user: " + req.user);
      next();
    }
  });
*/