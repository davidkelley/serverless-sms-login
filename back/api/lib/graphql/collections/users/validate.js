'use strict';

const Promise = require('bluebird');

let validate = {
  number: (number) => {
    let re = /^\+[1-9]\d{1,14}$/;
    if (!re.test(number)) return Promise.reject('invalid phone number');
  },
  code: (code) => {
    let re = /^[0-9]{6}$/;
    if (!re.test(code)) return Promise.reject('invalid authentication code');
  },
  token: (token) => {
    return;
  }
};


module.exports = (data) => {
  Object.keys(data).forEach((d) => {validate[d](data[d])});
  return Promise.resolve();
}
