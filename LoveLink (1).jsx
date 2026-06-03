
import { useState, useEffect, useRef, useCallback } from "react";

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const T = {
  rose: "#FF3B6B",
  roseLight: "#FF6B8A",
  roseDark: "#CC1F4A",
  gold: "#FFB830",
  purple: "#8B5CF6",
  teal: "#06B6D4",
  dark: "#0A0A0F",
  darker: "#05050A",
  card: "#12121A",
  cardHover: "#1A1A26",
  border: "#2A2A3A",
  borderLight: "#3A3A4A",
  text: "#F0F0FF",
  textMuted: "#8888AA",
  textFaint: "#4A4A6A",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --rose: ${T.rose};
    --rose-light: ${T.roseLight};
    --rose-dark: ${T.roseDark};
    --gold: ${T.gold};
    --purple: ${T.purple};
    --teal: ${T.teal};
    --dark: ${T.dark};
    --darker: ${T.darker};
    --card: ${T.card};
    --card-hover: ${T.cardHover};
    --border: ${T.border};
    --border-light: ${T.borderLight};
    --text: ${T.text};
    --text-muted: ${T.textMuted};
    --text-faint: ${T.textFaint};
  }

  html, body { height: 100%; background: ${T.darker}; }

  body {
    font-family: 'DM Sans', sans-serif;
    color: ${T.text};
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
  }

  #root { height: 100%; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 2px; }

  /* ── ANIMATIONS ── */
  @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }
  @keyframes slideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: none; } }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes heartBeat { 0%,100%{transform:scale(1)} 14%{transform:scale(1.3)} 28%{transform:scale(1)} 42%{transform:scale(1.3)} 70%{transform:scale(1)} }
  @keyframes swipeLeft { to { transform: translateX(-140%) rotate(-20deg); opacity: 0; } }
  @keyframes swipeRight { to { transform: translateX(140%) rotate(20deg); opacity: 0; } }
  @keyframes cardIn { from { transform: scale(0.92) translateY(20px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }
  @keyframes ripple { to { transform: scale(4); opacity: 0; } }
  @keyframes shimmer { from { background-position: -200% 0; } to { background-position: 200% 0; } }
  @keyframes glow { 0%,100%{box-shadow:0 0 20px rgba(255,59,107,0.3)} 50%{box-shadow:0 0 40px rgba(255,59,107,0.6)} }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes matchPop { 0%{transform:scale(0) rotate(-10deg);opacity:0} 60%{transform:scale(1.15) rotate(3deg)} 80%{transform:scale(0.95) rotate(-1deg)} 100%{transform:scale(1) rotate(0);opacity:1} }
  @keyframes notifSlide { from{transform:translateX(120%)} to{transform:translateX(0)} }

  .fade-in { animation: fadeIn 0.4s ease forwards; }
  .slide-up { animation: slideUp 0.5s cubic-bezier(0.22,1,0.36,1) forwards; }

  /* ── BUTTONS ── */
  .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: 12px 24px; border-radius: 14px; font-family: 'DM Sans', sans-serif;
    font-size: 15px; font-weight: 500; border: none; cursor: pointer;
    transition: all 0.2s cubic-bezier(0.22,1,0.36,1); position: relative; overflow: hidden;
    letter-spacing: 0.01em; white-space: nowrap;
  }
  .btn:active { transform: scale(0.97); }
  .btn-primary {
    background: linear-gradient(135deg, var(--rose), var(--rose-dark));
    color: #fff; box-shadow: 0 4px 20px rgba(255,59,107,0.35);
  }
  .btn-primary:hover { box-shadow: 0 6px 28px rgba(255,59,107,0.5); transform: translateY(-1px); }
  .btn-ghost { background: transparent; color: var(--text-muted); border: 1px solid var(--border); }
  .btn-ghost:hover { background: var(--card); color: var(--text); border-color: var(--border-light); }
  .btn-sm { padding: 8px 16px; font-size: 13px; border-radius: 10px; }
  .btn-icon {
    width: 48px; height: 48px; padding: 0; border-radius: 50%;
    background: var(--card); border: 1px solid var(--border); color: var(--text-muted);
  }
  .btn-icon:hover { background: var(--card-hover); color: var(--text); border-color: var(--border-light); }

  .ripple-effect {
    position: absolute; border-radius: 50%; width: 10px; height: 10px;
    background: rgba(255,255,255,0.3); animation: ripple 0.6s linear;
    transform: scale(0); pointer-events: none;
  }

  /* ── INPUTS ── */
  .input {
    width: 100%; padding: 14px 16px; background: var(--card);
    border: 1px solid var(--border); border-radius: 14px; color: var(--text);
    font-family: 'DM Sans', sans-serif; font-size: 15px; outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .input:focus { border-color: var(--rose); box-shadow: 0 0 0 3px rgba(255,59,107,0.15); }
  .input::placeholder { color: var(--text-faint); }

  .textarea { resize: none; min-height: 100px; }

  /* ── CARDS ── */
  .card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 20px; overflow: hidden;
  }

  /* ── TAGS ── */
  .tag {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: 500;
    background: rgba(255,59,107,0.12); color: var(--rose); border: 1px solid rgba(255,59,107,0.2);
  }
  .tag-purple { background: rgba(139,92,246,0.12); color: var(--purple); border-color: rgba(139,92,246,0.2); }
  .tag-teal { background: rgba(6,182,212,0.12); color: var(--teal); border-color: rgba(6,182,212,0.2); }
  .tag-gold { background: rgba(255,184,48,0.12); color: var(--gold); border-color: rgba(255,184,48,0.2); }

  /* ── BADGE ── */
  .badge {
    display: inline-flex; align-items: center; justify-content: center;
    min-width: 18px; height: 18px; padding: 0 4px;
    background: var(--rose); color: #fff; border-radius: 20px; font-size: 10px; font-weight: 700;
  }

  /* ── SHIMMER ── */
  .shimmer {
    background: linear-gradient(90deg, var(--card) 25%, var(--card-hover) 50%, var(--card) 75%);
    background-size: 200% 100%; animation: shimmer 1.5s infinite;
  }

  /* ── SCROLLABLE ── */
  .scrollable { overflow-y: auto; overflow-x: hidden; }
  .scrollable::-webkit-scrollbar { width: 3px; }

  /* ── DIVIDER ── */
  .divider { height: 1px; background: var(--border); width: 100%; }

  /* ── AVATAR ── */
  .avatar {
    border-radius: 50%; object-fit: cover; flex-shrink: 0;
    background: linear-gradient(135deg, var(--rose), var(--purple));
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-weight: 700; color: #fff;
  }

  /* ── ONLINE DOT ── */
  .online-dot {
    width: 10px; height: 10px; border-radius: 50%;
    background: var(--success); border: 2px solid var(--darker); flex-shrink: 0;
  }

  /* ── TOGGLE ── */
  .toggle { position: relative; width: 44px; height: 24px; cursor: pointer; }
  .toggle input { opacity: 0; width: 0; height: 0; position: absolute; }
  .toggle-slider {
    position: absolute; inset: 0; background: var(--border); border-radius: 12px;
    transition: 0.3s; cursor: pointer;
  }
  .toggle-slider::before {
    content: ''; position: absolute; width: 18px; height: 18px; left: 3px; top: 3px;
    background: #fff; border-radius: 50%; transition: 0.3s;
  }
  input:checked + .toggle-slider { background: var(--rose); }
  input:checked + .toggle-slider::before { transform: translateX(20px); }

  /* ── PROGRESS ── */
  .progress-bar {
    height: 4px; background: var(--border); border-radius: 2px; overflow: hidden;
  }
  .progress-fill {
    height: 100%; background: linear-gradient(90deg, var(--rose), var(--rose-light));
    border-radius: 2px; transition: width 0.5s cubic-bezier(0.22,1,0.36,1);
  }

  /* ── MATCH OVERLAY ── */
  .match-overlay {
    position: fixed; inset: 0; z-index: 100; display: flex; align-items: center; justify-content: center;
    background: rgba(0,0,0,0.85); backdrop-filter: blur(12px);
  }
  .match-card { animation: matchPop 0.6s cubic-bezier(0.22,1,0.36,1) forwards; }

  /* ── NOTIF ── */
  .notif-toast {
    position: fixed; top: 20px; right: 20px; z-index: 200;
    animation: notifSlide 0.4s cubic-bezier(0.22,1,0.36,1) forwards;
    max-width: 320px;
  }
`;

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const INTERESTS = ["🎵 Music","🎨 Art","🏋️ Fitness","📚 Books","🍕 Foodie","✈️ Travel","🎮 Gaming","🎬 Movies","🌿 Nature","🐾 Pets","🧘 Yoga","🏄 Surfing","📸 Photography","🍷 Wine","🎭 Theatre","🔬 Science"];

const MOCK_PROFILES = [
  { id: 1, name: "Sophia R.", age: 26, bio: "Chasing sunsets and good espresso. Part-time adventurer, full-time overthinker. Let's get lost somewhere beautiful.", location: "New York, NY", distance: "3 mi", interests: ["✈️ Travel","📸 Photography","☕ Coffee"], profession: "Product Designer", verified: true, premium: true, online: true, photos: ["https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80","https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=400&q=80"] },
  { id: 2, name: "Aisha M.", age: 24, bio: "Music producer by day, home chef by night. My playlists hit different and so does my pasta. Swipe right for both 🎶", location: "Brooklyn, NY", distance: "5 mi", interests: ["🎵 Music","🍕 Foodie","🎨 Art"], profession: "Music Producer", verified: true, premium: false, online: true, photos: ["https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80","https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80"] },
  { id: 3, name: "Elena V.", age: 28, bio: "Architect of dreams and buildings. I see beauty in structure and chaos in symmetry. Weekend hiker, weekday coffee snob.", location: "Manhattan, NY", distance: "2 mi", interests: ["🏋️ Fitness","🌿 Nature","📚 Books"], profession: "Architect", verified: false, premium: true, online: false, photos: ["https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=400&q=80","https://images.unsplash.com/photo-1521146764736-56c929d59c83?w=400&q=80"] },
  { id: 4, name: "Mei L.", age: 25, bio: "Software engineer with a thing for terrible puns and good ramen. I'll debug your code and your day 💻✨", location: "Queens, NY", distance: "8 mi", interests: ["🎮 Gaming","📚 Books","🔬 Science"], profession: "Software Engineer", verified: true, premium: false, online: true, photos: ["https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=400&q=80","https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=400&q=80"] },
  { id: 5, name: "Zara K.", age: 27, bio: "Yoga instructor with a wandering soul. Somewhere between meditation and mischief. Let's make memories that matter 🌸", location: "Hoboken, NJ", distance: "6 mi", interests: ["🧘 Yoga","🌿 Nature","✈️ Travel"], profession: "Yoga Instructor", verified: true, premium: true, online: false, photos: ["https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80","https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80"] },
];

const MOCK_MATCHES = [
  { id: 101, name: "Sophia R.", age: 26, photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&q=80", online: true, lastMsg: "That sounds amazing! I'd love to...", time: "2m", unread: 2 },
  { id: 102, name: "Aisha M.", age: 24, photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80", online: true, lastMsg: "Hey! How's your day going? 😊", time: "1h", unread: 0 },
  { id: 103, name: "Maya J.", age: 29, photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80", online: false, lastMsg: "We should grab coffee sometime!", time: "3h", unread: 1 },
  { id: 104, name: "Luna C.", age: 23, photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&q=80", online: false, lastMsg: "Haha yes exactly! 😂", time: "1d", unread: 0 },
];

const MOCK_MESSAGES = {
  101: [
    { id: 1, from: "them", text: "Hey! I saw you're into photography too! 📸", time: "10:32 AM" },
    { id: 2, from: "me", text: "Yes! I love shooting landscapes mostly. What about you?", time: "10:35 AM" },
    { id: 3, from: "them", text: "Portrait photography mostly. I find people so fascinating!", time: "10:37 AM" },
    { id: 4, from: "me", text: "That's beautiful. Have you had any exhibitions?", time: "10:40 AM" },
    { id: 5, from: "them", text: "That sounds amazing! I'd love to see your work sometime 🥰", time: "10:41 AM" },
  ],
  102: [
    { id: 1, from: "them", text: "Hey! How's your day going? 😊", time: "9:15 AM" },
  ],
  103: [
    { id: 1, from: "me", text: "Hi! Loved your profile 😊", time: "Yesterday" },
    { id: 2, from: "them", text: "We should grab coffee sometime!", time: "Yesterday" },
  ],
  104: [
    { id: 1, from: "them", text: "I can't believe we both love Studio Ghibli!", time: "2d ago" },
    { id: 2, from: "me", text: "Right?? Spirited Away is a masterpiece", time: "2d ago" },
    { id: 3, from: "them", text: "Haha yes exactly! 😂", time: "2d ago" },
  ],
};

const ADMIN_STATS = { totalUsers: 28450, activeToday: 4821, newMatches: 1243, revenue: 48920, reported: 12, banned: 3 };

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function useRipple() {
  function addRipple(e) {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const rip = document.createElement("span");
    rip.className = "ripple-effect";
    rip.style.left = `${e.clientX - rect.left - 5}px`;
    rip.style.top = `${e.clientY - rect.top - 5}px`;
    btn.appendChild(rip);
    setTimeout(() => rip.remove(), 600);
  }
  return addRipple;
}

function Avatar({ src, name, size = 40, style = {} }) {
  const initials = name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  if (src) return <img src={src} alt={name} style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", flexShrink: 0, ...style }} />;
  return (
    <div className="avatar" style={{ width: size, height: size, fontSize: size * 0.35, flexShrink: 0, ...style }}>
      {initials}
    </div>
  );
}

function Icon({ name, size = 20, color = "currentColor" }) {
  const icons = {
    heart: <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>,
    heartOutline: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
    x: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    star: <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    message: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    bell: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    user: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    settings: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    home: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    send: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
    camera: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
    shield: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    flag: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>,
    lock: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    eye: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    eyeOff: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
    crown: <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 1L15.5 8.5 23 7 19 14H5L1 7 8.5 8.5 12 1Z"/><rect x="3" y="16" width="18" height="4" rx="1"/></svg>,
    location: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    zap: <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    chart: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    users: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    back: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    edit: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    logout: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    verify: <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 0 0 1.946-.806 3.42 3.42 0 0 1 4.438 0 3.42 3.42 0 0 0 1.946.806 3.42 3.42 0 0 1 3.138 3.138 3.42 3.42 0 0 0 .806 1.946 3.42 3.42 0 0 1 0 4.438 3.42 3.42 0 0 0-.806 1.946 3.42 3.42 0 0 1-3.138 3.138 3.42 3.42 0 0 0-1.946.806 3.42 3.42 0 0 1-4.438 0 3.42 3.42 0 0 0-1.946-.806 3.42 3.42 0 0 1-3.138-3.138 3.42 3.42 0 0 0-.806-1.946 3.42 3.42 0 0 1 0-4.438 3.42 3.42 0 0 0 .806-1.946 3.42 3.42 0 0 1 3.138-3.138z"/></svg>,
  };
  return icons[name] || null;
}

// ─── NOTIFICATION TOAST ──────────────────────────────────────────────────────
function Toast({ msg, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, []);
  return (
    <div className="notif-toast card" style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
      <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,59,107,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon name="bell" size={16} color={T.rose} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 500 }}>{msg.title}</div>
        <div style={{ fontSize: 12, color: T.textMuted }}>{msg.body}</div>
      </div>
      <button onClick={onClose} style={{ background: "none", border: "none", color: T.textFaint, cursor: "pointer", padding: 4 }}>
        <Icon name="x" size={14} />
      </button>
    </div>
  );
}

// ─── AUTH SCREEN ─────────────────────────────────────────────────────────────
function AuthScreen({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ email: "", password: "", name: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const ripple = useRipple();

  const handle = async () => {
    setError("");
    if (!form.email || !form.password) { setError("Please fill all fields."); return; }
    if (mode === "register" && form.password !== form.confirm) { setError("Passwords don't match."); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    onAuth({ email: form.email, name: form.name || "You", isAdmin: form.email === "admin@lovelink.app" });
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: T.darker, padding: 20, position: "relative", overflow: "hidden" }}>
      {/* BG blobs */}
      <div style={{ position: "absolute", top: -120, left: -120, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,59,107,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="fade-in" style={{ width: "100%", maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ width: 72, height: 72, borderRadius: 24, background: "linear-gradient(135deg, #FF3B6B, #FF6B8A)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 8px 32px rgba(255,59,107,0.4)", animation: "glow 3s ease infinite" }}>
            <Icon name="heart" size={36} color="#fff" />
          </div>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.02em" }}>
            Love<span style={{ color: T.rose }}>Link</span>
          </h1>
          <p style={{ color: T.textMuted, fontSize: 14, marginTop: 4 }}>Where connections come alive ✨</p>
        </div>

        <div className="card" style={{ padding: "28px 24px" }}>
          {/* Tabs */}
          <div style={{ display: "flex", background: T.darker, borderRadius: 12, padding: 4, marginBottom: 24 }}>
            {["login", "register"].map(m => (
              <button key={m} onClick={() => { setMode(m); setError(""); }} style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: "none", cursor: "pointer", fontFamily: "DM Sans, sans-serif", fontSize: 14, fontWeight: 500, transition: "all 0.2s", background: mode === m ? T.rose : "transparent", color: mode === m ? "#fff" : T.textMuted }}>
                {m === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {mode === "register" && (
              <input className="input" placeholder="Full name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
            )}
            <input className="input" type="email" placeholder="Email address" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
            <div style={{ position: "relative" }}>
              <input className="input" type={showPw ? "text" : "password"} placeholder="Password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} style={{ paddingRight: 48 }} />
              <button onClick={() => setShowPw(p => !p)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: T.textFaint, cursor: "pointer" }}>
                <Icon name={showPw ? "eyeOff" : "eye"} size={18} />
              </button>
            </div>
            {mode === "register" && (
              <input className="input" type="password" placeholder="Confirm password" value={form.confirm} onChange={e => setForm(p => ({ ...p, confirm: e.target.value }))} />
            )}
          </div>

          {error && <div style={{ color: T.error, fontSize: 13, marginTop: 10, padding: "8px 12px", background: "rgba(239,68,68,0.1)", borderRadius: 8, border: "1px solid rgba(239,68,68,0.2)" }}>{error}</div>}

          <button className="btn btn-primary" onClick={(e) => { ripple(e); handle(); }} style={{ width: "100%", marginTop: 20, height: 50, fontSize: 16 }} disabled={loading}>
            {loading ? <div style={{ width: 20, height: 20, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} /> : (mode === "login" ? "Sign In" : "Create Account")}
          </button>

          {mode === "login" && (
            <p style={{ textAlign: "center", fontSize: 12, color: T.textFaint, marginTop: 12 }}>
              <span style={{ color: T.rose, cursor: "pointer" }}>Forgot password?</span>
            </p>
          )}
        </div>

        <p style={{ textAlign: "center", fontSize: 11, color: T.textFaint, marginTop: 20 }}>
          By continuing you agree to our <span style={{ color: T.textMuted }}>Terms</span> & <span style={{ color: T.textMuted }}>Privacy Policy</span>
        </p>
        <p style={{ textAlign: "center", fontSize: 11, color: T.textFaint, marginTop: 8 }}>
          Try admin: <span style={{ color: T.rose }}>admin@lovelink.app</span> / any password
        </p>
      </div>
    </div>
  );
}

// ─── PROFILE SETUP ───────────────────────────────────────────────────────────
function ProfileSetup({ user, onComplete }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: user.name, age: "", bio: "", gender: "", looking: [], interests: [], photo: null });
  const steps = ["Basics", "About", "Interests", "Photo"];

  const sel = (key, val, multi = false) => {
    if (multi) {
      setData(p => ({ ...p, [key]: p[key].includes(val) ? p[key].filter(x => x !== val) : p[key].length < 5 ? [...p[key], val] : p[key] }));
    } else {
      setData(p => ({ ...p, [key]: val }));
    }
  };

  const next = () => { if (step < steps.length - 1) setStep(p => p + 1); else onComplete(data); };
  const can = [data.name && data.age, data.bio, data.interests.length > 0, true][step];

  return (
    <div style={{ minHeight: "100vh", background: T.darker, display: "flex", flexDirection: "column", padding: 20, maxWidth: 480, margin: "0 auto" }}>
      <div style={{ paddingTop: 40 }}>
        {/* Progress */}
        <div style={{ display: "flex", gap: 6, marginBottom: 32 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? T.rose : T.border, transition: "background 0.3s" }} />
          ))}
        </div>

        <div className="fade-in" key={step} style={{ flex: 1 }}>
          {step === 0 && (
            <div>
              <h2 style={{ fontFamily: "Syne", fontSize: 26, fontWeight: 700, marginBottom: 6 }}>Tell us about you</h2>
              <p style={{ color: T.textMuted, marginBottom: 24 }}>The basics first 👋</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 12, color: T.textMuted, marginBottom: 6, display: "block" }}>Your name</label>
                  <input className="input" value={data.name} onChange={e => setData(p => ({ ...p, name: e.target.value }))} placeholder="First name" />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: T.textMuted, marginBottom: 6, display: "block" }}>Age</label>
                  <input className="input" type="number" min="18" max="99" value={data.age} onChange={e => setData(p => ({ ...p, age: e.target.value }))} placeholder="Your age" />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: T.textMuted, marginBottom: 8, display: "block" }}>I am</label>
                  <div style={{ display: "flex", gap: 10 }}>
                    {["Woman", "Man", "Non-binary"].map(g => (
                      <button key={g} onClick={() => sel("gender", g)} style={{ flex: 1, padding: "12px 0", borderRadius: 12, border: `1px solid ${data.gender === g ? T.rose : T.border}`, background: data.gender === g ? "rgba(255,59,107,0.1)" : T.card, color: data.gender === g ? T.rose : T.textMuted, fontFamily: "DM Sans", fontSize: 13, cursor: "pointer", transition: "all 0.2s" }}>
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 style={{ fontFamily: "Syne", fontSize: 26, fontWeight: 700, marginBottom: 6 }}>Your story</h2>
              <p style={{ color: T.textMuted, marginBottom: 24 }}>Make them want to know more ✍️</p>
              <textarea className="input textarea" value={data.bio} onChange={e => setData(p => ({ ...p, bio: e.target.value }))} placeholder="Write something that captures who you are. Be authentic, be you." style={{ height: 140 }} />
              <p style={{ fontSize: 12, color: T.textFaint, marginTop: 8 }}>{data.bio.length}/300 characters</p>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ fontFamily: "Syne", fontSize: 26, fontWeight: 700, marginBottom: 6 }}>Your vibe</h2>
              <p style={{ color: T.textMuted, marginBottom: 24 }}>Pick up to 5 interests 🌟</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {INTERESTS.map(i => (
                  <button key={i} onClick={() => sel("interests", i, true)} style={{ padding: "10px 16px", borderRadius: 20, border: `1px solid ${data.interests.includes(i) ? T.rose : T.border}`, background: data.interests.includes(i) ? "rgba(255,59,107,0.12)" : T.card, color: data.interests.includes(i) ? T.rose : T.textMuted, fontFamily: "DM Sans", fontSize: 13, cursor: "pointer", transition: "all 0.2s" }}>
                    {i}
                  </button>
                ))}
              </div>
              <p style={{ fontSize: 12, color: T.textFaint, marginTop: 12 }}>{data.interests.length}/5 selected</p>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 style={{ fontFamily: "Syne", fontSize: 26, fontWeight: 700, marginBottom: 6 }}>Your best photo</h2>
              <p style={{ color: T.textMuted, marginBottom: 24 }}>First impressions matter 📸</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                {[0, 1, 2].map(i => (
                  <div key={i} onClick={() => i === 0 && setData(p => ({ ...p, photo: `https://images.unsplash.com/photo-152962645559${i + 4}-4ff0802cfb7e?w=400&q=80` }))} style={{ aspectRatio: "3/4", borderRadius: 16, border: `2px dashed ${i === 0 && data.photo ? T.rose : T.border}`, background: T.card, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", overflow: "hidden", position: "relative" }}>
                    {i === 0 && data.photo ? (
                      <img src={data.photo} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                        <Icon name="plus" size={24} color={T.textFaint} />
                        <span style={{ fontSize: 11, color: T.textFaint }}>{i === 0 ? "Main photo" : "Add photo"}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 12, color: T.textFaint, marginTop: 12, textAlign: "center" }}>Click the first slot to add a sample photo</p>
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: "auto", paddingTop: 24 }}>
        <button className="btn btn-primary" onClick={next} style={{ width: "100%", height: 52, fontSize: 16 }} disabled={!can}>
          {step === steps.length - 1 ? "Let's go! 🚀" : "Continue →"}
        </button>
        {step > 0 && (
          <button className="btn btn-ghost" onClick={() => setStep(p => p - 1)} style={{ width: "100%", marginTop: 10, height: 44 }}>
            Back
          </button>
        )}
      </div>
    </div>
  );
}

