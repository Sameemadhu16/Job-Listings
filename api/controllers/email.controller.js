import expressAsyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';


dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });


  const sendEmail = expressAsyncHandler( async (req,res)=>{
     const {name,email,subject, message} =req.body;
     console.log(name,email,message);

     var mailOptions ={
        from: process.env.SMTP_MAIL,
        to:email,
        subject:subject,
        message:message,
     };

     transporter.sendMail(mailOptions, function(error,info){
        if (error) {
            console.log(error);
            res.status(500).json({ error: "Failed to send email" });
        } else {
            console.log("Email sent successfully");
            res.status(200).json({ message: "Email sent successfully" });
        }

  });
  })

  export default sendEmail;