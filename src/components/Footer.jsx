import React from 'react';

function Footer() {
  const nav = (path) => (e) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__brand-logo">◉</span>
          <span className="footer__brand-text">CineFlux</span>
        </div>
        <nav className="footer__links" aria-label="Footer Navigation">
          <a className="footer__link" href="/about" onClick={nav('/about')}>About</a>
          <a className="footer__link" href="/privacy" onClick={nav('/privacy')}>Privacy</a>
          <a className="footer__link" href="/terms" onClick={nav('/terms')}>Terms</a>
        </nav>
        <div className="footer__meta">
          <span className="footer__tmdb">Data from The Movie Database (TMDB)</span>
          <div className="footer__social" aria-label="Social Links">
            <button type="button" className="footer__icon" aria-label="Twitter" title="Twitter" onClick={() => window.open('https://x.com', '_blank', 'noopener,noreferrer')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 5.92c-.75.33-1.55.55-2.39.65a4.14 4.14 0 0 0 1.82-2.28 8.27 8.27 0 0 1-2.62 1 4.13 4.13 0 0 0-7.04 3.77A11.72 11.72 0 0 1 3 4.9a4.12 4.12 0 0 0 1.28 5.5 4.1 4.1 0 0 1-1.87-.52v.05a4.13 4.13 0 0 0 3.31 4.05 4.16 4.16 0 0 1-1.86.07 4.14 4.14 0 0 0 3.86 2.87A8.3 8.3 0 0 1 2 19.54a11.72 11.72 0 0 0 6.34 1.86c7.61 0 11.77-6.3 11.77-11.77l-.01-.54A8.42 8.42 0 0 0 22 5.92z" fill="#9ca3af"/></svg>
            </button>
            <button type="button" className="footer__icon" aria-label="GitHub" title="GitHub" onClick={() => window.open('https://github.com', '_blank', 'noopener,noreferrer')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.2-3.37-1.2-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1.01.07 1.54 1.06 1.54 1.06.9 1.57 2.36 1.11 2.93.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.32.1-2.74 0 0 .84-.27 2.75 1.05A9.32 9.32 0 0 1 12 7.6c.85 0 1.71.12 2.51.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.42.2 2.48.1 2.74.64.72 1.03 1.63 1.03 2.75 0 3.95-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.59.69.49A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" fill="#9ca3af"/></svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
