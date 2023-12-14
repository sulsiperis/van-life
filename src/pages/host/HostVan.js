import React from 'react'
import { useParams } from 'react-router-dom'

function HostVan() {
    const params = useParams()
  return (
    <>
        <div>HostVan</div>
        van id: {params.id}
    </>
  )
}

export default HostVan