import React from 'react'

export default function Header({query, setQuery, totalMovies}) {

    return (
        <header className='header'>
            <Brand />
            <Search name={query} change={setQuery} />
            <Stats totalMovies={totalMovies}/>
        </header>
    )
}

function Brand() {
    return (
        <div className='brand'>
            <p><span>🍟</span> usePopcorn</p>
        </div>
    )
}

function Search({name, change}) {

    return (
        <div className='search'>
            <input type="text" name="" id="" placeholder='Search movies...' value={name} onChange={(e) => change(e.target.value)}/>
        </div>
    )
}

function Stats({totalMovies}) {
    return (
        <div className='stats'>
            <p>Found <strong>{totalMovies}</strong> top results</p>
        </div>
    )
}
