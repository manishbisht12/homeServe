import React from "react";

const steps = [
  {
    number: "01",
    title: "Choose a Service",
    desc: "Browse our wide range of professional services and select what you need.",
  },
  {
    number: "02",
    title: "Book Appointment",
    desc: "Select your preferred date and time that fits your busy schedule.",
  },
  {
    number: "03",
    title: "Get It Done",
    desc: "Sit back and relax while our verified professional delivers top-quality service.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        
        {/* Heading Section */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            How It <span className="text-[#4EC9B0]">Works</span>
          </h2>
          <div className="w-16 h-1.5 bg-[#4EC9B0] mx-auto mt-4 rounded-full" />
        </div>

        {/* Steps Grid */}
        <div className="relative grid md:grid-cols-3 gap-12">
          
          {/* --- FIXED DOTTED LINE --- */}
          {/* Ye line ab center mein aligned hai aur circles ke peeche chhupi hai */}
          <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-[2px] border-t-2 border-dashed border-gray-200 -z-0" />

          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center group relative z-10">
              
              {/* Number Box */}
              <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-white border-2 border-gray-100 border rounded-4xl text-[#4EC9B0] text-2xl font-black shadow-sm mb-8 group-hover:bg-[#4EC9B0] group-hover:text-white group-hover:border-[#4EC9B0] transition-all duration-500 transform group-hover:-translate-y-2">
                {step.number}
              </div>

          {/* Title */}
<h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-[#4EC9B0] transition-colors duration-300">
  {step.title}
</h3>

{/* Description */}
<p className="text-gray-500 text-[15px] leading-relaxed font-normal max-w-[250px]">
  {step.desc}
</p>
              
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;