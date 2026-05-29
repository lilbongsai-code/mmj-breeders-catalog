import { useNavigate } from "react-router-dom";
import { Dna, Palette, Sprout, Users, Feather } from "lucide-react";

const theme = {
  bg: "#0a0f0a",
  fg: "#e8f0e3",
  accent: "#7cbd5a",
  gold: "#c8a84e",
  fog: "rgba(180,200,170,0.08)",
  card: "rgba(20,30,18,0.85)"
};

export default function Home() {
  const n = useNavigate();
  const links = [
    { label: "Breeder Directory", path: "/breeders", desc: "International seed + clone genetics", icon: <Dna className="w-8 h-8" /> },
    { label: "Community Vlog", path: "/vlog", desc: "Grow diaries, strain reviews, market talk", icon: <Users className="w-8 h-8" /> },
    { label: "Live Artists", path: "/artists", desc: "Cannabis art + Bay Area creators", icon: <Palette className="w-8 h-8" /> },
  ];
  return (
    <div className="min-h-screen" style={{background: theme.bg, color: theme.fg}}>
      <header className="text-center py-20 px-4" style={{background: "linear-gradient(180deg, rgba(124,189,90,0.15) 0%, rgba(200,168,78,0.05) 50%, rgba(10,15,10,0) 100%)"}}>
        <Sprout className="w-12 h-12 mx-auto mb-4" style={{color: theme.accent}} />
        <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{background: `linear-gradient(135deg, ${theme.accent}, ${theme.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"}}>
          MMJ Breeders Catalog
        </h1>
        <p className="text-lg md:text-xl mb-2" style={{color: theme.gold}}>International Genetics · Community Driven · Bay Area Roots</p>
        <p className="text-sm" style={{color: "rgba(200,180,160,0.5)"}}>High as the sky</p>
      </header>
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="grid gap-5 sm:grid-cols-3">
          {links.map(l => (
            <button key={l.path} onClick={() => n(l.path)} className="p-8 rounded-2xl border transition-all hover:scale-[1.02] text-left" style={{background: theme.card, borderColor: "rgba(124,189,90,0.15)"}}>
              <div className="mb-4" style={{color: theme.accent}}>{l.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{l.label}</h3>
              <p className="text-sm" style={{color: "rgba(200,180,160,0.5)"}}>{l.desc}</p>
            </button>
          ))}
        </div>
        <p className="text-center mt-20 text-xs" style={{color: "rgba(200,180,160,0.25)"}}>
          SF Bay · Emerald Triangle · Barcelona · Amsterdam · Worldwide
        </p>
      </section>
    </div>
  );
}
