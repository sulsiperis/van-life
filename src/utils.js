import { redirect } from "react-router-dom"

export async function requireAuth() {
    const loggedIn = localStorage.getItem('loggedin')

  if (!loggedIn) {
    throw redirect('/login?message=You need to login first!')
  } else {
    return null
  }
}