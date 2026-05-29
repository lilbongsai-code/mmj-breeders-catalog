import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, Filter, Leaf, Flame, Sparkles, ChevronRight, Dna } from "lucide-react";
import strains from "@/data/strains.json";
import breeders from "@/data/breeders.json";

export default function StrainCatalog() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [breederFilter, setBreederFilter] = useState("all");

  const filteredStrains = useMemo(() => {
    return strains.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.breeder?.toLowerCase().includes(search.toLowerCase()) ||
        s.effects?.some(e => e.toLowerCase().includes(search.toLowerCase()));
      const matchesType = typeFilter === "all" || s.type?.toLowerCase() === typeFilter;
      const matchesBreeder = breederFilter === "all" || s.breeder === breederFilter;
      return matchesSearch && matchesType && matchesBreeder;
    });
  }, [search, typeFilter, breederFilter]);

  const strainTypes = ["Indica", "Sativa", "Hybrid"];
  const uniqueBreeders = [...new Set(breeders.map(b => b.name))].sort();

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #0a1a0f 0%, #0f2818 50%, #0a1a0f 100%)" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a1a0f]/80 border-b border-emerald-900/30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate("/")} className="flex items-center gap-3">
              <Leaf className="w-8 h-8 text-emerald-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-amber-400 bg-clip-text text-transparent">
                MMJ BREEDERS CATALOG
              </span>
            </button>
            <div className="text-emerald-400/60 text-sm">
              {filteredStrains.length.toLocaleString()} strains
            </div>
          </div>
        </div>
      </header>

      {/* Search & Filters */}
      <div className="sticky top-[73px] z-40 bg-[#0f2818]/95 backdrop-blur-lg border-b border-emerald-900/20">
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400/40" />
            <input
              type="text"
              placeholder="Search strains, breeders, effects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-emerald-950/50 border border-emerald-800/30 text-emerald-100 placeholder-emerald-400/30 focus:outline-none focus:border-emerald-600/50"
            />
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 rounded-lg bg-emerald-950/50 border border-emerald-800/30 text-emerald-100"
            >
              <option value="all">All Types</option>
              {strainTypes.map(t => <option key={t} value={t.toLowerCase()}>{t}</option>)}
            </select>
            <select
              value={breederFilter}
              onChange={(e) => setBreederFilter(e.target.value)}
              className="px-4 py-2 rounded-lg bg-emerald-950/50 border border-emerald-800/30 text-emerald-100"
            >
              <option value="all">All Breeders ({uniqueBreeders.length})</option>
              {uniqueBreeders.slice(0, 100).map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Strain Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStrains.slice(0, 100).map((strain) => (
            <button
              key={strain.id}
              onClick={() => navigate(`/strain/${strain.slug}`)}
              className="group p-5 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-[#0f2818]/80 border border-emerald-800/20 hover:border-amber-500/40 transition-all text-left"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-emerald-100 group-hover:text-amber-300 transition-colors">
                    {strain.name}
                  </h3>
                  <p className="text-sm text-emerald-400/60">{strain.breeder}</p>
                </div>
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                  strain.type === "Indica" ? "bg-purple-900/50 text-purple-300" :
                  strain.type === "Sativa" ? "bg-orange-900/50 text-orange-300" :
                  "bg-emerald-900/50 text-emerald-300"
                }`}>
                  {strain.type}
                </span>
              </div>
              
              {/* Lineage/Pedigree preview */}
              {strain.lineage?.length > 0 && (
                <div className="flex items-center gap-1 mb-3 text-xs text-amber-400/80">
                  <Dna className="w-3 h-3" />
                  <span>{strain.lineage.join(" × ")}</span>
                </div>
              )}
              
              {/* Effects */}
              {strain.effects?.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {strain.effects.slice(0, 4).map(e => (
                    <span key={e} className="px-2 py-0.5 rounded-full bg-emerald-900/40 text-emerald-300 text-xs">
                      {e}
                    </span>
                  ))}
                </div>
              )}
              
              {/* THC/CBD */}
              <div className="flex gap-4 mt-3 text-xs">
                <span className="text-emerald-400/60">THC: {strain.thc}%</span>
                <span className="text-emerald-400/60">CBD: {strain.cbd}%</span>
              </div>
              
              <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400/0 group-hover:text-amber-400 transition-colors" />
            </button>
          ))}
        </div>
        {filteredStrains.length > 100 && (
          <div className="text-center mt-8 text-emerald-400/60">
            Showing 100 of {filteredStrains.length.toLocaleString()} strains. Use search to find more.
          </div>
        )}
      </main>
    </div>
  );
}
