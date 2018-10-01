/**
 * test/test.js
 * All endpoint tests for the auth API
 */

const chai = require('chai');
const expect = chai.expect;

const app = require('../app')

//chai-http used to send async requests to our app
const http = require('chai-http');
chai.use(http);

//import User model
const User = require('../api/user')


describe('App basic tests', () => {
  
  before( (done) => {
    //delete all users 
    User.find().deleteMany().then( res => {
      console.log('Users removed');
      done();
    }).catch(err => {
      console.log(err.message);
    });
  });

  it('Should exists', () => {
    expect(app).to.be.a('function');
  })

  it('/GET should return 200 and a message', (done) => {
    //send a GET request to /
    chai.request(app).get('/').then( res => {

      //validate response has a message
      expect(res).to.have.status(200);
      expect(res.body.message).to.be.equal('Hello!')

      done();
    }).catch(err => {
      console.log(err);
    });
    

  })
})

describe('User registration', () => {
  it('/register should return 201 and confirmation for valid input', (done) => {
    //mock valid user input
    let user_input = {
      "name": "John Wick",
      "email": "john@wick.com",
      "password": "secret"
    }
    //send /POST request to /register
    chai.request(app).post('/register').send(user_input).then(res => {
      //validate
      expect(res).to.have.status(201);
      expect(res.body.message).to.be.equal('User registered');
      console.log(res.body.user);
      //new validations to confirm user is saved in database
      expect(res.body.user._id).to.exist;
      expect(res.body.user.createdAt).to.exist;
      //validation to confirm password is encrypted
      expect(res.body.user.password).to.not.be.eql(user_input.password);

      //done after all assertions pass
      done();
    }).catch(err => {
      console.log(err);
    });
  })

  it('/register should return 401 for invalid input', (done) => {
    //mock invalid user input
    let user_invalid_input = {
      "name": "John Wick",
      "email": "",
      "password": "secret"
    }
    //send /POST request to /register
    chai.request(app).post('/register').send(user_invalid_input).then(res => {
      //validate
      expect(res).to.have.status(401);
      expect(res.body.errors.length).to.be.equal(1);

      //done after all assertions pass
      done();
    }).catch(err => {
      console.log(err);
    });
  })
  

})

describe('User login', () => {
  it('should return 200 and token for valid credentials', (done) => {
    //mock invalid user input
    const valid_input = {
      "email": "john@wick.com",
      "password": "secret"
    }
    //send request to the app
    chai.request(app).post('/login')
      .send(valid_input)
        .then((res) => {
          //assertions
          expect(res).to.have.status(200);
          expect(res.body.token).to.exist;
          expect(res.body.message).to.be.equal("Auth OK");
          expect(res.body.errors.length).to.be.equal(0);
          done();
        }).catch(err => {
          console.log(err.message);
        })
  });
});

describe('Protected route', () => {

  it('should return 200 and user details if valid token provided', (done) => {
    //mock login to get token
    const valid_input = {
      "email": "john@wick.com",
      "password": "secret"
    }
    //send login request to the app to receive token
    chai.request(app).post('/login')
      .send(valid_input)
        .then((login_response) => {
          //add token to next request Authorization headers as Bearer adw3R£$4wF43F3waf4G34fwf3wc232!w1C"3F3VR
          const token = 'Bearer ' + login_response.body.token;
          chai.request(app).get('/protected')
            .set('Authorization', token)
            .then(protected_response => {
              //assertions
              expect(protected_response).to.have.status(200);
              expect(protected_response.body.message).to.be.equal('Welcome, your email is john@wick.com');
              expect(protected_response.body.user.email).to.exist;
              expect(protected_response.body.errors.length).to.be.equal(0);

              done();
            }).catch(err => {
              console.log(err.message);
            });
        }).catch(err => {
          console.log(err.message);
        });
  })

  after((done) => {
    //stop app server
    console.log('All tests completed, stopping server....')
    process.exit();
    done();
  });

});




