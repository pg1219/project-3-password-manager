import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }`;

  export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }`;

  export const ADD_PASSWORD = gql`
  mutation AddPassword($loginTo: String!, $savedUsername: String!, $savedPassword: String!) {
    addPassword(loginTo: $loginTo, savedUsername: $savedUsername, savedPassword: $savedPassword) {
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
  }`;

  export const REMOVE_PASSWORD = gql`
  mutation RemovePassword($passwordId: String!) {
    removePassword(passwordId: $passwordId) {
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
  }`;
