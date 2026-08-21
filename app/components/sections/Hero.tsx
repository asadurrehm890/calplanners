import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-20 bg-gradient-to-br from-white via-white to-blue-50/40">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="badge badge-blue">
                <i className="fas fa-code mr-1.5"></i> 8+ Years
              </span>
              <span className="badge badge-purple">
                <i className="fas fa-rocket mr-1.5"></i> 15+ Apps Shipped
              </span>
              <span className="badge badge-green">
                <i className="fas fa-check-circle mr-1.5"></i> Shopify Expert
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight">
              Custom Shopify Apps <br />
              <span className="gradient-text">That Drive Revenue</span>
            </h1>

            <p className="text-lg text-[#475569] max-w-lg mb-10 leading-relaxed">
              Full-stack developer specializing in Shopify, React, Node, and GraphQL.
              I build custom apps that solve real business problems and increase sales.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="#contact" className="btn-primary btn-large">
                <i className="fas fa-paper-plane"></i> Start Your Project
              </Link>
              <a href="#work" className="btn-secondary btn-large">
                View My Work
              </a>
            </div>

            <div className="flex gap-12 mt-12 pt-8 border-t border-gray-100">
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
            <div className="bg-gradient-to-br from-[#2563eb] to-[#7c3aed] rounded-3xl p-8 text-white shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">
                  <i className="fas fa-store"></i>
                </div>
                <div>
                  <h3 className="font-bold text-xl">Shopify Expert</h3>
                  <p className="text-white/70 text-sm">Full-Stack Development</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { icon: "fa-check-circle", text: "Custom Shopify Apps" },
                  { icon: "fa-check-circle", text: "React & Node.js" },
                  { icon: "fa-check-circle", text: "REST & GraphQL APIs" },
                  { icon: "fa-check-circle", text: "WordPress & Laravel" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-white/10 rounded-xl px-5 py-3.5"
                  >
                    <i className={`fas ${item.icon} text-emerald-400`}></i>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}