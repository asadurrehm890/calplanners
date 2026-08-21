export default function About() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="badge badge-blue mb-4">About Me</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Full-Stack Developer<br />
              <span className="gradient-text">8+ Years Experience</span>
            </h2>
            <p className="text-[#475569] text-lg leading-relaxed mb-4">
              I specialize in building custom Shopify apps, WordPress solutions, and scalable web applications.
              With a strong background in React, Node.js, and GraphQL, I deliver robust, high-performance solutions
              that drive business growth.
            </p>
            <p className="text-[#475569] text-lg leading-relaxed mb-8">
              My expertise spans the entire development lifecycle — from planning and architecture to deployment
              and ongoing optimization.
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="tech-tag">Shopify Plus</span>
              <span className="tech-tag">React</span>
              <span className="tech-tag">Node.js</span>
              <span className="tech-tag">GraphQL</span>
              <span className="tech-tag">WordPress</span>
              <span className="tech-tag">Laravel</span>
              <span className="tech-tag">Meta Pixel</span>
              <span className="tech-tag">GA4</span>
            </div>
          </div>

          <div className="space-y-5">
            <div className="card p-6">
              <div className="flex items-center gap-4">
                <div className="feature-icon feature-icon-blue">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Education</h4>
                  <p className="text-[#475569]">BS Computer Science · Comsats (2012-2016)</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-4">
                <div className="feature-icon feature-icon-purple">
                  <i className="fas fa-certificate"></i>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Certifications</h4>
                  <p className="text-[#475569]">Digital Marketing · SEO · ML & DL · Python</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-4">
                <div className="feature-icon feature-icon-green">
                  <i className="fas fa-briefcase"></i>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Recent Experience</h4>
                  <p className="text-[#475569]">EsoI Technology · Codeions · Keenly Digital</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-4">
                <div className="feature-icon feature-icon-orange">
                  <i className="fas fa-robot"></i>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Specialties</h4>
                  <p className="text-[#475569]">Custom Shopify Apps · REST/GraphQL · AI/LLM Integration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}