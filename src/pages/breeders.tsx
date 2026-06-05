import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Leaf, Search, Globe, Plus, Edit2, X, Check, Github, Twitter, Instagram, ExternalLink, Send, MessageCircle, Award } from "lucide-react";
import breeders from "@/data/breeders.json";
import strains from "@/data/strains.json";

const SUBMISSIONS_KEY = "mmj-breeder-submissions";

type Submission = {
  id: string;
  type: "new-breeder" | "new-strain" | "edit-breeder" | "edit-strain";
  data: any;
  submitterName: string;
  submitterEmail?: string;
  notes?: string;
  timestamp: number;
  status: "pending" | "merged";
};

const COUNTRIES = [
  "USA", "Canada", "Netherlands", "Spain", "UK", "Germany", "France",
  "Italy", "Switzerland", "Czech Republic", "Portugal", "Belgium",
  "Australia", "New Zealand", "Thailand", "Colombia", "Uruguay",
  "South Africa", "Israel", "Jamaica", "Mexico", "Brazil", "Argentina",
  "Japan", "India", "Morocco", "Afghanistan", "Unknown"
];

export default function BreedersPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [selectedBreeder, setSelectedBreeder] = useState<any | null>(null);
  const [showSubmitModal, setShowSubmitModal] = useState<"none" | "breeder" | "strain">("none");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [githubUrl] = useState("https://github.com/zosomaster/mmj-breeders-catalog/blob/main/src/data/breeders.json");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SUBMISSIONS_KEY);
      if (stored) setSubmissions(JSON.parse(stored));
    } catch {}
  }, []);

  const saveSubmissions = (next: Submission[]) => {
    setSubmissions(next);
    try { localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(next)); } catch {}
  };

  const filteredBreeders = useMemo(() => {
    return breeders.filter(b => {
      const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase());
      const matchesCountry = countryFilter === "all" || b.country === countryFilter;
      return matchesSearch && matchesCountry;
    });
  }, [search, countryFilter]);

  const countries = useMemo(() => {
    return [...new Set(breeders.map(b => b.country).filter(Boolean))].sort();
  }, []);

  const breederStrains = useMemo(() => {
    if (!selectedBreeder) return [];
    return strains.filter(s => s.breeder === selectedBreeder.name);
  }, [selectedBreeder]);

  const stats = {
    total: breeders.length,
    countries: countries.length,
    strains: strains.length,
    contributors: new Set(strains.map(s => s.source).filter(Boolean)).size,
  };

  const handleSubmission = (sub: Omit<Submission, "id" | "timestamp" | "status">) => {
    const full: Submission = {
      ...sub,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      timestamp: Date.now(),
      status: "pending",
    };
    saveSubmissions([full, ...submissions]);
    setShowSubmitModal("none");
    alert("Submission saved! You can also submit a PR to the GitHub repo for instant merge.");
  };

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #0a1a0f 0%, #0f2818 50%, #0a1a0f 100%)" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a1a0f]/80 border-b border-emerald-900/30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-3">
            <Leaf className="w-8 h-8 text-emerald-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-amber-400 bg-clip-text text-transparent">
              BREEDERS DIRECTORY
            </span>
          </button>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-emerald-400/70 hover:text-emerald-300"
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">Open Source</span>
          </a>
        </div>
      </header>

      {/* Hero Stats */}
      <section className="max-w-7xl mx-auto px-4 pt-8 pb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-emerald-100 mb-2">
          The world's most open cannabis genetics catalog
        </h1>
        <p className="text-emerald-400/70 mb-6 max-w-2xl">
          Community-curated by breeders, growers, and peers. Anyone can submit a new breeder, add a strain,
          or correct an entry. Data lives in a public JSON file — fork it, fix it, ship it.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-800/30">
            <div className="text-2xl font-bold text-amber-300">{stats.total}</div>
            <div className="text-xs text-emerald-400/60">Breeders</div>
          </div>
          <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-800/30">
            <div className="text-2xl font-bold text-amber-300">{stats.strains.toLocaleString()}</div>
            <div className="text-xs text-emerald-400/60">Strains</div>
          </div>
          <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-800/30">
            <div className="text-2xl font-bold text-amber-300">{stats.countries}</div>
            <div className="text-xs text-emerald-400/60">Countries</div>
          </div>
          <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-800/30">
            <div className="text-2xl font-bold text-amber-300">∞</div>
            <div className="text-xs text-emerald-400/60">Open to all</div>
          </div>
        </div>
      </section>

      {/* Contribute Bar */}
      <section className="max-w-7xl mx-auto px-4 pb-6">
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/30 via-emerald-950/30 to-amber-950/30 border border-amber-700/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-amber-400" />
            <div>
              <h3 className="font-bold text-amber-200">Add yourself to the directory</h3>
              <p className="text-sm text-emerald-300/70">Breeders, growers, seed banks — claim your spot or add someone else's.</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setShowSubmitModal("breeder")}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Breeder
            </button>
            <button
              onClick={() => setShowSubmitModal("strain")}
              className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Strain
            </button>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg border border-emerald-700 hover:border-emerald-500 text-emerald-300 text-sm font-semibold flex items-center gap-1.5"
            >
              <Github className="w-4 h-4" /> Edit on GitHub <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* Search */}
      <div className="sticky top-[73px] z-40 bg-[#0f2818]/95 backdrop-blur-lg border-b border-emerald-900/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400/40" />
              <input
                type="text"
                placeholder="Search breeders..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-emerald-950/50 border border-emerald-800/30 text-emerald-100 placeholder-emerald-400/30 focus:outline-none focus:border-emerald-600/50"
              />
            </div>
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="px-4 py-3 rounded-xl bg-emerald-950/50 border border-emerald-800/30 text-emerald-100 focus:outline-none focus:border-emerald-600/50"
            >
              <option value="all">All countries</option>
              {countries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-emerald-400/60 mb-6">
          {filteredBreeders.length.toLocaleString()} breeders
          {selectedBreeder && <span className="ml-2 text-amber-400/80">· viewing {selectedBreeder.name}'s strains</span>}
        </p>

        {selectedBreeder ? (
          <BreederDetail
            breeder={selectedBreeder}
            strains={breederStrains}
            onBack={() => setSelectedBreeder(null)}
            onStrainClick={(slug) => navigate(`/strain/${slug}`)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBreeders.slice(0, 200).map((breeder, idx) => (
              <BreederCard
                key={idx}
                breeder={breeder}
                onClick={() => setSelectedBreeder(breeder)}
                onClaim={() => setShowSubmitModal("breeder")}
              />
            ))}
          </div>
        )}

        {filteredBreeders.length > 200 && !selectedBreeder && (
          <p className="text-center text-emerald-400/50 text-sm mt-6">
            Showing first 200 of {filteredBreeders.length.toLocaleString()}. Refine your search to see more.
          </p>
        )}
      </main>

      {/* Open Source Footer */}
      <footer className="max-w-7xl mx-auto px-4 py-8 mt-12 border-t border-emerald-900/30">
        <div className="text-center">
          <p className="text-emerald-400/60 text-sm mb-2">
            Data lives in plain JSON — fully open source and version-controlled
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-emerald-500/60">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 flex items-center gap-1">
              <Github className="w-3 h-3" /> Edit on GitHub
            </a>
            <span>·</span>
            <span>MIT licensed</span>
            <span>·</span>
            <span>Last sync: today</span>
          </div>
        </div>
      </footer>

      {/* Submit Modals */}
      {showSubmitModal === "breeder" && (
        <SubmitBreederModal
          onClose={() => setShowSubmitModal("none")}
          onSubmit={handleSubmission}
        />
      )}
      {showSubmitModal === "strain" && (
        <SubmitStrainModal
          breeders={breeders}
          onClose={() => setShowSubmitModal("none")}
          onSubmit={handleSubmission}
        />
      )}
    </div>
  );
}

