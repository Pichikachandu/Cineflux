import React, { useState } from 'react';

function NavBar() {
  const [open, setOpen] = useState(false);
  const goTo = (id) => (e) => {
    e.preventDefault();
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setOpen(false);
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpen(false);
  };
  return (
    <nav className="nav">
      <div className="nav__left">
        <div className="nav__brand">
          <span className="nav__brand-logo">◉</span>
          <span className="nav__brand-text">CineFlux</span>
        </div>
        <ul className="nav__menu" id="nav-menu">
          <li className="nav__item nav__item--active" onClick={goTo('home')}>Home</li>
          <li className="nav__item" onClick={goTo('popular')}>Movies</li>
          <li className="nav__item" onClick={goTo('top-rated')}>Top Rated</li>
          <li className="nav__item" onClick={goTo('upcoming')}>Upcoming</li>
        </ul>
      </div>
      <div className="nav__right">
        <button
          className={`nav__burger ${open ? 'is-open' : ''}`}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav__burger-bar" />
          <span className="nav__burger-bar" />
          <span className="nav__burger-bar" />
        </button>
        <div className="nav__search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 15.5L21 21" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#9ca3af" strokeWidth="2"/></svg>
          <input placeholder="Search" aria-label="Search" />
        </div>
        <div className="nav__avatar" title="Account" />
      </div>
      {/* Mobile dropdown */}
      {open && (
        <div className="nav__drawer" role="menu" aria-label="Mobile Navigation">
          <button className="nav__drawer-item" onClick={goTo('home')}>Home</button>
          <button className="nav__drawer-item" onClick={goTo('popular')}>Movies</button>
          <button className="nav__drawer-item" onClick={goTo('top-rated')}>Top Rated</button>
          <button className="nav__drawer-item" onClick={goTo('upcoming')}>Upcoming</button>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
