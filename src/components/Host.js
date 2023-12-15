import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'

function Host() {
    const activeStyle = {
       fontWeight: "bold",
       textDecoration: "underline",
       color: "#161616",
    }
    return (
      <>
        <nav className='host-nav'>
            <NavLink 
                style={({isActive}) => isActive ? activeStyle : null} 
                to={'.'} //relative link meaning current path
                end /* prevents from matching this route if there is more nested routes that matches. In this case we use it because dashboard is index route. */
            >Dashboard</NavLink>
            <NavLink style={({isActive}) => isActive ? activeStyle : null} to={'income'}>Income</NavLink>
            <NavLink style={({isActive}) => isActive ? activeStyle : null} to={'vans'}>Vans</NavLink>
            <NavLink style={({isActive}) => isActive ? activeStyle : null} to={'reviews'}>Reviews</NavLink>
        </nav>
        <Outlet />        
      </>
  )
}

export default Host