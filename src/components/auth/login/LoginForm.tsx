"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, Loader2 } from "lucide-react";
import { loginSchema } from "@/lib/validations";
import { motion, AnimatePresence } from "framer-motion";
import FormInput from "../common/FormInput";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const router = useRouter();
  const { login, isLoggingIn, loginError, loginData, isAuthenticated } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      router.push("/");
    } catch (error: unknown) {
      const err = error as Error;
      const errorMessage = err?.message || "Failed to log in. Please try again.";
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
        <h1 className="text-4xl text-[#FF7E00] font-bold">Login</h1>
        <p className="text-foreground/70">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="hover:underline text-cyan-700 underline-offset-2 px-1 transition-colors"
          >
            Create an account
          </Link>
        </p>
      </div>

      {/* Success message */}
      <AnimatePresence mode="wait">
        {loginData && (
          <motion.div
            key="successMessage"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm"
          >
            {loginData.login.message}
          </motion.div>
        )}
      </AnimatePresence>

      <section className="flex flex-col gap-4">
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
          placeholder="Enter your password"
          icon={<Lock className="size-5" />}
          error={errors.password}
          register={register("password")}
          togglePassword
        />

        <Link
          href="/forgot-password"
          className="hover:underline text-cyan-700 underline-offset-2 px-1 transition-colors"
        >
          Forgot your password?
        </Link>

        <AnimatePresence mode="wait">
          {(errors.root || loginError) && (
            <motion.div
              key="rootError"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
            >
              {errors.root?.message || loginError?.message || "An error occurred"}
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          type="submit"
          variant="secondary"
          disabled={isLoggingIn}
          className="w-full h-12 text-base font-medium text-white bg-[#FF7E00] hover:bg-[#FF7E00]/80 disabled:opacity-50"
        >
          {isLoggingIn ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Signing in...
            </>
          ) : (
            "Login"
          )}
        </Button>
      </section>
    </form>
  );
};

export default LoginForm;
