require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const html = require("./welcome");


const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject();
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN
    }
  });

  return transporter;
};

// const transporter = nodemailer.createTransport({
//     port: process.env.SMTP_PORT,
//     host: process.env.SMTP_HOST,
//     secure: true,
//     auth: {
//       type: "OAuth2",
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASSWORD,
//     },
//     tls: {
//       // do not fail on invalid certs
//       rejectUnauthorized: false,
//     }
//   });

const url =
  process.env.NODE_ENV === "dev"
    ? "#"
    : process.env.host + ':' + '/';

const signupMail = async (to, data) => {
  try {
    const message = {
      from: `${process.env.SMTP_FROM}`,
      to,
      subject: `Welcome to Puno Greenery`,
      html: html(data),
    };
    let emailTransporter = await createTransporter();
    let email = await emailTransporter.sendMail(message);

    console.log('mailer',email);

  } catch (error) {
    console.error(error);
  }
};

// const sendEmail = async (emailOptions) => {
//   let emailTransporter = await createTransporter();
//   await emailTransporter.sendMail(emailOptions);
// };

// sendEmail({
//   subject: "Test",
//   text: "I am sending an email from nodemailer!",
//   to: "put_email_of_the_recipient",
//   from: process.env.EMAIL
// });

module.exports = signupMail;
