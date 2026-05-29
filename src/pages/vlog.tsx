import { useState } from "react";
import { ArrowLeft, Heart, MessageCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { VlogPost } from "@/types";

const initialPosts: VlogPost[] = [
  { id: "1", authorName: "SF Grower 415", title: "Week 8 Flower — Purple Punch", content: "Stacking heavy! Trichome production is wild this run. Running organic living soil with compost tea feeds every 5 days. Night temps dropping to 62 bringing out those purples.", tags: ["flower", "organic", "indoor"], createdAt: "2 hours ago", likes: 34 },
  { id: "2", authorName: "Emerald Triangle OG", title: "2026 Outdoor Season Prep", content: "Started 200 seeds indoors under 24hr light. Moving to the 100-gallon smart pots in 3 weeks once last frost passes. Running Blue Dream crosses and a new GMO x Zkittlez line.", tags: ["outdoor", "season-prep", "large-scale"], createdAt: "1 day ago", likes: 89 },
  { id: "3", authorName: "Clone Queen", title: "Bay Area Clone Market Update", content: "New cuts circulating: Zushi, Permanent Marker, and a verified GSC cut. Prices range $15-50 per clone depending on genetics and source. Watch out for mislabeled cuts going around Hayward area.", tags: ["clones", "market", "bay-area"], createdAt: "3 days ago", likes: 56 },
];

const theme = { bg: "#0a0f0a", fg: "#e8f0e3", accent: "#7cbd5a", gold: "#c8a84e", card: "rgba(20,30,18,0.85)" };

export default function Vlog() {
  const n = useNavigate();
  const [posts, setPosts] = useState(initialPosts);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");

  const addPost = () => {
    if (!title || !content) return;
    setPosts([{
      id: Date.now().toString(), authorName: "Community", title, content,
      tags: tag ? [tag] : [], createdAt: "just now", likes: 0
    }, ...posts]);
    setTitle(""); setContent(""); setTag(""); setShowForm(false);
  };

  return (
    <div className="min-h-screen" style={{background: theme.bg, color: theme.fg}}>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <button onClick={() => n("/")} className="flex items-center gap-2 text-sm mb-8" style={{color: theme.gold}}><ArrowLeft className="w-4 h-4" /> Back</button>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold" style={{color: theme.accent}}>Community Vlog</h1>
            <p style={{color: "rgba(200,180,160,0.5)"}}>Grow diaries · Strain reviews · Market talk</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 rounded-lg text-sm font-medium transition-all" style={{background: theme.accent, color: theme.bg}}>{showForm ? "Cancel" : "New Post"}</button>
        </div>
        {showForm && (
          <div className="p-6 rounded-xl border mb-8" style={{background: theme.card, borderColor: "rgba(124,189,90,0.15)"}}>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Post title" className="w-full mb-3 px-4 py-2 rounded-lg text-sm" style={{background: "rgba(255,255,255,0.05)", border: "1px solid rgba(124,189,90,0.2)"}} />
            <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Share your grow, ask questions..." rows={3} className="w-full mb-3 px-4 py-2 rounded-lg text-sm" style={{background: "rgba(255,255,255,0.05)", border: "1px solid rgba(124,189,90,0.2)"}} />
            <div className="flex gap-3">
              <input value={tag} onChange={e => setTag(e.target.value)} placeholder="Tag (e.g. outdoor)" className="flex-1 px-4 py-2 rounded-lg text-sm" style={{background: "rgba(255,255,255,0.05)", border: "1px solid rgba(124,189,90,0.2)"}} />
              <button onClick={addPost} className="px-6 py-2 rounded-lg text-sm font-medium" style={{background: theme.accent, color: theme.bg}}>Post</button>
            </div>
          </div>
        )}
        <div className="space-y-4">
          {posts.map(p => (
            <div key={p.id} className="p-6 rounded-xl border" style={{background: theme.card, borderColor: "rgba(124,189,90,0.1)"}}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{p.title}</h3>
                  <p className="text-xs" style={{color: "rgba(200,180,160,0.4)"}}>{p.authorName} · <Clock className="w-3 h-3 inline" /> {p.createdAt}</p>
                </div>
              </div>
              <p className="text-sm mb-4 leading-relaxed">{p.content}</p>
              <div className="flex gap-3 flex-wrap mb-3">
                {p.tags.map(t => <span key={t} className="px-2 py-0.5 rounded text-xs" style={{background: "rgba(124,189,90,0.1)", color: theme.accent}}>{t}</span>)}
              </div>
              <div className="flex gap-4">
                <span className="flex items-center gap-1 text-xs" style={{color: theme.gold}}><Heart className="w-3.5 h-3.5" /> {p.likes}</span>
                <span className="flex items-center gap-1 text-xs" style={{color: "rgba(200,180,160,0.4)"}}><MessageCircle className="w-3.5 h-3.5" /> Reply</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
