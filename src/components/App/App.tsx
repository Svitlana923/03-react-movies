
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast' 
import SearchBar from '../SearchBar/SearchBar'
import './App.module.css'
import { useState } from 'react'
import MovieGrid from '../MovieGrid/MovieGrid'
import type { Movie } from '../../types/movie'
import { fetchMovies } from '../../services/movieService'
import MovieModal from '../MovieModal/MovieModal'
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'


function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null); 

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
  }

  const closeModal = () => {
    setSelectedMovie(null);
  }

  const handleSearch = async (topic: string) => {
  
 try {
      setIsLoading(true);
      setIsError(false);
      const data = await fetchMovies(topic);
   setMovies(data);
   if (data.length === 0) {
     toast.error("No movies found for your request.");
   }
    } catch {
   setIsError(true);
   toast.error("Whoops, something went wrong! Please try again!");
   
    } finally {
      setIsLoading(false);
    }
  }; 

  return (
    <>
    <SearchBar onSubmit={handleSearch} />
    {isLoading && <Loader />}
    {isError && <ErrorMessage />}
      {!isLoading && !isError && movies.length > 0 && <MovieGrid movies={movies} onMovieClick={openModal}/>}
      <Toaster position="top-center" reverseOrder={false} />
      {selectedMovie && (
        <MovieModal onClose={closeModal}  movie={selectedMovie}/>
      )}
    </>
  )
}

export default App