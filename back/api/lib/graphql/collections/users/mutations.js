'use strict';

const GraphQLString = require('graphql').GraphQLString;
const GraphQLNonNull = require('graphql').GraphQLNonNull;

const TokenType = require('./type').TokenType;
const SessionType = require('./type').SessionType;

const validate = require('./validate');
const resolves = require('./resolves');

module.exports = {
  login: {
    type: TokenType,
    description: 'Send SMS to Number',
    args: {
      number: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(source, args) {
      return validate(args).then(() => resolves.login(args));
    }
  },
  authenticate: {
    type: SessionType,
    description: 'Authenticate Number based on Token',
    args: {
      number: { type: new GraphQLNonNull(GraphQLString) },
      token: { type: new GraphQLNonNull(GraphQLString) },
      code: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(source, args) {
      return validate(args).then(() => resolves.authenticate(args));
    }
  }
}
