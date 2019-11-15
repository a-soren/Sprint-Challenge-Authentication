const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {
  const token =req.headers.authorization;

  if(token){
    jwt.verify(token, secrets.jwtSecret, (err, decodeToken) => {
      if (error){
        res.status(401).json({
          message: 'You shall not pass!'
        });
      } else {
        req.user ={};
        next();
      }
    });
  } else {
    res.status(400).json({
      message: 'please provide a token'
    });
  }
};
