import Link from "next/link";

export default function CtaBanner() {
  return (
    <div className="bg-gradient-to-br from-[#1e293b] to-[#2a3a4e] rounded-[60px] py-16 px-6 text-center text-white my-12">
      <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to build your Shopify app?</h2>
      <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
        Get a free consultation and a tailored quote within 24 hours.
      </p>
      <Link
        href="#contact"
        className="inline-flex items-center gap-2 bg-secondary px-10 py-4 rounded-full font-bold text-lg hover:bg-secondary-light transition-all"
      >
        <i className="fas fa-paper-plane"></i> Let's talk
      </Link>
    </div>
  );
}