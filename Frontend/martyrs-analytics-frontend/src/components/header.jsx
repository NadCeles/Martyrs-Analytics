import { useState } from "react";
import { isLogged } from "../services/auth"
import { Link, useNavigate } from "react-router-dom"
import styles from "./header.module.css"


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
            <div className={styles.topBar}>
                <Link to="/">
                    <div className={styles.gameLogo} />
                </Link>
                <div className={styles.container}>
                    <Link to="/#trailer-section">
                        <div>TRAILER</div>
                    </Link>
                    <Link to="/#game-section">
                        <div>GAME</div>
                    </Link>
                    <Link to="/#media-section">
                        <div>MEDIA</div>
                    </Link>
                    <Link to="/#newsletter-section">
                        <div>NEWSLETTER</div>
                    </Link>
                    <Link to="/stats">
                        <div>STATS</div>
                    </Link>
                    {logged ?
                        <Link to="/profile">
                            <div>PROFILE</div>
                        </Link> :
                        null   
                    }
                </div>
                {logged ?
                    <button className={styles.loginRegisterButton} onClick={signOut}>Sign Out</button> :
                    <Link className={styles.loginRegisterButton} to="/login">LOGIN / REGISTER</Link>
                }
            </div>
        </>
    )
}