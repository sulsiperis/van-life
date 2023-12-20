import { redirect } from "react-router-dom"

export async function requireAuth() {
    const loggedIn = false

  if (!loggedIn) {
    throw redirect('/login?message=You need to login first!')
  } else {
    return null
  }
}