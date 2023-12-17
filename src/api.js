async function getVans() {
    const res = await fetch('/api/vans')
    if (!res.ok) {        
        throw {
            message: "Failed to fetch vans from DB.", 
            statusText: res.statusText,
            status: res.status
        }
    }
    const vanData = await res.json()
    
  return (
    vanData.vans
  )
}

export default getVans