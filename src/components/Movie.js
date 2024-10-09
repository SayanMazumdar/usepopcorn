import React from 'react';

export default function Movie({ movieObj, watchedMoviesObj, selectedMovieId, removedMovie }) {

  function handleClick() {
    if(!movieObj) return
    selectedMovieId(movieObj.imdbID);
  }
  return (
    <div className={`movie ${movieObj ? 'hoverOn' : ''}`} onClick={handleClick}>
      {movieObj ? 
      <>
        <div className="poster">
          <img src={movieObj.Poster} alt='Movie poster' />
        </div>
        <div className="details">
          <p className='title'>{movieObj.Title}</p>
          <p><span>📅 {movieObj.Year}</span></p>
        </div>
      </>
       :
        <>
          <div className="poster">
            <img src={watchedMoviesObj.Poster} alt={`${watchedMoviesObj.Title} poster`} />
          </div>
          <div className="watchDetails">
            <p className='title'>{watchedMoviesObj.Title}</p>
            <div className="summaryWatched">
              <span>⭐ {watchedMoviesObj.imdbRating}</span><span>🌟 {watchedMoviesObj.userRating}</span><span>⏳ {watchedMoviesObj.runtime}</span>
            </div>
          </div>
          <button className="remove" onClick={() => removedMovie(watchedMoviesObj.imdbID)}>&#10006;</button>
        </>}
    </div>
  )
}
