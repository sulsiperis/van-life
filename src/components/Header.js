import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <nav>
        <Link className='logo' to={'/'}>#VANLIFE</Link> {/* Link is rendered into <a></a> tag */}
        <div className='menu'>
        <Link to={'/about'}>About</Link>
        <Link to={'/vans'}>Vans</Link>
        </div>
    </nav>
  )
}

export default Header