
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast' 
import SearchBar from '../SearchBar/SearchBar'
import './App.module.css'
import { useState } from 'react'
import MovieGrid from '../MovieGrid/MovieGrid'
import type { Movie } from '../../types/movie'
import { fetchMovies } from '../../services/movieService'


function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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
    {isLoading && <p>Loading data, please wait...</p>}
    {isError && <p></p>}
      {movies.length > 0 && <MovieGrid movies={movies} />}
    <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App