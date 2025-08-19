import { gql } from "graphql-request";

export const SIGNUP_MUTATION = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      user {
        id
        name
        email
        profilePic
        bio
        createdAt
        updatedAt
      }
      message
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        id
        name
        email
        profilePic
        bio
        createdAt
        updatedAt
      }
      message
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      message
    }
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      id
      name
      email
      profilePic
      bio
      createdAt
      updatedAt
    }
  }
`;
