
import { Benefits, Container, Cta, Faq, Hero, SectionTitle, Testimonials, Video } from '@/components';
import { benefitOne, benefitTwo } from "@/components/landing/data";

export default function Home() {
  return (
    <Container>
      <Hero />
      <SectionTitle
        preTitle="Nextly Benefits"
        title=" Why should you use this landing page"
      >
        Nextly is a free landing page & marketing website template for startups
        and indie projects. Its built with Next.js & TailwindCSS. And its
        completely open-source.
      </SectionTitle>

    </Container>
  );
}
