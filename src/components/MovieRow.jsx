import React from 'react';
import MovieCard from './MovieCard';

function MovieRow({ id, title, movies = [], onSelect }) {
  const titleId = `${id || 'row'}-title`;
  return (
    <section className="movie-row" id={id} aria-labelledby={titleId}>
      <h2 className="movie-row__title" id={titleId}>{title}</h2>
      <div
        className="movie-row__scroller"
        role="list"
        aria-label={`${title} movies`}
        aria-live="polite"
      >
        {movies.map((m) => (
          <div key={m.id} role="listitem">
            <MovieCard movie={m} onClick={onSelect} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default MovieRow;
