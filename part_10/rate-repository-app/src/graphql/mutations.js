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

export const CREATE_REVIEW = gql`
  mutation ($repositoryName: String!, $ownerName: String!, $rating: Int!, $text: String) {
    createReview(review: { repositoryName: $repositoryName, ownerName: $ownerName, rating: $rating, text: $text }) {
      id
      repositoryId
    }
  }
`;

