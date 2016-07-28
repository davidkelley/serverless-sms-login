'use strict';

const Promise = require('bluebird');
const uuid = require('uuid');
const db = require('../../../dynamodb');
const invoke = require('../../../invoke')
const _ = require('lodash');

const stage = process.env.SERVERLESS_STAGE;
const projectName = process.env.SERVERLESS_PROJECT;
const usersTable = projectName + '-users-' + stage;

module.exports = {

  login(args) {
    args.code = Math.ceil(Math.random() * 1000000).toString();
    args.token = uuid.v1();
    args.session = uuid.v1();

    return db('put', {
      TableName: usersTable,
      Item: args
    })
    .then(() => invoke('sns', args, (response) => {
      if (response.result !== 'success') {
        return Promise.reject(new Error(response.error));
      }
    }))
    .then(() => args);
  },

  get(args) {
    const number = args.number;
    const code = args.code;

    return db('get', {
      TableName: usersTable,
      Key: {number, token},
      AttributesToGet: [
        'code'
      ]
    })
    .then(reply => {
      const Item = reply.Item;
      if ( ! Item) return Promise.reject('Number not found');
      return Item;
    });
  },

  authenticate(args) {
    const number = args.number;
    const token = args.token;
    const code = args.code;

    return db('get', {
      TableName: usersTable,
      Key: {number, token},
      AttributesToGet: [
        'code',
        'session'
      ]
    })
    .then(reply => {
      const Item = reply.Item;
      if ( ! Item) return Promise.reject('Number not found');
      if (Item.code != code) return Promise.reject('Code does not match');
      return Item;
    });
  }
};
