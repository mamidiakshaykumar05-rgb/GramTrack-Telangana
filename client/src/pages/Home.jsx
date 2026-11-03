import React from 'react';
import { Link } from 'react-router-dom';
import { translations } from '../translations';

function Home({ lang }) {
  const t = translations[lang] || translations.en;

  // Rural Telangana Landscape Background Image
  const heroBgImage = "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=80";

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
      
      {/* HERO SECTION WITH BACKGROUND IMAGE */}
      <header style={{
        position: 'relative',
        backgroundImage: `linear-gradient(rgba(0, 40, 80, 0.75), rgba(0, 64, 128, 0.75)), url(${heroBgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        padding: '90px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.8rem', marginBottom: '15px', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            {t.heroTitle}
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '30px', lineHeight: '1.6', textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
            {t.heroSubtitle}
          </p>
          <Link to="/complaints" style={{ 
            backgroundColor: '#ff9900', 
            color: '#fff', 
            padding: '14px 32px', 
            textDecoration: 'none', 
            borderRadius: '6px', 
            fontWeight: 'bold', 
            fontSize: '1.1rem',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            display: 'inline-block'
          }}>
            {t.reportBtn}
          </Link>
        </div>
      </header>

      {/* STATS SECTION (UPDATED TO 0 AS REQUESTED) */}
      <section style={{ maxWidth: '1000px', margin: '-30px auto 40px auto', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
          
          <div style={{ background: '#fff', padding: '25px', borderRadius: '10px', minWidth: '220px', flex: '1', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderTop: '4px solid #006699' }}>
            <h2 style={{ color: '#006699', fontSize: '2.5rem', margin: '0 0 5px 0' }}>0</h2>
            <p style={{ color: '#666', fontWeight: 'bold', margin: 0 }}>{t.statsComplaints}</p>
          </div>

          <div style={{ background: '#fff', padding: '25px', borderRadius: '10px', minWidth: '220px', flex: '1', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderTop: '4px solid #28a745' }}>
            <h2 style={{ color: '#28a745', fontSize: '2.5rem', margin: '0 0 5px 0' }}>0</h2>
            <p style={{ color: '#666', fontWeight: 'bold', margin: 0 }}>{t.statsResolved}</p>
          </div>

          <div style={{ background: '#fff', padding: '25px', borderRadius: '10px', minWidth: '220px', flex: '1', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderTop: '4px solid #ff9900' }}>
            <h2 style={{ color: '#ff9900', fontSize: '2.5rem', margin: '0 0 5px 0' }}>33</h2>
            <p style={{ color: '#666', fontWeight: 'bold', margin: 0 }}>{t.statsDistricts}</p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;