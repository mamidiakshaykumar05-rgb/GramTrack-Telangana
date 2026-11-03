import React, { useState } from 'react';
import { translations } from '../translations';

function Complaints({ lang }) {
  const t = translations[lang] || translations.te;

  const [activeTab, setActiveTab] = useState('report');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    district: '',
    category: 'Water',
    description: '',
    location: '',
    photo: null
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [submittedTrackId, setSubmittedTrackId] = useState(null);

  const [searchTrackId, setSearchTrackId] = useState('');
  const [trackedStatus, setTrackedStatus] = useState(null);

  // GPS Location Handler with dynamic language
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(5);
          const lng = position.coords.longitude.toFixed(5);
          setFormData((prev) => ({
            ...prev,
            location: `Lat: ${lat}, Long: ${lng} (GPS Auto-Detected)`
          }));
        },
        () => {
          alert(t.gpsError);
        }
      );
    } else {
      alert(t.gpsNotSupported);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }));
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomId = 'GT-' + Math.floor(1000 + Math.random() * 9000);
    setSubmittedTrackId(randomId);
  };

  const handleTrackSearch = (e) => {
    e.preventDefault();
    if (!searchTrackId.trim()) return;

    setTrackedStatus({
      id: searchTrackId.toUpperCase(),
      date: new Date().toLocaleDateString(),
      status: t.statusInProgressText,
      assignedOfficer: t.officerName
    });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', padding: '25px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '10px', backgroundColor: '#fff' }}>
      
      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        <button 
          onClick={() => { setActiveTab('report'); setSubmittedTrackId(null); }}
          style={{
            flex: 1, padding: '12px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer',
            backgroundColor: activeTab === 'report' ? '#006699' : '#f0f0f0',
            color: activeTab === 'report' ? '#fff' : '#333'
          }}
        >
          {t.tabReport}
        </button>
        <button 
          onClick={() => setActiveTab('track')}
          style={{
            flex: 1, padding: '12px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer',
            backgroundColor: activeTab === 'track' ? '#006699' : '#f0f0f0',
            color: activeTab === 'track' ? '#fff' : '#333'
          }}
        >
          {t.tabTrack}
        </button>
      </div>

      {/* TAB 1: REPORT COMPLAINT FORM */}
      {activeTab === 'report' && (
        <>
          {submittedTrackId ? (
            <div style={{ backgroundColor: '#e6f4ea', border: '1px solid #28a745', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
              <h2 style={{ color: '#28a745', marginTop: 0 }}>{t.successTitle}</h2>
              <p style={{ fontSize: '1.1rem' }}>{t.successMsg}</p>
              <h1 style={{ backgroundColor: '#fff', display: 'inline-block', padding: '10px 20px', borderRadius: '6px', border: '2px dashed #28a745', color: '#006699', margin: '10px 0' }}>
                {submittedTrackId}
              </h1>
              <p style={{ color: '#555', fontSize: '0.9rem' }}>{t.successSub}</p>
              <button 
                onClick={() => {
                  setSubmittedTrackId(null);
                  setFormData({ name: '', phone: '', district: '', category: 'Water', description: '', location: '', photo: null });
                  setPhotoPreview(null);
                }}
                style={{ backgroundColor: '#006699', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '15px' }}
              >
                {t.anotherComplaintBtn}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 style={{ color: '#006699', textAlign: 'center', marginBottom: '20px' }}>{t.formTitle}</h2>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>{t.name}</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>{t.phone}</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>{t.district}</label>
                <input type="text" name="district" value={formData.district} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>{t.category}</label>
                <select name="category" value={formData.category} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}>
                  <option value="Water">{t.water}</option>
                  <option value="Roads">{t.roads}</option>
                  <option value="Electricity">{t.electricity}</option>
                  <option value="Drainage">{t.drainage}</option>
                </select>
              </div>

              {/* DYNAMIC LOCATION FEATURE */}
              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>{t.locationLabel}</label>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
                  <input 
                    type="text" 
                    name="location" 
                    value={formData.location} 
                    onChange={handleChange} 
                    placeholder={t.locationPlaceholder} 
                    required 
                    style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} 
                  />
                  <button type="button" onClick={handleGetLocation} style={{ backgroundColor: '#ff9900', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                    {t.getLocationBtn}
                  </button>
                </div>
              </div>

              {/* DYNAMIC PHOTO UPLOAD FEATURE */}
              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>{t.uploadPhoto}</label>
                <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                {photoPreview && (
                  <div style={{ marginTop: '10px', textAlign: 'center' }}>
                    <p style={{ margin: '5px 0', fontSize: '0.85rem', color: '#666' }}>{t.photoPreviewLabel}</p>
                    <img src={photoPreview} alt="Issue Preview" style={{ maxWidth: '100%', maxHeight: '180px', borderRadius: '6px', border: '1px solid #ddd' }} />
                  </div>
                )}
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>{t.details}</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}></textarea>
              </div>

              <button type="submit" style={{ width: '100%', backgroundColor: '#28a745', color: '#fff', padding: '12px', border: 'none', borderRadius: '4px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
                {t.submit}
              </button>
            </form>
          )}
        </>
      )}

      {/* TAB 2: TRACK COMPLAINT STATUS */}
      {activeTab === 'track' && (
        <div>
          <h2 style={{ color: '#006699', textAlign: 'center', marginBottom: '20px' }}>{t.tabTrack}</h2>
          <form onSubmit={handleTrackSearch} style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
            <input 
              type="text" 
              value={searchTrackId} 
              onChange={(e) => setSearchTrackId(e.target.value)} 
              placeholder={t.enterTrackId} 
              required 
              style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc', textTransform: 'uppercase' }} 
            />
            <button type="submit" style={{ backgroundColor: '#006699', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
              {t.trackBtn}
            </button>
          </form>

          {trackedStatus && (
            <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#006699' }}>ID: {trackedStatus.id}</h3>
              <p><strong>{t.registeredDate}</strong> {trackedStatus.date}</p>
              <p><strong>{t.assignedOfficer}</strong> {trackedStatus.assignedOfficer}</p>
              <p><strong>{t.statusLabel}</strong> <span style={{ color: '#ff9900', fontWeight: 'bold' }}>{trackedStatus.status}</span></p>

              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#28a745', color: '#fff', margin: 'auto', lineHeight: '24px', fontSize: '12px' }}>✓</div>
                  <small style={{ fontWeight: 'bold', display: 'block', marginTop: '5px' }}>{t.statusRegistered}</small>
                </div>
                <div style={{ height: '3px', backgroundColor: '#28a745', flex: 1 }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#ff9900', color: '#fff', margin: 'auto', lineHeight: '24px', fontSize: '12px' }}>⏳</div>
                  <small style={{ fontWeight: 'bold', display: 'block', marginTop: '5px' }}>{t.statusInProgressText}</small>
                </div>
                <div style={{ height: '3px', backgroundColor: '#ccc', flex: 1 }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#ccc', color: '#fff', margin: 'auto', lineHeight: '24px', fontSize: '12px' }}>3</div>
                  <small style={{ color: '#888', display: 'block', marginTop: '5px' }}>{t.statusResolvedText}</small>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

export default Complaints;