import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Leaf, ArrowLeft, Dna, Flame, Sparkles, Heart, Activity, Droplet, X, Send, Github, Edit2 } from "lucide-react";
import strains from "@/data/strains.json";

const SUGGESTIONS_KEY = "mmj-strain-edit-suggestions";

type StrainEditSuggestion = {
  id: string;
  strainSlug: string;
  strainName: string;
  diff: Record<string, { from: any; to: any }>;
  submitterName: string;
  notes?: string;
  timestamp: number;
};

export default function StrainDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const strain = strains.find(s => s.slug === slug);
  
  // Edit suggestion state
  const [showEditModal, setShowEditModal] = useState(false);
  const [submitterName, setSubmitterName] = useState("");
  const [notes, setNotes] = useState("");

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

  // Find parent strains for pedigree — handles lineage entries that may be numeric IDs OR names
  const parentStrains = (strain.lineage || []).map((ref) => {
    const refStr = String(ref).trim();
    if (!refStr) return null;
    // Try lookup by id (as string) first, then by name (case-insensitive)
    const byId = strains.find(s => String(s.id) === refStr);
    if (byId) return byId;
    const byName = strains.find(s => s.name?.toLowerCase() === refStr.toLowerCase());
    return byName || null;
  });

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #0a1a0f 0%, #0f2818 50%, #0a1a0f 100%" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a1a0f]/80 border-b border-emerald-900/30">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
          <button onClick={() => navigate('/strains')} className="flex items-center gap-2 text-emerald-400 hover:text-amber-400 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Catalog</span>
          </button>
          <button
            onClick={() => setShowEditModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 hover:border-amber-400/50 transition-all text-sm font-medium"
          >
            <Edit2 className="w-4 h-4" />
            <span>Suggest Edit</span>
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
            
            <div className="flex items-center justify-center gap-4 py-6 flex-wrap">
              {parentStrains.map((parent, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  {idx > 0 && <span className="text-3xl text-amber-500/60">×</span>}
                  {parent ? (
                    <button
                      onClick={() => navigate(`/strain/${parent.slug}`)}
                      className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-700/40 hover:border-amber-500/50 cursor-pointer text-center transition-all"
                    >
                      <Leaf className="w-8 h-8 text-emerald-400/60 mx-auto mb-2" />
                      <span className="text-emerald-100 font-medium">{strain.lineage[idx]}</span>
                      <span className={`block text-xs mt-1 ${
                        parent.type === "Indica" ? "text-purple-400" :
                        parent.type === "Sativa" ? "text-orange-400" :
                        "text-emerald-400"
                      }`}>
                        {parent.type}
                      </span>
                    </button>
                  ) : (
                    <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/20 text-center">
                      <Leaf className="w-8 h-8 text-emerald-400/30 mx-auto mb-2" />
                      <span className="text-emerald-300/60 font-medium">{strain.lineage[idx]}</span>
                      <span className="block text-xs mt-1 text-emerald-500/40">unverified parent</span>
                    </div>
                  )}
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

        {/* Open Source Footer */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-amber-950/20 to-emerald-950/20 border border-amber-800/20 text-center">
          <h3 className="text-lg font-bold text-amber-300 mb-2">Help grow the catalog 🌱</h3>
          <p className="text-emerald-300/70 text-sm mb-4">
            This is a community-driven, open-source genetics database. Breeder, peer, or patient — if you have intel to share, every contribution counts.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setShowEditModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-200 hover:bg-amber-500/30 text-sm font-medium"
            >
              <Edit2 className="w-4 h-4" /> Suggest an Edit
            </button>
            <a
              href="https://github.com/zosomaster/mmj-breeders-catalog"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700/30 border border-emerald-600/40 text-emerald-200 hover:bg-emerald-700/40 text-sm font-medium"
            >
              <Github className="w-4 h-4" /> View on GitHub
            </a>
          </div>
        </div>
      </main>

      {/* Suggest Edit Modal */}
      {showEditModal && (
        <SuggestEditModal
          strain={strain}
          onClose={() => setShowEditModal(false)}
          submitterName={submitterName}
          setSubmitterName={setSubmitterName}
          notes={notes}
          setNotes={setNotes}
        />
      )}
    </div>
  );
}

function SuggestEditModal({ strain, onClose, submitterName, setSubmitterName, notes, setNotes }: any) {
  const [type, setType] = useState(strain.type || "Hybrid");
  const [thc, setThc] = useState(strain.thc || "0");
  const [cbd, setCbd] = useState(strain.cbd || "0");
  const [lineage, setLineage] = useState((strain.lineage || []).join(", "));
  const [effects, setEffects] = useState((strain.effects || []).join(", "));
  const [flavors, setFlavors] = useState((strain.flavors || []).join(", "));
  const [terpenes, setTerpenes] = useState((strain.terpenes || []).join(", "));
  const [ailments, setAilments] = useState((strain.ailments || []).join(", "));
  const [description, setDescription] = useState(strain.description || "");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitterName.trim()) {
      alert("Please enter your name so we can credit the contribution");
      return;
    }
    const suggestion: StrainEditSuggestion = {
      id: `sug-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      strainSlug: strain.slug,
      strainName: strain.name,
      submitterName: submitterName.trim(),
      notes: notes.trim() || undefined,
      timestamp: Date.now(),
      diff: {
        type: { from: strain.type, to: type },
        thc: { from: strain.thc, to: thc },
        cbd: { from: strain.cbd, to: cbd },
        lineage: { from: strain.lineage, to: lineage.split(",").map((s: string) => s.trim()).filter(Boolean) },
        effects: { from: strain.effects, to: effects.split(",").map((s: string) => s.trim()).filter(Boolean) },
        flavors: { from: strain.flavors, to: flavors.split(",").map((s: string) => s.trim()).filter(Boolean) },
        terpenes: { from: strain.terpenes, to: terpenes.split(",").map((s: string) => s.trim()).filter(Boolean) },
        ailments: { from: strain.ailments, to: ailments.split(",").map((s: string) => s.trim()).filter(Boolean) },
        description: { from: strain.description, to: description },
      },
    };
    try {
      const existing: StrainEditSuggestion[] = JSON.parse(localStorage.getItem(SUGGESTIONS_KEY) || "[]");
      existing.push(suggestion);
      localStorage.setItem(SUGGESTIONS_KEY, JSON.stringify(existing));
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to save suggestion", err);
      alert("Failed to save suggestion locally. Please file a GitHub issue instead.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-br from-[#0f2818] to-[#0a1a0f] border border-emerald-800/40 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 z-10 backdrop-blur-xl bg-[#0a1a0f]/90 border-b border-emerald-900/40 p-6 flex items-start justify-between gap-3">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-amber-300 flex items-center gap-2">
              <Edit2 className="w-5 h-5" /> Suggest an Edit
            </h2>
            <p className="text-sm text-emerald-400/70 mt-1">
              Help improve <span className="font-semibold text-emerald-200">{strain.name}</span> — your contribution is reviewed and credited.
            </p>
          </div>
          <button onClick={onClose} className="text-emerald-400 hover:text-amber-400 p-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-emerald-100 mb-2">Suggestion saved locally!</h3>
            <p className="text-emerald-300/80 mb-6">Thanks for contributing to the open-source catalog. You can also file your edit directly on GitHub for faster review.</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href={`https://github.com/zosomaster/mmj-breeders-catalog/issues/new?title=Suggest%20edit%20to%20${encodeURIComponent(strain.name)}&body=${encodeURIComponent(notes || "Suggesting edits per the in-app form.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium"
              >
                <Github className="w-4 h-4" /> File on GitHub
              </a>
              <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-emerald-700/40 text-emerald-200 hover:bg-emerald-900/30">
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-emerald-300/80 mb-1">Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-emerald-100 text-sm">
                  <option>Indica</option>
                  <option>Sativa</option>
                  <option>Hybrid</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-emerald-300/80 mb-1">THC %</label>
                <input type="text" value={thc} onChange={(e) => setThc(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-emerald-100 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-emerald-300/80 mb-1">CBD %</label>
                <input type="text" value={cbd} onChange={(e) => setCbd(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-emerald-100 text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-emerald-300/80 mb-1">Lineage (comma-separated parent names or IDs)</label>
              <input type="text" value={lineage} onChange={(e) => setLineage(e.target.value)} placeholder="e.g. OG Kush, Sour Diesel" className="w-full px-3 py-2 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-emerald-100 text-sm" />
            </div>

            <div>
              <label className="block text-xs font-medium text-emerald-300/80 mb-1">Effects (comma-separated)</label>
              <input type="text" value={effects} onChange={(e) => setEffects(e.target.value)} placeholder="e.g. Relaxed, Happy, Euphoric" className="w-full px-3 py-2 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-emerald-100 text-sm" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-emerald-300/80 mb-1">Flavors</label>
                <input type="text" value={flavors} onChange={(e) => setFlavors(e.target.value)} placeholder="e.g. Citrus, Pine" className="w-full px-3 py-2 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-emerald-100 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-emerald-300/80 mb-1">Terpenes</label>
                <input type="text" value={terpenes} onChange={(e) => setTerpenes(e.target.value)} placeholder="e.g. Myrcene, Limonene" className="w-full px-3 py-2 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-emerald-100 text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-emerald-300/80 mb-1">May help with (comma-separated)</label>
              <input type="text" value={ailments} onChange={(e) => setAilments(e.target.value)} placeholder="e.g. Insomnia, Pain" className="w-full px-3 py-2 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-emerald-100 text-sm" />
            </div>

            <div>
              <label className="block text-xs font-medium text-emerald-300/80 mb-1">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-emerald-100 text-sm" />
            </div>

            <div className="pt-2 border-t border-emerald-900/40">
              <label className="block text-xs font-medium text-emerald-300/80 mb-1">Your name / handle (for credit) *</label>
              <input type="text" required value={submitterName} onChange={(e) => setSubmitterName(e.target.value)} placeholder="@yourhandle" className="w-full px-3 py-2 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-emerald-100 text-sm" />
            </div>

            <div>
              <label className="block text-xs font-medium text-emerald-300/80 mb-1">Notes (optional — sources, links, reasoning)</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className="w-full px-3 py-2 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-emerald-100 text-sm" />
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit" className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold">
                <Send className="w-4 h-4" /> Submit Suggestion
              </button>
              <button type="button" onClick={onClose} className="px-5 py-3 rounded-xl border border-emerald-700/40 text-emerald-200 hover:bg-emerald-900/30">
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
