import { gql } from '@apollo/client';

export const QUERY_POLLS = gql`
query polls {
    polls {
      _id
      title
      description
      value
      option1
      option2
    }
  }
`;
export const QUERY_USER = gql`
query Query($username: String!) {
  user(username: $username) {
    eggplants
  }
}
`;


export const QUERY_ME = gql`
query Query {
  me {
    eggplants
    polls {
      title
      description
    }
  }
}
`;

// export const QUERY_MATCHUPS = gql`
//   query matchups($_id: String) {
//     matchups(_id: $_id) {
//       _id
//       tech1
//       tech2
//       true_votes
//       false_votes
//     }
//   }
// `;
