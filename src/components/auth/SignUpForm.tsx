"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaCheckCircle } from "react-icons/fa";

import { HOST } from "@/config/shared";
import { createClient } from "@/lib/supabase/client";

import Button from "@/components/ui/Button";

interface Inputs {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpForm() {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    try {
      clearErrors("root");

      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: HOST + "/auth/sign-in",
        },
      });

      if (error) throw error;
      setIsSubmitted(true);
    } catch (error) {
      setError("root.auth", {
        message: error instanceof Error ? error.message : "An error occurred",
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className="card max-w-lg rounded-3xl shadow">
        <FaCheckCircle
          aria-hidden="true"
          className="h-20 w-20 mb-4 text-green-500"
        />
        <h1 className="mb-3 font-heading font-bold text-3xl text-center">
          Check your email
        </h1>
        <p className="text-fg-muted text-center">
          We sent a confirmation link to{" "}
          <span className="font-medium text-fg">{getValues("email")}</span>.{" "}
          <br /> Click it to finish signing up.
        </p>
      </div>
    );
  }

  return (
    <div className="card max-w-lg pb-4 rounded-3xl shadow">
      <h1 className="mb-3 font-heading font-bold text-3xl text-center">
        Sign up
      </h1>
      <p className="mb-8 text-fg-muted text-sm text-center">
        Create an account to get started
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full"
        noValidate>
        <div className="flex flex-col gap-1 mb-4">
          <label
            htmlFor="email"
            className="font-heading font-medium text-lg">
            Email
          </label>
          <input
            id="email"
            className="input-field"
            type="email"
            autoComplete="email"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email", {
              required: "Email address is required",
            })}
          />
          {errors.email?.message && (
            <p
              id="email-error"
              className="text-xs text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1 mb-4">
          <label
            htmlFor="password"
            className="font-heading font-medium text-lg">
            Password
          </label>
          <input
            id="password"
            className="input-field"
            type="password"
            autoComplete="new-password"
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby={errors.password ? "password-error" : undefined}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.password?.message && (
            <p
              id="password-error"
              className="text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1 mb-4">
          <label
            htmlFor="confirm-password"
            className="font-heading font-medium text-lg">
            Confirm password
          </label>
          <input
            id="confirm-password"
            className="input-field"
            type="password"
            autoComplete="new-password"
            aria-invalid={errors.confirmPassword ? "true" : "false"}
            aria-describedby={
              errors.confirmPassword ? "confirm-password-error" : undefined
            }
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword?.message && (
            <p
              id="confirm-password-error"
              className="text-xs text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        {errors.root?.auth && (
          <p
            role="alert"
            className="text-center text-sm text-red-500 mb-4">
            {errors.root.auth.message}
          </p>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="primary">
          {isSubmitting ? "Signing up..." : "Sign up"}
        </Button>
      </form>
    </div>
  );
}
