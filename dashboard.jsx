import { useState } from "react";

const T = {
  bg: "#020202",
  sidebar: "#060606",
  card: "#0A0A0A",
  elevated: "#0E0E0E",
  hover: "#121212",
  active: "#161616",
  border: "#141414",
  borderLight: "#1C1C1C",
  borderHover: "#282828",
  fg: "#F5F5F5",
  fgSoft: "#DCDCDC",
  fgMid: "#AAAAAA",
  fgDim: "#787878",
  fgFaint: "#505050",
  fgGhost: "#333333",
  green: "#4ADE80", greenDim: "#22804A", greenGhost: "#0A1F14",
  amber: "#FACC15", amberDim: "#926E0A", amberGhost: "#1A1508",
  cyan: "#67E8F9", cyanDim: "#2A7A88", cyanGhost: "#0A1A1E",
  red: "#F87171", redDim: "#8B3A3A", redGhost: "#1A0A0A",
  r: { sm: 4, md: 8, lg: 12, xl: 16, pill: 9999 },
};

const mono = "'JetBrains Mono', monospace";
const sans = "'Space Grotesk', sans-serif";

const I = {
  dashboard: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>),
  documents: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>),
  templates: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>),
  clients: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>),
  workflows: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>),
  analytics: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>),
  archive: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>),
  changelog: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>),
  search: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>),
  chevDown: (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>),
  filter: (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>),
  fileText: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>),
  chevLeft: (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>),
  chevRight: (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>),
};

const statusMap = {
  "In progress": { dot: T.green, text: T.greenDim, bg: T.greenGhost },
  "Waiting":     { dot: T.amber, text: T.amberDim, bg: T.amberGhost },
  "Most used":   { dot: T.cyan,  text: T.cyanDim,  bg: T.cyanGhost },
  "Signed":      { dot: T.green, text: T.greenDim, bg: T.greenGhost },
  "In Review":   { dot: T.cyan,  text: T.cyanDim,  bg: T.cyanGhost },
};

const StatusLabel = ({ label }) => {
  const s = statusMap[label] || { dot: T.fgDim, text: T.fgDim, bg: "transparent" };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 0, padding: "3px 10px 3px 7px", backgroundColor: s.bg, borderRadius: T.r.pill }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: s.dot, marginRight: 7 }} />
      <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 500, color: s.text }}>{label}</span>
    </span>
  );
};

const NavItem = ({ icon, label, active, onClick, collapsed }) => (
  <button onClick={onClick} title={collapsed ? label : undefined} style={{
    display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "flex-start",
    gap: 12, width: "100%",
    padding: collapsed ? "10px" : "9px 16px",
    border: "none", cursor: "pointer",
    fontSize: 14, fontFamily: sans, fontWeight: active ? 500 : 400,
    color: active ? T.fg : T.fgDim,
    backgroundColor: active ? T.active : "transparent",
    borderRadius: T.r.pill,
    transition: "all 80ms", textAlign: "left",
    overflow: "hidden", whiteSpace: "nowrap",
  }}
    onMouseEnter={e => { if (!active) { e.currentTarget.style.backgroundColor = T.hover; e.currentTarget.style.color = T.fgSoft; }}}
    onMouseLeave={e => { if (!active) { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = active ? T.fg : T.fgDim; }}}
  >
    <span style={{ flexShrink: 0, display: "flex" }}>{icon}</span>
    {!collapsed && label}
  </button>
);

const Av = ({ name, s = 28 }) => (
  <div style={{
    width: s, height: s, borderRadius: "50%", backgroundColor: T.elevated,
    border: `1px solid ${T.borderLight}`, display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: mono, fontSize: s * 0.34, fontWeight: 600, color: T.fgMid, flexShrink: 0,
  }}>{name.split(" ").map(w => w[0]).join("").slice(0, 2)}</div>
);

const Lbl = ({ children }) => (
  <span style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.fgDim }}>{children}</span>
);

