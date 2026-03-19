import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Calendar, Clock, MapPin, Star, ShieldCheck } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="bg-[#F9FAFB] min-h-screen antialiased">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-500 hover:text-[#4EC9B0] transition-colors mb-8 font-bold text-sm"
        >
          <ChevronLeft size={20} />
          Back to Selection
        </button>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: Service Summary */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm">
              <div className="relative h-64">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
                  className="w-full h-full object-cover"
                  alt="Service"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="bg-[#4EC9B0] text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                    Plumbing
                  </span>
                  <h2 className="text-3xl font-extrabold mt-2">Expert Repair</h2>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1 bg-[#F0FDF4] px-3 py-1.5 rounded-xl text-[#4EC9B0] font-bold text-sm">
                    <Star size={16} fill="currentColor" />
                    4.8
                  </div>
                  <span className="text-gray-400 font-medium text-sm">(234 reviews)</span>
                </div>

                <p className="text-gray-500 leading-relaxed mb-8">
                  Expert plumbing services for repairs, installations, and maintenance. Our pros are background-checked and highly rated.
                </p>

                <div className="bg-gray-50 rounded-2xl p-6 flex justify-between items-center">
                  <span className="text-gray-500 font-bold">Estimated Price</span>
                  <span className="text-2xl font-black text-[#0F172A]">$80 - $150</span>
                </div>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="flex items-center gap-4 p-6 bg-[#F0FDF4] rounded-[2rem] border border-[#4EC9B0]/10">
              <div className="bg-white p-3 rounded-2xl text-[#4EC9B0] shadow-sm">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-[#0F172A]">Secure Booking</h4>
                <p className="text-sm text-gray-500">Fully insured and 100% money-back guarantee.</p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Booking Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50">
            <h2 className="text-3xl font-extrabold text-[#0F172A] mb-8">
              Book Your <span className="text-[#4EC9B0]">Service</span>
            </h2>

            <form className="space-y-8">
              {/* Professional Selection */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Choose Professional (Optional)</label>
                <select className="w-full bg-gray-50 border-none rounded-2xl p-4 text-gray-900 font-medium focus:ring-2 focus:ring-[#4EC9B0] transition-all">
                  <option>Any available professional</option>
                  <option>Michael Rodriguez (Master Plumber)</option>
                  <option>Lisa Anderson (Senior Plumber)</option>
                </select>
              </div>

              {/* Personal Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-[#4EC9B0] rounded-full" />
                  Contact Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Full Name" className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#4EC9B0]" />
                  <input type="tel" placeholder="Phone Number" className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#4EC9B0]" />
                </div>
                <input type="email" placeholder="Email Address" className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#4EC9B0]" />
              </div>

              {/* Location */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                   <div className="w-1.5 h-6 bg-[#4EC9B0] rounded-full" />
                  Service Location
                </h3>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 text-gray-400" size={20} />
                  <input type="text" placeholder="House No, Street, Landmark..." className="w-full bg-gray-50 border-none rounded-2xl p-4 pl-12 focus:ring-2 focus:ring-[#4EC9B0]" />
                </div>
              </div>

              {/* Date & Time */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                   <div className="w-1.5 h-6 bg-[#4EC9B0] rounded-full" />
                  Schedule
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Calendar className="absolute left-4 top-4 text-gray-400" size={20} />
                    <input type="date" className="w-full bg-gray-50 border-none rounded-2xl p-4 pl-12 focus:ring-2 focus:ring-[#4EC9B0]" />
                  </div>
                  <div className="relative">
                    <Clock className="absolute left-4 top-4 text-gray-400" size={20} />
                    <input type="time" className="w-full bg-gray-50 border-none rounded-2xl p-4 pl-12 focus:ring-2 focus:ring-[#4EC9B0]" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button 
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex-1 border-2 border-gray-100 py-4 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-all order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-[#4EC9B0] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#4EC9B0]/20 hover:bg-[#41c7ac] transition-all transform hover:-translate-y-1 order-1 sm:order-2"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Booking;