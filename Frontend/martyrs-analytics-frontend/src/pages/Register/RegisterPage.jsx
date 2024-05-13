import { register } from '../../services/auth'
import { useNavigate } from "react-router-dom"
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import styles from "./register-page.module.css"

export const Register = () => {
	const navigator = useNavigate();

	function validateData(formData) {
		let dataIsValid = true;
		const email_regex = /\S+@\S+\.\S+/;
		const errors = [];
		if (!formData.get("email") || !email_regex.test(formData.get("email"))) {
			errors.push("Email is not valid")
			dataIsValid &= false;
		}
		if (!formData.get("password") || formData.get("password").length < 8) {
			errors.push("Password must be 8 characters long or more");
			dataIsValid &= false;
		}
		if (!formData.get("name")) {
			errors.push("Name can't be empty");
			dataIsValid &= false;
		}
		if (!formData.get("surname")) {
			errors.push("Surname can't be empty");
			dataIsValid &= false;
		}
		if (!formData.get("birthdate")) {
			errors.push("Birthdate can't be empty");
		}
		let alertString = "";
		for (let i = 0; i < errors.length; i++) {
			alertString += errors[i] + "\n";
		}
		if(!dataIsValid) {
			alert(alertString);
		}
		return dataIsValid;
	}

	async function registerAction(e) {
		e.preventDefault();

		const form = e.target;
		const formData = new FormData(form);

		try {
			if(validateData(formData)) {
				const response_data = await register(formData.get("email"), formData.get("password"), formData.get("name"), formData.get("surname"), formData.get("gender"), formData.get("birthdate"));
				localStorage.setItem("api_token", response_data.token);
				navigator("/")
			}
		}
		catch (error) {
			alert(error.message);
		}
	}
	return (
		<>
			<div className={styles.registerPage}>
                <Header></Header>
				<div className={styles.card}>
					<form onSubmit={registerAction} className={styles.registerContainer}>
							<div className={styles.registerInputContainer}>
								<label>
									Email
									<input name="email" type="email" className={styles.registerFormItem} />
								</label>
								<label>
									Password
									<input name="password" type="password" className={styles.registerFormItem} />
								</label>
								<label>
									Name
									<input name="name" type="text" className={styles.registerFormItem} />
								</label>
								<label>
									Email
									<input name="surname" type="text" className={styles.registerFormItem} />
								</label>
								<label>
									Gender
									<select name="gender" className={styles.registerFormItem}>
										<option value="Woman">Woman</option>
										<option value="NB">Non-Binary</option>
										<option value="Other">Other</option>
										<option value="Man">Man</option>
									</select>
								</label>
								<label>
									Birthday
									<input name="birthdate" type="date" className={styles.registerFormItem} />
								</label>
							</div>
							<button type="submit" className={styles.registerButton}>Register</button>
					</form>
				</div>
                <Footer></Footer>
    		</div>
		</>
	);
};