import { useParams, useNavigate } from "react-router-dom";
import { Leaf, ArrowLeft, Dna, Flame, Sparkles, Heart, Activity, Droplet } from "lucide-react";
import strains from "@/data/strains.json";

export default function StrainDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const strain = strains.find(s => s.slug === slug);
  
  if (!strain) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a1a0f]">
        <div className="text-center">
          <Leaf className="w-16 h-16 text-emerald-400/30 mx-auto mb-4" />
          <h1 className="text-2xl text-emerald-100 mb-2">Strain Not Found</h1>
          <button onClick={() => navigate('/strains')} className="text-amber-400 hover:text-amber-300">
            ← Back to catalog
          </button>
        </div>
      </div>
    );
  }

  // Find parent strains for pedigree
  const parentStrains = strain.lineage?.map(parentName => 
    strains.find(s => s.name.toLowerCase() === parentName?.toLowerCase())
  ).filter(Boolean) || [];

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #0a1a0f 0%, #0f2818 50%, #0a1a0f 100%)" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a1a0f]/80 border-b border-emerald-900/30">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <button onClick={() => navigate('/strains')} className="flex items-center gap-2 text-emerald-400 hover:text-amber-400 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Catalog</span>
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Strain Hero */}
        <div className="mb-8 p-8 rounded-3xl bg-gradient-to-br from-emerald-950/60 to-[#0f2818]/80 border border-emerald-800/30">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className={`inline-block px-3 py-1 rounded-lg text-sm font-medium mb-3 ${
                strain.type === "Indica" ? "bg-purple-900/50 text-purple-300" :
                strain.type === "Sativa" ? "bg-orange-900/50 text-orange-300" :
                "bg-emerald-900/50 text-emerald-300"
              }`}>
                {strain.type}
              </span>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-200 to-amber-300 bg-clip-text text-transparent">
                {strain.name}
              </h1>
              {strain.breeder && strain.breeder !== "Unknown" && (
                <p className="text-lg text-amber-400/80 mt-2">by {strain.breeder}</p>
              )}
            </div>
          </div>
          
          {strain.description && (
            <p className="text-emerald-100/70 text-lg leading-relaxed mt-4">
              {strain.description}
            </p>
          )}
        </div>

        {/* Pedigree / Lineage */}
        {strain.lineage?.length > 0 && (
          <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-amber-950/20 to-emerald-950/30 border border-amber-800/20">
            <div className="flex items-center gap-3 mb-4">
              <Dna className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-bold text-amber-300">Genetic Lineage</h2>
            </div>
            
            <div className="flex items-center justify-center gap-4 py-6">
              {parentStrains.map((parent, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  {idx > 0 && <span className="text-3xl text-amber-500/60">×</span>}
                  <button
                    onClick={() => parent && navigate(`/strain/${parent.slug}`)}
                    className={`p-4 rounded-xl border text-center transition-all ${
                      parent 
                        ? "bg-emerald-950/50 border-emerald-700/40 hover:border-amber-500/50 cursor-pointer"
                        : "bg-emerald-950/30 border-emerald-800/20 cursor-default"
                    }`}
                  >
                    <Leaf className="w-8 h-8 text-emerald-400/60 mx-auto mb-2" />
                    <span className="text-emerald-100 font-medium">
                      {strain.lineage[idx]}
                    </span>
                    {parent && (
                      <span className={`block text-xs mt-1 ${
                        parent.type === "Indica" ? "text-purple-400" :
                        parent.type === "Sativa" ? "text-orange-400" :
                        "text-emerald-400"
                      }`}>
                        {parent.type}
                      </span>
                    )}
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center">
              <div className="flex flex-col items-center">
                <div className="w-px h-8 bg-amber-500/30" />
                <Leaf className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <span className="inline-block px-6 py-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 font-bold text-lg">
                {strain.name}
              </span>
            </div>
          </div>
        )}

        {/* Effects & Flavors */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Effects */}
          {strain.effects?.length > 0 && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-[#0f2818]/60 border border-emerald-800/20">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <h3 className="font-bold text-purple-300">Effects</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {strain.effects.map(e => (
                  <span key={e} className="px-3 py-1.5 rounded-lg bg-purple-900/30 text-purple-200 text-sm">
                    {e}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Flavors */}
          {strain.flavors?.length > 0 && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-[#0f2818]/60 border border-emerald-800/20">
              <div className="flex items-center gap-3 mb-4">
                <Droplet className="w-5 h-5 text-orange-400" />
                <h3 className="font-bold text-orange-300">Flavors</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {strain.flavors.map(f => (
                  <span key={f} className="px-3 py-1.5 rounded-lg bg-orange-900/30 text-orange-200 text-sm">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Terpenes */}
          {strain.terpenes?.length > 0 && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-[#0f2818]/60 border border-emerald-800/20">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-emerald-300">Terpenes</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {strain.terpenes.map(t => (
                  <span key={t} className="px-3 py-1.5 rounded-lg bg-emerald-900/30 text-emerald-200 text-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Ailments */}
          {strain.ailments?.length > 0 && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-[#0f2818]/60 border border-emerald-800/20">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-5 h-5 text-pink-400" />
                <h3 className="font-bold text-pink-300">May Help With</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {strain.ailments.map(a => (
                  <span key={a} className="px-3 py-1.5 rounded-lg bg-pink-900/30 text-pink-200 text-sm">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* THC/CBD Stats */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-[#0f2818]/60 border border-emerald-800/20">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-emerald-400/60 text-sm mb-1">THC</p>
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <span className="text-2xl font-bold text-amber-300">{strain.thc || "0"}%</span>
              </div>
            </div>
            <div>
              <p className="text-emerald-400/60 text-sm mb-1">CBD</p>
              <div className="flex items-center gap-2">
                <Droplet className="w-5 h-5 text-emerald-400" />
                <span className="text-2xl font-bold text-emerald-300">{strain.cbd || "0"}%</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
