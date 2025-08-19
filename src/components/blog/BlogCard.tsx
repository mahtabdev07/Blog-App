import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { BlogWithAuthor } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  blog: BlogWithAuthor;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link href={`/blogs/${blog.slug}`}>
      <Card className="group rounded-2xl overflow-hidden border-foreground/10 p-0 shadow-none gap-0 h-[290px] lg:h-auto">
        <div className="relative h-36 lg:h-52 w-full rounded-2xl overflow-hidden cursor-pointer">
          <Image
            src={blog.coverImageUrl || "/placeholder.jpg"}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <CardContent className="flex flex-col gap-3 px-4 lg:px-7 py-3 lg:py-8">
          <h1 className="font-semibold text-md lg:text-2xl text-card-foreground line-clamp-2 cursor-pointer">
            {blog.title}
          </h1>
          <p className="text-foreground/60 text-xs lg:text-lg line-clamp-2">
            {blog.excerpt}
          </p>
          <span className="text-foreground/40 text-xs lg:text-lg mt-1">
            {formatDate(blog.createdAt)}
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
