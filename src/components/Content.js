import React, { useState } from 'react'

export default function Content({ children }) {

    const [visible, setVisible] = useState(true);
    return (
        <div className='box'>
            <button className='visibilityToggler' onClick={() => setVisible((prev) => !prev)}>{visible ? '-' : '+'}</button>
            {visible && children}
        </div>
    )
}
