import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Home from "./pages/Home";
import ServicePage from "./pages/Service";
import Professionals from "./pages/Professionals";
import Booking from "./pages/Booking";
import ProDetails from "./pages/ProDetails";
import Favorites from "./pages/Favorites";
import MyBookings from "./pages/MyBookings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProDashboard from "./pages/ProDashboard";
import ServiceRequests from "./pages/ServiceRequests";

function App() {
  return (
    <BrowserRouter>
       <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/services" element={<ServicePage/>}/>
        <Route path="/services/:serviceName" element={<Professionals />} />
        <Route path="/book/:id" element={<Booking />} />
        <Route path="/pro/:id" element={<ProDetails />} />
        <Route path="/pro-dashboard" element={<ProDashboard />} />
        <Route path="/pro-jobs" element={<ServiceRequests />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>

    </BrowserRouter>
    
  );
}

export default App;