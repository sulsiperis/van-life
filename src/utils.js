import { redirect } from "react-router-dom"

export async function requireAuth(request) {
    const loggedIn = localStorage.getItem('loggedin')
    const pathname = new URL(request.url).pathname
  if (!loggedIn) {
    throw redirect(`/login?message=You need to login first!&redirectTo=${pathname}`)
  } else {
    return null
  }
}