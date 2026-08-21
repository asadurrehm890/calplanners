const caseStudies = [
  {
    title: "Live Selling App",
    client: "burdauea.com",
    description:
      "Built a live selling app with real-time chat, product selection, and one-click checkout during streams.",
    tech: ["React", "Node.js", "WebSocket", "Shopify API"],
    icon: "fa-broadcast-tower",
  },
  {
    title: "Bulk Product Importer",
    client: "parts4gsm.com",
    description:
      "Imported complex product data from Lighthouse CMS including images, variants, metafields, and metaobjects.",
    tech: ["GraphQL", "REST API", "Shopify"],
    icon: "fa-cubes",
  },
  {
    title: "3D Virtual Try-On",
    client: "bylaylasaleh.com",
    description:
      "Webcam-based glasses try-on with real-time overlay and interactive product visualization.",
    tech: ["WebRTC", "Three.js", "Shopify"],
    icon: "fa-vr-cardboard",
  },
  {
    title: "Warranty & Claims",
    client: "Custom Solution",
    description:
      "Full warranty registration, claim management, admin panel with email and file handling.",
    tech: ["React", "Node.js", "Shopify Admin API"],
    icon: "fa-file-signature",
  },
];

export default function CaseStudies() {
  return (
    <section id="cases">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#2563eb] font-semibold text-sm uppercase tracking-wider">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Case Studies
          </h2>
          <p className="text-[#475569]">
            Real projects with real impact. Built for brands like burdauea.com, parts4gsm.com, and bylaylasaleh.com.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {caseStudies.map((study, index) => (
            <div key={index} className="card hover:border-[#2563eb]/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#2563eb]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className={`fas ${study.icon} text-[#2563eb]`}></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold">{study.title}</h3>
                  <p className="text-sm text-[#2563eb] font-medium">{study.client}</p>
                </div>
              </div>
              <p className="text-[#475569] text-sm mt-3 leading-relaxed">
                {study.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {study.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-[#f1f5f9] text-[#475569] rounded-full text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}