import React from 'react'
import { useOutletContext } from 'react-router-dom'

function HostVanPhotos() {
    const { vanData } = useOutletContext()
  return (
    <div className='host-van-detail-photos'>
        <img src={vanData.imageUrl} />
    </div>
  )
}

export default HostVanPhotos