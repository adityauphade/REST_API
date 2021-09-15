const jwt = require("jsonwebtoken");
const log = require("../logger/loggerFunction");
require('dotenv').config()

//function to generate a token => call after logging in 
// function generateToken(response, request, next) => {

// }


//verify token => before any REST API queries (routes)

tokenFunctions = {
  async verifyToken(req, res, next){
    // const authHeader = req.headers["authorization"];
    // const token = authHeader && authHeader.split(" ")[1];
    // console.log(authHeader);
    // console.log(token);
    const token = req.header("x-access-token");
  
    if (!token) {
      log.error("TOKEN NOT DEFINED")
      res.status(403).send("A token is required for authentication");
    }
    try {
      await jwt.verify(token, process.env.TOKEN_KEY);
      log.info("TOKEN VERIFIED SUCCESSFULLY")
      // response.send(decoded)
      // req.user = decoded;
      next()
    } catch (err) {
      log.error("TOKEN IS NOT VALID")
      res.status(401).send("Invalid Token");
    }
  }
}


module.exports = tokenFunctions;