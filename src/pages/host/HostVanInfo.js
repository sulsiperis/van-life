import React from 'react'
import { useOutletContext } from 'react-router-dom'

function HostVanInfo() {
    const [vanData, setVanData] = useOutletContext()
  return (
    <div className='host-van-detail-info'>
        <p><span>Name: </span>{vanData.name}</p>
        <p><span>Category: </span>{vanData.type}</p>
        <p><span>Description: </span>{vanData.description}</p>

    </div>

  )
}

export default HostVanInfo