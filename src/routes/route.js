const { Router } = require('express');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars')
const router = Router();
require ('dotenv').config();

router.post('/send-email', async (req, res) => {
    const { name , email } = req.body;

    // contentHtml = `
    // <h1>Hola ${name}</h1>
    // <p>Tu correo electrónico ${email} ha sido registrado satisfactoriamente.</p>
    // `
    
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
        tls: {
            rejectUnauthorized: false,
        }
    });


    transporter.use("compile",hbs({
        viewEngine:{
           partialsDir:"./views/",
           defaultLayout:""
       },
        viewPath:"./views/",
        extName:".hbs"
  }));


    let mailOptions = {
        from: 'testpalominovanessa@gmail.com',
        to: `${email}`,
        subject: 'Testing and Testing',
        template: 'welcome',
        context: {
            name: `${name}`
        }
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log('Error', err);
        } else {
            console.log('Email sent')
        }
    })

    res.redirect('/success.html');
})

module.exports = router;
