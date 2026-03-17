import React from "react";
import { ShieldCheck, Clock, BadgeCheck } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck size={28} />,
    title: "Verified Professionals",
    desc: "All service providers are background-checked and certified for your safety.",
  },
  {
    icon: <Clock size={28} />,
    title: "Same-Day Service",
    desc: "Need urgent help? Book now and get service at your doorstep today.",
  },
  {
    icon: <BadgeCheck size={28} />,
    title: "Satisfaction Guarantee",
    desc: "Your happiness is our priority. 100% money-back if you're not satisfied.",
  },
];

const Features = () => {
  return (
    <section className="bg-white py-24 antialiased">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 lg:gap-16 text-center">
        {features.map((item, index) => (
          <div key={index} className="group flex flex-col items-center">
            
            {/* Icon Box - Fixed "Tej" colors to Soft Teal */}
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#4EC9B0]/10 text-[#4EC9B0] shadow-sm mb-8 group-hover:bg-[#4EC9B0] group-hover:text-white transition-all duration-500 transform group-hover:-translate-y-2">
              {item.icon}
            </div>

            {/* Title - Softened Font */}
            <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-[#4EC9B0] transition-colors duration-300">
              {item.title}
            </h3>

            {/* Description - Professional & Light */}
            <p className="text-gray-500 text-[15px] leading-relaxed font-normal max-w-[280px]">
              {item.desc}
            </p>
            
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;