import { gqlRequest } from "@/lib/gqlClient";
import { 
  GET_BLOG, 
  GET_BLOGS, 
  SEARCH_BLOGS,
  GET_MY_BLOGS,
  CREATE_BLOG,
  UPDATE_BLOG,
  DELETE_BLOG
} from "@/lib/queries/blog";
import { BlogResponse, BlogsResponse, SearchResponse, BlogWithAuthor } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export interface CreateBlogInput {
  title: string;
  excerpt?: string;
  content: string;
  coverImageUrl?: string;
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
}

export interface UpdateBlogInput {
  title?: string;
  excerpt?: string;
  content?: string;
  coverImageUrl?: string;
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
}

interface BlogMutationResponse {
  blog: BlogWithAuthor;
  message: string;
}

interface CreateBlogResponse {
  createBlog: BlogMutationResponse;
}

interface UpdateBlogResponse {
  updateBlog: BlogMutationResponse;
}

interface DeleteBlogResponse {
  deleteBlog: {
    message: string;
  };
}

interface MyBlogsResponse {
  myBlogs: BlogWithAuthor[];
}

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
    enabled: !!query.trim(),
  });
};

export const useMyBlogs = () => {
  return useQuery({
    queryKey: ["myBlogs"],
    queryFn: () => gqlRequest<MyBlogsResponse>(GET_MY_BLOGS),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useBlogOperations = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createBlogMutation = useMutation({
    mutationFn: (input: CreateBlogInput) =>
      gqlRequest<CreateBlogResponse>(CREATE_BLOG, { input }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["myBlogs"] });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      
      const slug = data.createBlog.blog.slug;
      router.push(`/blogs/${slug}`);
    },
    onError: (error) => {
      console.error("Create blog error:", error);
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateBlogInput }) =>
      gqlRequest<UpdateBlogResponse>(UPDATE_BLOG, { id, input }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["myBlogs"] });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blog", data.updateBlog.blog.slug] });
      
      const slug = data.updateBlog.blog.slug;
      router.push(`/blogs/${slug}`);
    },
    onError: (error) => {
      console.error("Update blog error:", error);
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: (id: string) =>
      gqlRequest<DeleteBlogResponse>(DELETE_BLOG, { id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBlogs"] });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      
      router.push("/blogs");
    },
    onError: (error) => {
      console.error("Delete blog error:", error);
    },
  });

  const createBlog = async (input: CreateBlogInput) => {
    return createBlogMutation.mutateAsync(input);
  };

  const updateBlog = async (id: string, input: UpdateBlogInput) => {
    return updateBlogMutation.mutateAsync({ id, input });
  };

  const deleteBlog = async (id: string) => {
    return deleteBlogMutation.mutateAsync(id);
  };

  return {
    createBlog,
    updateBlog,
    deleteBlog,

    isCreating: createBlogMutation.isPending,
    isUpdating: updateBlogMutation.isPending,
    isDeleting: deleteBlogMutation.isPending,

    createError: createBlogMutation.error,
    updateError: updateBlogMutation.error,
    deleteError: deleteBlogMutation.error,

    createData: createBlogMutation.data,
    updateData: updateBlogMutation.data,
    deleteData: deleteBlogMutation.data,
  };
};
