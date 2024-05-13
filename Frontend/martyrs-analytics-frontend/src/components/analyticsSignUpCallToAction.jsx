import { useNavigate } from "react-router-dom"
import styles from "../pages/Analytics/analytics-page.module.css";

export const AnalyticsSignUpCallToAction = () => {
    const navigator = useNavigate();

    const onLoginClicked = () => {
        navigator("/login");
    }

    return (
        <>
            <section className={styles.cardSelector}>
                <h1>Log In to See Your Stats</h1>
                <button className={styles.buttonSelector} onClick={onLoginClicked}>Sign In</button>
            </section>
        </>
    )
}