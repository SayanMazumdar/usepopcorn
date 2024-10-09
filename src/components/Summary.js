import React, { useEffect, useState } from 'react'
import Message from './Message'
import Rating from './Rating'

const KEY = '36a0bdb2';

export default function Summary({ movieId, backBtn, addedMovie, movieRating }) {

    const [summary, setSummary] = useState({});
    const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState(null);

    useEffect(() => {

        function escapePress(e) {
            if(e.code === 'Escape') {
                backBtn(null);
            }
        }
        document.addEventListener('keydown', escapePress);

        return function() {
            document.removeEventListener('keydown', escapePress);
        }
    },[backBtn])

    useEffect(() => {
        async function fetchSummary() {
            const res = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=${KEY}`);
            const data = await res.json();
            setLoading(false);
            setSummary(data)
        };
        if (movieId) {
            setLoading(true);
            fetchSummary();
        }
    }, [movieId])

    useEffect(() => {
        if(!summary.Title) return;
        document.title = `Movie - ${summary.Title}`;

        return function() {
            document.title = "usePopcorn"
        }
    },[summary.Title])

    function onMovieAdd() {
        addedMovie({imdbID: movieId, Title: summary.Title, Year: summary.Year, 
        Poster: summary.Poster, runtime: Number(summary.Runtime.split(" ")[0]), imdbRating: Number(summary.Ratings[0].Value.split("/")[0]), 
        userRating: rating});
        backBtn(null);
    }

    return (
        <div className='movieSummary'>
        {loading ? <Message /> : <>
            <button className="btn-back" onClick={() => backBtn(null)}>&larr;</button>
            <div className="topContent">
                <div>
                    <img className="image" src={summary.Poster} alt='' />
                </div>
                <div className="about">
                    <p className='name'>{summary.Title}</p>
                    <p className="released">{summary.Released} &#x2022; {summary.Runtime}</p>
                    <p className="genre">{summary.Genre}</p>
                    <p className="rating">{summary.Ratings ? summary.Ratings[0].Value : ''}</p>
                </div>
            </div>

            <div className="bottomContent">
                <div className="userRating">
                    {movieRating ? <p>You rated this movie {movieRating} 🌟</p> : 
                    <>
                    <Rating maxRating={10} color='#ffd700' size={26} defaultRating={rating} onRated={setRating}/>
                    {rating && <button className='addBtn' onClick={onMovieAdd}>+ Add to list</button>}
                    </>}
                </div>               
                <p className='plot'><i>{summary.Plot}</i></p>
                <p className="actors">Starring {summary.Actors}</p>
                <p className="director">{summary.Director}</p>
            </div>
        </>}
        </div>
    )
}
