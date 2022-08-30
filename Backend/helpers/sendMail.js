require('dotenv').config();
const sqMail = require('@sendgrid/mail');

sqMail.setApiKey(process.env.API_KEY);

const sendMail = async (message) =>{
    try {
       const mailer = await sqMail.send(message);
        console.log('sendgrid sucess!');
       return mailer
    } catch (error) {
        throw error;
    }
}

module.exports = sendMail;