import { useState } from "react";
import { isLogged } from "../services/auth"
import { Link, useNavigate } from "react-router-dom" 

export const Header = () => {
    const [logged, setLogged] = useState(isLogged);
    const navigate = useNavigate();

    function signOut() {
        localStorage.clear("api_token");
        setLogged(false);
        navigate("/")
    }

    return (
        <>
            <label>Martyrs</label>
            <a href="">Trailer</a>
            <a href="">The Game</a>
            <a href="">Media</a>
            <a href="">Newsletter</a>
            <Link to="/stats">Stats</Link>
            <a href="">Buy</a>
            { logged ? <button onClick={signOut}>Sign Out</button> : <Link to="/login">Sign In</Link> }
        </>
    )
}