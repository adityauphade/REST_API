const nodemailer = require("nodemailer");
const log = require("../logger/loggerFunction")

mailerFunctions = {
  async sendMail(req, res, next) {
    console.log(req.user)
    let transporter = nodemailer.createTransport({
      //sender details
        service: "gmail",
        auth: {
          user: "hexabytecode@gmail.com", 
          pass: process.env.SENDER_MAILPASS, 
        },
      });
    
    let emailData = {
      from: '"HackerBoyAditya" <hexabytecode@gmail.com>', // sender address
      to: `${req.user.email}`, // list of receivers
      subject: "Node Test Mail", // Subject line
      text: "", // plain text body
      html: `<b>To reset your password: </b> <a href='http://localhost:3000/NotesApp/ResetPassword/${req.user.token}'>Click Me Babyyyy</a>`, // html body
    };
    
    transporter.sendMail(emailData, (error, info) => {
        console.log("bhaya")
        if(error){
          log.error("MAIL NOT SENT")
          console.error(error)
        }else{
          log.info("MAIL SENT SUCCESSFULLY")
          res.status(200).json(req.user)
          console.log(`Email Sent : ${info.response}`)
        }
    })
  }
} 

module.exports = mailerFunctions
