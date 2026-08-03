import SignInForm from "@/components/auth/SignInForm";
import Section from "@/components/ui/Section";

export default function Page() {
  return (
    <main>
      <Section className="min-h-dvh -mt-16.25 mb-0 pt-32">
        <SignInForm />
      </Section>
    </main>
  );
}
