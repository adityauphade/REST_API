const nodemailer = require("nodemailer");
const log = require("../logger/loggerFunction")

mailerFunctions = {
  async sendMail(res, rep, next) {
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
      to: "adityauphade99@gmail.com", // list of receivers
      subject: "Node Test Mail", // Subject line
      text: "", // plain text body
      html: "<b>To reset your password: </b> <a href='https://www.youtube.com/watch?v=TkHr9sd41q8&ab_channel=LittleSoul'>Click Me Babyyyy</a>", // html body
    };
    
    await transporter.sendMail(emailData, (error, info) => {
        if(error){
          log.error("MAIL NOT SENT")
          console.error(error)
        }else{
          log.info("MAIL SENT SUCCESSFULLY")
          console.log(`Email Sent : ${info.response}`)
        }
    })
  }
} 

module.exports = mailerFunctions
