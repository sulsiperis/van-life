import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { getHostVans } from '../../api'
import { requireAuth } from '../../utils'

export async function loader({ request }) {
    await requireAuth(request)
    return getHostVans()
}

function HostVans() {
    const vans = useLoaderData()
    const vanList = vans.map(van => (
        <Link key={van.id} to={van.id}>
            <div className='host-van-item'>
                <img src={van.imageUrl} />
                <div>
                    <h4>{van.name}</h4>
                    <p>€{van.price}/day</p>
                </div>
            </div>
        </Link>
    ))
    

  return (
    <div className='host-vans-wrapper'>
        <h1>Your listed vans</h1>
        {vanList}        
    </div>
  )
}

export default HostVans