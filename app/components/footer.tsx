export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-8 mt-auto">
      <div className="container">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <p className="text-sm text-[#64748b]">
            © 2026 Asad ur Rehman — Shopify App Developer
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/asad-ur-rehman-aa183711b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#64748b] hover:text-[#2563eb] transition-colors"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://github.com/asadurrehm890"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#64748b] hover:text-[#2563eb] transition-colors"
              aria-label="GitHub"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="mailto:asadurrehm890@gmail.com"
              className="text-[#64748b] hover:text-[#2563eb] transition-colors"
              aria-label="Email"
            >
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}