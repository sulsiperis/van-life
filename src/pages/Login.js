import React from "react"
import { useSearchParams, useLoaderData, useNavigate } from "react-router-dom"
import { loginUser } from "../api"

//hard way to get message from authRequired using loader
export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}
//---------

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

    const navigate = useNavigate()

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
    //console.log(error)

    function handleChange(e) {
        const { name, value } = e.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            {msg && <h3 className="red">{msg}</h3>}
            {error && <h3 className="red">{error}</h3>}
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Email address"
                    value={loginFormData.email}
                />
                <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    value={loginFormData.password}
                />
                <button type="submit" disabled={status==="idle"?false:true}>
                    {status === 'submitting'?'Logging in...':'Log in'}
                </button>
            </form>
        </div>
    )

}