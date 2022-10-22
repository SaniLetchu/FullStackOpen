import { gql } from '@apollo/client';

export const GET_ACCESSTOKEN = gql`
  mutation ($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password}) {
      accessToken
    }
  }
`;

export const CREATE_USER = gql`
  mutation ($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password}) {
      id
      username
      reviewCount
    }
  }
`;