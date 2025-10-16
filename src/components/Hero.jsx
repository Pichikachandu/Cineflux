import React, { useEffect, useMemo, useRef, useState } from 'react';
import { tmdb } from '../api/tmdb';

function Hero({ movie, movies = [], onMoreInfo }) {
  // Backward compatibility: if only a single movie prop is provided, use that as the sole slide.
  const slides = useMemo(() => {
    const list = (movies && movies.length ? movies : movie ? [movie] : [])
      .filter((m) => m && (m.backdrop_path || m.poster_path));
    // Shuffle to get random order initially
    const shuffled = [...list];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 10); // cap to 10 for a tight carousel
  }, [movie, movies]);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!slides.length) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!paused) setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [slides, paused]);

  const current = slides[index];
  if (!current) return null;

  const go = (delta) => {
    setIndex((i) => (i + delta + slides.length) % slides.length);
  };

  return (
    <section className="hero" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="hero__bgstack">
        {slides.map((s, i) => {
          const bg = tmdb.images.backdrop(s.backdrop_path, 'w1280') || tmdb.images.poster(s.poster_path, 'w780');
          return (
            <div
              key={s.id || i}
              className={`hero__bg hero__bg--slide ${i === index ? 'is-active' : ''}`}
              style={{ backgroundImage: bg ? `url(${bg})` : undefined }}
            />
          );
        })}
      </div>
      <div className="hero__overlay" />
      <div className="hero__content hero__content--animate" key={index}>
        <h2 className="hero__title">{current.title}</h2>
        {current.overview && <p className="hero__desc">{current.overview}</p>}
        <div className="hero__actions">
          <button className="btn btn--primary" onClick={() => onMoreInfo?.(current)}>Watch Now</button>
          <button className="btn btn--ghost" onClick={() => onMoreInfo?.(current)}>More Info</button>
        </div>
        {slides.length > 1 && (
          <>
            <button className="hero__nav hero__nav--left" aria-label="Previous" onClick={() => go(-1)}>
              ‹
            </button>
            <button className="hero__nav hero__nav--right" aria-label="Next" onClick={() => go(1)}>
              ›
            </button>
            <div className="hero__dots">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`hero__dot ${i === index ? 'hero__dot--active' : ''}`}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Hero;
