import React from 'react';
import { Link } from 'react-router-dom';
import { translations } from '../translations';

function Home({ lang }) {
  const t = translations[lang];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
      <header style={{ backgroundColor: '#006699', color: '#fff', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{t.heroTitle}</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>{t.heroSubtitle}</p>
        <Link to="/complaints" style={{ backgroundColor: '#ff9900', color: '#fff', padding: '12px 25px', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
          {t.reportBtn}
        </Link>
      </header>

      <section style={{ display: 'flex', justifyContent: 'space-around', margin: '40px 20px', textAlign: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ background: '#f4f4f4', padding: '20px', borderRadius: '8px', minWidth: '200px', flex: '1' }}>
          <h2 style={{ color: '#006699' }}>12,000+</h2>
          <p>{t.statsComplaints}</p>
        </div>
        <div style={{ background: '#f4f4f4', padding: '20px', borderRadius: '8px', minWidth: '200px', flex: '1' }}>
          <h2 style={{ color: '#28a745' }}>9,500+</h2>
          <p>{t.statsResolved}</p>
        </div>
        <div style={{ background: '#f4f4f4', padding: '20px', borderRadius: '8px', minWidth: '200px', flex: '1' }}>
          <h2 style={{ color: '#ff9900' }}>33</h2>
          <p>{t.statsDistricts}</p>
        </div>
      </section>
    </div>
  );
}

export default Home;