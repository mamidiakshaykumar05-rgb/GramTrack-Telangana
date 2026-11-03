import React from 'react';
import { translations } from '../translations';

function Services({ lang }) {
  const t = translations[lang] || translations.en;

  // Highly specific & reliable image URLs for each village service
  const serviceImages = [
    // 1. Drinking Water Supply Management (తాగునీటి కుళాయి/పంపు)
    "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=600&q=80",
    
    // 2. Street Lighting & Power Grid (విద్యుత్ స్తంభాలు & వీధి దీపాలు)
    "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80",
    
    // 3. Sanitation & Waste Management (చెత్త సేకరణ & పారిశుధ్యం)
    "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80",
    
    // 4. Rural Roads & Infrastructure (గ్రామీణ రోడ్లు & రహదారులు)
    "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=600&q=80",
    
    // 5. Panchayat Civic Assistance (పంచాయతీ పత్రాలు & సర్టిఫికెట్లు)
    "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80",
    
    // 6. Emergency & Disaster Action (అత్యవసర సహాయం & రెస్క్యూ)
    "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=600&q=80"
  ];

  return (
    <div style={{ maxWidth: '1050px', margin: '40px auto', padding: '0 20px', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Page Title & Subtitle */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ color: '#006699', fontSize: '2.2rem', marginBottom: '10px' }}>{t.servicesTitle}</h2>
        <p style={{ color: '#555', fontSize: '1.1rem', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
          {t.servicesSubtitle}
        </p>
      </div>

      {/* Services Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
        {t.servicesGrid.map((service, index) => (
          <div 
            key={index} 
            style={{ 
              backgroundColor: '#fff', 
              borderRadius: '12px', 
              overflow: 'hidden',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)', 
              border: '1px solid #e5e5e5', 
              display: 'flex', 
              flexDirection: 'column', 
              justify: 'space-between'
            }}
          >
            <div>
              {/* Dedicated Service Image Header */}
              <div style={{ height: '180px', overflow: 'hidden', position: 'relative', backgroundColor: '#f0f0f0' }}>
                <img 
                  src={serviceImages[index]} 
                  alt={service.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <div style={{
                  position: 'absolute', top: '12px', right: '12px', 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  padding: '6px 12px', borderRadius: '20px', fontSize: '1.3rem',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                }}>
                  {service.icon}
                </div>
              </div>

              {/* Service Content */}
              <div style={{ padding: '20px' }}>
                <h3 style={{ color: '#004080', marginTop: 0, marginBottom: '10px', fontSize: '1.2rem' }}>
                  {service.title}
                </h3>
                <p style={{ color: '#555', fontSize: '0.92rem', lineHeight: '1.5', marginBottom: '15px' }}>
                  {service.desc}
                </p>
              </div>
            </div>

            {/* Service Sub-Highlights Badges */}
            <div style={{ padding: '0 20px 20px 20px', borderTop: '1px dashed #eee', paddingTop: '12px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {service.highlights.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex} 
                    style={{ 
                      backgroundColor: '#eef6ff', 
                      color: '#006699', 
                      padding: '4px 8px', 
                      borderRadius: '12px', 
                      fontSize: '0.78rem', 
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