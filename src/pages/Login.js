import React from "react"
import { 
    useSearchParams, //to get search string from url after ?
    useLoaderData, //for retrieving messages from loader
    useNavigate, //redirect in functional components
    Form, //react router form
    redirect, //for redirecting in non visual components
    useActionData, //for retrievin errors
    useNavigation, //for retrieving the state of the route loader (work only w/ data loader router)
    json
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
    //if redirectTo is undefined, returnPath will be "/host"
    const returnPath = new URL(obj.request.url).searchParams.get('redirectTo') || "/host" 
    
    const email = formData.get("email")
    const password = formData.get("password")
    try {
        const data = await loginUser({email, password})
        localStorage.setItem('loggedin', true)
        localStorage.setItem('userData', JSON.stringify(data))
        
        return redirect(returnPath)

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
    const navigate = useNavigate() //can be called just in a functional component
    const errorMessage = useActionData()
    const navigation = useNavigation() //for retrieving state of the route i.e. "loading", "idle", "submitting"
    
    

    return (
        <div className="login-container">
            {localStorage.getItem("loggedin") && <h2>Hello, {JSON.parse(localStorage.getItem('userData')).user.name}</h2>}
            {localStorage.getItem("loggedin") && <button className="logout-btn" onClick={() => {localStorage.clear(); navigate("/")}}>Logout</button>}
            {!localStorage.getItem("loggedin") && <h1>Sign in to your account</h1>}
            {msg && <h3 className="red">{msg}</h3>}
            {errorMessage && <h3 className="red">{errorMessage }</h3>}
            {!localStorage.getItem("loggedin") && <Form 
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
            </Form>}
        </div>
    )

}