import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/shared/utils";

const buttonVariants = cva(
  cn(
    "border border-(--border) cursor-pointer transition",
    "outline-transparent outline-offset-2 focus-visible:outline-2 focus-visible:outline-blue-600 dark:focus-visible:outline-blue-500",
  ),
  {
    variants: {
      variant: {
        default: "text-fg bg-(--bg) hover:bg-(--bg-light)",
        primary:
          "text-(--neutral-100) dark:text-(--neutral-900) bg-(--neutral-950) dark:bg-(--neutral-50) hover:bg-(--neutral-900) dark:hover:bg-(--white)",
      },
      size: {
        xs: "px-2 py-1 rounded-md text-xs",
        sm: "px-3 py-1.5 rounded-lg text-sm",
        md: "px-3 py-2 rounded-lg text-base",
        lg: "px-4 py-2 rounded-lg text-lg",
      },
      layout: {
        "text-only": "",
        "icon-only": "px-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      layout: "text-only",
    },
  },
);

interface Props
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export default function Button({
  variant,
  size,
  layout,
  className,
  children,
  ...props
}: Props) {
  return (
    <button
      className={cn(buttonVariants({ variant, layout, size }), className)}
      {...props}>
      {children}
    </button>
  );
}
