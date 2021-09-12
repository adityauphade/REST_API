const jwt = require("jsonwebtoken")

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjEzNzg0ZDI3NDNjMjI0NzY2MzUxNmEyIiwidXNlcl9lbWFpbCI6ImFkaXR5YS51cGhhZGVAZ21haWwuY29tIiwiaWF0IjoxNjMxNDI3NTMxLCJleHAiOjE2MzE1MTM5MzF9.Dfin_-UZpNY_mAVld32YFFMveNlh1Cyyv8cn8db53dw"

if(token){
    const decoded = jwt.verify(token, "hella");
    console.log(decoded);
}else{
    // res.status(401).send("Invalid Token");
    console.error('Token not defined')
}
    

    
  