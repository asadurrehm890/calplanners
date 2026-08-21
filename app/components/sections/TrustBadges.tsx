const badges = [
  { icon: "fa-shield-alt", text: "100% Custom Code", subtext: "No templates" },
  { icon: "fa-headset", text: "Ongoing Support", subtext: "24/7 maintenance" },
  { icon: "fa-chart-line", text: "Revenue Focused", subtext: "Built to convert" },
  { icon: "fa-clock", text: "Fast Delivery", subtext: "MVP in 4-6 weeks" },
];

export default function TrustBadges() {
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#2563eb]">
                <i className={`fas ${item.icon}`}></i>
              </div>
              <div>
                <div className="font-semibold text-sm">{item.text}</div>
                <div className="text-xs text-[#64748b]">{item.subtext}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}