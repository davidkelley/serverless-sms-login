'use strict';

const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLString = require('graphql').GraphQLString;

const TokenType = new GraphQLObjectType({
  name: 'Token',
  description: 'Token for App',
  fields: () => ({
    token: {type: GraphQLString},
    number: {type: GraphQLString}
  })
});

const SessionType = new GraphQLObjectType({
  name: 'Session',
  description: 'Session for Authenticated User',
  fields: () => ({
    session: {type: GraphQLString}
  })
});

module.exports = {TokenType, SessionType};