const BarChart = ({ data }) => {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <pattern id="sp-bright" width="4" height="1" patternUnits="userSpaceOnUse"><rect width="2" height="1" fill="#D8D8D8"/><rect x="2" width="2" height="1" fill={T.bg}/></pattern>
          <pattern id="sp-mid" width="4" height="1" patternUnits="userSpaceOnUse"><rect width="2" height="1" fill="#888888"/><rect x="2" width="2" height="1" fill={T.bg}/></pattern>
          <pattern id="sp-dim" width="4" height="1" patternUnits="userSpaceOnUse"><rect width="2" height="1" fill="#505050"/><rect x="2" width="2" height="1" fill={T.bg}/></pattern>
        </defs>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {data.map((d, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontFamily: sans, fontSize: 13, color: T.fgMid, width: 64, textAlign: "right", flexShrink: 0 }}>{d.label}</span>
            <div style={{ flex: 1, height: 22, borderRadius: T.r.sm, overflow: "hidden" }}>
              <svg width={`${(d.value / max) * 100}%`} height="22" style={{ display: "block" }}>
                <rect width="100%" height="22" fill={`url(#${d.pat})`} />
              </svg>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", marginLeft: 80, marginTop: 14 }}>
        {[0, 10, 20, 30, 40, 50].map(v => (
          <span key={v} style={{ flex: 1, fontFamily: mono, fontSize: 10, color: T.fgFaint }}>{v}</span>
        ))}
      </div>
    </div>
  );
};

const Donut = ({ segments }) => {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  const cx = 76, cy = 76, r = 52, sw = 18;
  let cum = -90;
  const paths = [];
  segments.forEach(seg => {
    const sweep = (seg.value / total) * 360;
    const count = Math.max(Math.round(sweep / 4), 3);
    const sa = sweep / count, gap = sa * 0.22, fill = sa - gap;
    for (let j = 0; j < count; j++) {
      const a1 = ((cum + j * sa) * Math.PI) / 180;
      const a2 = ((cum + j * sa + fill) * Math.PI) / 180;
      paths.push(<path key={`${seg.label}-${j}`}
        d={`M ${cx + r * Math.cos(a1)} ${cy + r * Math.sin(a1)} A ${r} ${r} 0 ${fill > 180 ? 1 : 0} 1 ${cx + r * Math.cos(a2)} ${cy + r * Math.sin(a2)}`}
        fill="none" stroke={seg.color} strokeWidth={sw} strokeLinecap="butt" />);
    }
    cum += sweep;
  });
  return (
    <svg width="152" height="152" viewBox="0 0 152 152">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={T.elevated} strokeWidth={sw} />
      {paths}
    </svg>
  );
};

const Row = ({ name, doc, status, date }) => (
  <div style={{
    display: "grid", gridTemplateColumns: "1.2fr 1.4fr 0.8fr 1fr", alignItems: "center",
    padding: "12px 20px", borderBottom: `1px solid ${T.border}`, transition: "background 60ms", cursor: "default",
  }}
    onMouseEnter={e => (e.currentTarget.style.backgroundColor = T.card)}
    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Av name={name} />
      <span style={{ fontFamily: sans, fontSize: 13, color: T.fgSoft, fontWeight: 500 }}>{name}</span>
    </div>
    <span style={{ fontFamily: sans, fontSize: 13, color: T.fgDim }}>{doc}</span>
    <StatusLabel label={status} />
    <span style={{ fontFamily: mono, fontSize: 12, color: T.fgDim }}>{date}</span>
  </div>
);

const eventTypeMap = {
  sent: { dot: T.amber }, drafted: { dot: T.fgDim }, signed: { dot: T.green },
  updated: { dot: T.cyan }, triggered: { dot: T.amber }, commented: { dot: T.fgDim },
  added: { dot: T.green }, exported: { dot: T.fgDim }, completed: { dot: T.green },
  permission: { dot: T.cyan }, requested: { dot: T.amber }, cloned: { dot: T.fgDim },
  archived: { dot: T.fgFaint }, edited: { dot: T.cyan }, invited: { dot: T.green },
  deleted: { dot: T.red }, settings: { dot: T.fgDim }, finalized: { dot: T.green },
};

