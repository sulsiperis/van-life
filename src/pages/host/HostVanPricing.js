import React from 'react'
import { useOutletContext } from 'react-router-dom'

function HostVanPricing() {
    const { vanData } = useOutletContext()
  return (
    <div className='host-van-detail-pricing'>
        <h2>€{vanData.price}<span>/day</span></h2>
    </div>
  )
}

export default HostVanPricing