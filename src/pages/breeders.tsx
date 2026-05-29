import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Leaf, Search, Globe } from "lucide-react";
import breeders from "@/data/breeders.json";

export default function BreedersPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");

  const filteredBreeders = useMemo(() => {
    return breeders.filter(b => {
      const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase());
      const matchesCountry = countryFilter === "all" || b.country === countryFilter;
      return matchesSearch && matchesCountry;
    });
  }, [search, countryFilter]);

  const countries = [...new Set(breeders.map(b => b.country).filter(Boolean))];

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #0a1a0f 0%, #0f2818 50%, #0a1a0f 100%)" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a1a0f]/80 border-b border-emerald-900/30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button onClick={() => navigate("/")} className="flex items-center gap-3">
            <Leaf className="w-8 h-8 text-emerald-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-amber-400 bg-clip-text text-transparent">
              BREEDERS DIRECTORY
            </span>
          </button>
        </div>
      </header>

      {/* Search */}
      <div className="sticky top-[73px] z-40 bg-[#0f2818]/95 backdrop-blur-lg border-b border-emerald-900/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400/40" />
            <input
              type="text"
              placeholder="Search breeders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-emerald-950/50 border border-emerald-800/30 text-emerald-100 placeholder-emerald-400/30 focus:outline-none focus:border-emerald-600/50"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-emerald-400/60 mb-6">{filteredBreeders.length} breeders</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBreeders.slice(0, 100).map((breeder, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-[#0f2818]/80 border border-emerald-800/20"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-emerald-800/50 flex items-center justify-center">
                  <Users className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-emerald-100">{breeder.name}</h3>
                  <p className="text-xs text-emerald-400/60 flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    {breeder.country || "Unknown"}
                  </p>
                </div>
              </div>
              <p className="text-sm text-amber-400/80">{breeder.strains?.length || 0} strains</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
