"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, User, Loader2 } from "lucide-react";
import { signupSchema } from "@/lib/validations";
import { motion, AnimatePresence } from "framer-motion";
import FormInput from "../common/FormInput";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type SignupFormData = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const router = useRouter();
  const { signup, isSigningUp, signupError, signupData, isAuthenticated } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signup(data);
      router.push("/");
    } catch (error: unknown) {
      const err = error as Error;
      const errorMessage = err?.message || "Failed to create account. Please try again.";
      setError("root", {
        type: "manual",
        message: errorMessage,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-background text-foreground rounded-2xl p-8 flex gap-6 flex-col w-full mx-auto shadow-lg border border-foreground/10"
      noValidate
    >
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl text-[#FF7E00] font-bold">Sign Up</h1>
        <p className="text-foreground/70">
          Already have an account?{" "}
          <Link
            href="/login"
            className="hover:underline text-cyan-700 underline-offset-2 px-1 transition-colors"
          >
            Sign in here
          </Link>
        </p>
      </div>

      {/* Success message */}
      <AnimatePresence mode="wait">
        {signupData && (
          <motion.div
            key="successMessage"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm"
          >
            {signupData.signup.message}
          </motion.div>
        )}
      </AnimatePresence>

      <section className="flex flex-col gap-4">
        <FormInput
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          icon={<User className="size-5" />}
          error={errors.name}
          register={register("name")}
        />

        <FormInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          icon={<Mail className="size-5" />}
          error={errors.email}
          register={register("email")}
        />

        <FormInput
          label="Password"
          type="password"
          placeholder="Create a password"
          icon={<Lock className="size-5" />}
          error={errors.password}
          register={register("password")}
          togglePassword
        />

        <div className="text-sm text-foreground/60">
          By creating an account, you agree to our{" "}
          <Link
            href="/terms"
            className="text-cyan-700 hover:underline underline-offset-2"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-cyan-700 hover:underline underline-offset-2"
          >
            Privacy Policy
          </Link>
          .
        </div>

        <AnimatePresence mode="wait">
          {(errors.root || signupError) && (
            <motion.div
              key="rootError"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
            >
              {errors.root?.message || signupError?.message || "An error occurred"}
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          type="submit"
          variant="secondary"
          disabled={isSigningUp}
          className="w-full h-12 text-base font-medium text-white bg-[#FF7E00] hover:bg-[#FF7E00]/80 disabled:opacity-50"
        >
          {isSigningUp ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </section>
    </form>
  );
};

export default SignupForm;
