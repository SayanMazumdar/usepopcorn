import React from 'react'
import Movie from './Movie'

export default function MoviesList({movies, selectedMovieId}) {
  return (
    <div className='moviesList'>
      {movies.map((item) => <Movie movieObj={item} key={item.imdbID} selectedMovieId={selectedMovieId}/>)}
    </div>
  )
}


