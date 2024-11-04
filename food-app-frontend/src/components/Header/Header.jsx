import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Order your favorite food here</h2>
            <p>choose from the diverse menu which offers every cuisine in the world whether it is indian , chinese or italian.</p>
            <button><a href="#explore-menu">view menu</a></button>
        </div>
    </div>
  )
}

export default Header