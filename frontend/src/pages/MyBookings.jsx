import React, { useEffect, useState } from "react";
import { 
  Mail, Phone, Calendar, Clock, MapPin, 
  MessageSquare, RotateCcw, Trash2, User, 
  X, CheckCircle2 
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  
  // Reschedule States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newSchedule, setNewSchedule] = useState({ date: "", time: "" });

  // Load Data
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("myBookings")) || [];
    setBookings(saved);
  }, []);

  // Cancel Booking Logic
  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      const updated = bookings.filter(b => b.id !== id);
      setBookings(updated);
      localStorage.setItem("myBookings", JSON.stringify(updated));
      toast.error("Booking Cancelled", {
        icon: '🗑️',
        style: { borderRadius: '12px', background: '#333', color: '#fff' }
      });
    }
  };

  // Reschedule Logic
  const openRescheduleModal = (booking) => {
    setSelectedBooking(booking);
    setNewSchedule({ date: booking.date, time: booking.time });
    setIsModalOpen(true);
  };

  const handleSaveReschedule = () => {
    if (!newSchedule.date || !newSchedule.time) {
      return toast.error("Please select both date and time");
    }

    const updatedBookings = bookings.map(b => 
      b.id === selectedBooking.id ? { ...b, date: newSchedule.date, time: newSchedule.time } : b
    );
    
    setBookings(updatedBookings);
    localStorage.setItem("myBookings", JSON.stringify(updatedBookings));
    setIsModalOpen(false);
    toast.success("Schedule Updated Successfully! 🕒");
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen antialiased flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-6 pt-32 pb-20 w-full">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-[#0F172A] tracking-tight">My Bookings</h1>
          <p className="text-gray-500 mt-2 font-medium">Manage and track all your service bookings</p>
        </div>

        <div className="space-y-8">
          {bookings.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-gray-100 flex flex-col items-center">
              <div className="bg-gray-50 p-6 rounded-full mb-4">
                <Calendar className="text-gray-300" size={48} />
              </div>
              <h3 className="text-xl font-bold text-gray-400">No Bookings Found</h3>
              <p className="text-gray-400 text-sm mt-1">Book a service to see it here.</p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div key={booking.id} className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:shadow-gray-200/60 transition-all duration-300 group">
                <div className="flex flex-col lg:flex-row gap-10">
                  
                  {/* LEFT: Info Section */}
                  <div className="flex-1">
                    <div className="flex items-start gap-5 mb-8">
                      <div className="relative">
                        <img 
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" 
                          className="w-20 h-20 rounded-[1.5rem] object-cover border-4 border-gray-50 shadow-sm" 
                          alt="Pro" 
                        />
                        <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
                          <CheckCircle2 size={18} className="text-[#4EC9B0] fill-white" />
                        </div>
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-[#0F172A]">{booking.service}</h2>
                        <p className="text-gray-400 font-bold text-sm mb-3">with {booking.professional}</p>
                        <span className="bg-[#DCFCE7] text-[#15803D] px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] border border-green-200">
                          {booking.status}
                        </span>
                      </div>
                    </div>

                    {/* Details Grid (Matching your screenshot style) */}
                    <div className="grid md:grid-cols-2 gap-y-8 gap-x-12 py-8 border-t border-gray-50">
                      <DetailItem icon={<User size={16}/>} label="Name" value={booking.name} />
                      <DetailItem icon={<Calendar size={16}/>} label="Date" value={booking.date} />
                      <DetailItem icon={<Mail size={16}/>} label="Email" value={booking.email} />
                      <DetailItem icon={<Clock size={16}/>} label="Time" value={booking.time} />
                      <DetailItem icon={<Phone size={16}/>} label="Phone" value={booking.phone} />
                      <DetailItem icon={<MapPin size={16}/>} label="Address" value={booking.address} />
                    </div>

                    {/* Notes Section */}
                    <div className="mt-4 p-5 bg-gray-50 rounded-2xl">
                      <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-1">Notes</p>
                      <p className="text-[#0F172A] font-semibold text-sm leading-relaxed">{booking.notes || "No extra instructions provided."}</p>
                    </div>
                  </div>

                  {/* RIGHT: Buttons (Matching screenshot) */}
                  <div className="lg:w-52 flex flex-col gap-3 justify-center">
                    <button className="flex items-center justify-center gap-2 w-full py-4 border-2 border-gray-100 rounded-2xl font-black text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-200 transition-all active:scale-95">
                      <MessageSquare size={18} /> Contact
                    </button>
                    <button 
                      onClick={() => openRescheduleModal(booking)}
                      className="flex items-center justify-center gap-2 w-full py-4 border-2 border-gray-100 rounded-2xl font-black text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-200 transition-all active:scale-95"
                    >
                      <RotateCcw size={18} /> Reschedule
                    </button>
                    <button 
                      onClick={() => handleCancel(booking.id)}
                      className="flex items-center justify-center gap-2 w-full py-4 bg-[#E11D48] rounded-2xl font-black text-sm text-white hover:bg-[#BE123C] shadow-lg shadow-red-100 transition-all active:scale-95 mt-2"
                    >
                      <Trash2 size={18} /> Cancel
                    </button>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* RESCHEDULE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-6 bg-[#0F172A]/40 backdrop-blur-md">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in duration-300 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute right-8 top-8 text-gray-300 hover:text-gray-900 transition-colors">
              <X size={24} />
            </button>

            <div className="text-center mb-8">
              <div className="bg-[#F0FDF4] w-20 h-20 rounded-3xl flex items-center justify-center text-[#4EC9B0] mx-auto mb-6 shadow-inner">
                <RotateCcw size={36} />
              </div>
              <h3 className="text-2xl font-black text-[#0F172A]">Reschedule Service</h3>
              <p className="text-gray-400 font-medium text-sm mt-2">Update your booking schedule</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase ml-1">Select New Date</label>
                <div className="relative">
                  <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input 
                    type="date" 
                    value={newSchedule.date}
                    onChange={(e) => setNewSchedule({...newSchedule, date: e.target.value})}
                    className="w-full pl-14 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#4EC9B0] outline-none font-bold text-[#0F172A] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase ml-1">Select New Time</label>
                <div className="relative">
                  <Clock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input 
                    type="time" 
                    value={newSchedule.time}
                    onChange={(e) => setNewSchedule({...newSchedule, time: e.target.value})}
                    className="w-full pl-14 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#4EC9B0] outline-none font-bold text-[#0F172A] transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 bg-gray-50 text-gray-500 rounded-2xl font-black text-sm hover:bg-gray-100 transition-all"
                >
                  Go Back
                </button>
                <button 
                  onClick={handleSaveReschedule}
                  className="flex-1 py-4 bg-[#4EC9B0] text-white rounded-2xl font-black text-sm shadow-xl shadow-[#4EC9B0]/30 hover:bg-[#3db89f] transition-all transform active:scale-95"
                >
                  Confirm Change
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

// Sub-component for Details (Clean UI)
const DetailItem = ({ icon, label, value }) => (
  <div className="space-y-2 group/item">
    <div className="flex items-center gap-2 text-gray-400 font-black text-[10px] uppercase tracking-widest group-hover/item:text-[#4EC9B0] transition-colors">
      {icon} {label}
    </div>
    <p className="text-[#0F172A] font-bold text-sm leading-tight pl-6">{value || "Not provided"}</p>
  </div>
);

export default MyBookings;