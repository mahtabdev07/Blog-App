"use client";
import { Button } from "@/components/ui/button";
import { useBlogs } from "@/hooks/useBlogs";
import { RefreshCw } from "lucide-react";
import LoadingSpinner from "../common/LoadingSpinner";
import BlogCard from "./BlogCard";
import FeaturedBlog from "./FeaturedBlog";

const BlogGrid = () => {
  const { data, isLoading, isError, error, refetch } = useBlogs();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-14 px-4">
        <div className="max-w-md text-center">
          <h2 className="font-semibold text-xl text-foreground mb-2">
            Sorry, we couldn’t load the blogs.
          </h2>
          <p className="text-foreground mb-5">
            {error?.message ||
              "Something went wrong. Please check your connection and try again."}
          </p>
          <Button
            onClick={() => refetch()}
            variant="outline"
            className="mx-auto"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const blogs = data?.blogs || [];

  const [firstBlog, ...otherBlogs] = blogs;

  if (!firstBlog) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="text-5xl mb-4">📝</div>
        <h2 className="font-bold text-xl text-foreground mb-2">
          No blogs found
        </h2>
        <p className="text-muted-foreground text-base text-center max-w-sm">
          No published blogs available at the moment.
          <br />
          Please check back soon or be the first to share a story!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 lg:gap-8">
      <FeaturedBlog blog={firstBlog} />
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-y-4 lg:gap-y-8 gap-x-3 lg:gap-x-6 mx-auto">
        {otherBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogGrid;
