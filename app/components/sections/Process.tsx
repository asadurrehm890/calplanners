import { processSteps } from "@/app/data/processSteps";

export default function Process() {
  return (
    <section id="process" className="py-16">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">How it works</h2>
        <p className="text-gray-600 max-w-2xl mb-10">A transparent, collaborative process from idea to launch.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step) => (
            <div key={step.number} className="bg-white rounded-[30px] p-6 text-center border border-gray-100 shadow-sm">
              <div className="bg-[#e9f3ef] text-[#1e4b33] w-10 h-10 rounded-full flex items-center justify-center font-extrabold mx-auto mb-4">
                {step.number}
              </div>
              <h4 className="font-bold text-lg mb-1">{step.title}</h4>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}