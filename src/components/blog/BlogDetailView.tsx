"use client";
import { useBlog } from "@/hooks/useBlogs";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Calendar, RefreshCw, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "../common/LoadingSpinner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const BlogDetailView = ({ slug }: { slug: string }) => {
  const { isLoading, data, isError, error, refetch } = useBlog(slug);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div>
        <Link href="/blogs">
          <Button variant="outline" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </Button>
        </Link>

        <div className="flex flex-col items-center justify-center py-20 px-4">
          <h2 className="font-semibold text-lg text-foreground mb-2">
            Sorry, we couldn&apos;t load this blog.
          </h2>
          <p className="text-muted-foreground mb-5 text-center">
            {error?.message ||
              "Something went wrong. Please check your connection and try again."}
          </p>
          <Button
            onClick={() => refetch()}
            variant="outline"
            className="mx-auto"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const blog = data?.blog;

  if (!blog) {
    return (
      <div>
        <Link href="/blogs">
          <Button variant="outline" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </Button>
        </Link>

        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="text-5xl mb-4">📝</div>
          <h2 className="font-bold text-xl text-foreground mb-2">
            Blog not found
          </h2>
          <p className="text-muted-foreground text-base text-center max-w-sm">
            The blog you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <article>
      <Link href="/blogs">
        <Button variant="outline" className="mb-8 hover:bg-gray-100">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blogs
        </Button>
      </Link>

      <header className="mb-8 lg:mb-12">
        {blog.status !== "PUBLISHED" && (
          <Badge variant="secondary" className="mb-4">
            {blog.status}
          </Badge>
        )}

        <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-4 lg:mb-6 leading-tight">
          {blog.title}
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6 border-y border-border">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={blog.author.profilePic || undefined}
                alt={blog.author.name}
              />
              <AvatarFallback>
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">
                {blog.author.name}
              </p>
              {blog.author.bio && (
                <p className="text-sm text-foreground line-clamp-1">
                  {blog.author.bio}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(blog.createdAt)}</span>
          </div>
        </div>
      </header>

      {blog.coverImageUrl && (
        <div className="mb-8 lg:mb-12">
          <div className="relative w-full h-[300px] lg:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src={blog.coverImageUrl}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      <div className="prose prose-lg prose-gray dark:prose-invert max-w-none mb-12">
        <div className="text-foreground leading-relaxed whitespace-pre-wrap text-base lg:text-lg">
          {blog.content}
        </div>
      </div>

      <footer className="border-t border-border pt-8 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-xl text-foreground font-medium">
            Last updated: {formatDate(blog.updatedAt)}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/blogs">View More Blogs</Link>
            </Button>
          </div>
        </div>
      </footer>
    </article>
  );
};

export default BlogDetailView;
