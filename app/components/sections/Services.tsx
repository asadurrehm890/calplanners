import { services } from "@/app/data/services";

export default function Services() {
  return (
    <section id="services">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Tailored Shopify apps</h2>
        <p className="text-gray-600 max-w-2xl mb-10">
          Every app is custom‑built for your store's unique needs. Here are some of the solutions I've delivered.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-[30px] p-6 border border-gray-100 shadow-sm card-hover"
            >
              <i className={`fas ${service.icon} text-4xl text-[#2d7a4f] mb-4 block`}></i>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}