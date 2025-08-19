"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: FieldError;
  togglePassword?: boolean;
  register: UseFormRegisterReturn;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  icon,
  error,
  togglePassword,
  type,
  register,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    togglePassword && type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40">
            {icon}
          </span>
        )}

        <Input
          type={inputType}
          {...register}
          {...props}
          className={`pl-11 pr-11 text-foreground placeholder:text-foreground/40 
            bg-foreground/5 hover:bg-foreground/8 transition-colors duration-150 
            focus:bg-foreground/8 shadow-inner border-foreground/10 ${
              error ? "border-red-500 focus:border-red-500" : ""
            }`}
        />

        {togglePassword && type === "password" && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword((p) => !p)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="size-5 text-foreground/40" />
            ) : (
              <Eye className="size-5 text-foreground/40" />
            )}
          </Button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="text-red-500 text-sm"
          >
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FormInput;