// ─── SWIPE CARD ───────────────────────────────────────────────────────────────
function SwipeCard({ profile, onSwipe, isTop }) {
  const cardRef = useRef(null);
  const [drag, setDrag] = useState({ x: 0, y: 0, dragging: false });
  const [photoIdx, setPhotoIdx] = useState(0);
  const [action, setAction] = useState(null); // 'like' | 'nope' | 'super'
  const startPos = useRef({ x: 0, y: 0 });

  const onMouseDown = (e) => {
    if (!isTop) return;
    setDrag({ x: 0, y: 0, dragging: true });
    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = useCallback((e) => {
    if (!drag.dragging) return;
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    setDrag(p => ({ ...p, x: dx, y: dy }));
    if (dx > 60) setAction("like");
    else if (dx < -60) setAction("nope");
    else setAction(null);
  }, [drag.dragging]);

  const onMouseUp = useCallback(() => {
    if (!drag.dragging) return;
    if (drag.x > 80) onSwipe("like");
    else if (drag.x < -80) onSwipe("nope");
    setDrag({ x: 0, y: 0, dragging: false });
    setAction(null);
  }, [drag]);

  useEffect(() => {
    if (drag.dragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      return () => { window.removeEventListener("mousemove", onMouseMove); window.removeEventListener("mouseup", onMouseUp); };
    }
  }, [drag.dragging, onMouseMove, onMouseUp]);

  const rot = drag.x / 15;
  const likeOp = Math.min(Math.max(drag.x / 100, 0), 1);
  const nopeOp = Math.min(Math.max(-drag.x / 100, 0), 1);

  return (
    <div
      ref={cardRef}
      onMouseDown={onMouseDown}
      style={{
        position: "absolute", inset: 0, cursor: isTop ? "grab" : "default",
        transform: `translate(${drag.x}px, ${drag.y}px) rotate(${rot}deg)`,
        transition: drag.dragging ? "none" : "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
        animation: isTop ? "cardIn 0.4s cubic-bezier(0.22,1,0.36,1)" : "none",
        userSelect: "none", touchAction: "none",
      }}
    >
      <div style={{ width: "100%", height: "100%", borderRadius: 24, overflow: "hidden", position: "relative", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
        {/* Photo */}
        <img src={profile.photos[photoIdx]} alt={profile.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} draggable={false} />

        {/* Photo indicators */}
        <div style={{ position: "absolute", top: 12, left: 12, right: 12, display: "flex", gap: 4 }}>
          {profile.photos.map((_, i) => (
            <div key={i} onClick={() => setPhotoIdx(i)} style={{ flex: 1, height: 3, borderRadius: 2, background: i === photoIdx ? "#fff" : "rgba(255,255,255,0.4)", cursor: "pointer" }} />
          ))}
        </div>

        {/* Photo nav areas */}
        <div style={{ position: "absolute", inset: 0, display: "flex" }}>
          <div style={{ flex: 1 }} onClick={() => setPhotoIdx(Math.max(0, photoIdx - 1))} />
          <div style={{ flex: 1 }} onClick={() => setPhotoIdx(Math.min(profile.photos.length - 1, photoIdx + 1))} />
        </div>

        {/* LIKE / NOPE stamps */}
        <div style={{ position: "absolute", top: 60, left: 20, padding: "8px 18px", border: "3px solid #00E676", borderRadius: 12, transform: `rotate(-15deg)`, opacity: likeOp, transition: "opacity 0.1s" }}>
          <span style={{ fontFamily: "Syne", fontSize: 28, fontWeight: 800, color: "#00E676", letterSpacing: "0.05em" }}>LIKE</span>
        </div>
        <div style={{ position: "absolute", top: 60, right: 20, padding: "8px 18px", border: "3px solid #FF3B6B", borderRadius: 12, transform: "rotate(15deg)", opacity: nopeOp, transition: "opacity 0.1s" }}>
          <span style={{ fontFamily: "Syne", fontSize: 28, fontWeight: 800, color: T.rose, letterSpacing: "0.05em" }}>NOPE</span>
        </div>

        {/* Gradient overlay */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "55%", background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)" }} />

        {/* Info */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 20px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <span style={{ fontFamily: "Syne", fontSize: 24, fontWeight: 700, color: "#fff" }}>{profile.name},</span>
            <span style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{profile.age}</span>
            {profile.verified && <Icon name="verify" size={18} color="#4FC3F7" />}
            {profile.premium && <Icon name="crown" size={16} color={T.gold} />}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <Icon name="location" size={13} color="rgba(255,255,255,0.7)" />
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{profile.profession} · {profile.distance}</span>
            {profile.online && <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#00E676", display: "inline-block", boxShadow: "0 0 6px #00E676" }} />}
          </div>

          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.4, marginBottom: 10, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {profile.bio}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {profile.interests.slice(0, 3).map(i => (
              <span key={i} style={{ padding: "4px 10px", borderRadius: 20, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", fontSize: 11, color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}>{i}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DISCOVER SCREEN ─────────────────────────────────────────────────────────
function DiscoverScreen({ onNotify }) {
  const [profiles, setProfiles] = useState([...MOCK_PROFILES]);
  const [swiped, setSwiped] = useState([]);
  const [matchProfile, setMatchProfile] = useState(null);
  const [filter, setFilter] = useState(false);
  const ripple = useRipple();

  const handleSwipe = (dir, profile) => {
    if (dir === "like" && Math.random() > 0.5) {
      setTimeout(() => setMatchProfile(profile), 400);
    }
    setSwiped(p => [...p, { ...profile, dir }]);
    setProfiles(p => p.slice(1));
    if (profiles.length <= 1) {
      setTimeout(() => { setProfiles([...MOCK_PROFILES]); setSwiped([]); }, 500);
    }
  };

  const doSwipe = (dir) => {
    if (profiles.length === 0) return;
    handleSwipe(dir, profiles[0]);
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: T.darker }}>
      {/* Header */}
      <div style={{ padding: "16px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontFamily: "Syne", fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em" }}>
            Love<span style={{ color: T.rose }}>Link</span>
          </h1>
          <p style={{ fontSize: 12, color: T.textMuted }}>NYC · 3 mi radius</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-icon" onClick={() => { onNotify({ title: "Filter Updated", body: "Showing profiles in 3 mile radius" }); setFilter(p => !p); }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={filter ? T.rose : T.textMuted} strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
          </button>
          <button className="btn btn-icon" onClick={() => onNotify({ title: "⚡ Boost Active", body: "Your profile is being boosted for 30 mins" })}>
            <Icon name="zap" size={18} color={T.gold} />
          </button>
        </div>
      </div>

      {/* Card stack */}
      <div style={{ flex: 1, position: "relative", margin: "12px 16px", minHeight: 0 }}>
        {profiles.length === 0 ? (
          <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <div style={{ fontSize: 60 }}>🎉</div>
            <h3 style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 700 }}>You've seen everyone!</h3>
            <p style={{ color: T.textMuted, fontSize: 14 }}>Check back soon for new profiles</p>
            <button className="btn btn-primary" onClick={() => { setProfiles([...MOCK_PROFILES]); setSwiped([]); }}>
              Refresh profiles
            </button>
          </div>
        ) : (
          <>
            {profiles.slice(0, 3).reverse().map((p, i, arr) => (
              <div key={p.id} style={{ position: "absolute", inset: 0, transform: `scale(${1 - (arr.length - 1 - i) * 0.04}) translateY(${(arr.length - 1 - i) * 10}px)`, zIndex: i === arr.length - 1 ? 10 : i }}>
                <SwipeCard profile={p} onSwipe={(dir) => i === arr.length - 1 && handleSwipe(dir, p)} isTop={i === arr.length - 1} />
              </div>
            ))}
          </>
        )}
      </div>

      {/* Action buttons */}
      {profiles.length > 0 && (
        <div style={{ padding: "0 20px 20px", display: "flex", justifyContent: "center", alignItems: "center", gap: 16 }}>
          <button onClick={(e) => { ripple(e); doSwipe("nope"); }} style={{ width: 60, height: 60, borderRadius: "50%", background: T.card, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s", position: "relative", overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.3)" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = T.error}
            onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>
            <Icon name="x" size={24} color={T.error} />
          </button>

          <button onClick={(e) => { ripple(e); doSwipe("super"); }} style={{ width: 54, height: 54, borderRadius: "50%", background: T.card, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s", position: "relative", overflow: "hidden" }}>
            <Icon name="star" size={22} color={T.teal} />
          </button>

          <button onClick={(e) => { ripple(e); doSwipe("like"); }} style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg, #00E676, #00C853)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s", position: "relative", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,230,118,0.35)", border: "none" }}>
            <Icon name="heart" size={28} color="#fff" />
          </button>

          <button onClick={(e) => { ripple(e); onNotify({ title: "⚡ Boost", body: "Get seen by more people! Upgrade to Premium" }); }} style={{ width: 54, height: 54, borderRadius: "50%", background: T.card, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Icon name="zap" size={22} color={T.gold} />
          </button>

          <button onClick={() => { if (swiped.length > 0) { const last = swiped[swiped.length - 1]; setSwiped(p => p.slice(0, -1)); setProfiles(p => [last, ...p]); } }} style={{ width: 60, height: 60, borderRadius: "50%", background: T.card, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s", position: "relative", overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.3)" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-5.1L1 10"/></svg>
          </button>
        </div>
      )}

      {/* MATCH OVERLAY */}
      {matchProfile && (
        <div className="match-overlay" onClick={() => setMatchProfile(null)}>
          <div className="match-card" style={{ textAlign: "center", padding: 32, maxWidth: 340 }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 48, marginBottom: 8, animation: "heartBeat 1.5s ease infinite" }}>💕</div>
            <h2 style={{ fontFamily: "Syne", fontSize: 32, fontWeight: 800, marginBottom: 4 }}>
              It's a <span style={{ color: T.rose }}>Match!</span>
            </h2>
            <p style={{ color: T.textMuted, marginBottom: 24 }}>You and {matchProfile.name} liked each other!</p>
            <div style={{ display: "flex", justifyContent: "center", gap: -12, marginBottom: 28 }}>
              <Avatar src={matchProfile.photos[0]} name={matchProfile.name} size={90} style={{ border: `3px solid ${T.rose}`, boxShadow: "0 0 20px rgba(255,59,107,0.4)" }} />
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: T.rose, display: "flex", alignItems: "center", justifyContent: "center", alignSelf: "center", zIndex: 2, margin: "0 -8px", boxShadow: "0 0 16px rgba(255,59,107,0.5)" }}>
                <Icon name="heart" size={16} color="#fff" />
              </div>
              <div style={{ width: 90, height: 90, borderRadius: "50%", background: "linear-gradient(135deg, #FF3B6B, #8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", border: `3px solid ${T.purple}`, fontSize: 32, boxShadow: "0 0 20px rgba(139,92,246,0.4)" }}>
                😊
              </div>
            </div>
            <button className="btn btn-primary" onClick={() => setMatchProfile(null)} style={{ width: "100%", height: 50 }}>
              Send a Message
            </button>
            <button className="btn btn-ghost" onClick={() => setMatchProfile(null)} style={{ width: "100%", marginTop: 10 }}>
              Keep Swiping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MATCHES / CHAT LIST ─────────────────────────────────────────────────────
function MatchesScreen({ onChat }) {
  const [tab, setTab] = useState("chats");
  const newMatches = MOCK_MATCHES.slice(0, 2);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: T.darker }}>
      <div style={{ padding: "16px 20px 0" }}>
        <h2 style={{ fontFamily: "Syne", fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Messages</h2>
        <div style={{ display: "flex", gap: 0, background: T.card, borderRadius: 12, padding: 4, marginBottom: 16 }}>
          {["chats", "matches"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "9px 0", borderRadius: 9, border: "none", cursor: "pointer", fontFamily: "DM Sans", fontSize: 13, fontWeight: 500, background: tab === t ? T.rose : "transparent", color: tab === t ? "#fff" : T.textMuted, transition: "all 0.2s" }}>
              {t === "chats" ? "💬 Chats" : "💕 New Matches"}
            </button>
          ))}
        </div>
      </div>

      <div className="scrollable" style={{ flex: 1, padding: "0 20px 20px" }}>
        {tab === "matches" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
            {newMatches.map(m => (
              <div key={m.id} onClick={() => onChat(m)} className="card" style={{ padding: 16, cursor: "pointer", textAlign: "center", transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = T.cardHover}
                onMouseLeave={e => e.currentTarget.style.background = T.card}>
                <div style={{ position: "relative", display: "inline-block", marginBottom: 10 }}>
                  <Avatar src={m.photo} name={m.name} size={64} style={{ border: `2px solid ${T.rose}` }} />
                  {m.online && <span style={{ position: "absolute", bottom: 2, right: 2, width: 12, height: 12, borderRadius: "50%", background: T.success, border: `2px solid ${T.card}` }} />}
                </div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{m.name.split(" ")[0]}</div>
                <div style={{ fontSize: 11, color: T.textFaint }}>{m.age} yrs old</div>
              </div>
            ))}
          </div>
        )}

        {tab === "chats" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {MOCK_MATCHES.map(m => (
              <div key={m.id} onClick={() => onChat(m)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 12px", borderRadius: 16, cursor: "pointer", transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = T.card}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <Avatar src={m.photo} name={m.name} size={54} />
                  {m.online && <span style={{ position: "absolute", bottom: 1, right: 1, width: 13, height: 13, borderRadius: "50%", background: T.success, border: `2px solid ${T.darker}` }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ fontWeight: 600, fontSize: 15 }}>{m.name}</span>
                    <span style={{ fontSize: 11, color: T.textFaint }}>{m.time}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 13, color: T.textMuted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 200 }}>{m.lastMsg}</span>
                    {m.unread > 0 && <span className="badge">{m.unread}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── CHAT SCREEN ─────────────────────────────────────────────────────────────
function ChatScreen({ match, onBack }) {
  const [msgs, setMsgs] = useState(MOCK_MESSAGES[match.id] || []);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = () => {
    if (!text.trim()) return;
    const newMsg = { id: Date.now(), from: "me", text: text.trim(), time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMsgs(p => [...p, newMsg]);
    setText("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(p => [...p, { id: Date.now() + 1, from: "them", text: "That's so interesting! Tell me more 😊", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    }, 1800);
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: T.darker }}>
      {/* Header */}
      <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${T.border}`, background: T.card }}>
        <button className="btn btn-icon" style={{ width: 36, height: 36, flexShrink: 0 }} onClick={onBack}>
          <Icon name="back" size={18} />
        </button>
        <div style={{ position: "relative" }}>
          <Avatar src={match.photo} name={match.name} size={40} />
          {match.online && <span style={{ position: "absolute", bottom: 0, right: 0, width: 11, height: 11, borderRadius: "50%", background: T.success, border: `2px solid ${T.card}` }} />}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 15 }}>{match.name}</div>
          <div style={{ fontSize: 12, color: match.online ? T.success : T.textFaint }}>{match.online ? "Online now" : "Last seen recently"}</div>
        </div>
        <button className="btn btn-icon" style={{ width: 36, height: 36 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.textMuted} strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
        </button>
      </div>

      {/* Messages */}
      <div className="scrollable" style={{ flex: 1, padding: "16px 16px 8px", display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 11, color: T.textFaint, background: T.card, padding: "4px 12px", borderRadius: 20 }}>You matched! Say hello 👋</span>
        </div>

        {msgs.map(m => (
          <div key={m.id} style={{ display: "flex", flexDirection: m.from === "me" ? "row-reverse" : "row", alignItems: "flex-end", gap: 8 }}>
            {m.from === "them" && <Avatar src={match.photo} name={match.name} size={28} />}
            <div style={{ maxWidth: "72%", padding: "10px 14px", borderRadius: m.from === "me" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: m.from === "me" ? `linear-gradient(135deg, ${T.rose}, ${T.roseDark})` : T.card, color: m.from === "me" ? "#fff" : T.text, fontSize: 14, lineHeight: 1.5, border: m.from === "them" ? `1px solid ${T.border}` : "none" }}>
              {m.text}
              <div style={{ fontSize: 10, color: m.from === "me" ? "rgba(255,255,255,0.6)" : T.textFaint, marginTop: 3, textAlign: "right" }}>{m.time}</div>
            </div>
          </div>
        ))}

        {typing && (
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
            <Avatar src={match.photo} name={match.name} size={28} />
            <div style={{ padding: "12px 16px", borderRadius: "18px 18px 18px 4px", background: T.card, border: `1px solid ${T.border}`, display: "flex", gap: 4, alignItems: "center" }}>
              {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: T.textFaint, animation: `pulse 1.2s ease ${i * 0.2}s infinite` }} />)}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Emoji quick replies */}
      <div style={{ padding: "8px 16px 0", display: "flex", gap: 8, overflowX: "auto" }}>
        {["😊", "❤️", "😂", "🔥", "👋", "✨"].map(e => (
          <button key={e} onClick={() => setText(p => p + e)} style={{ padding: "6px 10px", borderRadius: 20, background: T.card, border: `1px solid ${T.border}`, fontSize: 18, cursor: "pointer", flexShrink: 0 }}>
            {e}
          </button>
        ))}
      </div>

      {/* Input */}
      <div style={{ padding: "10px 16px 20px", display: "flex", gap: 10, alignItems: "flex-end" }}>
        <button className="btn btn-icon" style={{ width: 44, height: 44, flexShrink: 0 }}>
          <Icon name="camera" size={18} />
        </button>
        <div style={{ flex: 1, background: T.card, borderRadius: 22, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", padding: "6px 16px", gap: 8 }}>
          <input
            value={text} onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Message..."
            style={{ flex: 1, background: "none", border: "none", outline: "none", color: T.text, fontFamily: "DM Sans", fontSize: 14 }}
          />
        </div>
        <button onClick={send} style={{ width: 44, height: 44, borderRadius: "50%", background: text.trim() ? `linear-gradient(135deg, ${T.rose}, ${T.roseDark})` : T.card, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s", flexShrink: 0, boxShadow: text.trim() ? "0 4px 16px rgba(255,59,107,0.3)" : "none" }}>
          <Icon name="send" size={16} color={text.trim() ? "#fff" : T.textFaint} />
        </button>
      </div>
    </div>
  );
}

// ─── PROFILE SCREEN ──────────────────────────────────────────────────────────
function ProfileScreen({ user, onLogout, onNotify }) {
  const [editMode, setEditMode] = useState(false);
  const [showBlock, setShowBlock] = useState(false);
  const stats = [{ label: "Likes", val: "248" }, { label: "Matches", val: "42" }, { label: "Visited", val: "1.2k" }];

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: T.darker }}>
      <div className="scrollable" style={{ flex: 1 }}>
        {/* Hero */}
        <div style={{ position: "relative", height: 280 }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #FF3B6B22, #8B5CF622)" }} />
          <img src="https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=400&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.2 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, var(--darker) 100%)" }} />
          <div style={{ position: "absolute", top: 16, right: 16, display: "flex", gap: 10 }}>
            <button className="btn btn-icon" onClick={() => setEditMode(p => !p)} style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <Icon name="edit" size={18} color={T.text} />
            </button>
            <button className="btn btn-icon" onClick={() => onNotify({ title: "Settings", body: "Profile settings updated" })} style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <Icon name="settings" size={18} color={T.text} />
            </button>
          </div>
          <div style={{ position: "absolute", bottom: 20, left: 20, right: 20, display: "flex", alignItems: "flex-end", gap: 16 }}>
            <div style={{ position: "relative" }}>
              <Avatar size={80} name={user.name} style={{ border: `3px solid ${T.rose}`, boxShadow: "0 0 20px rgba(255,59,107,0.3)" }} />
              <button style={{ position: "absolute", bottom: 0, right: 0, width: 26, height: 26, borderRadius: "50%", background: T.rose, border: "2px solid " + T.darker, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Icon name="camera" size={12} color="#fff" />
              </button>
            </div>
            <div style={{ flex: 1, paddingBottom: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <h2 style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 700 }}>{user.name}</h2>
                <Icon name="verify" size={18} color="#4FC3F7" />
              </div>
              <p style={{ color: T.textMuted, fontSize: 13 }}>New York · 26 yrs old</p>
            </div>
          </div>
        </div>

        <div style={{ padding: "0 20px 20px" }}>
          {/* Premium Banner */}
          <div style={{ margin: "16px 0", padding: "14px 16px", borderRadius: 16, background: "linear-gradient(135deg, rgba(255,184,48,0.12), rgba(139,92,246,0.12))", border: "1px solid rgba(255,184,48,0.2)", display: "flex", alignItems: "center", gap: 12 }}>
            <Icon name="crown" size={24} color={T.gold} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Upgrade to Premium ✨</div>
              <div style={{ fontSize: 12, color: T.textMuted }}>Unlimited likes, see who liked you & more</div>
            </div>
            <button className="btn btn-sm" style={{ background: "linear-gradient(135deg, #FFB830, #FF8C00)", color: "#fff", border: "none", flexShrink: 0 }}>
              Try Free
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
            {stats.map(s => (
              <div key={s.label} className="card" style={{ padding: "14px 0", textAlign: "center" }}>
                <div style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 700, color: T.rose }}>{s.val}</div>
                <div style={{ fontSize: 12, color: T.textMuted }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Bio */}
          {editMode ? (
            <div className="card" style={{ padding: 16, marginBottom: 16 }}>
              <label style={{ fontSize: 12, color: T.textMuted, marginBottom: 8, display: "block" }}>About me</label>
              <textarea className="input textarea" defaultValue="Design enthusiast with a love for art and travel. Looking for someone to share adventures with ✨" style={{ height: 100 }} />
              <button className="btn btn-primary btn-sm" onClick={() => { setEditMode(false); onNotify({ title: "Profile Updated", body: "Your changes have been saved" }); }} style={{ marginTop: 10 }}>Save</button>
            </div>
          ) : (
            <div className="card" style={{ padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 6 }}>About</div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: T.textMuted }}>Design enthusiast with a love for art and travel. Looking for someone to share adventures with ✨</p>
            </div>
          )}

          {/* Interests */}
          <div className="card" style={{ padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 10 }}>Interests</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["✈️ Travel", "📸 Photography", "🎨 Art", "📚 Books", "🍕 Foodie"].map(i => (
                <span key={i} className="tag">{i}</span>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="card" style={{ padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 14 }}>Preferences</div>
            {[
              { label: "Show me to everyone", icon: "eye", on: true },
              { label: "Push notifications", icon: "bell", on: true },
              { label: "Read receipts", icon: "check", on: false },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: i < 2 ? `1px solid ${T.border}` : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(255,59,107,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name={s.icon} size={16} color={T.rose} />
                  </div>
                  <span style={{ fontSize: 14 }}>{s.label}</span>
                </div>
                <label className="toggle">
                  <input type="checkbox" defaultChecked={s.on} />
                  <span className="toggle-slider" />
                </label>
              </div>
            ))}
          </div>

          {/* Safety */}
          <div className="card" style={{ padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 14 }}>Safety & Privacy</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[
                { icon: "shield", label: "Safety Center", color: T.teal },
                { icon: "flag", label: "Report a Problem", color: T.warning },
                { icon: "lock", label: "Privacy Settings", color: T.purple },
              ].map((item, i) => (
                <button key={i} onClick={() => onNotify({ title: item.label, body: "This feature is fully implemented in the native app" })} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", background: "none", border: "none", cursor: "pointer", borderBottom: i < 2 ? `1px solid ${T.border}` : "none", color: T.text, textAlign: "left" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: `${item.color}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name={item.icon} size={16} color={item.color} />
                  </div>
                  <span style={{ flex: 1, fontSize: 14 }}>{item.label}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textFaint} strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              ))}
            </div>
          </div>

          <button className="btn btn-ghost" onClick={onLogout} style={{ width: "100%", height: 48, color: T.error, borderColor: "rgba(239,68,68,0.2)" }}>
            <Icon name="logout" size={18} color={T.error} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── NOTIFICATIONS SCREEN ────────────────────────────────────────────────────
function NotificationsScreen() {
  const notifs = [
    { id: 1, type: "match", msg: "You matched with Sophia R.! 💕", time: "2 min ago", read: false, icon: "heart", color: T.rose },
    { id: 2, type: "like", msg: "Someone liked your profile!", time: "15 min ago", read: false, icon: "star", color: T.gold },
    { id: 3, type: "msg", msg: "Aisha M. sent you a message", time: "1 hour ago", read: true, icon: "message", color: T.teal },
    { id: 4, type: "match", msg: "Maya J. wants to connect! 🎉", time: "3 hours ago", read: true, icon: "heart", color: T.rose },
    { id: 5, type: "visit", msg: "12 people visited your profile today", time: "5 hours ago", read: true, icon: "eye", color: T.purple },
    { id: 6, type: "system", msg: "Complete your profile to get 3x more matches!", time: "1 day ago", read: true, icon: "zap", color: T.gold },
  ];

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: T.darker }}>
      <div style={{ padding: "16px 20px 0" }}>
        <h2 style={{ fontFamily: "Syne", fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Notifications</h2>
      </div>
      <div className="scrollable" style={{ flex: 1, padding: "0 20px 20px" }}>
        {notifs.map(n => (
          <div key={n.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: `1px solid ${T.border}`, opacity: n.read ? 0.7 : 1 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${n.color}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `1px solid ${n.color}44`, position: "relative" }}>
              <Icon name={n.icon} size={20} color={n.color} />
              {!n.read && <div style={{ position: "absolute", top: 0, right: 0, width: 10, height: 10, borderRadius: "50%", background: T.rose, border: `2px solid ${T.darker}` }} />}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, lineHeight: 1.4, marginBottom: 3 }}>{n.msg}</p>
              <span style={{ fontSize: 12, color: T.textFaint }}>{n.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ADMIN DASHBOARD ─────────────────────────────────────────────────────────
function AdminDashboard({ onLogout }) {
  const [tab, setTab] = useState("overview");
  const [reports, setReports] = useState([
    { id: 1, reporter: "User #4821", reported: "User #3302", reason: "Inappropriate photos", status: "pending", time: "10 min ago" },
    { id: 2, reporter: "User #7741", reported: "User #1198", reason: "Harassment / spamming", status: "pending", time: "1 hour ago" },
    { id: 3, reporter: "User #2234", reported: "User #5512", reason: "Fake profile", status: "resolved", time: "2 hours ago" },
  ]);

  const StatCard = ({ icon, label, val, color, delta }) => (
    <div className="card" style={{ padding: "18px 16px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: `${color}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name={icon} size={20} color={color} />
        </div>
        {delta && <span style={{ fontSize: 11, color: T.success, background: "rgba(16,185,129,0.1)", padding: "3px 8px", borderRadius: 20 }}>↑ {delta}</span>}
      </div>
      <div style={{ fontFamily: "Syne", fontSize: 26, fontWeight: 700 }}>{val}</div>
      <div style={{ fontSize: 13, color: T.textMuted }}>{label}</div>
    </div>
  );

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: T.darker }}>
      {/* Header */}
      <div style={{ padding: "16px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <h1 style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 800 }}>Admin</h1>
            <span className="tag tag-purple" style={{ fontSize: 10 }}>Dashboard</span>
          </div>
          <p style={{ fontSize: 12, color: T.textMuted }}>LoveLink Control Panel</p>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={onLogout}>
          <Icon name="logout" size={14} color={T.error} />
          <span style={{ color: T.error }}>Logout</span>
        </button>
      </div>

      {/* Tabs */}
      <div style={{ padding: "12px 20px 0", display: "flex", gap: 8, overflowX: "auto" }}>
        {["overview", "users", "reports", "revenue"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "8px 16px", borderRadius: 20, border: `1px solid ${tab === t ? T.rose : T.border}`, background: tab === t ? "rgba(255,59,107,0.12)" : "transparent", color: tab === t ? T.rose : T.textMuted, fontFamily: "DM Sans", fontSize: 13, cursor: "pointer", flexShrink: 0, transition: "all 0.2s", textTransform: "capitalize" }}>
            {t}
          </button>
        ))}
      </div>

      <div className="scrollable" style={{ flex: 1, padding: "16px 20px 20px" }}>
        {tab === "overview" && (
          <div className="fade-in">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              <StatCard icon="users" label="Total Users" val={ADMIN_STATS.totalUsers.toLocaleString()} color={T.teal} delta="12%" />
              <StatCard icon="zap" label="Active Today" val={ADMIN_STATS.activeToday.toLocaleString()} color={T.rose} delta="8%" />
              <StatCard icon="heart" label="New Matches" val={ADMIN_STATS.newMatches.toLocaleString()} color={T.success} delta="5%" />
              <StatCard icon="crown" label="Revenue $" val={`$${ADMIN_STATS.revenue.toLocaleString()}`} color={T.gold} delta="22%" />
            </div>

            {/* Activity chart */}
            <div className="card" style={{ padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Daily Activity (Last 7 Days)</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80 }}>
                {[65, 78, 52, 90, 84, 72, 95].map((v, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{ width: "100%", background: i === 6 ? T.rose : "rgba(255,59,107,0.3)", borderRadius: "4px 4px 0 0", height: `${v}%`, transition: "height 0.5s", minHeight: 4 }} />
                    <span style={{ fontSize: 9, color: T.textFaint }}>{"SMTWTFS"[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>System Status</div>
              {[{ label: "API Response", val: "98ms", ok: true }, { label: "Database", val: "Healthy", ok: true }, { label: "Storage", val: "72% used", ok: true }, { label: "Reports Queue", val: `${ADMIN_STATS.reported} pending`, ok: false }].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 3 ? `1px solid ${T.border}` : "none" }}>
                  <span style={{ fontSize: 13, color: T.textMuted }}>{s.label}</span>
                  <span style={{ fontSize: 13, color: s.ok ? T.success : T.warning, fontWeight: 500 }}>{s.val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "users" && (
          <div className="fade-in">
            <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
              <input className="input" placeholder="Search users..." style={{ flex: 1 }} />
              <button className="btn btn-primary btn-sm">Search</button>
            </div>
            <div className="card" style={{ overflow: "hidden" }}>
              {MOCK_PROFILES.map((p, i) => (
                <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderBottom: i < MOCK_PROFILES.length - 1 ? `1px solid ${T.border}` : "none" }}>
                  <Avatar src={p.photos[0]} name={p.name} size={40} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 500 }}>
                      {p.name}
                      {p.verified && <Icon name="verify" size={14} color="#4FC3F7" />}
                      {p.premium && <Icon name="crown" size={12} color={T.gold} />}
                    </div>
                    <div style={{ fontSize: 12, color: T.textFaint }}>{p.location} · {p.profession}</div>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="btn btn-sm btn-ghost" style={{ padding: "4px 10px", fontSize: 11, color: T.error, borderColor: "rgba(239,68,68,0.2)" }}>Ban</button>
                    <button className="btn btn-sm btn-ghost" style={{ padding: "4px 10px", fontSize: 11 }}>View</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "reports" && (
          <div className="fade-in">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontSize: 14, color: T.textMuted }}>{reports.filter(r => r.status === "pending").length} pending reviews</span>
              <span className="tag" style={{ fontSize: 11 }}>Auto-moderation: ON</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {reports.map(r => (
                <div key={r.id} className="card" style={{ padding: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 12, color: T.textFaint }}>{r.time}</span>
                    <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: r.status === "pending" ? "rgba(245,158,11,0.12)" : "rgba(16,185,129,0.12)", color: r.status === "pending" ? T.warning : T.success, border: `1px solid ${r.status === "pending" ? "rgba(245,158,11,0.2)" : "rgba(16,185,129,0.2)"}` }}>
                      {r.status}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, marginBottom: 4 }}><span style={{ color: T.textMuted }}>{r.reporter}</span> reported <span style={{ color: T.rose }}>{r.reported}</span></p>
                  <p style={{ fontSize: 13, color: T.textMuted, marginBottom: 12 }}>Reason: {r.reason}</p>
                  {r.status === "pending" && (
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => setReports(p => p.map(x => x.id === r.id ? { ...x, status: "resolved" } : x))} className="btn btn-sm" style={{ background: T.success, color: "#fff", border: "none", flex: 1 }}>
                        <Icon name="check" size={14} /> Resolve
                      </button>
                      <button onClick={() => setReports(p => p.map(x => x.id === r.id ? { ...x, status: "resolved" } : x))} className="btn btn-sm" style={{ background: T.error, color: "#fff", border: "none", flex: 1 }}>
                        Ban User
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "revenue" && (
          <div className="fade-in">
            <div className="card" style={{ padding: 20, marginBottom: 16, background: "linear-gradient(135deg, rgba(255,184,48,0.08), rgba(255,59,107,0.08))", border: "1px solid rgba(255,184,48,0.15)" }}>
              <div style={{ fontSize: 13, color: T.textMuted, marginBottom: 4 }}>Monthly Revenue</div>
              <div style={{ fontFamily: "Syne", fontSize: 36, fontWeight: 800, color: T.gold }}>$48,920</div>
              <div style={{ fontSize: 13, color: T.success }}>↑ 22% from last month</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              {[{ label: "Premium Subs", val: "3,241", color: T.rose }, { label: "Gold Subs", val: "892", color: T.gold }, { label: "Boosts Sold", val: "5,124", color: T.purple }, { label: "Churn Rate", val: "4.2%", color: T.teal }].map(s => (
                <div key={s.label} className="card" style={{ padding: 16 }}>
                  <div style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 700, color: s.color }}>{s.val}</div>
                  <div style={{ fontSize: 12, color: T.textMuted }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div className="card" style={{ padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Revenue Split</div>
              {[{ label: "Premium (monthly)", pct: 52 }, { label: "Gold (yearly)", pct: 28 }, { label: "Boosts & add-ons", pct: 14 }, { label: "Other", pct: 6 }].map(s => (
                <div key={s.label} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}>
                    <span style={{ color: T.textMuted }}>{s.label}</span>
                    <span style={{ fontWeight: 500 }}>{s.pct}%</span>
                  </div>
                  <div className="progress-bar"><div className="progress-fill" style={{ width: `${s.pct}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────
function BottomNav({ tab, setTab, unread = 2 }) {
  const items = [
    { id: "discover", icon: "home", label: "Discover" },
    { id: "matches", icon: "message", label: "Messages" },
    { id: "notifications", icon: "bell", label: "Activity" },
    { id: "profile", icon: "user", label: "Profile" },
  ];
  return (
    <div style={{ display: "flex", background: T.card, borderTop: `1px solid ${T.border}`, paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
      {items.map(item => (
        <button key={item.id} onClick={() => setTab(item.id)} style={{ flex: 1, padding: "10px 0 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", transition: "all 0.2s", position: "relative" }}>
          <div style={{ position: "relative" }}>
            <Icon name={item.icon} size={22} color={tab === item.id ? T.rose : T.textFaint} />
            {item.id === "matches" && unread > 0 && <span className="badge" style={{ position: "absolute", top: -4, right: -6, minWidth: 16, height: 16, fontSize: 9 }}>{unread}</span>}
            {item.id === "notifications" && <span className="badge" style={{ position: "absolute", top: -4, right: -6, minWidth: 16, height: 16, fontSize: 9 }}>3</span>}
          </div>
          <span style={{ fontSize: 10, color: tab === item.id ? T.rose : T.textFaint, fontWeight: tab === item.id ? 600 : 400, transition: "color 0.2s" }}>{item.label}</span>
          {tab === item.id && <div style={{ position: "absolute", bottom: 0, width: 20, height: 3, borderRadius: "2px 2px 0 0", background: T.rose }} />}
        </button>
      ))}
    </div>
  );
}

// ─── SUPABASE SETUP MODAL ────────────────────────────────────────────────────
function SetupGuide({ onClose }) {
  const [copyOk, setCopyOk] = useState("");
  const copy = (text, id) => { navigator.clipboard?.writeText(text); setCopyOk(id); setTimeout(() => setCopyOk(""), 2000); };

  const envCode = `# .env.local
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here`;

  const sqlCode = `-- Run in Supabase SQL Editor
create table profiles (
  id uuid references auth.users primary key,
  name text, age int, bio text, gender text,
  location text, profession text,
  verified boolean default false,
  premium boolean default false,
  interests text[], photos text[],
  created_at timestamptz default now()
);

create table swipes (
  id uuid default gen_random_uuid() primary key,
  swiper_id uuid references profiles(id),
  swiped_id uuid references profiles(id),
  direction text check (direction in ('like','nope','super')),
  created_at timestamptz default now(),
  unique(swiper_id, swiped_id)
);

create table matches (
  id uuid default gen_random_uuid() primary key,
  user1_id uuid references profiles(id),
  user2_id uuid references profiles(id),
  created_at timestamptz default now()
);

create table messages (
  id uuid default gen_random_uuid() primary key,
  match_id uuid references matches(id),
  sender_id uuid references profiles(id),
  content text, read boolean default false,
  created_at timestamptz default now()
);

create table reports (
  id uuid default gen_random_uuid() primary key,
  reporter_id uuid references profiles(id),
  reported_id uuid references profiles(id),
  reason text, status text default 'pending',
  created_at timestamptz default now()
);

-- Enable RLS
alter table profiles enable row level security;
alter table messages enable row level security;

-- RLS Policies
create policy "Public profiles" on profiles for select using (true);
create policy "Own profile" on profiles for all using (auth.uid() = id);
create policy "Match messages" on messages for all
  using (sender_id = auth.uid() or
    match_id in (select id from matches where user1_id=auth.uid() or user2_id=auth.uid()));

-- Realtime
alter publication supabase_realtime add table messages;
alter publication supabase_realtime add table matches;`;

  const installCode = `# Install dependencies
npx create-expo-app@latest LoveLink --template blank-typescript
cd LoveLink

npm install @supabase/supabase-js
npm install expo-image-picker expo-location expo-notifications
npm install @react-native-async-storage/async-storage
npm install react-native-gesture-handler react-native-reanimated
npm install react-native-safe-area-context react-native-screens
npm install @react-navigation/native @react-navigation/stack
npm install react-native-deck-swiper

# iOS
cd ios && pod install`;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div className="card slide-up" style={{ width: "100%", maxWidth: 560, maxHeight: "90vh", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "20px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${T.border}`, paddingBottom: 16 }}>
          <div>
            <h2 style={{ fontFamily: "Syne", fontSize: 20, fontWeight: 700 }}>🛠 Setup Guide</h2>
            <p style={{ fontSize: 12, color: T.textMuted }}>Get LoveLink running in production</p>
          </div>
          <button className="btn btn-icon" onClick={onClose}><Icon name="x" size={18} /></button>
        </div>

        <div className="scrollable" style={{ flex: 1, padding: 20 }}>
          {[
            { title: "1. Install Dependencies", code: installCode, id: "install" },
            { title: "2. Environment Variables", code: envCode, id: "env" },
            { title: "3. Supabase Schema (SQL)", code: sqlCode, id: "sql" },
          ].map(section => (
            <div key={section.id} style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: T.rose }}>{section.title}</h3>
                <button onClick={() => copy(section.code, section.id)} className="btn btn-ghost btn-sm" style={{ fontSize: 11, padding: "4px 10px" }}>
                  {copyOk === section.id ? "✓ Copied!" : "Copy"}
                </button>
              </div>
              <pre style={{ background: T.darker, border: `1px solid ${T.border}`, borderRadius: 12, padding: "12px 14px", fontSize: 11, color: T.textMuted, overflow: "auto", lineHeight: 1.6, fontFamily: "monospace", maxHeight: 200 }}>
                {section.code}
              </pre>
            </div>
          ))}

          <div className="card" style={{ padding: 14, background: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.15)" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: T.teal, marginBottom: 6 }}>📁 Folder Structure</div>
            <pre style={{ fontSize: 11, color: T.textMuted, lineHeight: 1.7, fontFamily: "monospace" }}>
{`LoveLink/
├── app/
│   ├── (auth)/         # Login, Register, Setup
│   ├── (tabs)/         # Discover, Matches, Profile
│   └── chat/[id].tsx   # Chat screen
├── components/
│   ├── SwipeCard.tsx
│   ├── MatchOverlay.tsx
│   └── ChatBubble.tsx
├── lib/
│   ├── supabase.ts     # Supabase client
│   ├── hooks/          # useAuth, useMatches...
│   └── storage.ts      # Image upload helpers
├── stores/
│   └── useStore.ts     # Zustand global state
└── supabase/
    └── schema.sql`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [auth, setAuth] = useState(null);
  const [profileSetup, setProfileSetup] = useState(false);
  const [tab, setTab] = useState("discover");
  const [chatTarget, setChatTarget] = useState(null);
  const [toast, setToast] = useState(null);
  const [showSetup, setShowSetup] = useState(false);

  const notify = (msg) => { setToast(msg); };

  const handleAuth = (user) => {
    setAuth(user);
    if (!user.isAdmin) setProfileSetup(true);
  };

  const handleProfileComplete = () => setProfileSetup(false);

  if (!auth) return (
    <>
      <style>{css}</style>
      <AuthScreen onAuth={handleAuth} />
    </>
  );

  if (profileSetup) return (
    <>
      <style>{css}</style>
      <ProfileSetup user={auth} onComplete={handleProfileComplete} />
    </>
  );

  // ADMIN
  if (auth.isAdmin) return (
    <>
      <style>{css}</style>
      <div style={{ maxWidth: 480, margin: "0 auto", height: "100vh", display: "flex", flexDirection: "column" }}>
        <AdminDashboard onLogout={() => setAuth(null)} />
      </div>
    </>
  );

  // MAIN APP
  return (
    <>
      <style>{css}</style>
      <div style={{ maxWidth: 480, margin: "0 auto", height: "100vh", display: "flex", flexDirection: "column", position: "relative" }}>
        {/* Setup guide button */}
        <button onClick={() => setShowSetup(true)} style={{ position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)", zIndex: 50, padding: "4px 12px", borderRadius: 20, background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.3)", color: T.purple, fontSize: 11, cursor: "pointer", fontFamily: "DM Sans", whiteSpace: "nowrap", backdropFilter: "blur(8px)" }}>
          📖 Setup Docs
        </button>

        <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
          {chatTarget ? (
            <ChatScreen match={chatTarget} onBack={() => setChatTarget(null)} />
          ) : tab === "discover" ? (
            <DiscoverScreen onNotify={notify} />
          ) : tab === "matches" ? (
            <MatchesScreen onChat={(m) => { setChatTarget(m); }} />
          ) : tab === "notifications" ? (
            <NotificationsScreen />
          ) : (
            <ProfileScreen user={auth} onLogout={() => setAuth(null)} onNotify={notify} />
          )}
        </div>

        {!chatTarget && <BottomNav tab={tab} setTab={setTab} />}

        {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
        {showSetup && <SetupGuide onClose={() => setShowSetup(false)} />}
      </div>
    </>
  );
}
