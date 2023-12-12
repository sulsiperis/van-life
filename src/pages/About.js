import React from 'react'
import background from '../img/aboutback.png'
import { Link } from 'react-router-dom'

function About() {
  return (
    <>    
    <div style={{
        background: `url(${background})`,
        height: '233px',
        
        backgroundPosition: '50%',
        backgroundRepeat: 'no-repeat'

    }}></div>
    <div className='about-wrapper'>
        
        <h2>Don’t squeeze in a sedan when you could relax in a van.</h2>
        <p>Our mission is to enliven your road trip with the perfect travel van rental. Our vans are recertified before each trip to ensure your travel plans can go off without a hitch.
(Hitch costs extra 😉)</p>
        <p>Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels.</p>
        <div className='about-destination'>
            <h3>Your destination is waiting. Your van is ready.</h3>
            <Link to={"/vans"} className='link-btn'>Explore our vans</Link>
           
        </div>
    </div>
    </>
  )
}

export default About