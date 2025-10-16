import React from 'react';

export default function Privacy() {
  return (
    <div className="page">
      <header className="page__header">
        <button className="btn btn--ghost" onClick={() => { window.history.back(); }}>← Back</button>
        <div style={{ fontWeight: 800 }}>Privacy • CineFlux</div>
      </header>
      <div className="mdetail__section">
        <h4 className="mdetail__section-title">Privacy Policy</h4>
        <p className="mdetail__overview">We do not collect personal data in this demo. Movie data is fetched from TMDB.</p>
      </div>
    </div>
  );
}
