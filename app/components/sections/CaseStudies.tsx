import { caseStudies } from "@/app/data/caseStudies";

export default function CaseStudies() {
  return (
    <section id="cases">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Case studies</h2>
        <p className="text-gray-600 max-w-2xl mb-10">
          Real projects with real impact. Built for burdauea.com, parts4gsm.com, bylaylasaleh.com.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <div key={index} className="bg-white rounded-[28px] p-6 border-l-4 border-[#2d7a4f] shadow-sm">
              <h4 className="text-xl font-bold">{study.title}</h4>
              <span className="inline-block bg-[#e9f3ef] text-[#1e4b33] text-xs font-bold px-3 py-0.5 rounded-full mt-2 mb-3">
                {study.label}
              </span>
              <p className="text-gray-700 text-sm mb-4">{study.description}</p>
              <div className="flex flex-wrap gap-2">
                {study.tech.map((tech: string, i: number) => (
                  <span key={i} className="bg-gray-100 px-3 py-0.5 rounded-full text-xs font-semibold">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}