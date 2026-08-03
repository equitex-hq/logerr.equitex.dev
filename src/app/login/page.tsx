"use client";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import { createClient } from "@/lib/supabase/client";

import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

interface Inputs {
  email: string;
  password: string;
}

export default function Page() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    try {
      clearErrors("root");

      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;
      router.push("/dashboard");
    } catch (error) {
      setError("root.auth", {
        message: error instanceof Error ? error.message : "An error occurred",
      });
    }
  };

  return (
    <main>
      <Section className="min-h-dvh -mt-16.25 mb-0 pt-32">
        <div className="card max-w-lg pb-4 rounded-3xl shadow">
          <h1 className="mb-3 font-heading font-bold text-3xl">Log In</h1>
          <p className="mb-8 text-fg-muted text-sm">
            Enter your email and password to access your account
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full">
            <div className="flex flex-col gap-1 mb-4">
              <label className="font-heading font-medium text-lg">Email</label>
              <input
                className="input-field"
                type="email"
                {...register("email", {
                  required: "Email address is required",
                })}
              />
              {errors.email?.message && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1 mb-4">
              <label className="font-heading font-medium text-lg">
                Password
              </label>
              <input
                className="input-field"
                type="password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password?.message && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            {errors.root?.auth && (
              <p className="text-center text-sm text-red-500 mb-4">
                {errors.root?.auth?.message}
              </p>
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="primary">
              Submit
            </Button>
          </form>
        </div>
      </Section>
    </main>
  );
}
