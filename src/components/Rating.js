import React, { useState } from 'react'
import PropTypes from 'prop-types';

const compStyle = {
    display: 'flex',
    gap: '1em',
    alignItems: 'center'
}

StarRating.propTypes = {
    maxRating: PropTypes.number,
    color: PropTypes.string,
    size: PropTypes.number,
    messages: PropTypes.array,
    defaultRating: PropTypes.number,
    onRated: PropTypes.func
}

export default function StarRating({ maxRating = 5, color = '#000000', size = 40, messages = [], defaultRating = 0, onRated }) {

    const [rating, setRating] = useState(defaultRating);
    const [hoverRating, setHoverRating] = useState(0);

    const ratingStyle = {
        fontSize: `${size / 2.1}px`,
        fontWeight: '600',
        color
    }

    return (
        <div style={compStyle}>
            <div>
                {Array.from({ length: maxRating }, (_, i) => (
                    <Star key={i} onRate={() => { setRating(i + 1); onRated(i + 1) }} fill={hoverRating ? hoverRating >= i + 1 : rating >= i + 1} onHoverIn={() => setHoverRating(i + 1)} onHoverOut={setHoverRating} color={color} size={size} />
                ))}
            </div>
            <div style={ratingStyle}>{messages.length === maxRating ? messages[hoverRating ? hoverRating - 1 : rating - 1] : hoverRating || rating || ''}</div>
        </div>
    )
}

function Star({ onRate, fill, onHoverIn, onHoverOut, color, size }) {

    const starStyle = {
        height: `${size}px`,
        width: `${size}px`,
        display: 'inline-block',
        cursor: 'pointer'
    }

    return (
        <span style={starStyle} role='button' onClick={() => onRate()} onMouseEnter={() => onHoverIn()} onMouseLeave={() => onHoverOut(0)}>
            {fill ?
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill={color}
                    stroke={color}
                >
                    <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                </svg> :
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke={color}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="{2}"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                </svg>}
        </span>
    )
}

