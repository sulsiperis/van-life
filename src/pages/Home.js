import React from 'react'
import background from '../img/homeback.png'


function Home() {
  return (
    <div className='home-wrapper' style={{background: `url(${background})`}}>
        <h2>You got the travel plans, we got the travel vans.</h2>
        <p>Add adventure to your life by joining the #vanlife movement. Rent the perfect van to make your perfect road trip.</p>
        <button>Find your van</button>
    </div>
  )
}

export default Home