import { Blog, User, BlogStatus } from "@prisma/client";

export type { User, Blog, BlogStatus }

export interface BlogWithAuthor extends Blog {
  author: Pick<User, 'id' | 'name' | 'profilePic' | "bio">
}

export interface BlogsResponse {
  blogs: BlogWithAuthor[];  
}

export interface BlogResponse {
  blog: BlogWithAuthor | null
}

export interface SearchResult {
  blogs: BlogWithAuthor[];
  totalCount: number;
}

export interface SearchResponse {
  searchBlogs: SearchResult;
}
