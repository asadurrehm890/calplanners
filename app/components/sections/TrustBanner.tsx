export default function TrustBanner() {
  const items = [
    { icon: "fa-shield-alt", title: "100% custom code", desc: "No cookie‑cutter templates" },
    { icon: "fa-sync-alt", title: "Ongoing support", desc: "24/7 maintenance & updates" },
    { icon: "fa-chart-line", title: "Revenue‑focused", desc: "Designed to convert & scale" },
    { icon: "fa-clock", title: "Fast delivery", desc: "MVP in 4‑6 weeks" },
  ];

  return (
    <div className="container">
      <div className="bg-[#1e293b] rounded-[60px] py-10 px-6 md:px-12 text-white">
        <div className="flex flex-wrap justify-around gap-6 text-center">
          {items.map((item, index) => (
            <div key={index} className="flex-1 min-w-[140px]">
              <i className={`fas ${item.icon} text-4xl text-[#4ca16b] mb-2 block`}></i>
              <h4 className="font-bold text-lg">{item.title}</h4>
              <p className="opacity-70 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}