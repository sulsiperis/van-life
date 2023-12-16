import React from 'react'
import { Link, useSearchParams } from 'react-router-dom';



function Vans() {   
    const [searchParams, setSearchParams] = useSearchParams()
    
    const [data, setData] = React.useState()

    const typeFilter = searchParams.get('type')

    React.useEffect(() => {
        fetch('/api/vans').then(res => res.json()).then(d => setData(d.vans))
    }, [])

    const filtered = typeFilter ? data?.filter(van => van.type === typeFilter) : data

   // console.log(data)
    const vans = filtered?.map(van => (  
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
            <div className="van-list-filter-buttons">
                <Link className='van-type simple' to='?type=simple'>Simple</Link>
                <Link className='van-type ruged' to='?type=rugged'>Rugged</Link>
                <Link className='van-type luxury' to='?type=luxury'>Luxury</Link>
                <Link className='van-type clear-filters' to='.'>clear filters</Link>
            </div>
            <div className='vans-list'>
                {vans? vans:<h3>Loading...</h3>}            
            </div>           
        </div>
    )
}

export default Vans