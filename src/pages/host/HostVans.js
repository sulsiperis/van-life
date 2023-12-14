import React from 'react'
import { Link } from 'react-router-dom'

function HostVans() {
    const [vans, setVans] = React.useState()

    React.useEffect(() => {
        fetch('/api/host/vans').then(res => res.json()).then(data => setVans(data.vans))
    }, [])

    const vanList = vans? vans.map(van => (
        <Link key={van.id} to={'/host/vans/' + van.id}>
            <div className='host-van-item'>
                <img src={van.imageUrl} />
                <div>
                    <h4>{van.name}</h4>
                    <p>€{van.price}/day</p>
                </div>
            </div>
        </Link>
    )) : "Loading..."
    

  return (
    <div className='host-vans-wrapper'>
        <h1>Your listed vans</h1>
        {vanList}        
    </div>
  )
}

export default HostVans