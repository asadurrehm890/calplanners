import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex gap-3 mb-8 flex-wrap">
              <span className="badge-blue">
                <i className="fas fa-code mr-1.5"></i> 8+ Years Experience
              </span>
              <span className="badge-purple">
                <i className="fas fa-rocket mr-1.5"></i> 15+ Apps Delivered
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Build Custom <br />
              <span className="gradient-text">Shopify Apps</span>
              <br />
              That Drive Revenue
            </h1>

            <p className="text-lg text-[#475569] max-w-lg mb-10 leading-relaxed">
              Full-stack developer specializing in Shopify, React, Node, and GraphQL.
              From live selling to 3D try-on — I build solutions that convert.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="#contact" className="btn-primary btn-large">
                <i className="fas fa-paper-plane"></i> Start Your Project
              </Link>
              <a href="#cases" className="btn-secondary btn-large">
                View Case Studies
              </a>
            </div>

            <div className="flex gap-12 mt-12">
              <div>
                <div className="stat-number">15+</div>
                <div className="stat-label">Apps Delivered</div>
              </div>
              <div>
                <div className="stat-number">8+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div>
                <div className="stat-number">100%</div>
                <div className="stat-label">Custom Code</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-[#2563eb] to-[#7c3aed] rounded-[2.5rem] p-8 text-white shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                  <i className="fas fa-store"></i>
                </div>
                <div>
                  <h3 className="font-bold text-xl">Shopify Expert</h3>
                  <p className="text-white/70 text-sm">Full-Stack Development</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-white/10 rounded-xl px-5 py-3.5">
                  <i className="fas fa-check-circle text-[#4ade80]"></i>
                  <span>Custom Shopify Apps</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 rounded-xl px-5 py-3.5">
                  <i className="fas fa-check-circle text-[#4ade80]"></i>
                  <span>React & Node.js</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 rounded-xl px-5 py-3.5">
                  <i className="fas fa-check-circle text-[#4ade80]"></i>
                  <span>REST & GraphQL APIs</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 rounded-xl px-5 py-3.5">
                  <i className="fas fa-check-circle text-[#4ade80]"></i>
                  <span>WordPress & Laravel</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}