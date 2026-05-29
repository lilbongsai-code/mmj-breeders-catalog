import { useNavigate } from "react-router-dom";
import { Leaf, Globe, Palette, Video, Users, Search, ChevronRight, Dna, Flame } from "lucide-react";
import strains from "@/data/strains.json";
import breeders from "@/data/breeders.json";

export default function Home() {
  const navigate = useNavigate();
  
  const featuredStrains = strains.filter(s => s.lineage?.length > 0).slice(0, 6);

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #0a1a0f 0%, #0f2818 30%, #0a1a0f 100%)" }}>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-950/30" />
        
        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-900/40 border border-emerald-700/30 text-emerald-300 text-sm mb-8">
            <Globe className="w-4 h-4" />
            <span>International Cannabis Genetics Database</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-emerald-300 via-green-200 to-amber-400 bg-clip-text text-transparent">
              MMJ BREEDERS
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-emerald-300 bg-clip-text text-transparent">
              CATALOG
            </span>
          </h1>
          
          <p className="text-xl text-emerald-100/70 max-w-2xl mx-auto mb-8">
            {strains.length.toLocaleString()} strains · {breeders.length} breeders worldwide · Pedigree lineage tracking
          </p>
          
          <button
            onClick={() => navigate('/strains')}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-lg transition-all shadow-lg shadow-emerald-900/50"
          >
            <Search className="w-5 h-5" />
            Browse Strains
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Strains", value: strains.length.toLocaleString(), icon: Leaf },
            { label: "Breeders", value: breeders.length, icon: Users },
            { label: "Countries", value: "50+", icon: Globe },
            { label: "Lineages", value: "35K+", icon: Dna },
          ].map((stat) => (
            <div key={stat.label} className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-800/20 text-center">
              <stat.icon className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <p className="text-3xl font-bold text-emerald-100">{stat.value}</p>
              <p className="text-sm text-emerald-400/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Strains */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-emerald-100">Featured Strains</h2>
          <button onClick={() => navigate('/strains')} className="text-amber-400 hover:text-amber-300 flex items-center gap-1">
            View all <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredStrains.map((strain) => (
            <button
              key={strain.id}
              onClick={() => navigate(`/strain/${strain.slug}`)}
              className="group p-5 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-[#0f2818]/80 border border-emerald-800/20 hover:border-amber-500/40 transition-all text-left"
            >
              <h3 className="text-lg font-bold text-emerald-100 group-hover:text-amber-300 transition-colors mb-1">
                {strain.name}
              </h3>
              <p className="text-sm text-emerald-400/60 mb-2">{strain.breeder}</p>
              {strain.lineage?.length > 0 && (
                <p className="text-xs text-amber-400/80 mb-2">{strain.lineage.join(" × ")}</p>
              )}
              <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium ${
                strain.type === "Indica" ? "bg-purple-900/50 text-purple-300" :
                strain.type === "Sativa" ? "bg-orange-900/50 text-orange-300" :
                "bg-emerald-900/50 text-emerald-300"
              }`}>
                {strain.type}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Breeders", desc: "Explore 688 breeders worldwide", path: "/breeders", icon: Users },
            { title: "Community Vlog", desc: "Videos, grows, and culture", path: "/vlog", icon: Video },
            { title: "Live Artists", desc: "SF Bay creative showcase", path: "/artists", icon: Palette },
          ].map((link) => (
            <button
              key={link.title}
              onClick={() => navigate(link.path)}
              className="group p-6 rounded-2xl bg-gradient-to-br from-emerald-950/50 to-[#0f2818]/70 border border-emerald-800/20 hover:border-amber-500/30 transition-all text-left"
            >
              <link.icon className="w-8 h-8 text-amber-400/80 mb-4" />
              <h3 className="text-xl font-bold text-emerald-100 group-hover:text-amber-300 transition-colors mb-2">
                {link.title}
              </h3>
              <p className="text-sm text-emerald-400/60">{link.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-emerald-900/30 py-8">
        <div className="max-w-5xl mx-auto px-6 text-center text-emerald-400/50 text-sm">
          <p>© 2026 MMJ Breeders Catalog · Open-access cannabis genetics database</p>
        </div>
      </footer>
    </div>
  );
}
