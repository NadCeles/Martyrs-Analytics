import { register } from '../../services/auth'
import { useNavigate } from "react-router-dom" 

export const Register = () => {
	const navigator = useNavigate();

	async function registerAction(e) {
		e.preventDefault();

		const form = e.target;
		const formData = new FormData(form);

		try {
			const response_data = await register(formData.get("email"), formData.get("password"), formData.get("name"), formData.get("surname"), formData.get("gender"), formData.get("birthdate"));
			localStorage.setItem("api_token", response_data.token);
			navigator("/")
		}
		catch (error) {
			alert(error.message);
		}
	}
	return (
		<>
			<h1>Register</h1>
			<form onSubmit={registerAction}>
				<label for="name">Name</label>
				<input name="name" type="text"></input>
				<label for="surname">Surname</label>
				<input name="surname" type="text"></input>
				<label for="email">Email</label>
				<input name="email" type="email"></input>
				<label for="password">Password</label>
				<input name="password" type="password"></input>
				<label for="gender">Gender</label>
				<select name="gender">
					<option value="Woman">Woman</option>
					<option value="NB">Non-Binary</option>
					<option value="Other">Other</option>
					<option value="Man">Man</option>
				</select>
				<label for="birthdate">Birthdate</label>
				<input name="birthdate" type="date"></input>
				<button type="submit">Log In</button>
			</form>
		</>
	);
};