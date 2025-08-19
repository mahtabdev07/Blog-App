import BlogDetailCard from "@/components/blog/BlogDetailView";

export default async function BlogDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  return <BlogDetailCard slug={slug} />;
}