const EventEntry = ({ time, action, detail, type, isNew }) => {
  const c = (eventTypeMap[type] || { dot: T.fgFaint }).dot;
  return (
    <div style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: `1px solid ${T.border}` }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 14, flexShrink: 0, paddingTop: 2 }}>
        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 14, height: 14, borderRadius: "50%", backgroundColor: `${c}18` }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: c }} />
        </span>
        <span style={{ flex: 1, width: 1, backgroundColor: T.border, marginTop: 6 }} />
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10, marginBottom: 4 }}>
          <span style={{ fontFamily: sans, fontSize: 12.5, color: isNew ? T.fgSoft : T.fgMid, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{action}</span>
          <span style={{ fontFamily: mono, fontSize: 9, color: T.fgFaint, flexShrink: 0, letterSpacing: "0.04em" }}>{time}</span>
        </div>
        <div style={{ fontFamily: sans, fontSize: 11.5, color: T.fgDim, lineHeight: 1.5 }}>{detail}</div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [nav, setNav] = useState("Dashboard");
  const [open, setOpen] = useState(true);

  const sideW = open ? 240 : 68;

  const navItems = [
    { icon: I.dashboard, label: "Dashboard" },
    { icon: I.documents, label: "Documents" },
    { icon: I.templates, label: "Templates" },
    { icon: I.clients, label: "Clients" },
    { icon: I.workflows, label: "Workflows" },
    { icon: I.analytics, label: "Analytics" },
    { icon: I.archive, label: "Archives" },
    { icon: I.changelog, label: "Change Log" },
  ];

  const events = [
    { time: "Just now", action: "NDA Template sent", detail: "Mauro Zilstra — awaiting signature", type: "sent", isNew: true },
    { time: "2m ago", action: "Document drafted", detail: "Employment Contract for Q2 hiring batch", type: "drafted", isNew: true },
    { time: "8m ago", action: "Signature received", detail: "Johan Haniko signed Service Agreement", type: "signed", isNew: true },
    { time: "23m ago", action: "Template updated", detail: "Non-Disclosure Agreement v4.2 published", type: "updated", isNew: false },
    { time: "1h ago", action: "Workflow triggered", detail: "Vendor Onboarding — 3 approvals pending", type: "triggered", isNew: false },
    { time: "1h ago", action: "Comment added", detail: "A. Rivera on Master Service Agreement §4.1", type: "commented", isNew: false },
    { time: "2h ago", action: "Client added", detail: "Sarah Chen — assigned to Legal Ops team", type: "added", isNew: false },
    { time: "3h ago", action: "Document exported", detail: "Invoice #2025-047 downloaded as PDF", type: "exported", isNew: false },
    { time: "4h ago", action: "Workflow completed", detail: "NDA Flow — 5.4 days avg. processing time", type: "completed", isNew: false },
    { time: "5h ago", action: "Permission changed", detail: "Lisa Park granted editor access to Archives", type: "permission", isNew: false },
    { time: "6h ago", action: "Signature requested", detail: "Alex Rivera — Vendor Agreement v2", type: "requested", isNew: false },
    { time: "8h ago", action: "Template cloned", detail: "NDA Template → NDA Template (APAC)", type: "cloned", isNew: false },
    { time: "Yesterday", action: "Bulk archived", detail: "12 documents archived from Q4 2024", type: "archived", isNew: false },
    { time: "Yesterday", action: "Workflow edited", detail: "Employment Agreement — added legal review step", type: "edited", isNew: false },
    { time: "Yesterday", action: "Team invited", detail: "3 new collaborators joined Project Phoenix", type: "invited", isNew: false },
    { time: "2d ago", action: "Document deleted", detail: "Draft — untitled contract (empty)", type: "deleted", isNew: false },
    { time: "2d ago", action: "Settings updated", detail: "Default signature provider changed to DocuSign", type: "settings", isNew: false },
    { time: "3d ago", action: "Onboarding finalized", detail: "Vendor Onboarding Guide v3 published", type: "finalized", isNew: false },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:3px;height:3px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:${T.borderLight};border-radius:99px}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
      `}</style>

      <div style={{ display: "flex", height: "100vh", width: "100vw", backgroundColor: T.bg, fontFamily: sans, color: T.fg, overflow: "hidden" }}>

        {/* ═══ SIDEBAR ═══ */}
        <aside style={{
          width: sideW, minWidth: sideW, height: "100vh",
          backgroundColor: T.sidebar, display: "flex", flexDirection: "column",
          borderRight: `1px solid ${T.border}`,
          transition: "width 200ms cubic-bezier(0.25, 0.1, 0.25, 1), min-width 200ms cubic-bezier(0.25, 0.1, 0.25, 1)",
          overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: open ? "space-between" : "center",
            padding: open ? "18px 18px 16px" : "18px 0 16px",
            minHeight: 62,
          }}>
            {open ? (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 30, height: 30, borderRadius: T.r.lg, border: `1.5px solid ${T.fgFaint}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={T.fgMid} strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                  </div>
                  <span style={{ fontFamily: mono, fontSize: 14, fontWeight: 700, letterSpacing: "0.06em", color: T.fg, whiteSpace: "nowrap" }}>LAWTOR</span>
                </div>
                <button onClick={() => setOpen(false)} style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: 28, height: 28, borderRadius: T.r.md,
                  border: `1px solid ${T.border}`, backgroundColor: "transparent",
                  color: T.fgFaint, cursor: "pointer", flexShrink: 0,
                  transition: "color 80ms",
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = T.fgMid)}
                  onMouseLeave={e => (e.currentTarget.style.color = T.fgFaint)}
                >{I.chevLeft}</button>
              </>
            ) : (
              <button onClick={() => setOpen(true)} style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 34, height: 34, borderRadius: T.r.lg,
                border: `1.5px solid ${T.fgFaint}`, backgroundColor: "transparent",
                color: T.fgMid, cursor: "pointer",
                transition: "color 80ms, border-color 80ms",
              }}
                onMouseEnter={e => { e.currentTarget.style.color = T.fgSoft; e.currentTarget.style.borderColor = T.fgDim; }}
                onMouseLeave={e => { e.currentTarget.style.color = T.fgMid; e.currentTarget.style.borderColor = T.fgFaint; }}
              >{I.chevRight}</button>
            )}
          </div>

          {/* Search (expanded only) */}
          {open && (
            <div style={{ padding: "0px 14px 10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", backgroundColor: T.card, border: `1px solid ${T.border}`, borderRadius: T.r.lg }}>
                <span style={{ color: T.fgFaint }}>{I.search}</span>
                <span style={{ fontFamily: mono, fontSize: 12, color: T.fgFaint, flex: 1 }}>Search ...</span>
                <span style={{ fontFamily: mono, fontSize: 9, color: T.fgFaint, backgroundColor: T.elevated, padding: "2px 7px", borderRadius: T.r.sm, border: `1px solid ${T.border}` }}>⌘K</span>
              </div>
            </div>
          )}

          {/* Search icon (collapsed only) */}
          {!open && (
            <div style={{ display: "flex", justifyContent: "center", padding: "0 0 8px" }}>
              <button style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 38, height: 38, borderRadius: T.r.pill,
                border: "none", backgroundColor: "transparent",
                color: T.fgFaint, cursor: "pointer",
              }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = T.hover; e.currentTarget.style.color = T.fgSoft; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = T.fgFaint; }}
              >{I.search}</button>
            </div>
          )}

          {/* Nav */}
          <nav style={{ flex: 1, overflowY: "auto", padding: open ? "4px 10px" : "4px 8px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {navItems.map(item => (
                <NavItem key={item.label} icon={item.icon} label={item.label}
                  active={nav === item.label} onClick={() => setNav(item.label)}
                  collapsed={!open} />
              ))}
            </div>
          </nav>
        </aside>

        {/* ═══ MAIN ═══ */}
        <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <header style={{ display: "flex", alignItems: "center", padding: "0 32px", height: 54, borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
            <span style={{ fontFamily: mono, fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.fgSoft }}>DASHBOARD</span>
          </header>

          <div style={{ flex: 1, overflowY: "auto" }}>
            <div style={{ maxWidth: 1120, padding: "32px 32px 72px" }}>

              <div style={{ marginBottom: 32 }}>
                <h1 style={{ fontSize: 28, fontWeight: 600, color: T.fg, letterSpacing: "-0.03em", marginBottom: 6 }}>Welcome Back, Karl 👋</h1>
                <p style={{ fontSize: 15, color: T.fgDim }}>Let's make legal work feel effortless today.</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 12 }}>
                {[
                  { label: "Active Documents", value: "127", status: "In progress", desc: "across all teams", icon: I.fileText },
                  { label: "Pending Signature", value: "60", status: "Waiting", desc: "across all teams", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
                  { label: "Template Used", value: "12", status: "Most used", desc: "Non-Disclosure Agreement", icon: I.templates },
                  { label: "Workflow", value: "24", status: "In progress", desc: "Across 3 departments", icon: I.workflows },
                ].map((c, i) => (
                  <div key={i} style={{ padding: "22px 24px", backgroundColor: T.sidebar, border: `1px solid ${T.border}`, borderRadius: T.r.xl }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 16 }}>
                      <span style={{ color: T.fgFaint }}>{c.icon}</span>
                      <Lbl>{c.label}</Lbl>
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
                      <span style={{ fontFamily: sans, fontSize: 44, fontWeight: 600, color: T.fg, letterSpacing: "-0.03em", lineHeight: 1 }}>{c.value}</span>
                      <StatusLabel label={c.status} />
                    </div>
                    <span style={{ fontSize: 13, color: T.fgFaint }}>{c.desc}</span>
                  </div>
                ))}
              </div>

              <div style={{ border: `1px dashed ${T.borderLight}`, borderRadius: T.r.xl, padding: "28px 28px 32px", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32 }}>
                  <div>
                    <h2 style={{ fontFamily: sans, fontSize: 19, fontWeight: 500, color: T.fgSoft, marginBottom: 5 }}>Statistics Overview</h2>
                    <p style={{ fontSize: 13, color: T.fgDim }}>View all your statistics here</p>
                  </div>
                  <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 16px", border: `1px solid ${T.borderLight}`, borderRadius: T.r.lg, backgroundColor: T.card, color: T.fgMid, fontFamily: mono, fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>
                    THIS WEEK {I.chevDown}
                  </button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                      <span style={{ color: T.fgFaint }}>{I.fileText}</span>
                      <Lbl>Document Activity</Lbl>
                    </div>
                    <BarChart data={[
                      { label: "Drafted", value: 48, pat: "sp-bright" },
                      { label: "Signed", value: 32, pat: "sp-mid" },
                      { label: "Pending", value: 22, pat: "sp-dim" },
                    ]} />
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                      <span style={{ color: T.fgFaint }}>{I.workflows}</span>
                      <Lbl>Workflow Performance</Lbl>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
                      <Donut segments={[
                        { value: 5.4, color: "#D8D8D8", label: "nda" },
                        { value: 2.8, color: "#787878", label: "emp" },
                        { value: 3.1, color: "#333333", label: "vendor" },
                      ]} />
                      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                        {[
                          { label: "NDA Flow", days: "5.4", sw: "#D8D8D8" },
                          { label: "Employment Agreement", days: "2.8", sw: "#787878" },
                          { label: "Vendor Onboarding", days: "3.1", sw: "#333333" },
                        ].map(item => (
                          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ width: 10, height: 10, borderRadius: T.r.sm, backgroundColor: item.sw }} />
                            <div>
                              <div style={{ fontSize: 13, color: T.fgSoft, fontWeight: 500, marginBottom: 2 }}>{item.label}</div>
                              <div style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, color: T.fgDim }}>{item.days} DAYS</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 20 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <h2 style={{ fontSize: 19, fontWeight: 500, color: T.fgSoft }}>Pending Signature Queue</h2>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 14px", backgroundColor: T.card, border: `1px solid ${T.border}`, borderRadius: T.r.lg, width: 190 }}>
                      <span style={{ color: T.fgFaint }}>{I.search}</span>
                      <span style={{ fontFamily: mono, fontSize: 11, color: T.fgFaint }}>Search here...</span>
                    </div>
                    <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 16px", border: `1px solid ${T.borderLight}`, borderRadius: T.r.lg, backgroundColor: T.card, color: T.fgMid, fontFamily: mono, fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>
                      {I.filter} FILTER
                    </button>
                  </div>
                </div>
                <div style={{ border: `1px solid ${T.border}`, borderRadius: T.r.xl, overflow: "hidden" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.4fr 0.8fr 1fr", padding: "10px 20px", borderBottom: `1px solid ${T.border}`, backgroundColor: T.sidebar }}>
                    {["Client", "Document", "Status", "Last Updated"].map(h => (
                      <span key={h} style={{ fontFamily: mono, fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.fgFaint }}>{h}</span>
                    ))}
                  </div>
                  <Row name="Mauro Zilstra" doc="NDA Template" status="Waiting" date="Jan 5, 2025" />
                  <Row name="Johan Haniko" doc="Service Agreement" status="Signed" date="Jan 5, 2025" />
                  <Row name="Sarah Chen" doc="Employment Contract" status="In Review" date="Jan 4, 2025" />
                  <Row name="Alex Rivera" doc="Vendor Agreement" status="Waiting" date="Jan 3, 2025" />
                  <Row name="Lisa Park" doc="NDA Template" status="In Review" date="Jan 3, 2025" />
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* ═══ EVENT LOG ═══ */}
        <aside style={{
          width: 280, minWidth: 280, height: "100vh", backgroundColor: T.sidebar,
          borderLeft: `1px solid ${T.border}`, display: "flex", flexDirection: "column",
        }}>
          <div style={{
            padding: "0 20px", borderBottom: `1px solid ${T.border}`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            height: 54, flexShrink: 0,
          }}>
            <Lbl>Event Log</Lbl>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{
                fontFamily: mono, fontSize: 9, fontWeight: 600, color: T.green,
                backgroundColor: T.greenGhost, padding: "3px 10px", borderRadius: T.r.pill,
                border: `1px solid ${T.greenDim}30`, letterSpacing: "0.06em",
              }}>LIVE</span>
              <span style={{
                width: 6, height: 6, borderRadius: "50%", backgroundColor: T.green,
                boxShadow: `0 0 8px ${T.greenDim}`, animation: "pulse 2s ease-in-out infinite",
              }} />
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "4px 20px" }}>
            {events.map((e, i) => <EventEntry key={i} {...e} />)}
          </div>

          <div style={{
            padding: "14px 20px", borderTop: `1px solid ${T.border}`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <span style={{ fontFamily: mono, fontSize: 10, color: T.fgFaint }}>{events.length} events today</span>
            <span style={{ fontFamily: mono, fontSize: 10, color: T.fgMid, cursor: "pointer" }}>View all →</span>
          </div>
        </aside>
      </div>
    </>
  );
}

