import React from 'react';
import { translations } from '../translations';

function Services({ lang }) {
  const t = translations[lang] || translations.en;

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Title & Subtitle Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ color: '#006699', fontSize: '2rem', marginBottom: '10px' }}>{t.servicesTitle}</h2>
        <p style={{ color: '#555', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
          {t.servicesSubtitle}
        </p>
      </div>

      {/* Expanded Services Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '25px' }}>
        {t.servicesGrid.map((service, index) => (
          <div 
            key={index} 
            style={{ 
              backgroundColor: '#fff', 
              borderRadius: '12px', 
              padding: '25px', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.07)', 
              border: '1px solid #e5e5e5', 
              display: 'flex', 
              flexDirection: 'column', 
              justify: 'space-between',
              transition: 'transform 0.2s'
            }}
          >
            <div>
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{service.icon}</div>
              <h3 style={{ color: '#004080', marginTop: 0, marginBottom: '12px', fontSize: '1.25rem' }}>{service.title}</h3>
              <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>{service.desc}</p>
            </div>

            {/* Sub-highlights Tags */}
            <div style={{ borderTop: '1px dashed #ddd', paddingTop: '15px', marginTop: '10px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {service.highlights.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex} 
                    style={{ 
                      backgroundColor: '#eef6ff', 
                      color: '#006699', 
                      padding: '4px 10px', 
                      borderRadius: '15px', 
                      fontSize: '0.8rem', 
                      fontWeight: 'bold' 
                    }}
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default Services;