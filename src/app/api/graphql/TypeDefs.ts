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

  type AuthPayload {
    user: User!
    message: String!
  }

  type LogoutResponse {
    message: String!
  }

  input CreateBlogInput {
    title: String!
    excerpt: String
    content: String!
    coverImageUrl: String
    status: BlogStatus = PUBLISHED
  }

  input UpdateBlogInput {
    title: String
    excerpt: String
    content: String
    coverImageUrl: String
    status: BlogStatus
  }

  type BlogPayload {
    blog: Blog!
    message: String!
  }

  type DeleteBlogResponse {
    message: String!
  }

  input SignupInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    blogs: [Blog!]!
    blog(slug: String!): Blog
    searchBlogs(query: String!): SearchResult!
    me: User
    myBlogs: [Blog!]!
  }

  type Mutation {
    signup(input: SignupInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    logout: LogoutResponse!
    
    createBlog(input: CreateBlogInput!): BlogPayload!
    updateBlog(id: ID!, input: UpdateBlogInput!): BlogPayload!
    deleteBlog(id: ID!): DeleteBlogResponse!
  }
`;
