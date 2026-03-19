import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Home from "./pages/Home";
import ServicePage from "./pages/Service";
import Professionals from "./pages/Professionals";
import Booking from "./pages/Booking";
import ProDetails from "./pages/ProDetails";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <BrowserRouter>
       <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicePage/>}/>
        <Route path="/services/:serviceName" element={<Professionals />} />
        <Route path="/book/:id" element={<Booking />} />
        <Route path="/pro/:id" element={<ProDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>

    </BrowserRouter>
    
  );
}

export default App;