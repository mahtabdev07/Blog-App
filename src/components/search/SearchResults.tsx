"use client";

import { useSearchBlogs } from "@/hooks/useBlogs";
import { RefreshCw } from "lucide-react";
import BlogCard from "../blog/BlogCard";
import LoadingSpinner from "../common/LoadingSpinner";
import { Button } from "../ui/button";

interface SearchResultsProps {
  searchQuery?: string;
}

const SearchResults = ({ searchQuery }: SearchResultsProps) => {
  const query = searchQuery?.trim() || "";

  const { data, isLoading, isError, error, refetch } = useSearchBlogs(query);

  if (!query) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="text-5xl mb-4">🔍</div>
        <h2 className="font-bold text-xl text-foreground mb-2">
          Start Your Search
        </h2>
        <p className="text-foreground text-base text-center max-w-sm">
          Enter at least 1 character to search through our blog posts.
        </p>
      </div>
    );
  }

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-14 px-4">
        <div className="max-w-md text-center">
          <h2 className="font-semibold text-xl text-foreground mb-2">
            Search Error
          </h2>
          <p className="text-foreground mb-5">
            {error?.message ||
              "Something went wrong while searching. Please try again."}
          </p>
          <Button onClick={() => refetch()} variant="outline" className="mx-auto">
            <RefreshCw className="h-5 w-5 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const searchResult = data?.searchBlogs;
  const blogs = searchResult?.blogs || [];
  const totalCount = searchResult?.totalCount || 0;

  if (blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="text-5xl mb-4">🔍</div>
        <h2 className="font-bold text-xl text-foreground mb-2">
          No Results Found
        </h2>
        <p className="text-foreground text-base text-center max-w-sm">
          We couldn&apos;t find any blogs matching &quot;{query}&quot;.
          <br />
          Try different keywords or check your spelling.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-foreground/70">
          Found <span className="font-semibold">{totalCount}</span> result
          {totalCount !== 1 ? "s" : ""} for &quot;{query}&quot;
        </div>
      </div>

      <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-4 lg:gap-y-8 gap-x-3 lg:gap-x-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