function BreederCard({ breeder, onClick, onClaim }: { breeder: any; onClick: () => void; onClaim: () => void }) {
  return (
    <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-[#0f2818]/80 border border-emerald-800/20 hover:border-amber-500/40 transition-all">
      <button onClick={onClick} className="w-full text-left">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-emerald-800/50 flex items-center justify-center">
            <Users className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-emerald-100 truncate">{breeder.name}</h3>
            <p className="text-xs text-emerald-400/60 flex items-center gap-1">
              <Globe className="w-3 h-3" />
              {breeder.country || "Unknown"}
            </p>
          </div>
        </div>
        <p className="text-sm text-amber-400/80">{breeder.strains?.length || 0} strains</p>
      </button>
      <div className="mt-3 pt-3 border-t border-emerald-900/30 flex gap-2">
        <button
          onClick={onClaim}
          className="flex-1 text-xs text-emerald-400/70 hover:text-emerald-300 flex items-center justify-center gap-1"
        >
          <Edit2 className="w-3 h-3" /> Claim / Edit
        </button>
      </div>
    </div>
  );
}

function BreederDetail({ breeder, strains, onBack, onStrainClick }: { breeder: any; strains: any[]; onBack: () => void; onStrainClick: (slug: string) => void }) {
  return (
    <div>
      <button onClick={onBack} className="text-emerald-400 hover:text-amber-400 mb-4 flex items-center gap-2 text-sm">
        ← Back to all breeders
      </button>

      <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-[#0f2818]/80 border border-emerald-800/30 mb-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-amber-600 flex items-center justify-center">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-emerald-100">{breeder.name}</h2>
            <p className="text-emerald-400/70 flex items-center gap-2 mt-1">
              <Globe className="w-4 h-4" /> {breeder.country || "Unknown"}
            </p>
          </div>
        </div>
        <p className="text-amber-300/80 text-sm">
          {strains.length} strain{strains.length === 1 ? "" : "s"} attributed to this breeder in the catalog
        </p>
      </div>

      <h3 className="text-lg font-bold text-emerald-200 mb-3">Strains</h3>
      {strains.length === 0 ? (
        <p className="text-emerald-400/60 italic">No strains found in our database yet. Add the first one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {strains.map((s) => (
            <button
              key={s.id}
              onClick={() => onStrainClick(s.slug)}
              className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-800/30 hover:border-amber-500/40 text-left transition-all"
            >
              <h4 className="font-bold text-emerald-100">{s.name}</h4>
              <p className="text-xs text-emerald-400/60 mt-1">{s.type}</p>
              {s.lineage?.length > 0 && (
                <p className="text-xs text-amber-400/80 mt-1">{s.lineage.join(" × ")}</p>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SubmitBreederModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (s: any) => void }) {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("USA");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [website, setWebsite] = useState("");
  const [bio, setBio] = useState("");
  const [submitterName, setSubmitterName] = useState("");
  const [submitterEmail, setSubmitterEmail] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!name.trim() || !submitterName.trim()) {
      alert("Breeder name and your name are required");
      return;
    }
    onSubmit({
      type: "new-breeder",
      data: { name: name.trim(), country, twitter, instagram, website, bio },
      submitterName: submitterName.trim(),
      submitterEmail: submitterEmail.trim(),
      notes: notes.trim(),
    });
  };

  return (
    <Modal onClose={onClose} title="Add a Breeder">
      <div className="space-y-3">
        <Field label="Breeder name *" value={name} onChange={setName} placeholder="e.g. Humboldt Hash Mob" />
        <SelectField label="Country" value={country} onChange={setCountry} options={COUNTRIES} />
        <Field label="Twitter / X (optional)" value={twitter} onChange={setTwitter} placeholder="@handle" />
        <Field label="Instagram (optional)" value={instagram} onChange={setInstagram} placeholder="@handle" />
        <Field label="Website (optional)" value={website} onChange={setWebsite} placeholder="https://" />
        <TextArea label="Short bio (optional)" value={bio} onChange={setBio} placeholder="What they're known for, breeding style, region..." />
        <div className="border-t border-emerald-900/30 pt-3 mt-3">
          <p className="text-xs text-emerald-400/60 mb-2">Your details (so we can credit you)</p>
          <Field label="Your name *" value={submitterName} onChange={setSubmitterName} />
          <Field label="Your email (optional)" value={submitterEmail} onChange={setSubmitterEmail} type="email" />
        </div>
        <TextArea label="Anything else?" value={notes} onChange={setNotes} placeholder="Source for the info, any context..." />
        <SubmitButtons onCancel={onClose} onSubmit={handleSubmit} />
      </div>
    </Modal>
  );
}

function SubmitStrainModal({ breeders, onClose, onSubmit }: { breeders: any[]; onClose: () => void; onSubmit: (s: any) => void }) {
  const [name, setName] = useState("");
  const [breeder, setBreeder] = useState(breeders[0]?.name || "");
  const [newBreeder, setNewBreeder] = useState("");
  const [type, setType] = useState("Hybrid");
  const [thc, setThc] = useState("");
  const [cbd, setCbd] = useState("");
  const [lineage, setLineage] = useState("");
  const [effects, setEffects] = useState("");
  const [flavors, setFlavors] = useState("");
  const [description, setDescription] = useState("");
  const [submitterName, setSubmitterName] = useState("");
  const [submitterEmail, setSubmitterEmail] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!name.trim() || !submitterName.trim()) {
      alert("Strain name and your name are required");
      return;
    }
    const finalBreeder = newBreeder.trim() || breeder;
    onSubmit({
      type: "new-strain",
      data: {
        name: name.trim(),
        breeder: finalBreeder,
        type,
        thc,
        cbd,
        lineage: lineage.split(",").map(s => s.trim()).filter(Boolean),
        effects: effects.split(",").map(s => s.trim()).filter(Boolean),
        flavors: flavors.split(",").map(s => s.trim()).filter(Boolean),
        description: description.trim(),
      },
      submitterName: submitterName.trim(),
      submitterEmail: submitterEmail.trim(),
      notes: notes.trim(),
    });
  };

  return (
    <Modal onClose={onClose} title="Add a Strain">
      <div className="space-y-3">
        <Field label="Strain name *" value={name} onChange={setName} placeholder="e.g. Monocur OG Hella Candy" />
        <SelectField
          label="Breeder *"
          value={breeder}
          onChange={setBreeder}
          options={breeders.map(b => b.name).sort()}
        />
        <Field label="Or new breeder name" value={newBreeder} onChange={setNewBreeder} placeholder="Leave blank to use selected" />
        <SelectField label="Type" value={type} onChange={setType} options={["Sativa", "Indica", "Hybrid"]} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="THC %" value={thc} onChange={setThc} placeholder="22" />
          <Field label="CBD %" value={cbd} onChange={setCbd} placeholder="0.5" />
        </div>
        <Field label="Lineage (comma separated)" value={lineage} onChange={setLineage} placeholder="OG Kush, Candy" />
        <Field label="Effects (comma separated)" value={effects} onChange={setEffects} placeholder="Relaxed, Euphoric, Happy" />
        <Field label="Flavors (comma separated)" value={flavors} onChange={setFlavors} placeholder="Sweet, Candy, Earthy" />
        <TextArea label="Description" value={description} onChange={setDescription} placeholder="Background, breeder notes, growing tips..." />
        <div className="border-t border-emerald-900/30 pt-3 mt-3">
          <p className="text-xs text-emerald-400/60 mb-2">Your details (so we can credit you)</p>
          <Field label="Your name *" value={submitterName} onChange={setSubmitterName} />
          <Field label="Your email (optional)" value={submitterEmail} onChange={setSubmitterEmail} type="email" />
        </div>
        <TextArea label="Anything else?" value={notes} onChange={setNotes} placeholder="Source for the info..." />
        <SubmitButtons onCancel={onClose} onSubmit={handleSubmit} />
      </div>
    </Modal>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-[#0f2818] border border-emerald-700/40 rounded-2xl p-6 max-w-lg w-full my-8 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-emerald-100">{title}</h2>
          <button onClick={onClose} className="p-1 hover:bg-emerald-900/50 rounded">
            <X className="w-5 h-5 text-emerald-400" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="text-xs text-emerald-400/70 mb-1 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg bg-emerald-950/50 border border-emerald-800/30 text-emerald-100 placeholder-emerald-400/30 focus:outline-none focus:border-emerald-600/50"
      />
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs text-emerald-400/70 mb-1 block">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full px-3 py-2 rounded-lg bg-emerald-950/50 border border-emerald-800/30 text-emerald-100 placeholder-emerald-400/30 focus:outline-none focus:border-emerald-600/50"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      <label className="text-xs text-emerald-400/70 mb-1 block">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-emerald-950/50 border border-emerald-800/30 text-emerald-100 focus:outline-none focus:border-emerald-600/50"
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function SubmitButtons({ onCancel, onSubmit }: { onCancel: () => void; onSubmit: () => void }) {
  return (
    <div className="flex gap-2 pt-3">
      <button
        onClick={onCancel}
        className="flex-1 px-4 py-2.5 rounded-lg border border-emerald-800 text-emerald-300 hover:bg-emerald-900/30 font-semibold"
      >
        Cancel
      </button>
      <button
        onClick={onSubmit}
        className="flex-1 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center justify-center gap-1.5"
      >
        <Send className="w-4 h-4" /> Submit
      </button>
    </div>
  );
}
