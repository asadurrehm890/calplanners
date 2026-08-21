export default function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <div className="bg-white rounded-[40px] p-6 md:p-12 border border-gray-100 shadow-sm">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Let's build your Shopify app</h2>
          <p className="text-gray-600 mb-8">Reach out for a free consultation. I'll respond within 24 hours.</p>

          <div className="grid md:grid-cols-2 gap-8">
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your name"
                required
                className="w-full px-5 py-4 rounded-full border border-gray-300 bg-gray-50 focus:outline-none focus:border-[#2d7a4f] focus:bg-white transition-all"
              />
              <input
                type="email"
                placeholder="Email address"
                required
                className="w-full px-5 py-4 rounded-full border border-gray-300 bg-gray-50 focus:outline-none focus:border-[#2d7a4f] focus:bg-white transition-all"
              />
              <input
                type="text"
                placeholder="Store URL (optional)"
                className="w-full px-5 py-4 rounded-full border border-gray-300 bg-gray-50 focus:outline-none focus:border-[#2d7a4f] focus:bg-white transition-all"
              />
              <textarea
                rows={4}
                placeholder="Tell me about your Shopify app idea..."
                className="w-full px-5 py-4 rounded-3xl border border-gray-300 bg-gray-50 focus:outline-none focus:border-[#2d7a4f] focus:bg-white transition-all resize-none"
              ></textarea>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#1e293b] text-white px-8 py-4 rounded-full font-bold hover:bg-[#2d7a4f] transition-all"
              >
                <i className="fas fa-paper-plane"></i> Send message
              </button>
            </form>

            <div>
              <h4 className="font-bold text-xl">Connect with me</h4>
              <p className="text-gray-600 my-3">I'm active on LinkedIn, GitHub, and email.</p>
              <div className="flex gap-4 text-2xl">
                <a
                  href="https://www.linkedin.com/in/asad-ur-rehman-aa183711b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1e293b] hover:text-[#2d7a4f] transition-all hover:scale-105"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a
                  href="https://github.com/asadurrehm890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1e293b] hover:text-[#2d7a4f] transition-all hover:scale-105"
                >
                  <i className="fab fa-github"></i>
                </a>
                <a
                  href="mailto:asadurrehm890@gmail.com"
                  className="text-[#1e293b] hover:text-[#2d7a4f] transition-all hover:scale-105"
                >
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
              <div className="mt-8 bg-gray-100 p-6 rounded-[30px]">
                <p className="font-semibold">
                  <i className="fas fa-clock mr-2"></i> Response time: &lt; 24h
                </p>
                <p className="text-sm text-gray-700">Based in Islamabad · Remote worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}