import React from 'react'
import { useParams, Link, NavLink, Outlet } from 'react-router-dom'

function HostVan() {
    const params = useParams()
    const [vanData, setVanData] = React.useState()

    React.useEffect(() => {
        fetch(`/api/host/vans/${params.id}`).then(res => res.json()).then(d => setVanData(d.vans[0]))
    }, [])
   
  return (
    <div className='host-van-detail-wrapper'>
        <Link 
            className='host-van-detail-back' 
            to={'..'}
            relative='path' /* means that link will be relative to path and not the route system */
        >&larr; <span>Back to all vans</span></Link>
        {vanData?
        <div className='host-van-detail-block'>
            <div className='host-van-detail'>
                <img src={vanData.imageUrl} />
                <div className='host-van-detail-info-text'>
                    <i className={`van-type van-type-${vanData.type}`}>{vanData.type}</i>
                    <h4>{vanData.name}</h4>
                    <p>€{vanData.price}/day</p>
                </div>
            </div>        
            <div className='host-van-detail-nav'>
                <NavLink end className={({isActive}) => isActive ? 'host-van-detail-menu-active' : null} to='.'>Details</NavLink>
                <NavLink className={({isActive}) => isActive ? 'host-van-detail-menu-active' : null} to='pricing'>Pricing</NavLink>
                <NavLink className={({isActive}) => isActive ? 'host-van-detail-menu-active' : null} to='photos'>Photos</NavLink>
            </div>
            <Outlet context={[vanData, setVanData]} />
            {/* could be also:
            <Outlet context={ vanData } />
            or
            <Outlet context={{ vanData }} />
            in this case childs should destructure:
            { vanData } = useOutletContext() */}
        </div>
        : 'Loading...'}
    </div>
  )
}

export default HostVan