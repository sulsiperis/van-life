import React from 'react'
import { Link, useLoaderData, defer, Await } from 'react-router-dom'
import { getHostVans } from '../../api'
import { requireAuth } from '../../utils'

export async function loader({ request }) {
    await requireAuth(request)
    return defer({ vans: getHostVans() })
}

function HostVans() {
    const dataPromise = useLoaderData()
    
    function renderHostVansElements(vans) {
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
            <>
                <h1>Your listed vans</h1>
                {vanList} 
            </>
        )

    }
    

  return (
    <div className='host-vans-wrapper'>
        <React.Suspense fallback={<h2>Loading...</h2>}>
            <Await resolve={dataPromise.vans}>
                {renderHostVansElements}
            </Await>
        </React.Suspense>
    </div>
  )
}

export default HostVans