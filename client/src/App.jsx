import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Complaints from './pages/Complaints';
import { translations } from './translations';

function App() {
  // Default Language: English ('en')
  const [lang, setLang] = useState('en'); 
  const t = translations[lang] || translations.en;

  return (
    <Router>
      <nav style={{ padding: '15px 30px', backgroundColor: '#004080', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, color: '#fff' }}>{t.navTitle}</h3>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>{t.home}</Link>
          <Link to="/services" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>{t.services}</Link>
          <Link to="/complaints" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>{t.reportIssue}</Link>
          <Link to="/about" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>{t.about}</Link>
          
          {/* Language Switcher Dropdown: English ➔ తెలుగు ➔ हिंदी */}
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value)} 
            style={{ padding: '5px 10px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', color: '#333' }}
          >
            <option value="en">English</option>
            <option value="te">తెలుగు</option>
            <option value="hi">हिंदी</option>
          </select>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home lang={lang} />} />
        <Route path="/about" element={<About lang={lang} />} />
        <Route path="/services" element={<Services lang={lang} />} />
        <Route path="/complaints" element={<Complaints lang={lang} />} />
      </Routes>
    </Router>
  );
}

export default App;