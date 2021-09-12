const jwt = require("jsonwebtoken")
require('dotenv').config()

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjEzNzg0ZDI3NDNjMjI0NzY2MzUxNmEyIiwidXNlcl9lbWFpbCI6ImFkaXR5YS51cGhhZGVAZ21haWwuY29tIiwiaWF0IjoxNjMxNDY2Mzc3LCJleHAiOjE2MzE1NTI3Nzd9.BPZCioKQKaTiYnyl9N4NJssoApOF7YGD7-I8MMZf5VI"

if(token){
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    console.log(decoded);
}else{
    // res.status(401).send("Invalid Token");
    console.error('Token not defined')
}
    

    
  