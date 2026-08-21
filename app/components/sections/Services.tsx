const services = [
  {
    icon: "fa-file-signature",
    title: "Warranty & Claims",
    description:
      "Custom warranty registration and claim management with admin panels, email handling, and file uploads.",
  },
  {
    icon: "fa-broadcast-tower",
    title: "Live Selling",
    description:
      "Interactive live streaming with real-time chat, product selection, and seamless one-click checkout.",
  },
  {
    icon: "fa-cubes",
    title: "Bulk Product Importer",
    description:
      "Import complex product data including images, variants, metafields, and metaobjects from any CMS.",
  },
  {
    icon: "fa-vr-cardboard",
    title: "3D Virtual Try-On",
    description:
      "Webcam-based product try-on for glasses and accessories with real-time overlay and interactivity.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-gradient-section">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#2563eb] font-semibold text-sm uppercase tracking-wider">
            What I Build
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Tailored Shopify Apps
          </h2>
          <p className="text-[#475569]">
            Every app is custom-built for your store's unique needs. Here are some of the solutions I've delivered.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className="card">
              <div className="w-12 h-12 bg-[#2563eb]/10 rounded-xl flex items-center justify-center mb-4">
                <i className={`fas ${service.icon} text-[#2563eb] text-xl`}></i>
              </div>
              <h3 className="text-lg font-bold mb-2">{service.title}</h3>
              <p className="text-[#475569] text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}