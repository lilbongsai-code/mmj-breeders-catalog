import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "@/pages/home";
import Strains from "@/pages/strains";
import StrainDetail from "@/pages/strain-detail";
import Breeders from "@/pages/breeders";
import Vlog from "@/pages/vlog";
import Artists from "@/pages/artists";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/strains" element={<Strains />} />
          <Route path="/strain/:slug" element={<StrainDetail />} />
          <Route path="/breeders" element={<Breeders />} />
          <Route path="/vlog" element={<Vlog />} />
          <Route path="/artists" element={<Artists />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
