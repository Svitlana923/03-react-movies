

import SearchBar from '../SearchBar/SearchBar'
import './App.module.css'
import axios from 'axios'

axios.defaults.baseURL = 'https://api.themoviedb.org/3'
axios.defaults.params = {}
axios.defaults.params['api_key'] = import.meta.env.VITE_TMDB_API_KEY
axios.defaults.params['language'] = 'en-US'


function App() {

  return (
    <>
     <SearchBar/>
    </>
  )
}

export default App