import React from 'react'
import { useParams, Link, useLocation, useLoaderData } from 'react-router-dom'
import { getVans } from '../../api'

export async function loader({params}) {
  return getVans(params.id)
}
function VanDetail() {
  //const [van, setVan] = React.useState()

  //const params = useParams()
  const location = useLocation()
  const van = useLoaderData()

  const backUrl = location.state?.search!==''? '..?' + location.state?.search : '..'
  const filter = location.state?.filter
  /* React.useEffect(() => {
    fetch('/api/vans/' + params.id).then(res => res.json()).then(v => setVan(v))
  }, [params.id]) */

  //console.log(location.state)

  return (
    <div className="van-detail-container">
        <Link 
            className='host-van-detail-back' 
            to={backUrl}
            relative='path' /* means that link will be relative to path and not the route system */
        >&larr; <span>Back to {filter !== 'null' ? filter : 'all'} vans</span></Link>
        <div className="van-detail">
            <img src={van.imageUrl} />
            <i className={`van-type ${van.type} selected`}>{van.type}</i>
            <h2>{van.name}</h2>
            <p className="van-price"><span>€{van.price}</span>/day</p>
            <p>{van.description}</p>
            <button className="link-button">Rent this van</button>
        </div>
    </div>
  )
}

export default VanDetail