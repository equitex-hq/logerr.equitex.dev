import SignUpForm from "@/components/auth/SignUpForm";
import Section from "@/components/ui/Section";

export const metadata = {
  title: "Sign Up",
};

export default function Page() {
  return (
    <main>
      <Section className="min-h-dvh -mt-16.25 mb-0 pt-32">
        <SignUpForm />
      </Section>
    </main>
  );
}
