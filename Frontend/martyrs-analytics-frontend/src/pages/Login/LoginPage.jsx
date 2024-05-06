import { isLogged, login } from '../../services/auth'
import { useNavigate } from "react-router-dom" 

export const Login = () => {
    const navigate = useNavigate();

    async function loginAction (e)  {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        try {
            const response_data = await login(formData.get("email"), formData.get("password"));
            localStorage.setItem("api_token", response_data.token);
            navigate("/");
        }
        catch(error) {
            alert(error.message);
        }
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={loginAction}>
                <label for="email">Email</label>
                <input name="email"></input>
                <label for="password">Password</label>
                <input name="password"></input>
                <button type="submit">Log In</button>
            </form>
        </>
    );
};