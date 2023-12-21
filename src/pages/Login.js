import React from "react"
import { 
    useSearchParams, //to get search string from url after ?
    useLoaderData, //for retrieving messages from loader
    useNavigate, //redirect in functional components
    Form, //react router form
    redirect, //for redirecting in non visual components
    useActionData, //for retrievin errors
    useNavigation //for retrieving the state of the route loader (work only w/ data loader router)
} from "react-router-dom"
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
    try {
        const data = await loginUser({email, password})
        localStorage.setItem('loggedin', true)
        return redirect("/host")

    } catch(err) {
        return err.message
    }
    
    //console.log(data)
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

    const navigate = useNavigate() //can be called just in a functional component
    const errorMessage = useActionData()
    const navigation = useNavigation() //for retrieving state of the route i.e. "loading", "idle", "submitting"

    function handleSubmit(e) {
        e.preventDefault()

        setStatus("submitting")
        loginUser(loginFormData)
            .then(data => {
                console.log(data)
                //setLoginFormData({ email: "", password: "" })
                navigate('/host', { replace: true }) //replace: true means history replacing with previous route, not the login
            })
            .catch(err => {
                              
            })
            .finally(() => setStatus("idle"))
    }
    console.log(navigation.state)
    
    return (
        <div className="login-container">
            {localStorage.getItem("loggedin") && <button onClick={() => {localStorage.clear(); navigate("/")}}>Logout</button>}
            <h1>Sign in to your account</h1>
            {msg && <h3 className="red">{msg}</h3>}
            {errorMessage && <h3 className="red">{errorMessage }</h3>}
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
                <button type="submit" disabled={navigation.state==="idle"?false:true}>
                    {navigation.state !== 'idle'?navigation.state + '...':'Log in'}
                </button>
            </Form>
        </div>
    )

}