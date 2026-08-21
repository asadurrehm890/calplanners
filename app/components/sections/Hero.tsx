import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-20 bg-gradient-to-br from-[#f8fafc] via-white to-[#eef2ff]">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex gap-3 mb-6 flex-wrap">
              <span className="px-4 py-1.5 bg-[#2563eb]/10 text-[#2563eb] rounded-full text-sm font-medium">
                <i className="fas fa-code mr-1.5"></i> 8+ Years Experience
              </span>
              <span className="px-4 py-1.5 bg-[#7c3aed]/10 text-[#7c3aed] rounded-full text-sm font-medium">
                <i className="fas fa-rocket mr-1.5"></i> 15+ Apps Delivered
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Build Custom <br />
              <span className="gradient-text">Shopify Apps</span>
              <br />
              That Drive Revenue
            </h1>

            <p className="text-lg text-[#475569] max-w-lg mb-8">
              Full-stack developer specializing in Shopify, React, Node, and GraphQL.
              From live selling to 3D try-on — I build solutions that convert.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="#contact"
                className="px-8 py-3.5 bg-[#2563eb] text-white rounded-full font-semibold hover:bg-[#1d4ed8] transition-all shadow-md hover:shadow-lg"
              >
                <i className="fas fa-paper-plane mr-2"></i> Start Your Project
              </Link>
              <a
                href="#cases"
                className="px-8 py-3.5 border-2 border-[#2563eb] text-[#2563eb] rounded-full font-semibold hover:bg-[#2563eb] hover:text-white transition-all"
              >
                View Case Studies
              </a>
            </div>

            <div className="flex gap-8 mt-10">
              <div>
                <div className="text-2xl font-bold text-[#0f172a]">15+</div>
                <div className="text-sm text-[#64748b]">Apps Delivered</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#0f172a]">8+</div>
                <div className="text-sm text-[#64748b]">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#0f172a]">100%</div>
                <div className="text-sm text-[#64748b]">Custom Code</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-[#2563eb] to-[#7c3aed] rounded-[2.5rem] p-8 text-white shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                  <i className="fas fa-store"></i>
                </div>
                <div>
                  <h3 className="font-bold text-xl">Shopify Expert</h3>
                  <p className="text-white/70 text-sm">Full-Stack Development</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                  <i className="fas fa-check-circle text-[#4ade80]"></i>
                  <span>Custom Shopify Apps</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                  <i className="fas fa-check-circle text-[#4ade80]"></i>
                  <span>React & Node.js</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                  <i className="fas fa-check-circle text-[#4ade80]"></i>
                  <span>REST & GraphQL APIs</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
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