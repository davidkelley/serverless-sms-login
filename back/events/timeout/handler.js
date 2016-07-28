'use strict';

const AWS = require('aws-sdk');
const SNS = AWS.SNS;

const SNSConfig = {
  sessionToken:    process.env.AWS_SESSION_TOKEN,
  region:          process.env.SERVERLESS_REGION
};

module.exports.handler = (event, context, cb) => {
  const client = new SNS(SNSConfig);

  console.log(AWS.VERSION);

  event.result = 'success';

  console.log(event);

  client.publish({
    Message: "Your authentication code is " + event.code + ".",
    PhoneNumber: event.number
  }, (err, data) => {
    console.log(err);
    console.log(data);
    if(err) {
      event.result = 'error';
      event.error = err.message;
    }
    cb(null, event);
  })
};
