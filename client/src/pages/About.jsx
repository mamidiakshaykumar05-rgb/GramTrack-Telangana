import React from 'react';
import { translations } from '../translations';

function About({ lang }) {
  const t = translations[lang] || translations.en;

  return (
    <div style={{ maxWidth: '950px', margin: '40px auto', padding: '0 20px', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Header Section */}
      <div style={{ backgroundColor: '#f0f7ff', padding: '30px', borderRadius: '10px', borderLeft: '6px solid #006699', marginBottom: '35px' }}>
        <h2 style={{ color: '#006699', marginTop: 0, fontSize: '1.8rem' }}>{t.aboutTitle}</h2>
        <p style={{ color: '#444', fontSize: '1.1rem', lineHeight: '1.7', margin: 0 }}>{t.aboutDesc}</p>
      </div>

      {/* Key Features Section */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: '#004080', borderBottom: '2px solid #004080', paddingBottom: '8px', fontSize: '1.4rem' }}>
          {t.featuresHeading}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px', marginTop: '20px' }}>
          {t.featuresList.map((feature, index) => (
            <div key={index} style={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', lineHeight: '1.5', color: '#333' }}>
              {feature}
            </div>
          ))}
        </div>
      </div>

      {/* Village Issues Covered Grid */}
      <div>
        <h3 style={{ color: '#004080', borderBottom: '2px solid #004080', paddingBottom: '8px', fontSize: '1.4rem' }}>
          {t.villageIssuesHeading}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {t.villageIssues.map((issue, index) => (
            <div key={index} style={{ backgroundColor: '#fdfdfd', border: '1px solid #ddd', padding: '20px', borderRadius: '8px', boxShadow: '0 3px 6px rgba(0,0,0,0.05)' }}>
              <h4 style={{ color: '#006699', marginTop: 0, marginBottom: '10px', fontSize: '1.1rem' }}>{issue.title}</h4>
              <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>{issue.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default About;