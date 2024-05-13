import { Link } from "react-router-dom"
import { FunctionComponent } from 'react';
import styles from './footer.module.css';
import studioLogo from "../assets/images/logos/logo_positivo_png.png"
import youtubeLogo from "../assets/images/media/youtube_icon.png"
import twitterLogo from "../assets/images/media/twitter_icon.png"




export const Footer = () => {
    return (
        <div className={styles.footer}>
            <img src={studioLogo} className={styles.footerLogo}></img>
            <div className={styles.container}>
                <div>EULA</div>
                <div>COOKIE POLICY</div>
                <div>SITE TERMS</div>
                <div>PRIVACY POLICY</div>
            </div>
            <div className={styles.socialContainer}>
                <img src={youtubeLogo} className={styles.footerSocial}/>
                <img src={twitterLogo} className={styles.footerSocial}/>
            </div>
        </div>
    )
}