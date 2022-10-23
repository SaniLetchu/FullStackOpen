import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query ($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String!) {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword) {
      edges {
        node {
          id
          ownerName
          name
          createdAt
          fullName
          ratingAverage
          reviewCount
          watchersCount
          stargazersCount
          url
          openIssuesCount
          forksCount
          ownerAvatarUrl
          description
          language
          userHasReviewed
        }
      }
    }
  }
`;
export const IS_LOGGED_IN = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const GET_REPOSITORY_BY_ID = gql`
  query ($id: ID!) {
    repository(id: $id) {
      id
      ownerName
      name
      createdAt
      fullName
      ratingAverage
      reviewCount
      watchersCount
      stargazersCount
      url
      openIssuesCount
      forksCount
      ownerAvatarUrl
      description
      language
      userHasReviewed
      reviews {
        edges {
          node {
            id
            user {
              id
              username
            }
            rating
            createdAt
            text
          }
        }
      }
    }
  }
`;