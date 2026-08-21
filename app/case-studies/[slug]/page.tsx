// app/case-studies/[slug]/page.tsx
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudyBySlug, getRelatedCaseStudies } from "@/app/data/caseStudies";
import Link from "next/link";
import type { Metadata } from "next";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return {
      title: "Case Study Not Found",
      description: "The requested case study could not be found.",
    };
  }

  return {
    title: `${study.title} | ${study.client} - Case Study | Asad ur Rehman`,
    description: study.excerpt,
    keywords: study.tags.join(", "),
    openGraph: {
      title: `${study.title} - ${study.client}`,
      description: study.excerpt,
      type: "article",
      publishedTime: study.date,
      tags: study.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.title} - ${study.client}`,
      description: study.excerpt,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  const relatedStudies = study ? getRelatedCaseStudies(study.id) : [];

  if (!study) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
      <Link
        href="/#work"
        className="inline-flex items-center gap-2 text-[#475569] font-semibold hover:text-[#2563eb] transition-colors hover:gap-3 mb-6"
      >
        <i className="fas fa-arrow-left"></i> Back to case studies
      </Link>

      <article className="bg-white rounded-[30px] p-6 md:p-12 shadow-sm border border-gray-100">
        <div className="mb-6">
          <span className="inline-block bg-[#e8f0fe] text-[#1a4a8a] text-xs font-bold px-3 py-1 rounded-full">
            {study.category}
          </span>
          <div className="flex flex-wrap gap-4 text-sm text-[#64748b] mt-3">
            <span><i className="far fa-calendar-alt mr-1"></i> {study.date}</span>
            <span><i className="fas fa-tags mr-1"></i> {study.tags.join(", ")}</span>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-[#0a0a0f]">{study.title}</h1>
        <p className="text-xl text-[#475569] mb-6">Client: {study.client}</p>
        <p className="text-lg text-[#475569] mb-8 border-l-4 border-[#2563eb] pl-4">{study.excerpt}</p>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#0a0a0f] mb-3">Overview</h2>
          <p className="text-[#475569]">{study.description}</p>
        </div>

        {/* Challenges */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#0a0a0f] mb-3">Challenges</h2>
          <ul className="space-y-2">
            {study.challenges.map((challenge, index) => (
              <li key={index} className="flex items-start gap-3 text-[#475569]">
                <i className="fas fa-exclamation-circle text-[#2563eb] mt-1"></i>
                <span>{challenge}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Solution */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#0a0a0f] mb-3">Solution</h2>
          <ul className="space-y-2">
            {study.solution.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-[#475569]">
                <i className="fas fa-check-circle text-[#2563eb] mt-1"></i>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#0a0a0f] mb-3">Technologies Used</h2>
          <div className="flex flex-wrap gap-2">
            {study.technologies.map((tech) => (
              <span
                key={tech}
                className="bg-gray-100 px-3 py-1.5 rounded-full text-sm font-medium text-[#475569]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-8 bg-[#f8fafc] rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-[#0a0a0f] mb-3">Results & Impact</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {study.results.map((result, index) => (
              <li key={index} className="flex items-start gap-3 text-[#475569]">
                <i className="fas fa-chart-line text-[#2563eb] mt-1"></i>
                <span>{result}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Testimonial */}
        {study.testimonial && (
          <div className="mb-8 bg-[#0a0a0f] text-white rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <i className="fas fa-quote-left text-3xl text-[#2563eb] opacity-50"></i>
              <div>
                <p className="text-lg italic mb-3">"{study.testimonial.quote}"</p>
                <p className="font-semibold">{study.testimonial.author}</p>
                <p className="text-sm text-white/70">{study.testimonial.position}</p>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-4">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-[#0a0a0f] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#2563eb] transition-colors"
          >
            <i className="fas fa-paper-plane"></i> Discuss your project
          </Link>
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 border-2 border-[#0a0a0f] text-[#0a0a0f] px-6 py-3 rounded-full font-semibold hover:bg-[#0a0a0f] hover:text-white transition-colors"
          >
            <i className="fas fa-code"></i> Explore services
          </Link>
        </div>
      </article>

      {/* Related Case Studies */}
      {relatedStudies.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6 text-[#0a0a0f]">Related Case Studies</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedStudies.map((related) => (
              <Link
                key={related.id}
                href={`/case-studies/${related.slug}`}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:-translate-y-1 transition-transform block"
              >
                <span className="inline-block bg-[#e8f0fe] text-[#1a4a8a] text-xs font-bold px-3 py-0.5 rounded-full mb-3">
                  {related.category}
                </span>
                <h4 className="text-lg font-bold text-[#0a0a0f] mb-2">{related.title}</h4>
                <p className="text-sm text-[#475569]">{related.excerpt.substring(0, 100)}...</p>
                <span className="inline-block mt-3 font-semibold text-[#2563eb] hover:underline text-sm">
                  Read case study <i className="fas fa-arrow-right text-xs"></i>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="mt-12 bg-[#0a0a0f] text-white rounded-[30px] p-8 md:p-12 text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-3">Ready to Build Your Custom Shopify App?</h3>
        <p className="text-white/80 max-w-xl mx-auto mb-6">
          With 8+ years of experience in custom Shopify development, I can help you build the perfect solution for your business.
        </p>
        <Link
          href="/#contact"
          className="inline-block bg-[#2563eb] text-white px-8 py-4 rounded-full font-bold hover:bg-[#1d4ed8] transition-colors"
        >
          <i className="fas fa-paper-plane mr-2"></i> Let's Talk
        </Link>
      </div>
    </div>
  );
}