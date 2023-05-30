const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    polls: [Poll]!
    eggplants: Number
  }

  type Poll {
    _id: ID
    title: String
    description: String
    creator: [User]
    createdAt: Date
    endTime: Date
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
    polls(pollId: ID!): Polls
    me: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createPoll(pollId: String!): Thought
    removePoll(pollId: ID!): Thought
    
  }
`;

module.exports = typeDefs;