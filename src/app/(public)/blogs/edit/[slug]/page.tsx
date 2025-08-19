"use client";

import { useBlog } from "@/hooks/useBlogs";
import { useAuth } from "@/hooks/useAuth";
import EditBlogForm from "@/components/blog/EditBlogForm";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface EditBlogPageProps {
  params: Promise<{ slug: string }>;
}

export default function EditBlogPage({ params }: EditBlogPageProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  // Unwrap params
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    params.then((resolvedParams) => {
      setSlug(resolvedParams.slug);
    });
  }, [params]);

  const { data, isLoading, isError, error, refetch } = useBlog(slug || "");

  useEffect(() => {
    if (!isLoading && data?.blog && isAuthenticated && user) {
      if (data.blog.author.id !== user.id) {
        router.push("/blogs");
      }
    }
  }, [data, isAuthenticated, user, router, isLoading]);

  if (!slug) {
    return <LoadingSpinner />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-4xl mx-auto p-6">
          <Link href="/blogs">
            <Button variant="outline" className="mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blogs
            </Button>
          </Link>

          <div className="flex flex-col items-center justify-center py-20 px-4">
            <h2 className="font-semibold text-lg text-foreground mb-2">
              Sorry, we couldn&apos;t load this blog for editing.
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
      </div>
    );
  }

  const blog = data?.blog;

  if (!blog) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-4xl mx-auto p-6">
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
              The blog you&apos;re looking for doesn&apos;t exist or has been
              removed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isAuthenticated && user && blog.author.id !== user.id) {
    router.push("/blogs");
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <EditBlogForm blog={blog} />
    </div>
  );
}
