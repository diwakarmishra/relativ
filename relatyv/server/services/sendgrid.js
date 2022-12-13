const client = require('@sendgrid/mail');
client.setApiKey(process.env.SENDGRID_API_KEY);
const { EmailTemplate } = require('./Emailtemplate')

const sendEmail = (to, body) => {
    try {
        const message = {
            from: {
                email: 'xxstyagixx@gmail.com',
                name: 'Relatyv'
            },
            to: {
                email: to,
            },
            subject: 'Registration',
            content: [
              {
                type: 'text/html',
                value: EmailTemplate(body.otp)
              }
            ]
          };
          
        client
        .send(message)
        .then(() => console.log('Mail sent successfully'))
        .catch(error => {
            console.error('error is here',error);
        });
    }
    catch ( error ) {
        console.log(error, 'error is here')
        throw error ;
    }
}

module.exports = sendEmail