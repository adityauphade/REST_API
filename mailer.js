const nodemailer = require("nodemailer");
require('dotenv').config()


async function main() {
    
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hexabytecode@gmail.com", // generated ethereal user
      pass: process.env.SENDER_PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = {
    from: '"HackerBoyAditya" <hexabytecode@gmail.com>', // sender address
    to: "adityauphade99@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  };
  await transporter.sendMail(info, (error, info) => {
      if(error){
          console.error(error)
      }else{
          console.log(`Email Sent : ${info.response}`)
      }
  })
}

main()