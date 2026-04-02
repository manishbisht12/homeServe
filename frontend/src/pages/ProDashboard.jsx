import React from "react";
import Navbar from "../components/Navbar";


const ProDashboard = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-32">
        <h1 className="text-3xl font-bold">Professional Dashboard</h1>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {/* Example Stats Card */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <p className="text-gray-400 font-bold text-sm uppercase">Total Jobs</p>
            <h2 className="text-4xl font-black text-[#1e293b] mt-2">12</h2>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <p className="text-gray-400 font-bold text-sm uppercase">Earnings</p>
            <h2 className="text-4xl font-black text-[#4EC9B0] mt-2">$1,250</h2>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <p className="text-gray-400 font-bold text-sm uppercase">New Requests</p>
            <h2 className="text-4xl font-black text-orange-500 mt-2">3</h2>
          </div>
        </div>
        
        {/* Table for incoming bookings */}
        <div className="mt-10 bg-white rounded-3xl p-8 border border-gray-100">
          <h3 className="text-xl font-bold mb-6">Recent Job Requests</h3>
          <p className="text-gray-400">No new requests at the moment.</p>
        </div>
      </main>
    </div>
  );
};

export default ProDashboard;