{/*#Use this dashboard.jsx as a UI, keep the layout but not the content. We want to specify the content for our usecase. We are building a complete mission control. We want to have full control of what is happening across our entire system. 

To the right, add event logs, anything that is happening of importance we want to show here,
Journey, important milestones that we keep track of overtime to see our progress, this is different from event log,
Search, use cmd+k react component, https://github.com/dip/cmdk,
For all drawers (modals) use vaul by emil kowalski, max width 1200px https://vaul.emilkowal.ski/,
For notifications use toast notifications by emil kowalski (sonner) https://sonner.emilkowal.ski/,
We want to be able to search across all systems, and then pinpoint the search words, implement the search with clawvault QMD search etc and make it smart, so if we write "secret" or "private" it understands they mean the same thing, a smart search,
When we click a search item, navigate to it and highlight the thing we searched for,
We want a file tab, upload files, see files, show previews, add remove etc,
Memory, we want to be able to navigate and see all our memories,
Tasks, our kanban board, I can also add tasks here,
System, shows system health,
Heartbeat, just shows whats in our heartbeat,

can we add auto reload to our mission control, so when we upload files, they show up without us reloading the page. And can we add the
 feature to add folders so we can have some structure, and we want to be able to navigate in and out of folders etc, we can open a folder in a
 vaul drawer maybe?


 Done. Here's what's new on the Files page:

 
Auto-reload — polls every 3s, uploads appear instantly without refresh,
Clipboard paste — Ctrl+V pastes images directly (auto-named paste-{timestamp}.png),
Folders — "New Folder" button, creates subfolders in current directory,
Breadcrumb navigation — Files / subfolder / subfolder with clickable path segments,
Back button — appears when inside a folder,
Folder cards — shows item count, click to enter, folders listed before files,
Uploads go to current folder — if you're inside a folder, uploads land there,

 Give it a refresh at localhost:8888 → Files page.


 Can we add a feature to drag and drop files into folders, and also multi-select files to either remove or mass-delete (open a bottom UI bar
 with a delete button)
*/}
