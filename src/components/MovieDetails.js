import React, { useEffect, useState } from 'react'
import Movie from './Movie';
import Summary from './Summary';
import useLocalStorage from '../useLocalStorage';

export default function MovieDetails({ movieId, backBtn }) {

  const [watchedMovies, setWatchedMovies] = useLocalStorage('movies');
  const [movieRating, setMovieRating] = useState(null);
  const totalMovies = watchedMovies.length;
  const avgImdbRating = (watchedMovies.reduce((total, movie) => total + movie.imdbRating, 0)) / totalMovies;
  const avgUserRating = (watchedMovies.reduce((total, movie) => total + movie.userRating, 0)) / totalMovies;
  const avgRuntime = (watchedMovies.reduce((total, movie) => total + movie.runtime, 0)) / totalMovies;

  function onMovieAdd(movie) {
    setWatchedMovies((prev) => [...prev, movie])
  }

  function onMovieRemove(movieId) {
    setWatchedMovies((prev) => prev.filter((item) => item.imdbID !== movieId));
  }

  useEffect(() => {
    if (watchedMovies.length > 0 && movieId) {
      let arr = watchedMovies.filter((item) => item.imdbID === movieId);
      if (arr.length > 0) 
        setMovieRating(arr[0].userRating);
      else
        setMovieRating(null);
    }
  }, [movieId, watchedMovies])


  return (
    <div className='detailsContainer'>
      {!movieId ? <div className="watchedData">
        <div className="watchedStat">
          <p>MOVIES YOU WATCHED</p>
          <div className="summary">
            <span>🎫 {totalMovies} movies</span><span>⭐ {isNaN(avgImdbRating) ? 0 : avgImdbRating.toFixed(2)}</span><span>🌟 {isNaN(avgUserRating) ? 0 : avgUserRating.toFixed(2)}</span><span>⏳ {isNaN(avgRuntime) ? 0 : avgRuntime.toFixed(2)} min</span>
          </div>
        </div>
        <div className="watchedList">
          {watchedMovies.map((item) => <Movie watchedMoviesObj={item} key={item.imdbID} removedMovie={onMovieRemove}/>)}
        </div>
      </div> :
        <Summary movieId={movieId} key={movieId} backBtn={backBtn} addedMovie={onMovieAdd} movieRating={movieRating} />
      }
    </div>
  )
}
