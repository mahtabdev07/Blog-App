import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { BlogWithAuthor } from "@/types";

interface FeaturedBlogProps {
  blog: BlogWithAuthor; 
}

const FeaturedBlog = ({ blog }: FeaturedBlogProps) => {
  return (
    <Link href={`/blogs/${blog.slug}`} className="w-full">
      <Card className="group rounded-xl lg:rounded-4xl overflow-hidden border-foreground/10 p-0 flex flex-col md:flex-row shadow-none gap-0">
        <div className="relative w-full md:w-[40%] h-36 lg:h-auto rounded-xl lg:rounded-4xl overflow-hidden cursor-pointer">
          <Image
            src={blog.coverImageUrl || "/placeholder.jpg"}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <CardContent className="flex flex-col justify-center gap-2 lg:gap-4 px-4 lg:px-7 py-3 lg:py-8 flex-1">
          <h1 className="font-semibold text-md lg:text-2xl text-card-foreground line-clamp-2 cursor-pointer">
            {blog.title}
          </h1>
          <p className="text-foreground/60 text-xs lg:text-lg line-clamp-2">
            {blog.excerpt}
          </p>
          <span className="text-foreground/40 mt-1 lg:mt-6 text-xs lg:text-lg">
            {formatDate(blog.createdAt)}
          </span>
        </CardContent>
      </Card>
    </Link>
  );
};

export default FeaturedBlog;
