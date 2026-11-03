import React from 'react';
import { translations } from '../translations';

function About({ lang }) {
  const t = translations[lang] || translations.en;

  const aboutBannerImg = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80";
  const featureSideImg = "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80";

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Header Banner */}
      <div style={{ 
        borderRadius: '12px', 
        overflow: 'hidden', 
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)', 
        marginBottom: '40px',
        backgroundColor: '#fff'
      }}>
        <div style={{ height: '220px', overflow: 'hidden' }}>
          <img src={aboutBannerImg} alt="Village Governance" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ padding: '30px', borderLeft: '6px solid #006699' }}>
          <h2 style={{ color: '#006699', marginTop: 0, fontSize: '1.8rem' }}>{t.aboutTitle}</h2>
          <p style={{ color: '#444', fontSize: '1.08rem', lineHeight: '1.7', margin: 0 }}>{t.aboutDesc}</p>
        </div>
      </div>

      {/* Key Features Section with Side Image */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: '#004080', borderBottom: '2px solid #004080', paddingBottom: '8px', fontSize: '1.4rem' }}>
          {t.featuresHeading}
        </h3>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '25px', marginTop: '20px', alignItems: 'center' }}>
          
          <div style={{ flex: '1 1 300px' }}>
            <img src={featureSideImg} alt="Digital Village Smartphone" style={{ width: '100%', borderRadius: '10px', boxShadow: '0 3px 10px rgba(0,0,0,0.1)' }} />
          </div>

          <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {t.featuresList.map((feature, index) => (
              <div key={index} style={{ backgroundColor: '#fdfdfd', border: '1px solid #e0e0e0', padding: '14px', borderRadius: '8px', borderLeft: '4px solid #ff9900', color: '#333', fontSize: '0.98rem' }}>
                {feature}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Village Issues Covered Grid */}
      <div>
        <h3 style={{ color: '#004080', borderBottom: '2px solid #004080', paddingBottom: '8px', fontSize: '1.4rem' }}>
          {t.villageIssuesHeading}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {t.villageIssues.map((issue, index) => (
            <div key={index} style={{ backgroundColor: '#fff', border: '1px solid #ddd', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
              <h4 style={{ color: '#006699', marginTop: 0, marginBottom: '8px', fontSize: '1.1rem' }}>{issue.title}</h4>
              <p style={{ color: '#666', fontSize: '0.92rem', lineHeight: '1.5', margin: 0 }}>{issue.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default About;