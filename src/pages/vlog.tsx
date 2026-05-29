import { useNavigate } from "react-router-dom";
import { Leaf, Video, Upload } from "lucide-react";

export default function VlogPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #0a1a0f 0%, #0f2818 50%, #0a1a0f 100%)" }}>
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a1a0f]/80 border-b border-emerald-900/30">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <button onClick={() => navigate("/")} className="flex items-center gap-3">
            <Leaf className="w-8 h-8 text-emerald-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-amber-400 bg-clip-text text-transparent">
              COMMUNITY VLOG
            </span>
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-16 text-center">
        <Video className="w-16 h-16 text-amber-400/60 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-emerald-100 mb-4">Community Video Board</h1>
        <p className="text-emerald-400/60 mb-8 max-w-xl mx-auto">
          Share your grows, harvests, and cannabis culture. Upload videos and connect with the community.
        </p>
        
        <div className="p-8 rounded-2xl border-2 border-dashed border-emerald-800/30 bg-emerald-950/20">
          <Upload className="w-12 h-12 text-emerald-400/40 mx-auto mb-4" />
          <p className="text-emerald-400/60">Coming soon — video uploads and community features</p>
        </div>
      </main>
    </div>
  );
}
