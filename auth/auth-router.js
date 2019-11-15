const router = require('express').Router();
const Users = require('./users-models.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../config/secrets.js');

router.post('/register', (req, res) => {
  const creds = req.body;
  console.log(creds);
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(creds.password, salt);

  Users.insert({...creds, password:hash })
  .then(user => {
    console.log(user);
    res.status(201).json({
      message: 'User was created'
    });
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error creating user',
      Err: error
    });
  });
});

router.post('/login', (req, res) => {
  const creds = req.body;

  Users.getBy({username: creds.username})
  .then(user => {
    console.log(user);
    if(user && bcrypt.compareSync(creds.password, user.password)){
      const token = generateToken(user);
      console.log(token);
      res.status(202).json({
        message: 'Welcome!',
        token
      });
    } else {
      res.status(401).json({
        message: 'Please enter the correct username or password'
      });
    }
  })
  .catch(error => {
    res.status(500).json({
      message: 'cannot connect to the database',
      error: error
    });
  });
});

module.exports = router;
