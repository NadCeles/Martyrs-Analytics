import { login } from '../../services/auth'
import { Link, useNavigate } from "react-router-dom"
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import styles from "./login-page.module.css"


export const Login = () => {
    const navigate = useNavigate();

    function validateData(formData) {
        let dataIsValid = true;
        const email_regex = /\S+@\S+\.\S+/;
        const errors = [];
        if(!email_regex.test(formData.get("email"))) {
            errors.push("Email is not valid")
            dataIsValid &= false;
        }
        if(!formData.get("password")) {
            errors.push("Password is missing");
            dataIsValid &= false;
        }
        let alertString = "";
        for(let i = 0;i < errors.length; i++) {
            alertString += errors[i]+ "\n";
        }
        if(!dataIsValid) {
            alert(alertString);
        }
        return dataIsValid;
    }

    async function loginAction (e)  {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        try {
            if(validateData(formData)) {
                const response_data = await login(formData.get("email"), formData.get("password"));
                localStorage.setItem("api_token", response_data.token);
                navigate("/");
            }
        }
        catch(error) {
            alert(error.message);
        }
    }

    return (
        <>
            <div className={styles.loginPage}>
                <Header></Header>
                <div className={styles.card}>
                    <form className={styles.loginContainer} onSubmit={loginAction}>
                        <div className={styles.loginInputContainer}>
                            <label>
                                Email
                                <input name="email" type="text" className={styles.loginFormItem} />
                            </label>
                            <label>
                                Password
                                <input name="password" type="password" className={styles.loginFormItem} />
                            </label>
                        </div>
                        <button type="submit" className={styles.loginButton}>Login</button>
                        <Link to="/register" className={styles.loginButton}>Register</Link>
                        
                    </form>
                </div>
                <Footer></Footer>
    		</div>
        </>
    );
};