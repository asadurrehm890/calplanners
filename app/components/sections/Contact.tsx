"use client";

import { useState } from "react";

export default function Contact() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    setFormStatus("sent");
    setTimeout(() => setFormStatus("idle"), 3000);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-card">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <span className="text-[#60a5fa] font-semibold text-sm uppercase tracking-wider">
                Get in Touch
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4 text-white">
                Let's Build Something Amazing
              </h2>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                Have a project in mind? Let's discuss how I can help you build
                a custom Shopify app or optimize your e-commerce experience.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-white/70 hover:text-white transition-colors">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-[#60a5fa]">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <span>asadurrehm890@gmail.com</span>
                </div>
                <div className="flex items-center gap-4 text-white/70 hover:text-white transition-colors">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-[#60a5fa]">
                    <i className="fas fa-phone"></i>
                  </div>
                  <span>+923369950079</span>
                </div>
                <div className="flex items-center gap-4 text-white/70 hover:text-white transition-colors">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-[#60a5fa]">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <span>Islamabad, Pakistan · Remote Worldwide</span>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <a
                  href="https://www.linkedin.com/in/asad-ur-rehman-aa183711b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin-in text-white"></i>
                </a>
                <a
                  href="https://github.com/asadurrehm890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
                  aria-label="GitHub"
                >
                  <i className="fab fa-github text-white"></i>
                </a>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="input-field"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="input-field"
                />
              </div>
              <input
                type="text"
                placeholder="Store URL (optional)"
                className="input-field"
              />
              <textarea
                rows={5}
                placeholder="Tell me about your project..."
                required
                className="input-field resize-none"
                style={{ minHeight: "120px" }}
              ></textarea>
              <button
                type="submit"
                className="btn-primary btn-large w-full sm:w-auto justify-center"
                disabled={formStatus === "sending"}
              >
                {formStatus === "sending" ? (
                  <><i className="fas fa-spinner fa-spin"></i> Sending...</>
                ) : formStatus === "sent" ? (
                  <><i className="fas fa-check-circle"></i> Sent! Thank You</>
                ) : (
                  <><i className="fas fa-paper-plane"></i> Send Message</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}