import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

export const ADD_USER = gql`
mutation CreateUser($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
    }
  }
}
`;


export const ADD_POLL = gql`
mutation Mutation($title: String!, $description: String!, $value: Int!, $option1: String!, $option2: String!) {
  createPoll(title: $title, description: $description, value: $value, option1: $option1, option2: $option2) {
    title
    description
    value
    creator {
      _id
      username
    }
    
  }
}
`;

export const UPDATE_USER = gql`
mutation Mutation($userId: ID!, $eggplants: Int!) {
  updateUser(userId: $userId, eggplants: $eggplants) {
    eggplants
    _id
  }
}
`;
