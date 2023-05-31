import { gql } from '@apollo/client';

export const QUERY_POLLS = gql`
query polls {
    polls {
      _id
      title
      description
      value
      options {
        optionText
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
