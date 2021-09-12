const { response } = require("express");
const jwt = require("jsonwebtoken");
const log = require("../logger/loggerFunction");
const config = process.env;


//function to generate a token => call after logging in 
// function generateToken(response, request, next) => {

// }


//verify token => before any REST API queries (routes)

tokenFunctions = {
  async verifyToken(req, res, next){
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
  
    if (!token) {
      log.error("TOKEN NOT DEFINED")
      res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, config.TOKEN_KEY);
      log.info("TOKEN VERIFIED SUCCESSFULLY")
      response.send(decoded)
      // req.user = decoded;
      return next()
    } catch (err) {
      log.error("TOKEN IS NOT VALID")
      res.status(401).send("Invalid Token");
    }
  }
}


module.exports = tokenFunctions;