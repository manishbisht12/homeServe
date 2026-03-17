import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ServicePage from "./pages/Service";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicePage/>}/>
      </Routes>

    </BrowserRouter>
    
  );
}

export default App;