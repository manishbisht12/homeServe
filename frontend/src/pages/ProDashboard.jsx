import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProProfileForm from "../components/ProProfileForm"; // Import the form component
import { User, Briefcase, IndianRupee, Clock } from "lucide-react";

const ProDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    if (!user || user.role !== "pro") {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-[#1e293b]">Professional Dashboard</h1>
            <p className="text-gray-500 font-medium">Manage your profile and track your business growth.</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="p-4 bg-blue-50 text-blue-500 rounded-2xl"><Briefcase /></div>
            <div>
              <p className="text-gray-400 font-bold text-xs uppercase tracking-wider">Total Jobs</p>
              <h2 className="text-3xl font-black text-[#1e293b]">12</h2>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="p-4 bg-emerald-50 text-[#4EC9B0] rounded-2xl"><IndianRupee /></div>
            <div>
              <p className="text-gray-400 font-bold text-xs uppercase tracking-wider">Earnings</p>
              <h2 className="text-3xl font-black text-[#1e293b]">₹12,500</h2>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="p-4 bg-orange-50 text-orange-500 rounded-2xl"><Clock /></div>
            <div>
              <p className="text-gray-400 font-bold text-xs uppercase tracking-wider">Pending</p>
              <h2 className="text-3xl font-black text-[#1e293b]">3</h2>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Form Section (Left 2/3) */}
          <div className="lg:col-span-2">
            <ProProfileForm />
          </div>

          {/* Sidebar Section (Right 1/3) */}
          <div className="space-y-6">
            <div className="bg-[#1e293b] text-white p-8 rounded-[2rem] shadow-xl">
              <h3 className="text-xl font-bold mb-4">Pro Tip 💡</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Keep your description detailed and set a competitive hourly price to attract more customers in your area.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold mb-4 text-[#1e293b]">Recent Notifications</h3>
              <div className="space-y-4">
                <p className="text-sm text-gray-400 italic">No new notifications.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProDashboard;