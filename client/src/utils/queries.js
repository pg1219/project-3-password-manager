import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      _id
      email
      username
      savedPasswords {
        _id
        loginTo
        savedUsername
        savedPassword
      }
    }
  }
`;
