import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import MovieCard from './MovieCard';

// Lightweight horizontal virtualization (RecyclerView-like) without extra deps
// Assumes a fixed card width + gap for accurate measurement.
function VirtualMovieRow({ id, title, movies = [], onSelect, itemWidth = 190, itemGap = 12, height = 360 }) {
  const viewportRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  const totalWidth = useMemo(() => {
    const n = movies.length;
    if (n === 0) return 0;
    return n * itemWidth + Math.max(0, n - 1) * itemGap;
  }, [movies.length, itemWidth, itemGap]);

  // Measure viewport size
  const measure = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    setViewportWidth(el.clientWidth);
    setScrollLeft(el.scrollLeft);
  }, []);

  useEffect(() => {
    measure();
    const el = viewportRef.current;
    if (!el) return;
    const onScroll = () => setScrollLeft(el.scrollLeft);
    el.addEventListener('scroll', onScroll, { passive: true });
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', onScroll);
      ro.disconnect();
    };
  }, [measure]);

  // Compute visible range with buffer
  const { startIndex, endIndex } = useMemo(() => {
    if (viewportWidth === 0) return { startIndex: 0, endIndex: -1 };
    const itemSpan = itemWidth + itemGap;
    const first = Math.floor(scrollLeft / itemSpan);
    const visibleCount = Math.ceil(viewportWidth / itemSpan);
    const buffer = 4; // render a few offscreen items for smoothness
    const start = Math.max(0, first - buffer);
    const end = Math.min(movies.length - 1, first + visibleCount + buffer);
    return { startIndex: start, endIndex: end };
  }, [scrollLeft, viewportWidth, movies.length, itemWidth, itemGap]);

  const items = useMemo(() => {
    if (endIndex < startIndex) return [];
    const list = [];
    for (let i = startIndex; i <= endIndex; i++) {
      const x = i * (itemWidth + itemGap);
      const m = movies[i];
      list.push(
        <div
          key={m.id}
          className="vrow__item"
          style={{ left: x, width: itemWidth }}
        >
          <MovieCard movie={m} onClick={onSelect} />
        </div>
      );
    }
    return list;
  }, [startIndex, endIndex, movies, itemWidth, itemGap, onSelect]);

  return (
    <section className="movie-row" id={id}>
      <h2 className="movie-row__title">{title}</h2>
      <div
        ref={viewportRef}
        className="vrow__viewport"
        style={{ height }}
      >
        <div className="vrow__track" style={{ width: totalWidth, height }}>
          {items}
        </div>
      </div>
    </section>
  );
}

export default VirtualMovieRow;
