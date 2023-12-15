import React from 'react'
import { useParams, Link, NavLink } from 'react-router-dom'

function HostVan() {
    const params = useParams()
    const [vanData, setVanData] = React.useState()

    React.useEffect(() => {
        fetch(`/api/host/vans/${params.id}`).then(res => res.json()).then(d => setVanData(d.vans[0]))
    }, [])
    console.log(vanData)
  return (
    <div className='host-van-detail-wrapper'>
        <Link className='host-van-detail-back' to={'/host/vans'}>{'<< Back to all vans'}</Link>
        {vanData?
        <>
            <div className='host-van-detail'>
                <img src={vanData.imageUrl} />
                <div className='host-van-detail-info-text'>
                    <i className={`van-type ${vanData.type} selected`}>{vanData.type}</i>
                    <h4>{vanData.name}</h4>
                    <p>€{vanData.price}/day</p>
                </div>
            </div>        
            <div className='host-van-detail-nav'>
                <NavLink>Details</NavLink>
                <NavLink>Pricing</NavLink>
                <NavLink>Photos</NavLink>
            </div>
        </>
        : 'Loading...'}
    </div>
  )
}

export default HostVan