import gql from "graphql-tag";

export const typeDefs = gql`
  enum BlogStatus {
    DRAFT
    PUBLISHED
    ARCHIVED
  }
  
  type User {
    id: ID!
    name: String!
    email: String!
    profilePic: String
    bio: String
    createdAt: String!
    updatedAt: String!
  }
  
  type Blog {
    id: ID!
    title: String!
    slug: String!
    excerpt: String
    content: String!
    coverImageUrl: String
    status: BlogStatus!
    author: User!
    createdAt: String!
    updatedAt: String!
  }
  
   type SearchResult {
    blogs: [Blog!]!
    totalCount: Int!
  }

  type Query {
    blogs: [Blog!]!
    blog(slug: String!): Blog
    searchBlogs(query: String!): SearchResult!
  }
`;
