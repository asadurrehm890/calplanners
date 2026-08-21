export default function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <div className="bg-[#0f172a] rounded-[2.5rem] p-8 md:p-12 text-white">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <span className="text-[#60a5fa] font-semibold text-sm uppercase tracking-wider">
                Get in Touch
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                Let's Build Something Amazing
              </h2>
              <p className="text-white/70 mb-6">
                Have a project in mind? Let's discuss how I can help you build
                a custom Shopify app or optimize your e-commerce experience.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                  <i className="fas fa-envelope w-5 text-[#60a5fa]"></i>
                  <span>asadurrehm890@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                  <i className="fas fa-phone w-5 text-[#60a5fa]"></i>
                  <span>+923369950079</span>
                </div>
                <div className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                  <i className="fas fa-map-marker-alt w-5 text-[#60a5fa]"></i>
                  <span>Islamabad, Pakistan · Remote Worldwide</span>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <a
                  href="https://www.linkedin.com/in/asad-ur-rehman-aa183711b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a
                  href="https://github.com/asadurrehm890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
                  aria-label="GitHub"
                >
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>

            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full px-5 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#60a5fa] transition-all"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full px-5 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#60a5fa] transition-all"
                />
              </div>
              <input
                type="text"
                placeholder="Store URL (optional)"
                className="w-full px-5 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#60a5fa] transition-all"
              />
              <textarea
                rows={4}
                placeholder="Tell me about your project..."
                className="w-full px-5 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#60a5fa] transition-all resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-3.5 bg-[#2563eb] text-white rounded-xl font-semibold hover:bg-[#1d4ed8] transition-all shadow-md hover:shadow-lg"
              >
                <i className="fas fa-paper-plane mr-2"></i> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}