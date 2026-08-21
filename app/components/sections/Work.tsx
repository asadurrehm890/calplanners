const workItems = [
  {
    title: "Live Selling App",
    client: "burdauea.com",
    description:
      "Built a live selling app with real-time chat, product selection, and one-click checkout during streams.",
    tags: ["React", "Node.js", "WebSocket", "Shopify API"],
    icon: "fa-broadcast-tower",
    color: "blue",
  },
  {
    title: "Bulk Product Importer",
    client: "parts4gsm.com",
    description:
      "Imported complex product data from Lighthouse CMS including images, variants, metafields, and metaobjects.",
    tags: ["GraphQL", "REST API", "Shopify"],
    icon: "fa-cubes",
    color: "purple",
  },
  {
    title: "3D Virtual Try-On",
    client: "bylaylasaleh.com",
    description:
      "Webcam-based glasses try-on with real-time overlay and interactive product visualization.",
    tags: ["WebRTC", "Three.js", "Shopify"],
    icon: "fa-vr-cardboard",
    color: "green",
  },
  {
    title: "Warranty & Claims",
    client: "Custom Solution",
    description:
      "Full warranty registration, claim management, admin panel with email and file handling.",
    tags: ["React", "Node.js", "Shopify Admin API"],
    icon: "fa-file-signature",
    color: "orange",
  },
];

const colorMap = {
  blue: "feature-icon-blue",
  purple: "feature-icon-purple",
  green: "feature-icon-green",
  orange: "feature-icon-orange",
};

export default function Work() {
  return (
    <section id="work" className="section-padding bg-[#f8fafc]">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="badge badge-purple mb-4">Portfolio</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Case <span className="gradient-text">Studies</span>
          </h2>
          <p className="text-[#475569] text-lg">
            Real projects with real impact. Built for brands like burdauea.com, parts4gsm.com, and bylaylasaleh.com.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {workItems.map((item, index) => (
            <div key={index} className="card">
              <div className="flex items-start gap-4">
                <div className={`feature-icon ${colorMap[item.color as keyof typeof colorMap]}`}>
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-sm text-[#2563eb] font-medium">{item.client}</p>
                </div>
              </div>
              <p className="text-[#475569] text-sm mt-3 leading-relaxed">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {item.tags.map((tag, i) => (
                  <span key={i} className="tech-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}