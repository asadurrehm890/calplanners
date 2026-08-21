export default function ResumeHighlight() {
  return (
    <section>
      <div className="container">
        <div className="bg-white rounded-[40px] p-6 md:p-10 border border-gray-100 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold">Asad ur Rehman</h3>
              <p className="text-gray-600 text-sm mt-1">
                <i className="fas fa-envelope mr-2"></i> asadurrehm890@gmail.com
                <span className="mx-3">·</span>
                <i className="fas fa-phone mr-2"></i> +923369950079
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold">Shopify Plus</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold">React</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold">Node</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold">GraphQL</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold">WordPress</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold">Laravel</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold">Meta Pixel</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold">GA4</span>
              </div>
            </div>
            <div className="text-center">
              <span className="inline-block bg-[#1e293b] text-white px-6 py-2 rounded-full font-semibold text-sm">
                8+ years full‑stack
              </span>
              <p className="text-sm text-gray-500 mt-2 max-w-xs">
                BS Computer Science · Comsats · Certifications: Digital Marketing, SEO, ML & DL, Python
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-8 mt-6 pt-6 border-t border-gray-100">
            <div>
              <strong className="text-sm">Recent experience</strong>
              <p className="text-gray-600 text-sm">EsoI Technology · Codeions · Keenly Digital</p>
            </div>
            <div>
              <strong className="text-sm">Specialties</strong>
              <p className="text-gray-600 text-sm">Custom Shopify apps, REST/GraphQL, tracking & attribution, AI/LLM integration</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}