const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
require("dotenv").config();

const sendMail = (data) =>
  new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: "587",
      secure: false,
      auth: {
        user: "az8630394@gmail.com",
        pass: "12345ABCDE",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    transporter.use(
      "compile",
      hbs({
        viewEngine: {
          extname: ".html",
          partialsDir: path.resolve("./src/templates/email"),
          defaultLayout: false,
        },
        viewPath: path.resolve("./src/templates/email"),
        extName: ".html",
      })
    );

    const mailOptions = {
      from: '"Cinetix App" <az8630394@gmail.com>',
      to: data.to,
      subject: data.subject,
      // html: "<b>Click Here to Activate</b>",
      template: data.template,
      context: data.data,
    };

    if (data.attachment) {
      if (data.attachment.length > 0) {
        mailOptions.attachment = data.attachment;
      }
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        // eslint-disable-next-line no-console
        console.log(`Email sent ! ${info.response}`);
        resolve(info.response);
      }
    });
    // eslint-disable-next-line no-console
    console.log("SEND MAIL PROCESS WORKS!");
  });
module.exports = sendMail;