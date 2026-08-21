import Link from "next/link";

export default function Hero() {
  return (
    <section className="py-12 md:py-20">
      <div className="container">
        <div className="flex flex-wrap items-center justify-between gap-8">
          {/* Hero Content */}
          <div className="flex-1 min-w-[300px]">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="bg-white border border-gray-200 px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">
                <i className="fas fa-check-circle text-[#2d7a4f] mr-1"></i> 8+ years
              </span>
              <span className="bg-white border border-gray-200 px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">
                <i className="fas fa-code mr-1"></i> Shopify Expert
              </span>
              <span className="bg-white border border-gray-200 px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">
                <i className="fas fa-rocket mr-1"></i> 15+ apps shipped
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Custom Shopify Apps <br />
              <span className="gradient-text">that drive revenue</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-lg mb-8">
              Warranty, live selling, 3D try-on, bulk importers — built with React, Node, Shopify APIs. Full‑stack developer with 8+ years of experience.
            </p>

            <Link
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#1e293b] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#2d7a4f] transition-all"
            >
              <i className="fas fa-paper-plane"></i> Start your project
            </Link>

            <div className="flex gap-8 mt-8">
              <div>
                <div className="font-bold text-xl">15+</div>
                <span className="text-sm text-gray-500">apps delivered</span>
              </div>
              <div>
                <div className="font-bold text-xl">8+</div>
                <span className="text-sm text-gray-500">years full-stack</span>
              </div>
              <div>
                <div className="font-bold text-xl">100%</div>
                <span className="text-sm text-gray-500">custom code</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex-1 min-w-[280px] bg-[#e9edf2] rounded-[40px] p-8 text-center shadow-xl">
            <i className="fas fa-store-alt text-6xl text-[#1e293b] opacity-50"></i>
            <p className="font-semibold text-[#1e293b] mt-4">Shopify & Shopify Plus</p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="bg-white px-4 py-1.5 rounded-full text-sm font-semibold border border-gray-200 shadow-sm">REST API</span>
              <span className="bg-white px-4 py-1.5 rounded-full text-sm font-semibold border border-gray-200 shadow-sm">GraphQL</span>
              <span className="bg-white px-4 py-1.5 rounded-full text-sm font-semibold border border-gray-200 shadow-sm">React</span>
              <span className="bg-white px-4 py-1.5 rounded-full text-sm font-semibold border border-gray-200 shadow-sm">Node</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}