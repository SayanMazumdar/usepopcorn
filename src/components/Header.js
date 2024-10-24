import React, { useEffect, useRef } from 'react'

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

    const input = useRef();

    useEffect(() => {
        function handleEnter(e) {
            if(document.activeElement === input.current) return;

            if(e.code === 'Enter') {
                input.current.focus();
                change('');
            }
        }

        document.addEventListener('keydown', handleEnter);
        return function() {
            document.removeEventListener('keydown', handleEnter);
        }
    }, [change])

    return (
        <div className='search'>
            <input ref={input} type="text" placeholder='Search movies...' value={name} onChange={(e) => change(e.target.value)}/>
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
