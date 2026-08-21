// app/page.tsx
import { blogPosts } from "@/app/data/posts";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-28 pb-12 md:pb-16 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div className="flex-1 min-w-[300px]">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-white shadow-sm border border-gray-200 px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1">
                  <i className="fas fa-check-circle text-[#2563eb]"></i> 8+ years
                </span>
                <span className="bg-white shadow-sm border border-gray-200 px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1">
                  <i className="fas fa-code"></i> Shopify Expert
                </span>
                <span className="bg-white shadow-sm border border-gray-200 px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1">
                  <i className="fas fa-rocket"></i> 15+ apps shipped
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
                Custom Shopify Apps <br />
                <span className="text-[#2563eb]">that drive revenue</span>
              </h1>
              <p className="text-lg text-[#475569] max-w-lg mt-4">
                Warranty, live selling, 3D try-on, bulk importers — built with React, Node, Shopify APIs. Full‑stack developer with 8+ years of experience.
              </p>
              <a href="#contact" className="inline-block bg-[#0a0a0f] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#2563eb] transition-colors mt-6">
                <i className="fas fa-paper-plane mr-2"></i> Start your project
              </a>
              <div className="flex gap-8 mt-6">
                <div>
                  <span className="font-bold text-xl">15+</span>
                  <span className="block text-sm text-[#64748b]">apps delivered</span>
                </div>
                <div>
                  <span className="font-bold text-xl">8+</span>
                  <span className="block text-sm text-[#64748b]">years full-stack</span>
                </div>
                <div>
                  <span className="font-bold text-xl">100%</span>
                  <span className="block text-sm text-[#64748b]">custom code</span>
                </div>
              </div>
            </div>
            <div className="flex-1 min-w-[280px] bg-gray-200/50 rounded-3xl p-6 text-center shadow-lg">
              <i className="fas fa-store-alt text-6xl text-gray-700/50"></i>
              <p className="font-semibold text-[#0a0a0f] mt-4">Shopify & Shopify Plus</p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                <span className="bg-white shadow-sm border border-gray-200 px-3 py-1 rounded-full text-xs font-semibold">REST API</span>
                <span className="bg-white shadow-sm border border-gray-200 px-3 py-1 rounded-full text-xs font-semibold">GraphQL</span>
                <span className="bg-white shadow-sm border border-gray-200 px-3 py-1 rounded-full text-xs font-semibold">React</span>
                <span className="bg-white shadow-sm border border-gray-200 px-3 py-1 rounded-full text-xs font-semibold">Node</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <div className="bg-[#0a0a0f] text-white rounded-[60px] p-8 md:p-12 my-12 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-around gap-6 text-center">
        <div>
          <i className="fas fa-shield-alt text-3xl text-[#2563eb] block mb-1"></i>
          <h4 className="font-bold text-lg">100% custom code</h4>
          <p className="text-sm opacity-70">No cookie‑cutter templates</p>
        </div>
        <div>
          <i className="fas fa-sync-alt text-3xl text-[#2563eb] block mb-1"></i>
          <h4 className="font-bold text-lg">Ongoing support</h4>
          <p className="text-sm opacity-70">24/7 maintenance & updates</p>
        </div>
        <div>
          <i className="fas fa-chart-line text-3xl text-[#2563eb] block mb-1"></i>
          <h4 className="font-bold text-lg">Revenue‑focused</h4>
          <p className="text-sm opacity-70">Designed to convert & scale</p>
        </div>
        <div>
          <i className="fas fa-clock text-3xl text-[#2563eb] block mb-1"></i>
          <h4 className="font-bold text-lg">Fast delivery</h4>
          <p className="text-sm opacity-70">MVP in 4‑6 weeks</p>
        </div>
      </div>

      {/* Services */}
      <section id="services" className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold">Tailored Shopify apps</h2>
          <p className="text-[#475569] max-w-lg mt-2 mb-8">
            Every app is custom‑built for your store's unique needs. Here are some of the solutions I've delivered.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:-translate-y-1 transition-transform">
              <i className="fas fa-file-signature text-3xl text-[#2563eb] mb-3"></i>
              <h3 className="text-xl font-bold">Warranty & Claims</h3>
              <p className="text-[#475569] text-sm">Full warranty registration form, claim management, admin panel with email and file handling.</p>
            </div>
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:-translate-y-1 transition-transform">
              <i className="fas fa-broadcast-tower text-3xl text-[#2563eb] mb-3"></i>
              <h3 className="text-xl font-bold">Live Selling</h3>
              <p className="text-[#475569] text-sm">Stream with real‑time chat, product selection, and one‑click add‑to‑cart during live sessions.</p>
            </div>
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:-translate-y-1 transition-transform">
              <i className="fas fa-cubes text-3xl text-[#2563eb] mb-3"></i>
              <h3 className="text-xl font-bold">Bulk Product Importer</h3>
              <p className="text-[#475569] text-sm">Import products with images, variants, metafields, metaobjects from any CMS.</p>
            </div>
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:-translate-y-1 transition-transform">
              <i className="fas fa-vr-cardboard text-3xl text-[#2563eb] mb-3"></i>
              <h3 className="text-xl font-bold">3D Virtual Try‑On</h3>
              <p className="text-[#475569] text-sm">Glasses viewer using webcam — customers see themselves with the product in real time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="about" className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold">How it works</h2>
          <p className="text-[#475569] max-w-lg mt-2 mb-8">A transparent, collaborative process from idea to launch.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-3xl p-6 text-center border border-gray-100 shadow-sm">
              <div className="bg-[#e8f0fe] text-[#2563eb] w-10 h-10 rounded-full flex items-center justify-center font-extrabold mx-auto mb-3">1</div>
              <h4 className="font-bold">Discovery</h4>
              <p className="text-[#475569] text-sm">We discuss your goals, store needs, and user flow.</p>
            </div>
            <div className="bg-white rounded-3xl p-6 text-center border border-gray-100 shadow-sm">
              <div className="bg-[#e8f0fe] text-[#2563eb] w-10 h-10 rounded-full flex items-center justify-center font-extrabold mx-auto mb-3">2</div>
              <h4 className="font-bold">Design & prototype</h4>
              <p className="text-[#475569] text-sm">Wireframes and interactive mockups for your approval.</p>
            </div>
            <div className="bg-white rounded-3xl p-6 text-center border border-gray-100 shadow-sm">
              <div className="bg-[#e8f0fe] text-[#2563eb] w-10 h-10 rounded-full flex items-center justify-center font-extrabold mx-auto mb-3">3</div>
              <h4 className="font-bold">Development</h4>
              <p className="text-[#475569] text-sm">Agile coding with regular demos and feedback loops.</p>
            </div>
            <div className="bg-white rounded-3xl p-6 text-center border border-gray-100 shadow-sm">
              <div className="bg-[#e8f0fe] text-[#2563eb] w-10 h-10 rounded-full flex items-center justify-center font-extrabold mx-auto mb-3">4</div>
              <h4 className="font-bold">Launch & support</h4>
              <p className="text-[#475569] text-sm">Deployment, testing, and 30 days of free support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="work" className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold">Case studies</h2>
          <p className="text-[#475569] max-w-lg mt-2 mb-8">
            Real projects with real impact. Built for burdauea.com, parts4gsm.com, bylaylasaleh.com.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 border-l-4 border-[#2563eb] shadow-sm">
              <h4 className="text-xl font-bold">burdauea.com – Live Selling</h4>
              <span className="inline-block bg-[#e8f0fe] text-[#1a4a8a] text-xs font-bold px-3 py-0.5 rounded-full mt-2 mb-3">Shopify custom app</span>
              <p className="text-[#475569] text-sm">Admin page to start stream with product selection, real‑time chat, and seamless checkout integration.</p>
              <div className="flex flex-wrap gap-1 mt-3">
                <span className="bg-gray-100 px-3 py-0.5 rounded-full text-xs font-semibold">React</span>
                <span className="bg-gray-100 px-3 py-0.5 rounded-full text-xs font-semibold">Node</span>
                <span className="bg-gray-100 px-3 py-0.5 rounded-full text-xs font-semibold">Shopify API</span>
                <span className="bg-gray-100 px-3 py-0.5 rounded-full text-xs font-semibold">WebSocket</span>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-6 border-l-4 border-[#2563eb] shadow-sm">
              <h4 className="text-xl font-bold">parts4gsm.com – Product Importer</h4>
              <span className="inline-block bg-[#e8f0fe] text-[#1a4a8a] text-xs font-bold px-3 py-0.5 rounded-full mt-2 mb-3">Bulk import</span>
              <p className="text-[#475569] text-sm">Imported all product fields from Lighthouse CMS including images, variants, metafields, metaobjects.</p>
              <div className="flex flex-wrap gap-1 mt-3">
                <span className="bg-gray-100 px-3 py-0.5 rounded-full text-xs font-semibold">REST API</span>
                <span className="bg-gray-100 px-3 py-0.5 rounded-full text-xs font-semibold">GraphQL</span>
                <span className="bg-gray-100 px-3 py-0.5 rounded-full text-xs font-semibold">Shopify</span>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-6 border-l-4 border-[#2563eb] shadow-sm">
              <h4 className="text-xl font-bold">bylaylasaleh.com – 3D Glasses Viewer</h4>
              <span className="inline-block bg-[#e8f0fe] text-[#1a4a8a] text-xs font-bold px-3 py-0.5 rounded-full mt-2 mb-3">Virtual try-on</span>
              <p className="text-[#475569] text-sm">Customers try glasses virtually via webcam. Redirect to dedicated page with real‑time overlay.</p>
              <div className="flex flex-wrap gap-1 mt-3">
                <span className="bg-gray-100 px-3 py-0.5 rounded-full text-xs font-semibold">WebRTC</span>
                <span className="bg-gray-100 px-3 py-0.5 rounded-full text-xs font-semibold">Three.js</span>
                <span className="bg-gray-100 px-3 py-0.5 rounded-full text-xs font-semibold">Shopify</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold">Insights & expertise</h2>
          <p className="text-[#475569] max-w-lg mt-2 mb-8">Tips, trends, and deep dives from my work in the Shopify ecosystem.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:-translate-y-1 transition-transform block"
              >
                <div className="flex gap-4 text-xs text-[#64748b] mb-2">
                  <span><i className="far fa-calendar-alt mr-1"></i>{post.date}</span>
                  <span><i className="far fa-clock mr-1"></i>{post.readTime}</span>
                </div>
                <h4 className="text-xl font-bold text-[#0a0a0f] mb-2">{post.title}</h4>
                <p className="text-[#475569] text-sm">{post.excerpt}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="bg-gray-100 px-2 py-0.5 rounded-full text-xs text-[#475569]">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="inline-block mt-3 font-semibold text-[#2563eb] hover:underline">
                  Read more <i className="fas fa-arrow-right text-xs"></i>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Highlight */}
      <section className="bg-white rounded-[40px] p-6 md:p-10 my-12 container mx-auto px-4 sm:px-6 lg:px-8 border border-gray-100 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">Asad ur Rehman</h3>
            <p className="text-[#475569]">
              <i className="fas fa-envelope mr-1"></i> asadurrehm890@gmail.com · <i className="fas fa-phone mr-1"></i> +923369950079
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">Shopify Plus</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">React</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">Node</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">GraphQL</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">WordPress</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">Laravel</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">Meta Pixel</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">GTM</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">GA4</span>
            </div>
          </div>
          <div>
            <span className="bg-[#0a0a0f] text-white px-4 py-1.5 rounded-full font-semibold text-sm">8+ years full‑stack</span>
            <p className="mt-2 max-w-xs text-sm text-[#475569]">BS Computer Science · Comsats · Certifications: Digital Marketing, SEO, ML & DL, Python</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 mt-6 text-sm border-t border-gray-100 pt-6">
          <div>
            <strong>Recent experience</strong><br />
            EsoI Technology (Shopify dev) · Codeions (WordPress & Shopify) · Keenly Digital
          </div>
          <div>
            <strong>Specialties</strong><br />
            Custom Shopify apps, REST/GraphQL, tracking & attribution, AI/LLM integration
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <div className="bg-[#0a0a0f] text-white rounded-[60px] p-10 md:p-16 text-center my-12 container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-5xl font-bold">Ready to build your Shopify app?</h2>
        <p className="text-lg opacity-90 max-w-xl mx-auto mt-3 mb-6">Get a free consultation and a tailored quote within 24 hours.</p>
        <a href="#contact" className="inline-block bg-[#2563eb] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#1d4ed8] transition">
          <i className="fas fa-paper-plane mr-2"></i> Let's talk
        </a>
      </div>

      {/* Contact */}
      <section id="contact" className="bg-white rounded-[40px] p-6 md:p-12 my-12 container mx-auto px-4 sm:px-6 lg:px-8 border border-gray-100 shadow-sm">
        <h2 className="text-3xl md:text-4xl font-bold">Let's build your Shopify app</h2>
        <p className="text-[#475569] mt-1 mb-8">Reach out for a free consultation. I'll respond within 24 hours.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-5 py-3 rounded-full border border-gray-200 bg-gray-50/50 focus:outline-none focus:border-[#2563eb] focus:bg-white transition"
            />
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-5 py-3 rounded-full border border-gray-200 bg-gray-50/50 focus:outline-none focus:border-[#2563eb] focus:bg-white transition"
            />
            <input
              type="text"
              placeholder="Store URL (optional)"
              className="w-full px-5 py-3 rounded-full border border-gray-200 bg-gray-50/50 focus:outline-none focus:border-[#2563eb] focus:bg-white transition"
            />
            <textarea
              rows={4}
              placeholder="Tell me about your Shopify app idea..."
              className="w-full px-5 py-3 rounded-3xl border border-gray-200 bg-gray-50/50 focus:outline-none focus:border-[#2563eb] focus:bg-white transition"
            ></textarea>
            <button type="submit" className="bg-[#0a0a0f] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#2563eb] transition-colors">
              <i className="fas fa-paper-plane mr-2"></i> Send message
            </button>
          </form>
          <div>
            <h4 className="font-bold text-xl">Connect with me</h4>
            <p className="text-[#475569] mt-1">I'm active on LinkedIn, GitHub, and email.</p>
            <div className="flex gap-5 text-2xl mt-4">
              <a
                href="https://www.linkedin.com/in/asad-ur-rehman-aa183711b/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0a0a0f] hover:text-[#2563eb] transition-colors"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="https://github.com/asadurrehm890"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0a0a0f] hover:text-[#2563eb] transition-colors"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="mailto:asadurrehm890@gmail.com"
                className="text-[#0a0a0f] hover:text-[#2563eb] transition-colors"
              >
                <i className="fas fa-envelope"></i>
              </a>
              <a href="#" className="text-[#0a0a0f] hover:text-[#2563eb] transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
            <div className="mt-8 bg-gray-50/80 p-6 rounded-3xl">
              <p className="font-semibold"><i className="fas fa-clock mr-2"></i> Response time: &lt; 24h</p>
              <p className="text-sm text-[#475569] mt-1">Based in Islamabad · Remote worldwide</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}