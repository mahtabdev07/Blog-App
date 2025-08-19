"use client";

import { useMyBlogs, useBlogOperations } from "@/hooks/useBlogs";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import MyBlogCard from "@/components/blog/MyBlogCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { BlogWithAuthor, BlogStatus } from "@/types";
import { Plus, Search, RefreshCw, Filter } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";

export default function MyBlogs() {
  const { data, isLoading, isError, error, refetch } = useMyBlogs();
  const { deleteBlog, isDeleting } = useBlogOperations();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<BlogStatus | "ALL">("ALL");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<BlogWithAuthor | null>(null);

  // Filter and search blogs
  const filteredBlogs = useMemo(() => {
    if (!data?.myBlogs) return [];

    let filtered = data.myBlogs;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(query) ||
          blog.excerpt?.toLowerCase().includes(query) ||
          blog.content.toLowerCase().includes(query)
      );
    }

    // Filter by status
    if (statusFilter !== "ALL") {
      filtered = filtered.filter((blog) => blog.status === statusFilter);
    }

    return filtered;
  }, [data?.myBlogs, searchQuery, statusFilter]);

  const handleDeleteClick = (blog: BlogWithAuthor) => {
    setBlogToDelete(blog);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!blogToDelete) return;

    try {
      await deleteBlog(blogToDelete.id);
      setDeleteDialogOpen(false);
      setBlogToDelete(null);
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

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
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col items-center justify-center py-20">
            <h2 className="font-semibold text-lg text-foreground mb-2">
              Sorry, we couldn&apos;t load your blogs.
            </h2>
            <p className="text-muted-foreground mb-5 text-center">
              {error?.message || "Something went wrong. Please try again."}
            </p>
            <Button onClick={() => refetch()} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const blogs = data?.myBlogs || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[92rem] mx-auto px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
              My Blogs
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage and organize your blog posts
            </p>
          </div>
          <Link href="/blog/create">
            <Button className="bg-[#FF7E00] hover:bg-[#FF7E00]/80">
              <Plus className="h-4 w-4 mr-2" />
              Create New Blog
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search your blogs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="sm:w-auto">
                    <Filter className="h-4 w-4 mr-2" />
                    {statusFilter === "ALL" ? "All Status" : statusFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setStatusFilter("ALL")}>
                    All Status
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setStatusFilter("PUBLISHED")}>
                    Published
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("DRAFT")}>
                    Draft
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("ARCHIVED")}>
                    Archived
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        {/* Blog Grid */}
        {filteredBlogs.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-20">
              <div className="text-5xl mb-4">📝</div>
              <h2 className="font-bold text-xl text-foreground mb-2">
                {blogs.length === 0 ? "No blogs yet" : "No blogs found"}
              </h2>
              <p className="text-muted-foreground text-center max-w-sm mb-6">
                {blogs.length === 0
                  ? "Start your blogging journey by creating your first post!"
                  : "Try adjusting your search or filter criteria."}
              </p>
              {blogs.length === 0 && (
                <Link href="/blog/create">
                  <Button className="bg-[#FF7E00] hover:bg-[#FF7E00]/80">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Blog
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-y-4 lg:gap-y-8 gap-x-3 lg:gap-x-6 mx-auto">
            {filteredBlogs.map((blog) => (
              <MyBlogCard
                key={blog.id}
                blog={blog}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}

        {/* Stats */}
        {blogs.length > 0 && (
          <Card className="mt-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">
                    {blogs.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Blogs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {blogs.filter((b) => b.status === "PUBLISHED").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Published</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {blogs.filter((b) => b.status === "DRAFT").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Drafts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">
                    {blogs.filter((b) => b.status === "ARCHIVED").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Archived</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{blogToDelete?.title}&quot;?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
