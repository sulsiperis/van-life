import React from 'react'
import { Link } from 'react-router-dom';

/**
 * Challenge: Fetch and map over the data to display it on
 * the vans page. For an extra challenge, spend time styling
 * it to look like the Figma design.
 * 
 * Hints:
 * 1. Use `fetch("/api/vans")` to kick off the request to get the
 *    data from our fake Mirage JS server
 * 2. What React hook would you use to fetch data as soon as the
 *    Vans page loads, and only fetch it the one time?
 */

function Vans() {
    const [data, setData] = React.useState()

    React.useEffect(() => {
        fetch('/api/vans').then(res => res.json()).then(d => setData(d.vans))
    }, [])

   // console.log(data)
    const vans = data?.map(van => (  
            <div key={van.id} className="van-tile">
                <Link to={'/vans/' + van.id}><img src={van.imageUrl} /></Link>
                <div className="van-info">
                <Link to={'/vans/' + van.id}><h4>{van.name}</h4></Link>
                    <h4>€{van.price}<span>/day</span></h4>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </div>          
        )
    )
    return (
        <div className='vans-wrapper'>
            <h1>Explore our van options</h1>
            <div className='vans-list'>
                {vans? vans:<h3>Loading...</h3>}            
            </div>           
        </div>
    )
}

export default Vans