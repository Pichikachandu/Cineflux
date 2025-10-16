import React, { useEffect, useMemo, useState } from 'react';
import { tmdb } from '../api/tmdb';
import MovieCard from '../components/MovieCard';

function Field({ label, children }) {
  if (!children && children !== 0) return null;
  return (
    <div className="mdetail__field">
      <div className="mdetail__label">{label}</div>
      <div className="mdetail__value">{children}</div>
    </div>
  );
}

function MovieDetailsPage({ movieId: propId }) {
  const [movieId, setMovieId] = useState(propId || null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [collection, setCollection] = useState(null);
  const [collectionLoading, setCollectionLoading] = useState(false);
  const [collectionError, setCollectionError] = useState('');

  // Parse id from URL if not provided via props
  useEffect(() => {
    if (propId) { setMovieId(propId); return; }
    const m = window.location.pathname.match(/\/movie\/(\d+)/);
    if (m) setMovieId(m[1]);
  }, [propId]);

  useEffect(() => {
    if (!movieId) return;
    let canceled = false;
    async function load() {
      try {
        setLoading(true);
        setError('');
        setCollection(null);
        setCollectionError('');
        setCollectionLoading(false);
        const d = await tmdb.movies.details(movieId);
        if (!canceled) setData(d);
      } catch (e) {
        if (!canceled) setError(e.message || 'Failed to load details');
      } finally {
        if (!canceled) setLoading(false);
      }
    }
    load();
    return () => { canceled = true; };
  }, [movieId]);

  // Fetch collection details if present
  useEffect(() => {
    let canceled = false;
    async function loadCollection(colId) {
      try {
        setCollectionLoading(true);
        setCollectionError('');
        const c = await tmdb.collections.details(colId);
        if (!canceled) setCollection(c);
      } catch (e) {
        if (!canceled) setCollectionError(e.message || 'Failed to load collection');
      } finally {
        if (!canceled) setCollectionLoading(false);
      }
    }
    const colId = data?.belongs_to_collection?.id;
    if (colId) loadCollection(colId);
    return () => { canceled = true; };
  }, [data?.belongs_to_collection?.id]);

  const poster = useMemo(() => tmdb.images.poster(data?.poster_path, 'w342'), [data]);
  const backdrop = useMemo(() => tmdb.images.backdrop(data?.backdrop_path, 'w1280'), [data]);
  const colPoster = useMemo(() => tmdb.images.poster(data?.belongs_to_collection?.poster_path, 'w342'), [data]);
  const colBackdrop = useMemo(() => tmdb.images.backdrop(data?.belongs_to_collection?.backdrop_path, 'w780'), [data]);

  const currency = (n) => (typeof n === 'number' ? n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }) : null);
  const year = data?.release_date ? new Date(data.release_date).getFullYear() : null;
  const langName = data?.spoken_languages?.[0]?.english_name || data?.original_language?.toUpperCase();
  const countries = data?.production_countries?.map((c) => c.iso_3166_1).join(', ');
  const genres = data?.genres?.map((g) => g.name) || [];
  const isAdult = data?.adult ? '18+' : 'PG';
  const rating = data?.vote_average ? data.vote_average.toFixed(1) : 'N/A';

  const onSelectMovie = (id) => {
    if (!id) return;
    window.history.pushState({}, '', `/movie/${id}`);
    setMovieId(String(id));
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="page">
      <header className="page__header">
        <button className="btn btn--ghost" onClick={() => { window.history.pushState({}, '', '/'); window.dispatchEvent(new PopStateEvent('popstate')); }}>← Back</button>
        <div style={{ fontWeight: 800 }}>CineFlux</div>
      </header>

      {loading ? (
        <div className="modal__loading">Loading…</div>
      ) : error ? (
        <div className="modal__error">{error}</div>
      ) : data ? (
        <div className="mdetail">
          {/* Visual banner */}
          <div className="mdetail__hero">
            {backdrop && <div className="mdetail__hero-bg" style={{ backgroundImage: `url(${backdrop})` }} />}
            <div className="mdetail__hero-mask" />
            <div className="mdetail__hero-inner">
              {poster && <img className="mdetail__hero-poster" src={poster} alt={data.title} />}
              <div className="mdetail__hero-text">
                <h3 className="mdetail__title">{data.title}</h3>
                {data.tagline && <div className="mdetail__tagline">{data.tagline}</div>}
                <div className="mdetail__badges">
                  <span className="badge">{rating} ★</span>
                  {year && <span className="badge">{year}</span>}
                  {data.runtime ? <span className="badge">{data.runtime} min</span> : null}
                  {langName && <span className="badge">{langName}</span>}
                  {countries && <span className="badge">{countries}</span>}
                  <span className="badge badge--age">{isAdult}</span>
                </div>
                {genres.length > 0 && (
                  <div className="chips">
                    {genres.map((g) => (
                      <span key={g} className="chip">{g}</span>
                    ))}
                  </div>
                )}
                <div className="mdetail__actions">
                  <a className="btn btn--primary" href={data.homepage || '#'} target="_blank" rel="noreferrer">Watch</a>
                  {data.imdb_id && (
                    <a className="btn btn--ghost" href={`https://www.imdb.com/title/${data.imdb_id}`} target="_blank" rel="noreferrer">IMDb</a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="mdetail__section">
            <h4 className="mdetail__section-title">Overview</h4>
            <p className="mdetail__overview">{data.overview}</p>
          </div>

          {/* Key facts grid */}
          <div className="mdetail__facts">
            <Field label="Status">{data.status}</Field>
            <Field label="Release Date">{data.release_date}</Field>
            <Field label="Budget">{currency(data.budget)}</Field>
            <Field label="Revenue">{currency(data.revenue)}</Field>
            <Field label="Vote Count">{data.vote_count?.toLocaleString?.()}</Field>
            <Field label="Original Title">{data.original_title}</Field>
            <Field label="Origin Country">{data.origin_country?.join(', ')}</Field>
            <Field label="Spoken Languages">{data.spoken_languages?.map((l) => l.english_name).join(', ')}</Field>
          </div>

          {/* Companies */}
          <div className="mdetail__section">
            <h4 className="mdetail__section-title">Production Companies</h4>
            <div className="mdetail__companies">
              {data.production_companies?.map((c) => (
                <div key={c.id} className="company">
                  {c.logo_path ? (
                    <img src={tmdb.images.poster(c.logo_path, 'w185')} alt={c.name} />
                  ) : (
                    <div className="company__logo-fallback">{c.name[0]}</div>
                  )}
                  <div className="company__name">{c.name}</div>
                  <div className="company__country">{c.origin_country}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Collection Banner */}
          {data.belongs_to_collection && (
            <div className="mdetail__section">
              <h4 className="mdetail__section-title">Collection</h4>
              <div className="collection">
                {colBackdrop && <div className="collection__bg" style={{ backgroundImage: `url(${colBackdrop})` }} />}
                <div className="collection__mask" />
                {colPoster && <img className="collection__poster" src={colPoster} alt={data.belongs_to_collection.name} />}
                <div className="collection__info">
                  <div className="collection__name">{data.belongs_to_collection.name}</div>
                  <div className="collection__hint">Explore more from this collection on TMDB</div>
                </div>
              </div>
            </div>
          )}

          {/* Collection Overview */}
          {data.belongs_to_collection && collection?.overview && (
            <div className="mdetail__section">
              <h4 className="mdetail__section-title">About this Collection</h4>
              <p className="mdetail__overview">{collection.overview}</p>
            </div>
          )}

          {/* Collection Parts */}
          {data.belongs_to_collection && (
            <div className="mdetail__section">
              <h4 className="mdetail__section-title">More in this Collection</h4>
              {collectionError && <div className="error">{collectionError}</div>}
              <div className="movie-row__scroller" style={{ paddingBottom: 8 }}>
                {(collectionLoading ? Array.from({ length: 6 }) : collection?.parts || []).map((p, idx) => (
                  collectionLoading ? (
                    <div key={idx} className="movie-card" style={{ width: 180 }}>
                      <div className="movie-card__placeholder">Loading…</div>
                      <div className="movie-card__meta"><div className="movie-card__title">&nbsp;</div></div>
                    </div>
                  ) : (
                    <MovieCard key={p.id} movie={p} onClick={() => onSelectMovie?.(p.id)} />
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default MovieDetailsPage;
