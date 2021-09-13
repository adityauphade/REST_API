const nodemailer = require("nodemailer");
const log = require("../logger/loggerFunction")

mailerFunctions = {
  async sendMail(res, rep, next) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "hexabytecode@gmail.com", 
          pass: process.env.SENDER_MAILPASS, 
        },
      });
    
    let emailData = {
      from: '"HackerBoyAditya" <hexabytecode@gmail.com>', // sender address
      to: "adityauphade99@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b> <a>Click Me Babyyyy</a>", // html body
    };
    
    await transporter.sendMail(emailData, (error, info) => {
        if(error){
          log.error("MAIL NOT SENT")
          console.error(error)
        }else{
          log.INFO("MAIL SENT SUCCESSFULLY")
          console.log(`Email Sent : ${info.response}`)
        }
    })
  }
} 

module.exports = mailerFunctions
