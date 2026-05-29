import { useState } from "react";
import { ArrowLeft, ExternalLink, Radio, Palette } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { LiveArtist } from "@/types";

const artists: LiveArtist[] = [
  { id: "1", name: "Maya Green", style: "Botanical illustration · Cannabis watercolors", website: "https://mayagreen.art", bio: "Bay Area botanical artist capturing cannabis cultivars in watercolor. Prints available.", live: true },
  { id: "2", name: "DJ Sprout", style: "Live painting at growers markets · Acrylic on canvas", website: "", bio: "Live painting at Bay Area growers markets. Commissions open for strain portraits.", live: false },
  { id: "3", name: "High Frequency Arts", style: "Digital psychedelic · NFT collections", website: "https://highfreq.art", bio: "Trippy digital art inspired by terpene profiles and strain effects. Limited drops.", live: true },
  { id: "4", name: "NorCal Glass Collective", style: "Functional glass art · Custom rigs", website: "", bio: "Hand-blown glass pieces from Humboldt. Custom orders available.", live: false },
];

const theme = { bg: "#0a0f0a", fg: "#e8f0e3", accent: "#7cbd5a", gold: "#c8a84e", card: "rgba(20,30,18,0.85)", live: "#ff4444" };

export default function Artists() {
  const n = useNavigate();
  return (
    <div className="min-h-screen" style={{background: theme.bg, color: theme.fg}}>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <button onClick={() => n("/")} className="flex items-center gap-2 text-sm mb-8" style={{color: theme.gold}}><ArrowLeft className="w-4 h-4" /> Back</button>
        <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{color: theme.accent}}>Live Artists</h1>
        <p className="mb-8" style={{color: "rgba(200,180,160,0.5)"}}>Cannabis art + Bay Area creators</p>
        <div className="space-y-4">
          {artists.map(a => (
            <div key={a.id} className="p-6 rounded-xl border flex gap-4 items-start" style={{background: theme.card, borderColor: a.live ? "rgba(255,68,68,0.3)" : "rgba(124,189,90,0.1)"}}>
              <div className="text-center">
                <Palette className="w-10 h-10" style={{color: theme.gold}} />
                {a.live && <span className="block mt-1 text-xs font-bold" style={{color: theme.live}}><Radio className="w-3 h-3 inline" /> LIVE</span>}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{a.name}</h3>
                <p className="text-sm mb-2" style={{color: theme.accent}}>{a.style}</p>
                <p className="text-sm mb-3" style={{color: "rgba(200,180,160,0.6)"}}>{a.bio}</p>
                {a.website && <a href={a.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs" style={{color: theme.gold}}><ExternalLink className="w-3 h-3" /> Portfolio</a>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
