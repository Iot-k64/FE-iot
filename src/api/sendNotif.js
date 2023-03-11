const accountSid = 'AC2e24694f2aed35b260a6de54d85fe7d2';
const authToken = '40339373e2704cc3dac69d7e734e2cd6';
const client = require('twilio')(accountSid, authToken);

export const sendNotif =  (content) => {
    client.messages
      .create({
         body: content,
         from: '+15676011629',
         to: '+840337223832'
       })
      .then(message => console.log(message.sid));
}

