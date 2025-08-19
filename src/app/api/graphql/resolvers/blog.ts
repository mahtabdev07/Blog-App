import { prisma } from "@/lib/prisma";

export const getBlogs = async () => {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        status: "PUBLISHED",
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
      orderBy: {
        createdAt: "desc",
      },
    });

    return blogs;
  } catch (error) {
    console.log("Error Fetching Blogs: ", error);
    throw new Error("Failed to fetch blogs");
  }
};

export const getBlog = async (_: unknown, args: { slug: string }) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        slug: args.slug,
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

    if (!blog) {
      throw new Error("Blog not found");
    }

    return blog;
  } catch (error) {
    console.log("Error Fetching Blog: ", error);

    if (error instanceof Error) throw error;
    throw new Error("Failed to fetch blog");
  }
};

export const searchBlogs = async (_: unknown, args: { query: string }) => {
  const { query } = args;

  if (!query) {
    return { blogs: [], totalCount: 0 };
  }

  const searchQuery = query.trim();

  try {
    const where = {
      status: "PUBLISHED" as const,
      OR: [
        {
          title: {
            contains: searchQuery,
            mode: "insensitive" as const,
          },
        },
        {
          excerpt: {
            contains: searchQuery,
            mode: "insensitive" as const,
          },
        },
        {
          content: {
            contains: searchQuery,
            mode: "insensitive" as const,
          },
        },
        {
          author: {
            name: {
              contains: searchQuery,
              mode: "insensitive" as const,
            },
          },
        },
      ],
    };
    const [blogs, totalCount] = await Promise.all([
      prisma.blog.findMany({
        where,
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
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.blog.count({
        where,
      }),
    ]);

    return {
      blogs,
      totalCount,
    };
  } catch (error) {
    console.log("Error Searching Blogs: ", error);
    throw new Error("Failed to search blogs");
  }
};
