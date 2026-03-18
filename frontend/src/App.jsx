import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ServicePage from "./pages/Service";
import Professionals from "./pages/Professionals";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicePage/>}/>
        <Route path="/services/:serviceName" element={<Professionals />} />
      </Routes>

    </BrowserRouter>
    
  );
}

export default App;