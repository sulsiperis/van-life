import React from "react"
import { useSearchParams, useLoaderData, useNavigate, Form, redirect } from "react-router-dom"
import { loginUser } from "../api"

//hard way to get message from authRequired using loader
export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}
//---------
export async function action(obj) {
    //obj has two objects: action and params. Params is an object from get method path
    const formData = await obj.request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    const data = await loginUser({email, password})
    localStorage.setItem('loggedin', true)
    
    //console.log(data)
    return redirect("/host")
}

export default function Login() {
    //easier way to get message from authRequired
    //const [searchParams, setSearchParams] = useSearchParams() 
    //const msg = searchParams.get('message')
    //------
    //hard way to get message from authRequired using loader
    const msg = useLoaderData()
    //--------
    const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })
    const [status, setStatus] = React.useState("idle")
    const [error, setError] = React.useState(null)

    const navigate = useNavigate() //can be called just in a functional component

    function handleSubmit(e) {
        e.preventDefault()
        setError(null)
        setStatus("submitting")
        loginUser(loginFormData)
            .then(data => {
                console.log(data)
                //setLoginFormData({ email: "", password: "" })
                navigate('/host', { replace: true }) //replace: true means history replacing with previous route, not the login
            })
            .catch(err => {
                setError(err.message)                
            })
            .finally(() => setStatus("idle"))
    }
    
    return (
        <div className="login-container">
            {localStorage.getItem("loggedin") && <button onClick={() => {localStorage.clear()}}>Logout</button>}
            <h1>Sign in to your account</h1>
            {msg && <h3 className="red">{msg}</h3>}
            {error && <h3 className="red">{error}</h3>}
            <Form 
                className="login-form" 
                method="post"
                replace //replace means that login component will be removed from history and replaced by the followin route
            >
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"                    
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"                    
                />
                <button type="submit" disabled={status==="idle"?false:true}>
                    {status === 'submitting'?'Logging in...':'Log in'}
                </button>
            </Form>
        </div>
    )

}