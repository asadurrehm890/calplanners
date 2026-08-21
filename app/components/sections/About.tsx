export default function About() {
  return (
    <section id="about" className="bg-gradient-section">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[#2563eb] font-semibold text-sm uppercase tracking-wider">
              About Me
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Full-Stack Developer with 8+ Years Experience
            </h2>
            <p className="text-[#475569] mb-4">
              I specialize in building custom Shopify apps, WordPress solutions, and scalable web applications.
              With a strong background in React, Node.js, and GraphQL, I deliver robust, high-performance solutions
              that drive business growth.
            </p>
            <p className="text-[#475569] mb-6">
              My expertise spans the entire development lifecycle — from planning and architecture to deployment
              and ongoing optimization. I've worked with brands like burdauea.com, parts4gsm.com, and
              bylaylasaleh.com to create innovative e-commerce experiences.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-white rounded-full text-sm font-medium border border-gray-200 shadow-sm">
                Shopify Plus
              </span>
              <span className="px-4 py-2 bg-white rounded-full text-sm font-medium border border-gray-200 shadow-sm">
                React
              </span>
              <span className="px-4 py-2 bg-white rounded-full text-sm font-medium border border-gray-200 shadow-sm">
                Node.js
              </span>
              <span className="px-4 py-2 bg-white rounded-full text-sm font-medium border border-gray-200 shadow-sm">
                GraphQL
              </span>
              <span className="px-4 py-2 bg-white rounded-full text-sm font-medium border border-gray-200 shadow-sm">
                WordPress
              </span>
              <span className="px-4 py-2 bg-white rounded-full text-sm font-medium border border-gray-200 shadow-sm">
                Laravel
              </span>
              <span className="px-4 py-2 bg-white rounded-full text-sm font-medium border border-gray-200 shadow-sm">
                Meta Pixel
              </span>
              <span className="px-4 py-2 bg-white rounded-full text-sm font-medium border border-gray-200 shadow-sm">
                GA4
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#2563eb]/10 rounded-full flex items-center justify-center text-[#2563eb]">
                  <i className="fas fa-graduation-cap text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold">Education</h4>
                  <p className="text-[#475569] text-sm">
                    BS Computer Science · Comsats (2012-2016)
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#7c3aed]/10 rounded-full flex items-center justify-center text-[#7c3aed]">
                  <i className="fas fa-certificate text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold">Certifications</h4>
                  <p className="text-[#475569] text-sm">
                    Digital Marketing · SEO · ML & DL · Python
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#059669]/10 rounded-full flex items-center justify-center text-[#059669]">
                  <i className="fas fa-briefcase text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold">Recent Experience</h4>
                  <p className="text-[#475569] text-sm">
                    EsoI Technology · Codeions · Keenly Digital
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#f59e0b]/10 rounded-full flex items-center justify-center text-[#f59e0b]">
                  <i className="fas fa-robot text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold">Specialties</h4>
                  <p className="text-[#475569] text-sm">
                    Custom Shopify Apps · REST/GraphQL · AI/LLM Integration
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}