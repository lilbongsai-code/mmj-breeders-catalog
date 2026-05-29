import { useNavigate } from "react-router-dom";
import { Leaf, Palette, Music, Camera } from "lucide-react";

export default function ArtistsPage() {
  const navigate = useNavigate();

  const artists = [
    { name: "SF Bay Artists Collective", type: "Visual Arts", icon: Palette },
    { name: "Oakland Cannabis Creatives", type: "Photography", icon: Camera },
    { name: "Bay Area Muralists", type: "Murals", icon: Palette },
    { name: "Golden State Musicians", type: "Music", icon: Music },
  ];

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #0a1a0f 0%, #0f2818 50%, #0a1a0f 100%)" }}>
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a1a0f]/80 border-b border-emerald-900/30">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <button onClick={() => navigate("/")} className="flex items-center gap-3">
            <Leaf className="w-8 h-8 text-emerald-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-amber-400 bg-clip-text text-transparent">
              LIVE ARTISTS
            </span>
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-emerald-100 mb-4">SF Bay Creative Showcase</h1>
          <p className="text-emerald-400/60">Artists, musicians, and creatives from the cannabis community</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {artists.map((artist, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-[#0f2818]/80 border border-emerald-800/20"
            >
              <artist.icon className="w-10 h-10 text-amber-400/80 mb-4" />
              <h3 className="text-xl font-bold text-emerald-100 mb-1">{artist.name}</h3>
              <p className="text-sm text-emerald-400/60">{artist.type}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
