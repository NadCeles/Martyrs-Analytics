import { useNavigate } from "react-router-dom"

export const AnalyticsSignUpCallToAction = () => {
    const navigator = useNavigate();

    const onLoginClicked = () => {
        navigator("/login");
    }

    return (
        <>
            <section>
                <h1>Log In to See Your Stats</h1>
                <button onClick={onLoginClicked}>Sign In</button>
            </section>
        </>
    )
}