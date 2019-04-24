var should = require('should'), 
    request = require('supertest'), 
    express = require('../config/express'), 
    User = require('../models/listings.server.model.js');

/* Global variables */
var app, agent, user, id;

/* Unit tests for testing server side routes for the users API */
describe('Users CRUD tests', function() {

  this.timeout(10000);

  before(function(done) {
    app = express.init();
    agent = request.agent(app);

    done();
  });

  it('should it able to retrieve all users', function(done) {
    agent.get('/api/users')
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res);
        done();
      });
  });

  it('should be able to save a user', function(done) {
    var user = {
      first: 'routeFirst', 
      last: 'routeLast',
      email: 'routeEmail',
      password: 'routePassword'
    };
    agent.post('/api/users')
      .send(user)
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res.body._id);
        res.body.first.should.equal('routeFirst');
        res.body.last.should.equal('routeLast');
        res.body.email.should.equal('routeEmail');
        id = res.body._id;
        done();
      });
  });


  after(function(done) {
    if(id) {
      User.remove({_id: id}, function(err){
        if(err) throw err;
        done();
      })
    }
    else {
        done();
    }
  });
});
