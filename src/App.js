import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
// removed unused MovieRow import
import VirtualMovieRow from './components/VirtualMovieRow';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import MovieDetailsPage from './pages/MovieDetailsPage';
import Footer from './components/Footer';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import { tmdb } from './api/tmdb';

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

function Main() {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError('');
        const [np, pop, tr, up] = await Promise.all([
          tmdb.movies.nowPlaying(1),
          tmdb.movies.popular(1),
          tmdb.movies.topRated(1),
          tmdb.movies.upcoming(1),
        ]);
        if (!cancelled) {
          setNowPlaying(np.results ?? []);
          setPopular(pop.results ?? []);
          setTopRated(tr.results ?? []);
          setUpcoming(up.results ?? []);
        }
      } catch (e) {
        if (!cancelled) setError(e.message || 'Failed to load');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Minimal router: watch back/forward
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigateToMovie = (id) => {
    if (!id) return;
    window.history.pushState({}, '', `/movie/${id}`);
    setPath(window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const heroMovie = useMemo(() => {
    const pickWithBackdrop = (arr) => arr.find((m) => m.backdrop_path) || arr[0];
    return pickWithBackdrop(popular) || pickWithBackdrop(nowPlaying) || null;
  }, [popular, nowPlaying]);

  // Route switch: if /movie/:id show details page, else home
  const match = path.match(/^\/movie\/(\d+)$/);
  if (match) {
    const mid = match[1];
    return <MovieDetailsPage movieId={mid} />;
  }

  if (path === '/about') {
    return <><About /><Footer /></>;
  }
  if (path === '/privacy') {
    return <><Privacy /><Footer /></>;
  }
  if (path === '/terms') {
    return <><Terms /><Footer /></>;
  }

  return (
    <div className="page">
      <NavBar />
      <Hero movie={heroMovie} movies={popular.length ? popular : nowPlaying} onMoreInfo={(m)=>navigateToMovie(m.id)} />
      {error && <div className="error">{error}</div>}
      {loading ? (
        <div className="loading">Loading…</div>
      ) : (
        <>
          <VirtualMovieRow id="now-playing" title="Now Playing" movies={nowPlaying} onSelect={(m)=>navigateToMovie(m.id)} />
          <VirtualMovieRow id="popular" title="Popular" movies={popular} onSelect={(m)=>navigateToMovie(m.id)} />
          <VirtualMovieRow id="top-rated" title="Top Rated" movies={topRated} onSelect={(m)=>navigateToMovie(m.id)} />
          <VirtualMovieRow id="upcoming" title="Upcoming" movies={upcoming} onSelect={(m)=>navigateToMovie(m.id)} />
        </>
      )}
      <Footer />
    </div>
  );
}

export default App;
