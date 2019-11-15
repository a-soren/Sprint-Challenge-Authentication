const request = require('supertest');

const Users = require('../database/dbConfig.js');

const bcrypt = require('bcryptjs');


describe('should register a new user', function(){
    beforeEach(async () => {
        await Users('users').truncate();
    });

    it("responds with a 201", function(done){
        request(server)
        .post('/register')
        .send({ username: "Amberly", password:"123pass" })
        .set('Accept', 'application/json')
        .expect("Content-type", /json/)
        .expect(201)
        .end(function(err, res){
            if (err) return done(err);
            done();
    });
});

it("responds with 500 with incorrect body", function(done) {
    request(server)
      .post("/register")
      .send({ fdssd: "jofdfdfdfhn", password: "butteeeee" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe("POST /login", function() {
  it("202 with correct login", function(done) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync("Amberly", salt);

    return Users("users")
      .insert({ username: "Amberly", password: hash })
      .then(() => {
        request(server)
          .post("/login")
          .send({ username: "Amberly", password: "123pass" })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(202)
          .end(function(err, res) {
            if (err) return done(err);
            done();
          });
      });
  });

  it("responds with 500 with incorrect body", function(done) {
    request(server)
      .post("/register")
      .send({ fdssd: "jofdfdfdfhn", password: "butteeeee" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});