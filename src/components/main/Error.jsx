import React from 'react'
import { NavLink } from 'react-router-dom'

const Error = () => {
    return (
        <div style={{textAlign:"center"}}>
            <NavLink to='/'>Go to main page</NavLink>
            Error
        </div>
    )
}

export default Error