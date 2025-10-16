import React from 'react';

export default function Terms() {
  return (
    <div className="page">
      <header className="page__header">
        <button className="btn btn--ghost" onClick={() => { window.history.back(); }}>← Back</button>
        <div style={{ fontWeight: 800 }}>Terms • CineFlux</div>
      </header>
      <div className="mdetail__section">
        <h4 className="mdetail__section-title">Terms of Use</h4>
        <p className="mdetail__overview">This is a demo app for educational purposes. TMDB data usage is under TMDB terms.</p>
      </div>
    </div>
  );
}
