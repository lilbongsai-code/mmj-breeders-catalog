import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@/pages/home";
import Breeders from "@/pages/breeders";
import Vlog from "@/pages/vlog";
import Artists from "@/pages/artists";

p
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/breeders" element={<Breeders />} />
        <Route path="/vlog" element={<Vlog />} />
        <Route path="/artists" element={<Artists />} />
      </Routes>
    </BrowserRouter>
  );
}
