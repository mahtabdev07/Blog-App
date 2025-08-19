import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import {
  createToken,
  setCookie,
  clearCookie,
  getUserFromToken
} from "@/lib/auth";

interface SignupInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export const signup = async (_: unknown, { input }: { input: SignupInput }) => {
  try {
    const { name, email, password } = input;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        profilePic: true,
        bio: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const token = createToken(user.id);
    await setCookie(token);

    return {
      user,
      message: "Account created successfully! Welcome to our blog community.",
    };
  } catch (error) {
    console.error("Signup error:", error);
    if (error instanceof Error) throw error;
    throw new Error("Failed to create account. Please try again.");
  }
};

export const login = async (_: unknown, { input }: { input: LoginInput }) => {
  try {
    const { email, password } = input;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error("Invalid email or password");
    }

    const token = createToken(user.id);
    await setCookie(token);

    // Destructure to remove password from user object
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      message: "Welcome back! You've been successfully logged in.",
    };
  } catch (error) {
    console.error("Login error:", error);
    if (error instanceof Error) throw error;
    throw new Error("Failed to log in. Please try again.");
  }
};

export const logout = async () => {
  try {
    await clearCookie();

    return {
      message: "You've been successfully logged out. See you next time!",
    };
  } catch (error) {
    console.error("Logout error:", error);
    throw new Error("Failed to log out. Please try again.");
  }
};

export const me = async () => {
  try {
    const user = await getUserFromToken();

    if (!user) {
      throw new Error("Not authenticated");
    }

    return user;
  } catch (error) {
    console.error("Me query error:", error);
    if (error instanceof Error) throw error;
    throw new Error("Failed to get user information");
  }
};
