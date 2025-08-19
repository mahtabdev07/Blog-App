import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { ensureUniqueSlug, generateSlug } from "@/lib/utils";
import { Prisma } from "@prisma/client";

interface CreateBlogInput {
  title: string;
  excerpt?: string;
  content: string;
  coverImageUrl?: string;
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
}

interface UpdateBlogInput {
  title?: string;
  excerpt?: string;
  content?: string;
  coverImageUrl?: string;
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
}

export const createBlog = async (
  _: unknown,
  { input }: { input: CreateBlogInput }
) => {
  try {
    const user = await requireAuth();

    const { title, excerpt, content, coverImageUrl, status = "PUBLISHED" } =
      input;

    if (!title.trim()) throw new Error("Blog title is required");
    if (!content.trim()) throw new Error("Blog content is required");

    const baseSlug = generateSlug(title);
    const uniqueSlug = await ensureUniqueSlug(baseSlug);

    const blog = await prisma.blog.create({
      data: {
        title: title.trim(),
        slug: uniqueSlug,
        excerpt: excerpt?.trim() || null,
        content: content.trim(),
        coverImageUrl: coverImageUrl?.trim() || null,
        status,
        authorId: user.id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            profilePic: true,
            bio: true,
          },
        },
      },
    });

    return {
      blog,
      message: `Blog "${title}" has been ${
        status === "PUBLISHED" ? "published" : "saved as draft"
      } successfully!`,
    };
  } catch (error) {
    console.error("Create blog error:", error);
    if (error instanceof Error) throw error;
    throw new Error("Failed to create blog. Please try again.");
  }
};

export const updateBlog = async (
  _: unknown,
  { id, input }: { id: string; input: UpdateBlogInput }
) => {
  try {
    const user = await requireAuth();

    const existingBlog = await prisma.blog.findUnique({
      where: { id },
      select: { id: true, authorId: true, title: true, slug: true },
    });

    if (!existingBlog) throw new Error("Blog not found");
    if (existingBlog.authorId !== user.id)
      throw new Error("You don't have permission to update this blog");

    const updateData: Prisma.BlogUpdateInput = {};

    if (input.title !== undefined) {
      if (!input.title.trim()) throw new Error("Blog title cannot be empty");
      updateData.title = input.title.trim();

      if (input.title.trim() !== existingBlog.title) {
        const baseSlug = generateSlug(input.title);
        updateData.slug = await ensureUniqueSlug(baseSlug, id);
      }
    }

    if (input.excerpt !== undefined) {
      updateData.excerpt = input.excerpt?.trim() || null;
    }

    if (input.content !== undefined) {
      if (!input.content.trim())
        throw new Error("Blog content cannot be empty");
      updateData.content = input.content.trim();
    }

    if (input.coverImageUrl !== undefined) {
      updateData.coverImageUrl = input.coverImageUrl?.trim() || null;
    }

    if (input.status !== undefined) {
      updateData.status = input.status;
    }

    const blog = await prisma.blog.update({
      where: { id },
      data: updateData,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            profilePic: true,
            bio: true,
          },
        },
      },
    });

    return {
      blog,
      message: `Blog "${blog.title}" has been updated successfully!`,
    };
  } catch (error) {
    console.error("Update blog error:", error);
    if (error instanceof Error) throw error;
    throw new Error("Failed to update blog. Please try again.");
  }
};

export const deleteBlog = async (_: unknown, { id }: { id: string }) => {
  try {
    const user = await requireAuth();

    const existingBlog = await prisma.blog.findUnique({
      where: { id },
      select: { id: true, authorId: true, title: true },
    });

    if (!existingBlog) throw new Error("Blog not found");
    if (existingBlog.authorId !== user.id)
      throw new Error("You don't have permission to delete this blog");

    await prisma.blog.delete({ where: { id } });

    return {
      message: `Blog "${existingBlog.title}" has been deleted successfully!`,
    };
  } catch (error) {
    console.error("Delete blog error:", error);
    if (error instanceof Error) throw error;
    throw new Error("Failed to delete blog. Please try again.");
  }
};

export const getMyBlogs = async () => {
  try {
    const user = await requireAuth();

    const blogs = await prisma.blog.findMany({
      where: { authorId: user.id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            profilePic: true,
            bio: true,
          },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    return blogs;
  } catch (error) {
    console.error("Get my blogs error:", error);
    if (error instanceof Error) throw error;
    throw new Error("Failed to fetch your blogs. Please try again.");
  }
};
