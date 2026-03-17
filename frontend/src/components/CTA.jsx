import React from "react";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="relative overflow-hidden bg-white py-24 text-center border-t border-gray-100">
      {/* Subtle Decorative Background Glow (Lighter for White Theme) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4EC9B0]/5 blur-[120px] rounded-full" />
      
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        {/* Subtle Badge */}
        <span className="text-[#4EC9B0] text-sm font-bold tracking-widest uppercase mb-4 block">
          Take the first step
        </span>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
          Ready to Get <span className="text-[#4EC9B0]">Started?</span>
        </h2>

        {/* Subtitle */}
        <p className="mt-6 text-gray-600 text-lg leading-relaxed">
          Join thousands of satisfied customers who trust <span className="text-gray-900 font-semibold">HomeServe</span> for their home service needs. Quality work, guaranteed.
        </p>

        {/* Button */}
        <div className="mt-10">
          <button className="group inline-flex items-center gap-3 bg-[#4EC9B0] text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-[#4EC9B0]/30 hover:bg-[#3fb39a] hover:scale-105 transition-all duration-300">
            Book a Service Now
            <ArrowRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* Small Trust Note */}
        <p className="mt-6 text-gray-400 text-sm font-medium">
          No credit card required to browse services
        </p>
      </div>
    </section>
  );
};

export default CTA;