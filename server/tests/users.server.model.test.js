var should = require('should'), 
    mongoose = require('mongoose'), 
    User = require('../models/listings.server.model'), 
    config = require('../config/config');

var user, id;

user =  {
  first: "MochaFirst",
  last: "MochaLast",
  email: "MochaEmail",
  password: "MochaPassword", 
  address: {
    street: "MochaSt", 
    city: "MochaC",
    state: "MochaS",
    zip: 12354
  }
}

describe('User Schema Unit Tests', function() {

  before(function(done) {
    mongoose.connect(config.db.uri);
    done();
  });

  describe('Saving to database', function() {
    /*
      Mocha's default timeout for tests is 2000ms. To ensure that the tests do not fail 
      prematurely, we can increase the timeout setting with the method this.timeout()
     */
    this.timeout(10000);

    it('saves properly when first, last, email, & password provided', function(done){
      new User({
        first: user.first,
        last: user.last,
        email: user.email,
        password: user.password
      }).save(function(err, user){
        should.not.exist(err);
        id = user._id;
        done();
      });
    });

    it('saves properly when all properties provided', function(done){
      new User(user).save(function(err, user){
        should.not.exist(err);
        id = user._id;
        done();
      });
    });

    it('throws an error when last not provided', function(done){
      new User({
        first: user.first,
        password: user.password,
        email: user.email
      }).save(function(err){
        should.exist(err);
        done();
      })
    });

    it('throws an error when password not provided', function(done){
      new User({
        first: user.first,
        last: user.last,
        email: user.email
      }).save(function(err){
        should.exist(err);
        done();
      })
    });

  });

  afterEach(function(done) {
    if(id) {
      User.remove({ _id: id }).exec(function() {
        id = null;
        done();
      });
    } else {
      done();
    }
  });
});