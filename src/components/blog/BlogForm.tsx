"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, PlusCircle } from "lucide-react";
import { useBlogOperations, CreateBlogInput } from "@/hooks/useBlogs";
import { motion, AnimatePresence } from "framer-motion";
import { blogSchema } from "@/lib/validations";

type BlogFormData = z.infer<typeof blogSchema>;

export default function BlogForm() {
  const { createBlog, isCreating, createError } = useBlogOperations();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      coverImageUrl: "",
      status: "PUBLISHED",
    },
  });

  const onSubmit = async (data: BlogFormData) => {
    try {
      const blogData = {
        ...data,
        coverImageUrl: data.coverImageUrl || undefined,
        excerpt: data.excerpt || undefined,
      };

      await createBlog(blogData as CreateBlogInput);
    } catch (error: unknown) {
      const err = error as Error;
      const errorMessage = err?.message || "An error occurred. Please try again.";
      setError("root", {
        type: "manual",
        message: errorMessage,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground">
            Create New Blog Post
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Title *
              </Label>
              <Input
                id="title"
                placeholder="Enter your blog title..."
                {...register("title")}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <Label htmlFor="excerpt" className="text-sm font-medium">
                Excerpt (Optional)
              </Label>
              <Textarea
                id="excerpt"
                placeholder="Brief description of your blog post..."
                rows={3}
                {...register("excerpt")}
                className={errors.excerpt ? "border-red-500" : ""}
              />
              {errors.excerpt && (
                <p className="text-red-500 text-sm">{errors.excerpt.message}</p>
              )}
            </div>

            {/* Cover Image URL */}
            <div className="space-y-2">
              <Label htmlFor="coverImageUrl" className="text-sm font-medium">
                Cover Image URL (Optional)
              </Label>
              <Input
                id="coverImageUrl"
                placeholder="https://example.com/image.jpg"
                {...register("coverImageUrl")}
                className={errors.coverImageUrl ? "border-red-500" : ""}
              />
              {errors.coverImageUrl && (
                <p className="text-red-500 text-sm">{errors.coverImageUrl.message}</p>
              )}
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content" className="text-sm font-medium">
                Content *
              </Label>
              <Textarea
                id="content"
                placeholder="Write your blog content here..."
                rows={15}
                {...register("content")}
                className={errors.content ? "border-red-500" : ""}
              />
              {errors.content && (
                <p className="text-red-500 text-sm">{errors.content.message}</p>
              )}
            </div>

            {/* Status */}
            <div className="space-y-2 w-full">
              <Label className="text-sm font-medium">Status</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                      <SelectItem value="PUBLISHED">Published</SelectItem>
                      <SelectItem value="ARCHIVED">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <AnimatePresence mode="wait">
              {(errors.root || createError) && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
                >
                  {errors.root?.message || createError?.message || "An error occurred"}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Create Button */}
            <div className="pt-6">
              <Button
                type="submit"
                disabled={isCreating}
                className="w-full bg-[#FF7E00] hover:bg-[#FF7E00]/80"
                size="lg"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating Blog...
                  </>
                ) : (
                  <>
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Create Blog
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
