import { gql } from "graphql-request";

export const GET_BLOGS = gql`
  query Blogs {
    blogs {
      id
      title
      slug
      excerpt
      content
      coverImageUrl
      status
      author {
        id
        name
        profilePic
        bio
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_BLOG = gql`
  query Blog($slug: String!) {
    blog(slug: $slug) {
      id
      title
      slug
      excerpt
      content
      coverImageUrl
      status
      author {
        id
        name
        profilePic
        bio
      }
      createdAt
      updatedAt
    }
  }
`;

export const SEARCH_BLOGS = gql`
  query SearchBlogs($query: String!) {
    searchBlogs(query: $query) {
      blogs {
        id
        title
        slug
        excerpt
        content
        coverImageUrl
        status
        author {
          id
          name
          profilePic
          bio
        }
        createdAt
        updatedAt
      }
      totalCount
    }
  }
`;
