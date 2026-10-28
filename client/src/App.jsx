import React, { useEffect, useMemo, useState } from "react";

const API = "http://localhost:5000/api";
const categoryOptions = [
  ["Roads", "రోడ్లు"], ["Streetlights", "వీధి దీపాలు"], ["Drinking water", "తాగునీరు"],
  ["Drainage & garbage", "మురుగు కాలువలు & చెత్త"], ["School / health facilities", "పాఠశాల / ఆరోగ్య సదుపాయాలు"],
  ["Farmer services", "రైతు సేవలు"], ["Government services", "ప్రభుత్వ సేవలు"], ["Other", "ఇతర సమస్యలు"]
];
const statusOptions = ["Reported", "Follow-up needed", "In progress", "Resolved", "Reopened"];
const text = {
  en: {
    eyebrow:"COMMUNITY ISSUE TRACKER", title:"Small problems deserve a clear follow-up.",
    subtitle:"A bilingual village project for documenting local issues and keeping follow-up records together.",
    location:"N. Annaram · Penpahad · Suryapet, Telangana", report:"Report an issue", browse:"Community reports",
    titleLabel:"Short title", titlePlaceholder:"e.g. Streetlight not working near the bus stop",
    category:"Category", landmark:"Location / landmark", landmarkPlaceholder:"Street, landmark or nearby place",
    description:"Describe the problem", descriptionPlaceholder:"What happened? Since when? Avoid personal accusations.",
    photo:"Photo (optional)", submit:"Submit report", submitting:"Submitting…", language:"Language",
    all:"All categories", statusAll:"All statuses", noReports:"No reports yet. Add the first report to start the pilot.",
    tracking:"Tracking ID", copy:"Copy ID", copied:"Copied", status:"Status", follow:"Follow-up history",
    official:"Official complaint reference (optional)", officialPlaceholder:"Enter government reference only if you have one",
    updateNote:"Follow-up note", updatePlaceholder:"What action or response was recorded?",
    saveUpdate:"Save status update", admin:"Demo admin tools", filters:"Filter reports",
    total:"Total reports", open:"Open / follow-up", progress:"In progress", resolved:"Resolved",
    notice:"Important: GramTrack is a student project, not a government portal. Its tracking ID is not an official complaint number. It does not submit complaints automatically.",
    route:"Suggested next step", routeText:"Confirm the responsible office and submit through its official channel. Record the official reference here afterwards.",
    success:"Report created", error:"Could not save report. Is the backend and MongoDB running?",
    required:"Please complete title, category, location and description.", noPhoto:"No photo selected",
    date:"Updated", empty:"No matching reports.", choose:"Choose a photo", remove:"Remove photo",
    publicTitle:"Public dashboard", unresolved:"Needs follow-up"
  },
  te: {
    eyebrow:"గ్రామ సమస్యల ట్రాకర్", title:"చిన్న సమస్యకైనా స్పష్టమైన ఫాలో-అప్ అవసరం.",
    subtitle:"గ్రామ సమస్యలను నమోదు చేసి, వాటి ఫాలో-అప్ వివరాలను ఒకేచోట ఉంచే తెలుగు-ఇంగ్లీష్ ప్రాజెక్ట్.",
    location:"ఎన్. అన్నారం · పెన్‌పహాడ్ · సూర్యాపేట, తెలంగాణ", report:"సమస్యను నమోదు చేయండి", browse:"గ్రామ సమస్యలు",
    titleLabel:"సమస్య శీర్షిక", titlePlaceholder:"ఉదా: బస్ స్టాప్ దగ్గర వీధి దీపం పనిచేయడం లేదు",
    category:"సమస్య రకం", landmark:"ప్రాంతం / గుర్తు", landmarkPlaceholder:"వీధి పేరు లేదా దగ్గరలోని గుర్తు",
    description:"సమస్య వివరాలు", descriptionPlaceholder:"ఏమైంది? ఎప్పటి నుంచి? వ్యక్తులపై ఆరోపణలు చేయవద్దు.",
    photo:"ఫోటో (ఐచ్ఛికం)", submit:"సమస్యను నమోదు చేయండి", submitting:"నమోదు అవుతోంది…", language:"భాష",
    all:"అన్ని రకాలు", statusAll:"అన్ని స్థితులు", noReports:"ఇంకా సమస్యలు లేవు. మొదటి సమస్యను నమోదు చేయండి.",
    tracking:"ట్రాకింగ్ ఐడి", copy:"ఐడి కాపీ", copied:"కాపీ అయింది", status:"స్థితి", follow:"ఫాలో-అప్ చరిత్ర",
    official:"ప్రభుత్వ ఫిర్యాదు నంబర్ (ఉంటే)", officialPlaceholder:"ప్రభుత్వ రిఫరెన్స్ నంబర్ ఉంటే నమోదు చేయండి",
    updateNote:"ఫాలో-అప్ గమనిక", updatePlaceholder:"ఏ చర్య లేదా సమాధానం వచ్చింది?",
    saveUpdate:"స్థితిని సేవ్ చేయండి", admin:"డెమో అడ్మిన్ సాధనాలు", filters:"సమస్యలను వడపోసండి",
    total:"మొత్తం సమస్యలు", open:"ఫాలో-అప్ అవసరం", progress:"పనిలో ఉంది", resolved:"పరిష్కరించబడింది",
    notice:"ముఖ్యం: GramTrack విద్యార్థి ప్రాజెక్ట్ మాత్రమే, ప్రభుత్వ పోర్టల్ కాదు. దీని ట్రాకింగ్ ఐడి ప్రభుత్వ ఫిర్యాదు నంబర్ కాదు. ఇది ఫిర్యాదులను ఆటోమేటిక్‌గా పంపదు.",
    route:"తదుపరి సూచన", routeText:"సరైన కార్యాలయాన్ని నిర్ధారించి అధికారిక మార్గంలో ఫిర్యాదు చేయండి. వచ్చిన అధికారిక నంబర్‌ను ఇక్కడ నమోదు చేయండి.",
    success:"సమస్య నమోదు అయింది", error:"సమస్యను సేవ్ చేయలేకపోయాం. సర్వర్ మరియు MongoDB పనిచేస్తున్నాయా?",
    required:"శీర్షిక, రకం, ప్రాంతం, వివరాలు నమోదు చేయండి.", noPhoto:"ఫోటో ఎంచుకోలేదు",
    date:"తాజా మార్పు", empty:"సరిపోలే సమస్యలు లేవు.", choose:"ఫోటో ఎంచుకోండి", remove:"ఫోటో తొలగించండి",
    publicTitle:"గ్రామ డ్యాష్‌బోర్డ్", unresolved:"ఫాలో-అప్ అవసరం"
  }
};
function fmtDate(v, lang) { try { return new Intl.DateTimeFormat(lang === "te" ? "te-IN" : "en-IN", {dateStyle:"medium", timeStyle:"short"}).format(new Date(v)); } catch { return ""; } }
function catName(value, lang) { const found = categoryOptions.find(x => x[0] === value); return found ? found[lang === "te" ? 1 : 0] : value; }

