"use client";

import { useState } from "react";

export default function Contact() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    await new Promise(resolve => setTimeout(resolve, 1000));
    setFormStatus("sent");
    setTimeout(() => setFormStatus("idle"), 3000);
  };

  return (
    <section id="contact" className="section-padding bg-[#0a0a0f] text-white">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="badge badge-blue mb-4 inline-block">Get in Touch</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Let's Build Something <br />
              <span className="gradient-text">Amazing</span>
            </h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Have a project in mind? Let's discuss how I can help you build
              a custom Shopify app or optimize your e-commerce experience.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-white/70 hover:text-white transition-colors">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-[#60a5fa]">
                  <i className="fas fa-envelope"></i>
                </div>
                <span>asadurrehm890@gmail.com</span>
              </div>
              <div className="flex items-center gap-4 text-white/70 hover:text-white transition-colors">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-[#60a5fa]">
                  <i className="fas fa-phone"></i>
                </div>
                <span>+923369950079</span>
              </div>
              <div className="flex items-center gap-4 text-white/70 hover:text-white transition-colors">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-[#60a5fa]">
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
                className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="https://github.com/asadurrehm890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all"
                aria-label="GitHub"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label text-white/80">Your Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  required
                  className="input-field bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:bg-white/10"
                />
              </div>
              <div>
                <label className="form-label text-white/80">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  required
                  className="input-field bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:bg-white/10"
                />
              </div>
            </div>

            <div>
              <label className="form-label text-white/80">Store URL (optional)</label>
              <input
                type="text"
                placeholder="yourstore.myshopify.com"
                className="input-field bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:bg-white/10"
              />
            </div>

            <div>
              <label className="form-label text-white/80">Project Details</label>
              <textarea
                rows={5}
                placeholder="Tell me about your project..."
                required
                className="input-field bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:bg-white/10 resize-none min-h-[120px]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn-primary w-full justify-center btn-large"
              disabled={formStatus === "sending"}
            >
              {formStatus === "sending" ? (
                <><i className="fas fa-spinner fa-spin"></i> Sending...</>
              ) : formStatus === "sent" ? (
                <><i className="fas fa-check-circle"></i> Message Sent!</>
              ) : (
                <><i className="fas fa-paper-plane"></i> Send Message</>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}