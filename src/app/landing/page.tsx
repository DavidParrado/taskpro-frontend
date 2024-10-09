
import { Benefits, Container, Cta, Faq, Hero, SectionTitle, Testimonials, Video } from '@/components';
import { benefitOne, benefitTwo } from "@/components/landing/data";

export default function Home() {
  return (
    <Container>
      <Hero />
      <SectionTitle
        preTitle="Benefits"
        title=" Why should you use this application?"
      >
        Taskpro is a task management application that allows you to organize your tasks in a simple and efficient way. It is designed to help you manage your tasks and projects with ease.
      </SectionTitle>

    </Container>
  );
}
