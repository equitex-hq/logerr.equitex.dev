import { cn } from "@/lib/shared/utils";

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export default function Section({ className, children, ...props }: Props) {
  return (
    <section
      className={cn(
        "flex flex-col items-center gap-8 mb-16 px-4 md:px-8",
        className,
      )}
      {...props}>
      {children}
    </section>
  );
}
