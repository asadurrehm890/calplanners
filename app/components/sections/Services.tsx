const services = [
  {
    icon: "fa-file-signature",
    title: "Warranty & Claims",
    description:
      "Custom warranty registration, claim management, admin panels with email handling, and file uploads.",
    iconBg: "feature-icon-blue",
  },
  {
    icon: "fa-broadcast-tower",
    title: "Live Selling",
    description:
      "Interactive live streaming with real-time chat, product selection, and seamless one-click checkout.",
    iconBg: "feature-icon-purple",
  },
  {
    icon: "fa-cubes",
    title: "Bulk Product Importer",
    description:
      "Import complex product data including images, variants, metafields, and metaobjects from any CMS.",
    iconBg: "feature-icon-green",
  },
  {
    icon: "fa-vr-cardboard",
    title: "3D Virtual Try-On",
    description:
      "Webcam-based product try-on for glasses and accessories with real-time overlay and interactivity.",
    iconBg: "feature-icon-orange",
  },
];

export default function Services() {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="badge badge-blue mb-4">What I Build</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Tailored Shopify Apps
          </h2>
          <p className="text-[#475569] text-lg">
            Every app is custom-built for your store's unique needs. Here are some solutions I've delivered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className="card text-center">
              <div className={`feature-icon ${service.iconBg} mx-auto mb-4`}>
                <i className={`fas ${service.icon}`}></i>
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