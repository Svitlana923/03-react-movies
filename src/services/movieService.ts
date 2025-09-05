export default function fetchMovies() {
  return fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }&language=en-US&page=1`
  ).then((res) => res.json());
}   