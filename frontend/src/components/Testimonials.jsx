import React from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Jessica Williams",
    role: "Homeowner",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "HomeServe made it so easy to find a reliable plumber. The booking process was seamless, and the professional arrived on time. Highly recommend!",
  },
  {
    name: "Michael Chen",
    role: "Property Manager",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "We use HomeServe for all our property maintenance needs. The quality of service and professionalism is outstanding. Best decision we've made!",
  },
  {
    name: "Sarah Johnson",
    role: "Business Owner",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "The electrician we booked through HomeServe was excellent. Professional, knowledgeable, and completed the job perfectly. Will definitely use again!",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gray-100 py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Heading Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            What Our <span className="text-[#4EC9B0]">Customers</span> Say
          </h2>
          <div className="w-20 h-1.5 bg-[#4EC9B0] mx-auto mt-4 rounded-full" />
          <p className="text-gray-500 mt-6 max-w-2xl mx-auto text-lg">
            Join thousands of satisfied customers who trust HomeServe for their home service needs.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#4EC9B0]/30 transition-all duration-500 relative overflow-hidden"
            >
              {/* Quote Icon with Theme Color */}
              <div className="absolute top-8 right-8 text-[#4EC9B0]/10 group-hover:text-[#4EC9B0]/20 transition-colors">
                <Quote size={48} fill="currentColor" stroke="none" />
              </div>

              {/* User Profile */}
              <div className="flex items-center gap-4 relative z-10">
                <div className="p-1 rounded-full border-2 border-[#4EC9B0]/20 group-hover:border-[#4EC9B0] transition-colors duration-500">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    {item.name}
                  </h3>
                  <p className="text-sm font-medium text-[#4EC9B0] uppercase tracking-wider">
                    {item.role}
                  </p>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex gap-1 mt-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-[#4EC9B0]"
                    fill="currentColor"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-600 mt-5 leading-relaxed italic relative z-10">
                "{item.text}"
              </p>

              {/* --- MOVING LINE REMOVED FROM HERE --- */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;