
import { BrowserRouter, Routes, Route } from "react-router-dom";import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Hackathons from "./components/Hackathons";
import Colleges from "./components/Colleges";
import MOU from "./components/MOU";
export default function App() {
  return (
    <>
       <BrowserRouter>
      <Navbar />
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hackathons" element={<Hackathons />} />
         <Route path="/colleges" element={<Colleges/>} />
      <Route path="/mou" element={<MOU />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}