export default function App() {
  const [lang, setLang] = useState("te");
  const t = text[lang];
  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState({});
  const [filter, setFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [photoDataUrl, setPhotoDataUrl] = useState("");
  const [selected, setSelected] = useState(null);
  const [adminMode, setAdminMode] = useState(false);
  const [form, setForm] = useState({title:"",category:"Roads",landmark:"",description:""});
  const [adminForm, setAdminForm] = useState({status:"Follow-up needed",note:"",officialReference:""});

  async function load() {
    try {
      const [a,b] = await Promise.all([fetch(`${API}/complaints`), fetch(`${API}/stats`)]);
      if (a.ok) setComplaints(await a.json());
      if (b.ok) setStats(await b.json());
    } catch { /* API may not be started yet */ }
  }
  useEffect(() => { load(); }, []);
  const visible = useMemo(() => complaints.filter(c => (filter === "all" || c.category === filter) && (statusFilter === "all" || c.status === statusFilter)), [complaints, filter, statusFilter]);
  function updateForm(key, value) { setForm(prev => ({...prev, [key]:value})); }
  async function choosePhoto(file) {
    if (!file) return;
    if (!file.type.startsWith("image/")) { setMessage("Please choose an image file."); return; }
    if (file.size > 900000) { setMessage("Choose a photo smaller than 900 KB for this demo."); return; }
    const reader = new FileReader();
    reader.onload = () => setPhotoDataUrl(String(reader.result || ""));
    reader.readAsDataURL(file);
  }
  async function submit(e) {
    e.preventDefault(); setMessage("");
    if (!form.title.trim() || !form.landmark.trim() || !form.description.trim() || !form.category) { setMessage(t.required); return; }
    setBusy(true);
    try {
      const res = await fetch(`${API}/complaints`, {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form, language:lang, photoDataUrl})});
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || t.error);
      setMessage(`${t.success}: ${data.trackingId}`);
      setForm({title:"",category:"Roads",landmark:"",description:""}); setPhotoDataUrl("");
      e.target.reset();
      await load();
      setSelected(data);
      document.getElementById("reports")?.scrollIntoView({behavior:"smooth",block:"start"});
    } catch (err) { setMessage(err.message || t.error); }
    finally { setBusy(false); }
  }
  async function saveStatus(e) {
    e.preventDefault();
    if (!selected) return;
    try {
      const res = await fetch(`${API}/complaints/${selected.trackingId}/status`, {method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(adminForm)});
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      setSelected(data); setAdminForm({status:data.status,note:"",officialReference:data.officialReference || ""}); await load();
    } catch (err) { setMessage(err.message); }
  }
  async function copyId(id) { try { await navigator.clipboard.writeText(id); setMessage(`${t.copied}: ${id}`); } catch { setMessage(id); } }

  return <div className="app-shell">
    <header className="topbar">
      <a className="brand" href="#top" aria-label="GramTrack home"><span className="brand-mark">G</span><span>GramTrack<span className="brand-sub">TELANGANA</span></span></a>
      <div className="top-actions"><span className="village-chip"><span className="live-dot"></span>{lang==="te" ? "ఎన్. అన్నారం" : "N. Annaram"}</span><button className="lang-toggle" onClick={() => setLang(lang==="te"?"en":"te")}>{t.language}: {lang==="te"?"తెలుగు":"English"} ⇄</button></div>
    </header>
    <main id="top">
      <section className="hero">
        <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line"></span>{t.eyebrow}</div>
          <h1>{t.title}</h1><p className="hero-sub">{t.subtitle}</p>
          <div className="location-line"><span>⌖</span>{t.location}</div>
          <div className="hero-actions"><a href="#report" className="primary-btn">{t.report} <span>↗</span></a><a href="#reports" className="secondary-btn">{t.browse} ↓</a></div>
        </div>
        <div className="hero-art" aria-label="Village illustration"><div className="sun"></div><div className="cloud cloud-a"></div><div className="cloud cloud-b"></div><div className="hill hill-a"></div><div className="hill hill-b"></div><div className="house house-a"><i></i><b></b></div><div className="house house-b"><i></i><b></b></div><div className="tree tree-a"></div><div className="tree tree-b"></div><div className="road"></div><div className="sign"><span>గ్రామం</span><small>OUR VILLAGE</small></div></div>
      </section>
      <div className="notice"><span className="notice-icon">i</span><p>{t.notice}</p></div>
      <section className="stats-grid" aria-label={t.publicTitle}>
        <div className="stat-card"><span className="stat-icon green">▤</span><span className="stat-label">{t.total}</span><strong>{stats.total ?? complaints.length}</strong></div>
        <div className="stat-card"><span className="stat-icon amber">◷</span><span className="stat-label">{t.open}</span><strong>{(stats.Reported||0)+(stats["Follow-up needed"]||0)+(stats.Reopened||0)}</strong></div>
        <div className="stat-card"><span className="stat-icon blue">↗</span><span className="stat-label">{t.progress}</span><strong>{stats["In progress"]||0}</strong></div>
        <div className="stat-card"><span className="stat-icon violet">✓</span><span className="stat-label">{t.resolved}</span><strong>{stats.Resolved||0}</strong></div>
      </section>
      <div className="main-grid">
        <section className="panel report-panel" id="report">
          <div className="panel-heading"><div><span className="section-kicker">01 / REPORT</span><h2>{t.report}</h2></div><span className="heading-icon">＋</span></div>
          <form onSubmit={submit} className="report-form">
            <label>{t.titleLabel}<input value={form.title} onChange={e=>updateForm("title",e.target.value)} maxLength="120" placeholder={t.titlePlaceholder}/></label>
            <label>{t.category}<select value={form.category} onChange={e=>updateForm("category",e.target.value)}>{categoryOptions.map(([en,te])=><option value={en} key={en}>{lang==="te"?te:en}</option>)}</select></label>
            <label>{t.landmark}<input value={form.landmark} onChange={e=>updateForm("landmark",e.target.value)} maxLength="250" placeholder={t.landmarkPlaceholder}/></label>
            <label>{t.description}<textarea value={form.description} onChange={e=>updateForm("description",e.target.value)} rows="4" maxLength="2000" placeholder={t.descriptionPlaceholder}/></label>
            <label className="upload-label">{t.photo}<span className="upload-box"><span className="upload-symbol">＋</span><span>{photoDataUrl ? (lang==="te"?"ఫోటో సిద్ధంగా ఉంది":"Photo ready") : t.choose}<small>JPG, PNG · max 900 KB</small></span><input type="file" accept="image/*" onChange={e=>choosePhoto(e.target.files?.[0])}/></span></label>
            {photoDataUrl && <div className="photo-preview"><img src={photoDataUrl} alt="Selected report"/><button type="button" className="text-button" onClick={()=>setPhotoDataUrl("")}>{t.remove}</button></div>}
            <button className="primary-btn submit-btn" disabled={busy}>{busy?t.submitting:t.submit} <span>→</span></button>
            {message && <p className="feedback" role="status">{message}</p>}
            <p className="form-footnote">⌁ {lang==="te"?"మీరు నమోదు చేసిన వివరాలు ఫాలో-అప్ కోసం ఉపయోగించబడతాయి.":"Your report details are used to maintain a follow-up record."}</p>
          </form>
        </section>
        <section className="panel directory-panel">
          <div className="panel-heading"><div><span className="section-kicker">02 / NEXT STEP</span><h2>{t.route}</h2></div><span className="heading-icon">↗</span></div>
          <p className="directory-intro">{t.routeText}</p>
          <div className="office-card"><span className="office-symbol">ఙ</span><div><strong>{lang==="te"?"తెలంగాణ ప్రజావాణి":"Telangana Prajavani"}</strong><p>{lang==="te"?"ప్రభుత్వ ఫిర్యాదుల అధికారిక మార్గం":"Official channel for eligible government grievances"}</p><a href="https://prajavani.cgg.gov.in/" target="_blank" rel="noreferrer">{lang==="te"?"అధికారిక పోర్టల్ తెరవండి":"Open official portal"} ↗</a></div></div>
          <div className="office-card"><span className="office-symbol">⌂</span><div><strong>{lang==="te"?"పెన్‌పహాడ్ మండల కార్యాలయం":"Penpahad Mandal Office"}</strong><p>{lang==="te"?"సరైన కార్యాలయాన్ని నిర్ధారించండి":"Confirm the responsible office for your issue"}</p><a href="https://suryapet.telangana.gov.in/" target="_blank" rel="noreferrer">{lang==="te"?"జిల్లా అధికారిక వెబ్‌సైట్":"Official district website"} ↗</a></div></div>
          <div className="workflow-note"><span>✓</span><p>{lang==="te"?"అధికారిక ఫిర్యాదు నంబర్ వచ్చిన తర్వాత దాన్ని ట్రాకింగ్ రికార్డులో నమోదు చేయండి.":"After receiving an official complaint number, record it in the tracking record."}</p></div>
          <button className="admin-toggle" onClick={()=>setAdminMode(v=>!v)}>{adminMode?"−":"＋"} {t.admin}</button>
          {adminMode && <p className="admin-warning">{lang==="te"?"డెమో మాత్రమే: ఇది సురక్షిత అడ్మిన్ లాగిన్ కాదు. స్థానిక పరీక్ష కోసం మాత్రమే ఉపయోగించండి.":"Demo only: this is not a secure admin login. Use only for local testing."}</p>}
        </section>
      </div>
      <section className="reports-section" id="reports">
        <div className="reports-header"><div><span className="section-kicker">03 / COMMUNITY</span><h2>{t.browse}</h2><p>{lang==="te"?"నమోదైన సమస్యలు మరియు వాటి తాజా స్థితి":"Reported issues and their latest recorded status"}</p></div>
          <div className="filters"><label>{t.filters}<select value={filter} onChange={e=>setFilter(e.target.value)}><option value="all">{t.all}</option>{categoryOptions.map(([en,te])=><option key={en} value={en}>{lang==="te"?te:en}</option>)}</select></label><label>{t.status}<select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}><option value="all">{t.statusAll}</option>{statusOptions.map(s=><option key={s}>{s}</option>)}</select></label></div>
        </div>
        {visible.length===0 ? <div className="empty-state"><span>⌕</span><p>{complaints.length===0?t.noReports:t.empty}</p></div> :
          <div className="complaint-list">{visible.map(c=><article className="complaint-card" key={c.trackingId}>
            <div className="complaint-top"><span className={'status-pill status-${(c.status || "").toLowerCase().replaceAll(" ", "-")}'}></span></div>
            <h3>{c.title}</h3><p className="complaint-description">{c.description}</p>
            <div className="complaint-meta"><span>⌖ {c.landmark}</span><span>▤ {catName(c.category,lang)}</span></div>
            {c.photoDataUrl && <img className="complaint-photo" src={c.photoDataUrl} alt="Issue evidence"/>}
            <div className="tracking-row"><span><small>{t.tracking}</small><strong>{c.trackingId}</strong></span><button onClick={()=>copyId(c.trackingId)} className="copy-btn">{t.copy}</button><button onClick={()=>{setSelected(c);setAdminForm({status:c.status,note:"",officialReference:c.officialReference||""});document.getElementById("detail-"+c.trackingId)?.scrollIntoView({behavior:"smooth",block:"nearest"});}} className="view-btn">{t.follow} ↗</button></div>
            {selected?.trackingId===c.trackingId && <div className="detail-panel" id={"detail-"+c.trackingId}>
              <h4>{t.follow}</h4>
              <div className="timeline">{((selected?.updates||[]).slice().reverse().map((u,i)=><div className="timeline-item"key={i}><span className="timeline-dot"></span><div><strong>{u.status}</strong><small>{fmtDate(u.createdAt,lang)}</small>{u.note&&<p>{u.note}</p>}</div></div>))}</div>
              {selected?.officialReference&&<p className="official-ref"><strong>{t.official}:</strong> {selected.officialReference}</p>}
              {adminMode && <form className="admin-form" onSubmit={saveStatus}>
                <label>{t.status}<select value={adminForm.status} onChange={e=>setAdminForm(v=>({...v,status:e.target.value}))}>{statusOptions.map(s=><option key={s}>{s}</option>)}</select></label>
                <label>{t.official}<input value={adminForm.officialReference} onChange={e=>setAdminForm(v=>({...v,officialReference:e.target.value}))} placeholder={t.officialPlaceholder}/></label>
                <label>{t.updateNote}<textarea value={adminForm.note} onChange={e=>setAdminForm(v=>({...v,note:e.target.value}))} placeholder={t.updatePlaceholder} rows="2"/></label>
                <button className="primary-btn">{t.saveUpdate}</button>
              </form>}
            </div>}
          </article>)}</div>}
      </section>
      <footer className="footer"><div className="footer-brand"><span className="brand-mark">G</span><strong>GramTrack <span>Telangana</span></strong></div><p>{lang==="te"?"గ్రామ సమస్యలకు స్పష్టమైన ఫాలో-అప్.":"Clear follow-up for village issues."}</p><span className="footer-caption">COLLEGE PROJECT · NOT AN OFFICIAL GOVERNMENT SERVICE</span></footer>
    </main>
  </div>;
}
