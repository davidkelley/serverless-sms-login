'use strict';

const GraphQLList = require('graphql').GraphQLList;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLNonNull = require('graphql').GraphQLNonNull;

const TokenType = require('./type').TokenType;
const validate = require('./validate');
const resolves = require('./resolves');

module.exports = {
  user: {
    type: TokenType,
    description: 'Get a Number code',
    args: {
      number: { type: new GraphQLNonNull(GraphQLString) },
      code: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: function(source, args) {
      return validate(args).then(() => resolves.get(args));
    }
  }
}
