import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { getBlog, getBlogs, searchBlogs } from "./resolvers/blog";
import { typeDefs } from "./TypeDefs";
import { login, logout, me, signup } from "./resolvers/User";
import { createBlog, deleteBlog, getMyBlogs, updateBlog } from "./resolvers/blogMutations";

export interface Context {
  req: NextRequest;
}

const resolvers = {
  Query: {
    blogs: getBlogs,
    blog: getBlog,
    searchBlogs: searchBlogs,
    myBlogs: getMyBlogs,
    me,
  },
  Mutation: {
    login,
    signup,
    logout,
    
    createBlog,
    updateBlog,
    deleteBlog,
  }
};

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest, Context>(server, {
  context: async (req) => ({ req }),
});

export async function GET(req: NextRequest) {
  return handler(req);
}

export async function POST(req: NextRequest) {
  return handler(req);
}
