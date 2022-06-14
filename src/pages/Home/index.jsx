import { Redirect } from "react-router-dom"

function Home ({ authenticated, setAuthenticated }) {

    if(!authenticated) {
        return <Redirect to='/'/>
    }

    function logout() {
        localStorage.removeItem("@KenzieHub:token")
        setAuthenticated(false)
    }
    return (
        <div>
            <button onClick={logout}>Logout</button>
            <h1>Home</h1>
        </div>
    )
}

export default Home