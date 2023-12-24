import React from 'react'
import { Link, useLoaderData, useSearchParams, defer, Await } from 'react-router-dom';
import { getVans } from '../../api';

export function loader() {
    return (
        
        defer({vans: getVans()})
    )
}

function Vans() {   
    const [searchParams, setSearchParams] = useSearchParams()
    const dataPromise = useLoaderData()
    
    const typeFilter = searchParams.get('type')
        
    //function to append query key instead of overwriting
    function genNewSearchParamString(key, value) { 
        const sp = new URLSearchParams(searchParams)
        if (value === null) {
            sp.delete(key)
        } else {
            sp.set(key, value)
        }
        return `?${sp.toString()}`
    }                    
    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
          if (value === null) {
            prevParams.delete(key)
        } else {
            prevParams.set(key, value)
          }
          return prevParams
        })
    }

    function renderVanElements(data) {
        const filtered = typeFilter ? data?.filter(van => van.type === typeFilter) : data
        const vans = filtered?.map(van => (  
                <div key={van.id} className="van-tile">
                    {/* using state in link is a way to transfer info to the linked route without showing in url. In this case query strings */}
                    <Link to={(van.id)} state={{search: `${searchParams.toString()}`, filter: `${typeFilter}` }}><img src={van.imageUrl} /></Link>
                    <div className="van-info">
                    <Link to={van.id}><h4>{van.name}</h4></Link>
                        <h4>€{van.price}<span>/day</span></h4>
                    </div>
                    <i className={`van-type ${van.type} selected`}>{van.type}</i>
                </div>          
        ))
        return (
            <>
                <div className="van-list-filter-buttons">
                    {/* queries also can be made with setSearchParams: */}
                    {/* <button onClick={() => setSearchParams({type: "rugged"})}>Rugged</button> */}
                    <Link className={`van-type ${typeFilter==='simple' && 'selected'} simple`} to={genNewSearchParamString("type", "simple")}>Simple</Link>
                    <Link className={`van-type ${typeFilter==='rugged' && 'selected'} simple`} to='?type=rugged'>Rugged</Link>
                    <Link className={`van-type ${typeFilter==='luxury' && 'selected'} simple`} to='?type=luxury'>Luxury</Link>
                    {typeFilter && <Link className='van-type clear-filters' to='.'>clear filters</Link>}
                    {/* <button onClick={() => handleFilterChange("type", null)}>clear</button> */}
                </div>
                <div className='vans-list'>
                    {vans}            
                </div> 
                
            </>

        )
        
    }
    return (
        <div className='vans-wrapper'>
            <React.Suspense fallback={<h2>Loading...</h2>}>
                <h1>Explore our van options</h1>
                <Await resolve={dataPromise.vans}>
                    {renderVanElements}

                </Await>
            </React.Suspense>
        </div>
    )
}

export default Vans