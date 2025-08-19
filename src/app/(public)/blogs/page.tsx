import BlogGrid from "@/components/blog/BlogGrid";

export default function BlogsPage() {
  return (
    <section className="my-3 lg:my-10 flex flex-col gap-3 lg:gap-6">
      <h1 className="font-extrabold text-3xl lg:text-5xl text-foreground">
        Blogs
      </h1>
      <BlogGrid />
    </section>
  );
}
