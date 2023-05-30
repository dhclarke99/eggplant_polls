const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    polls: [Poll]!
    eggplants: Int
  }

  type Poll {
    _id: ID
    title: String
    description: String
    creator: [User]
    createdAt: String
    endTime: String
  }

  type Vote {
    _id: ID
    polls: [Poll]
    user: [User]
    option: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    polls(pollId: String): [Poll]
    poll: [Poll]
    me: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createPoll(pollId: String!): Poll
    removePoll(pollId: ID!): Poll
    
  }
`;

module.exports = typeDefs;