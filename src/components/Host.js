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
                to={'/host'}
                end /* prevents from matching this route if there is more nested routes that matches */
            >Dashboard</NavLink>
            <NavLink style={({isActive}) => isActive ? activeStyle : null} to={'/host/income'}>Income</NavLink>
            <NavLink style={({isActive}) => isActive ? activeStyle : null} to={'/host/vans'}>Vans</NavLink>
            <NavLink style={({isActive}) => isActive ? activeStyle : null} to={'/host/reviews'}>Reviews</NavLink>
        </nav>
        <Outlet />        
      </>
  )
}

export default Host