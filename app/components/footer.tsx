export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-6 mt-auto">
      <div className="container mx-auto px-4 flex flex-wrap justify-between items-center gap-4 text-sm text-gray-500">
        <span>© 2026 Asad ur Rehman – Custom Shopify App Development</span>
        <span className="flex items-center gap-2">
          <i className="fas fa-code"></i> Built with React, Node, Shopify
        </span>
      </div>
    </footer>
  );
}