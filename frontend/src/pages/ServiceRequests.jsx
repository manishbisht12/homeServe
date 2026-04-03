import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check, X, MapPin, Calendar, User, Clock, ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer"; 

const ServiceRequests = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    if (!user || user.role !== "pro") {
      navigate("/");
    }
  }, [navigate, user]);

  const [requests, setRequests] = useState([
    { 
      id: "REQ001", 
      user: "Amit Sharma", 
      service: "Leakage Repair", 
      date: "Oct 24, 2026", 
      time: "10:30 AM", 
      address: "Malviya Nagar, Jaipur", 
      price: "500",
      status: "pending" 
    },
    { 
      id: "REQ002", 
      user: "Priya Verma", 
      service: "Pipe Installation", 
      date: "Oct 25, 2026", 
      time: "02:00 PM", 
      address: "Vaishali Nagar, Jaipur", 
      price: "1200",
      status: "pending" 
    }
  ]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] antialiased">
      {/* 1. Navbar at the Top */}
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Service Requests</h1>
            <p className="text-slate-500 font-medium mt-1">Manage your incoming bookings and schedule.</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-white px-6 py-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-[#4EC9B0] rounded-full animate-pulse"></div>
              <span className="font-bold text-sm text-slate-700">{requests.length} Active Requests</span>
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="grid gap-6">
          {requests.length > 0 ? (
            requests.map((req) => (
              <div 
                key={req.id} 
                className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#4EC9B0]/20 transition-all duration-500 group"
              >
                <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
                  
                  {/* User Avatar & Info */}
                  <div className="flex gap-5 items-center flex-1">
                    <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-400 group-hover:bg-[#4EC9B0]/10 group-hover:text-[#4EC9B0] transition-colors border border-slate-100">
                      <User size={30} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-black text-slate-900">{req.user}</h3>
                        <span className="text-[10px] font-black bg-slate-900 text-white px-2 py-0.5 rounded-lg uppercase tracking-tighter">ID: {req.id}</span>
                      </div>
                      <div className="flex flex-wrap gap-y-2 gap-x-5 mt-2">
                        <p className="text-sm text-slate-500 flex items-center gap-1.5 font-bold italic">
                          <span className="w-1.5 h-1.5 bg-[#4EC9B0] rounded-full"></span> {req.service}
                        </p>
                        <p className="text-sm text-slate-400 flex items-center gap-1.5 font-medium">
                          <MapPin size={14} className="text-slate-300"/> {req.address}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Date & Time Badge */}
                  <div className="flex flex-row lg:flex-col gap-4 w-full lg:w-auto border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0 lg:pl-8">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-slate-50 rounded-xl text-slate-500"><Calendar size={18} /></div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Date</p>
                        <p className="text-sm font-black text-slate-700">{req.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-slate-50 rounded-xl text-slate-500"><Clock size={18} /></div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Time</p>
                        <p className="text-sm font-black text-slate-700">{req.time}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 w-full lg:w-auto pt-4 lg:pt-0">
                    <button className="flex-1 lg:flex-none p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100">
                      <X size={22} />
                    </button>
                    <button className="flex-2 lg:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-[#4EC9B0] text-white rounded-2xl font-black text-sm shadow-lg shadow-[#4EC9B0]/30 hover:scale-[1.02] active:scale-95 transition-all">
                      <Check size={20} /> 
                      <span>Accept Booking</span>
                    </button>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-[3rem] p-20 border border-slate-100 text-center">
               <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                  <Clock size={40} />
               </div>
               <h3 className="text-xl font-bold text-slate-900">No New Requests</h3>
               <p className="text-slate-400 mt-2 font-medium">Sit back and relax! New requests will appear here.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceRequests;