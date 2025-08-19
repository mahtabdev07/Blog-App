"use client";
import { useBlogs } from "@/hooks/useBlogs";
import BlogCard from "../blog/BlogCard";
import LoadingSpinner from "../common/LoadingSpinner";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";

const PopularBlogs = () => {
  const { data, isLoading, isError } = useBlogs();

  const popularBlogs = data?.blogs?.slice(0, 6) || [];

  if (isLoading) {
    return (
      <section className="py-12">
        <div className="flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (isError || popularBlogs.length === 0) {
    return (
      <section className="py-12">
        <div className="text-center">
          <h2 className="font-extrabold text-3xl lg:text-4xl text-foreground mb-4">
            Popular Blogs
          </h2>
          <p className="text-foreground/60">
            No blogs available at the moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <TrendingUp className="h-8 w-8 text-primary" />
          <h2 className="font-extrabold text-3xl lg:text-4xl text-foreground">
            Popular Blogs
          </h2>
        </div>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {popularBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      <div className="flex justify-center">
        <Link href="/blogs">
          <Button size="lg" className="group cursor-pointer">
            View All Blogs
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 " />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default PopularBlogs;
