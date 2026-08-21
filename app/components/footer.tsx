export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white py-8 mt-auto">
      <div className="container">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="text-sm opacity-70">
            © 2026 Asad ur Rehman — Full-Stack Shopify Developer
          </div>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/asad-ur-rehman-aa183711b/"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 transition-opacity"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://github.com/asadurrehm890"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 transition-opacity"
              aria-label="GitHub"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="mailto:asadurrehm890@gmail.com"
              className="opacity-70 hover:opacity-100 transition-opacity"
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