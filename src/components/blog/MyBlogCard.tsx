import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { BlogWithAuthor, BlogStatus } from "@/types";
import { Edit, Trash2, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface MyBlogCardProps {
  blog: BlogWithAuthor;
  onDelete: (blog: BlogWithAuthor) => void;
}

export default function MyBlogCard({ blog, onDelete }: MyBlogCardProps) {
  const getStatusColor = (status: BlogStatus) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "DRAFT":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "ARCHIVED":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <Card className="group rounded-2xl overflow-hidden border-foreground/10 p-0 shadow-none gap-0 hover:shadow-lg transition-shadow">
      <div className="relative h-36 lg:h-52 w-full rounded-2xl overflow-hidden">
        <Image
          src={blog.coverImageUrl || "/placeholder.jpg"}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <CardContent className="flex flex-col gap-3 px-4 lg:px-7 py-3 lg:py-8">
        {/* Status Badge */}
        <div className="flex items-start justify-between">
          <Badge className={getStatusColor(blog.status)}>
            {blog.status}
          </Badge>
        </div>

        {/* Blog Title */}
        <Link href={`/blogs/${blog.slug}`}>
          <h1 className="font-semibold text-md lg:text-2xl text-card-foreground line-clamp-2 cursor-pointer">
            {blog.title}
          </h1>
        </Link>

        {/* Blog Excerpt */}
        <p className="text-foreground/60 text-xs lg:text-lg line-clamp-2">
          {blog.excerpt}
        </p>

        {/* Date Info */}
        <div className="flex flex-col gap-1 text-xs lg:text-base text-foreground/40">
          <span>Created {formatDate(blog.createdAt)}</span>
          {blog.updatedAt !== blog.createdAt && (
            <span>Updated {formatDate(blog.updatedAt)}</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-foreground/10  ">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-8 text-xs"
            asChild
          >
            <Link href={`/blogs/${blog.slug}`}>
              <Eye className="h-3 w-3 mr-1" />
              View
            </Link>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-8 text-xs hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
            asChild
          >
            <Link href={`/blogs/edit/${blog.slug}`}>
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </Link>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-8 text-xs hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            onClick={() => onDelete(blog)}
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
