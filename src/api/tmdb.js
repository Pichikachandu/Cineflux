// Simple TMDB API helper
const TMDB_BASE_URL = process.env.REACT_APP_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

// TMDB bearer token is loaded from .env file (REACT_APP_TMDB_BEARER)
const TMDB_BEARER = process.env.REACT_APP_TMDB_BEARER;

if (!TMDB_BEARER) {
  console.warn('Warning: TMDB Bearer token is not set. Please check your .env file.');
}

const authHeader = {
  Authorization: `Bearer ${TMDB_BEARER}`,
  Accept: 'application/json',
};

async function get(path, params = {}) {
  const url = new URL(`${TMDB_BASE_URL}${path}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, v);
  });

  const res = await fetch(url.toString(), { headers: authHeader });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`TMDB error ${res.status}: ${text}`);
  }
  return res.json();
}

export const tmdb = {
  images: {
    poster: (path, size = 'w342') => (path ? `https://image.tmdb.org/t/p/${size}${path}` : ''),
    backdrop: (path, size = 'w780') => (path ? `https://image.tmdb.org/t/p/${size}${path}` : ''),
  },
  movies: {
    nowPlaying: (page = 1, region) => get('/movie/now_playing', { page, region }),
    popular: (page = 1, region) => get('/movie/popular', { page, region }),
    topRated: (page = 1, region) => get('/movie/top_rated', { page, region }),
    upcoming: (page = 1, region) => get('/movie/upcoming', { page, region }),
    details: (id) => get(`/movie/${id}`),
  },
  collections: {
    details: (id) => get(`/collection/${id}`),
  },
  account: {
    details: () => get('/account/22383580'),
  },
};

export default tmdb;
