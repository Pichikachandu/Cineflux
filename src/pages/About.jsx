import React from 'react';

export default function About() {
  return (
    <div className="page">
      <header className="page__header">
        <button className="btn btn--ghost" onClick={() => { window.history.back(); }}>← Back</button>
        <div style={{ fontWeight: 800 }}>About • CineFlux</div>
      </header>
      <div className="mdetail__section">
        <h4 className="mdetail__section-title">About</h4>
        <p className="mdetail__overview">CineFlux showcases trending, popular, top-rated, and upcoming movies powered by TMDB.</p>
      </div>
    </div>
  );
}
