import React from 'react'
import { useRouteError } from 'react-router-dom'

function Error() {
    const err = useRouteError() //taking error message from api.js
  return (
    <div className='error-wrapper'>
        <h2>Error: {err.message}</h2>
        <p>{err.status} - {err.statusText}</p>
    </div>
  )
}

export default Error