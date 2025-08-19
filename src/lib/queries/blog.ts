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

export const GET_MY_BLOGS = gql`
  query MyBlogs {
    myBlogs {
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

export const CREATE_BLOG = gql`
  mutation CreateBlog($input: CreateBlogInput!) {
    createBlog(input: $input) {
      blog {
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
      message
    }
  }
`;

export const UPDATE_BLOG = gql`
  mutation UpdateBlog($id: ID!, $input: UpdateBlogInput!) {
    updateBlog(id: $id, input: $input) {
      blog {
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
      message
    }
  }
`;

export const DELETE_BLOG = gql`
  mutation DeleteBlog($id: ID!) {
    deleteBlog(id: $id) {
      message
    }
  }
`;
