import { useState } from "react";
import { ArrowLeft, Star, Shield, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Breeder } from "@/types";

const breeders: Breeder[] = [
  { id: "1", name: "Emerald Mountain Genetics", location: "Mendocino, CA", country: "USA", specialties: ["Landrace", "CBD Rich", "Outdoor"], bio: "Family farm since 1996. Specializing in resilient outdoor cultivars.", verified: true, rating: 4.8, imageUrl: "" },
  { id: "2", name: "Barcelona Seed Co", location: "Barcelona", country: "Spain", specialties: ["Autoflower", "High THC", "Indoor"], bio: "Barcelona's premier autoflower breeder. Cup winners since 2018.", verified: true, rating: 4.6, imageUrl: "" },
  { id: "3", name: "Golden State Clones", location: "Santa Cruz, CA", country: "USA", specialties: ["Clones", "Elite Cuts", "Verified Genetics"], bio: "Clean, verified clone nursery serving the Bay since 2014.", verified: true, rating: 4.9, imageUrl: "" },
  { id: "4", name: "Amsterdam Seed Bank", location: "Amsterdam", country: "Netherlands", specialties: ["Classic Strains", "Disease Resistant", "Greenhouse"], bio: "Dutch classics and new crosses from Amsterdam's finest.", verified: false, rating: 4.3, imageUrl: "" },
  { id: "5", name: "Humboldt Seed Collective", location: "Humboldt, CA", country: "USA", specialties: ["Heirloom", "High Yield", "Outdoor"], bio: "Collective of legacy Humboldt growers preserving regional genetics.", verified: true, rating: 4.7, imageUrl: "" },
];

const theme = { bg: "#0a0f0a", fg: "#e8f0e3", accent: "#7cbd5a", gold: "#c8a84e", card: "rgba(20,30,18,0.85)" };

export default function Breeders() {
  const n = useNavigate();
  const [filter, setFilter] = useState("");
  const filtered = filter ? breeders.filter(b => b.country === filter || b.specialties.includes(filter)) : breeders;
  return (
    <div className="min-h-screen" style={{background: theme.bg, color: theme.fg}}>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button onClick={() => n("/")} className="flex items-center gap-2 text-sm mb-8" style={{color: theme.gold}}><ArrowLeft className="w-4 h-4" /> Back</button>
        <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{color: theme.accent}}>Breeder Directory</h1>
        <p className="mb-8" style={{color: "rgba(200,180,160,0.5)"}}>International seed + clone genetics</p>
        <div className="flex gap-2 mb-8 flex-wrap">
          {["", "USA", "Spain", "Netherlands", "Clones", "Landrace", "Autoflower"].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${filter === f ? "bg-green-700 text-white" : ""}`} style={filter !== f ? {border: "1px solid rgba(124,189,90,0.2)", background: "rgba(255,255,255,0.03)"} : {}}>{f || "All"}</button>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map(b => (
            <div key={b.id} className="p-6 rounded-xl border" style={{background: theme.card, borderColor: "rgba(124,189,90,0.1)"}}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{b.name}</h3>
                {b.verified && <Shield className="w-5 h-5" style={{color: theme.accent}} />}
              </div>
              <p className="text-sm mb-2" style={{color: "rgba(200,180,160,0.5)"}}><Globe className="w-3 h-3 inline mr-1" />{b.location} · {b.country}</p>
              <p className="text-sm mb-3">{b.bio}</p>
              <div className="flex gap-2 flex-wrap mb-3">
                {b.specialties.map(s => <span key={s} className="px-2 py-0.5 rounded text-xs" style={{background: "rgba(124,189,90,0.1)", color: theme.accent}}>{s}</span>)}
              </div>
              <div className="flex items-center gap-1" style={{color: theme.gold}}><Star className="w-4 h-4 fill-current" /><span className="text-sm">{b.rating}</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
