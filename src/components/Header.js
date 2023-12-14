import React from 'react'
import { NavLink, Link } from 'react-router-dom'

function Header() {
    const activeStyle = {
        fontWeight: "700",
        color: "red"
    }
  return (
    <nav>
        <Link className='logo' to={'/'}>#VANLIFE</Link> {/* Link is rendered into <a></a> tag */}
        <div className='menu'>
            <NavLink 
                className={({isActive}) => isActive ? 'header-menu-active' : ''} /* first method for styling active route */
                //style={({isActive}) => isActive ? activeStyle : null } /* second method */
                to={'/host'}
            >Host</NavLink>
            <NavLink className={({isActive}) => isActive ? 'header-menu-active' : ''} to={'/about'}>About</NavLink>
            <NavLink className={({isActive}) => isActive ? 'header-menu-active' : ''} to={'/vans'}>Vans</NavLink>
        </div>
    </nav>
  )
}

export default Header