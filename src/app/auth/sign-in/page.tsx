import SignInForm from "@/components/auth/SignInForm";
import Section from "@/components/ui/Section";

export const metadata = {
  title: "Sign In",
};

export default function Page() {
  return (
    <main>
      <Section className="min-h-dvh -mt-16.25 mb-0 pt-32 pb-16">
        <SignInForm />
      </Section>
    </main>
  );
}
