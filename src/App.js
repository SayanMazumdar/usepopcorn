import React, { useEffect, useState } from 'react'
import Header from './components/Header';
import Content from './components/Content';
import MoviesList from './components/MoviesList';
import MovieDetails from './components/MovieDetails';
import Message from './components/Message';

const KEY = '36a0bdb2';
//const query = 'inception';

export default function App() {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [query, setQuery] = useState('');

  function onMovieSelect(id) {
    setSelectedMovieId((prev) => prev !== id ? id : null);
  }

  useEffect(() => {

    const controller = new AbortController();

    async function fetchMovies() {
      try {

        const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${KEY}`, {signal: controller.signal});

        if (!res.ok) {
          throw new Error("SOMETHING WENT WRONG. TRY REFRESHING THE PAGE");
        }

        const data = await res.json();

        if (data.Response === "False") {
          throw new Error(data.Error);
        }
        setError(null);
        setMovies(data.Search);
      }
      catch (error) {
        if(error.name !== "AbortError") {
          setError(error.message);
        }      
      }
      finally {
        setLoading(false);
      }
    };
    if (query !== "") {
      setLoading(true);
      setError(null);
      fetchMovies();
    }
    else if (query === "") {
      setLoading(false);
      setError(null);
    }

    return function() {
      controller.abort();
    }

  }, [query]);

  return (
    <>
      <Header query={query} setQuery={setQuery} totalMovies={movies.length}/>
      <main className='content'>
        <Content>{loading || error ? <Message msg={error} /> : <MoviesList movies={movies} selectedMovieId={onMovieSelect} />}</Content>
        <Content><MovieDetails movieId={selectedMovieId} backBtn={setSelectedMovieId} /></Content>
      </main>
    </>
  )
}

