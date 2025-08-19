import { gqlRequest } from "@/lib/gqlClient";
import { GET_BLOG, GET_BLOGS, SEARCH_BLOGS } from "@/lib/queries/blog";
import { BlogResponse, BlogsResponse, SearchResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useBlogs() {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: () => gqlRequest<BlogsResponse>(GET_BLOGS),
  });
}

export function useBlog(slug: string) {
  return useQuery({
    queryKey: ["blog", slug],
    queryFn: () => gqlRequest<BlogResponse>(GET_BLOG, { slug }),
    enabled: !!slug,
  });
}

export const useSearchBlogs = (query: string) => {
  return useQuery({
    queryKey: ["searchBlogs", query],
    queryFn: () => gqlRequest<SearchResponse>(SEARCH_BLOGS, { query }),
    staleTime: 1000 * 60 * 5,
  });
}
