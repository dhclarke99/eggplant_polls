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

  type Option {
    optionText: String
  }

  type Poll {
    _id: ID
    title: String
    description: String
    creator: User
    value: Int
    createdAt: String
    endTime: String
    option1: String
    option2: String
    users: [User]
    votes: [Vote]
  }

  type Vote {
    _id: ID
    polls: Poll
    user: User
    option1: String
    option2: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    polls: [Poll]
    poll(pollId: ID!): Poll
    me: User
    votes: [Vote]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createPoll(pollId: String!): Poll
    removePoll(pollId: ID!): Poll
    createVote(pollId: ID!, option1: String, option2: String): Vote 
    updateUser(userID: ID!): User
  }
`;

module.exports = typeDefs;

// createPoll(pollId: String!, value: Int!, optionId: String!): Poll