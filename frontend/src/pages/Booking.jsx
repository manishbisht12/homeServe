import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Calendar, Clock, MapPin, Star, ShieldCheck, Loader2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    date: "",
    time: "",
    professional: "",
    service: "",
    notes: "ss" // As per your screenshot
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Step 1: Try fetching as Professional first (most likely case from ProfessionalCard)
        const pDetailRes = await fetch(`http://localhost:5000/api/professionals/detail/${id}`);
        const pDetailData = await pDetailRes.json();

        let targetServiceTitle = "";
        let preSelectedPro = "";

        if (pDetailData && pDetailData._id) {
          // It's a professional ID
          preSelectedPro = pDetailData.name;
          targetServiceTitle = pDetailData.service;
          
          setFormData(prev => ({ 
            ...prev, 
            professional: preSelectedPro,
            service: targetServiceTitle.charAt(0).toUpperCase() + targetServiceTitle.slice(1)
          }));
          
          setService({
            title: targetServiceTitle.charAt(0).toUpperCase() + targetServiceTitle.slice(1),
            Image: pDetailData.image,
            rating: pDetailData.rating,
            reviews: pDetailData.reviews,
            price: pDetailData.price
          });
        } else {
          // Step 2: Try fetching as Service (fallback)
          const sRes = await fetch(`http://localhost:5000/api/services/${id}`);
          const sData = await sRes.json();
          
          if (sData && sData._id) {
            setService(sData);
            targetServiceTitle = sData.title;
            setFormData(prev => ({ ...prev, service: targetServiceTitle }));
          } else {
            targetServiceTitle = "plumbing";
          }
        }

        // Step 3: Fetch all Professionals for this service category
        if (targetServiceTitle) {
          const serviceQuery = targetServiceTitle.toLowerCase().replace(/\s+/g, "-");
          const pRes = await fetch(`http://localhost:5000/api/professionals/${serviceQuery}`);
          const pListData = await pRes.json();
          
          setProfessionals(pListData);
          
          // Determine which professional to select
          if (pListData.length > 0) {
            // Use preSelectedPro if it exists in the list, otherwise use the first one
            const finalPro = preSelectedPro || pListData[0].name;
            setFormData(prev => ({ ...prev, professional: finalPro }));
          }
        }

      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error loading booking details");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get existing bookings
    const existing = JSON.parse(localStorage.getItem("myBookings")) || [];
    
    // Create new booking object matching your screenshot UI
    const newBooking = {
      id: Date.now(),
      status: "confirmed",
      ...formData
    };

    localStorage.setItem("myBookings", JSON.stringify([newBooking, ...existing]));

    toast.success("Booking Confirmed!", {
      style: { borderRadius: '15px', background: '#333', color: '#fff' }
    });

    setTimeout(() => navigate("/my-bookings"), 1500);
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen antialiased">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-[#4EC9B0] transition-colors mb-8 font-bold text-sm">
          <ChevronLeft size={20} /> Back to Selection
        </button>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* LEFT COLUMN: Summary (Keeping your original UI) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm">
              <div className="relative h-64">
                <img src={service?.Image || "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"} className="w-full h-full object-cover" alt="Service" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white text-left">
                  <span className="bg-[#4EC9B0] text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">{service?.title || "Loading..."}</span>
                  <h2 className="text-3xl font-extrabold mt-2">{service?.title || "Expert Repair"}</h2>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1 bg-[#F0FDF4] px-3 py-1.5 rounded-xl text-[#4EC9B0] font-bold text-sm"><Star size={16} fill="currentColor" /> {service?.rating || "4.8"}</div>
                  <span className="text-gray-400 font-medium text-sm">({service?.reviews || "234"} reviews)</span>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6 flex justify-between items-center">
                  <span className="text-gray-500 font-bold">Estimated Price</span>
                  <span className="text-2xl font-black text-[#0F172A]">${service?.price || "80 - 150"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Updated Booking Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-xl">
            <h2 className="text-3xl font-extrabold text-[#0F172A] mb-8">Book Your <span className="text-[#4EC9B0]">Service</span></h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Choose Professional</label>
                <select 
                  name="professional" 
                  value={formData.professional}
                  onChange={handleChange} 
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#4EC9B0] appearance-none cursor-pointer"
                  disabled={loading || professionals.length === 0}
                >
                  {loading ? (
                    <option>Loading professionals...</option>
                  ) : professionals.length > 0 ? (
                    professionals.map((pro) => (
                      <option key={pro._id} value={pro.name}>
                        {pro.name} ({pro.role || "Expert"})
                      </option>
                    ))
                  ) : (
                    <option>No professionals available</option>
                  )}
                </select>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#0F172A]">Contact Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input required type="text" name="name" placeholder="Full Name" onChange={handleChange} className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#4EC9B0]" />
                  <input required type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#4EC9B0]" />
                </div>
                <input required type="email" name="email" placeholder="Email Address" onChange={handleChange} className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#4EC9B0]" />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#0F172A]">Service Location</h3>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 text-gray-400" size={20} />
                  <input required type="text" name="address" placeholder="House No, Street, Landmark..." onChange={handleChange} className="w-full bg-gray-50 border-none rounded-2xl p-4 pl-12 focus:ring-2 focus:ring-[#4EC9B0]" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#0F172A]">Schedule</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input required type="date" name="date" onChange={handleChange} className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#4EC9B0]" />
                  <input required type="time" name="time" onChange={handleChange} className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#4EC9B0]" />
                </div>
              </div>

              <button type="submit" className="w-full bg-[#4EC9B0] text-white py-4 rounded-2xl font-black shadow-lg hover:bg-[#41c7ac] transition-all transform hover:-translate-y-1">
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Booking;