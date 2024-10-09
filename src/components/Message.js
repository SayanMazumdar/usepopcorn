import React from 'react'

export default function Message({ msg }) {
    return (
        <div className={msg ? 'error' : 'loader'}>
            {msg ? `${msg} ⛔` : 'LOADING...'}
        </div>
    )
}