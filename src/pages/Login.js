import React from "react"
import { useSearchParams, useLoaderData } from "react-router-dom"

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

    function handleSubmit(e) {
        e.preventDefault()
        console.log(loginFormData)
    }

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
                <button type="submit">Log in</button>
            </form>
        </div>
    )

}