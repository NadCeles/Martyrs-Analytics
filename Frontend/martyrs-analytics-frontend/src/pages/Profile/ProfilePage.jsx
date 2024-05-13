import { useEffect, useState } from 'react';
import { getUserInfoByToken, isLogged, register, updateUserInfo } from '../../services/auth'
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import styles from "./profile-page.module.css"

export const Profile = () => {

    function validateData(formData) {
		let dataIsValid = true;
		const errors = [];
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
            dataIsValid &= false;
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
    
    async function updateProfileAction(e) {
        e.preventDefault();

        const form = e.target;
		const formData = new FormData(form);
        try {
            if(validateData(formData)) {
                const response_data = await updateUserInfo(formData.get("name"), formData.get("surname"), formData.get("gender"), formData.get("birthdate"));
                alert("Profile Updated");
            }
		}
		catch (error) {
            console.log(error);
			alert(error.message);
		}
    }

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [gender, setGender] = useState('Woman')
    const [birthdate, setBirthdate] = useState(new Date())

    useEffect(() => {
        const getFormData = async() => {
            const userInfo = await getUserInfoByToken();
            
            setName(userInfo.name);
            setSurname(userInfo.surname);
            setGender(userInfo.gender);
            setBirthdate(userInfo.birthdate.slice(0,10));
        }
        getFormData();
    }, [])

    if(isLogged()) // Set DateTime correctly
    {
        return (
            <>
                <div className={styles.profilePage}>
                    <Header></Header>
                    <div className={styles.card}>
                        <form onSubmit={updateProfileAction} className={styles.profileContainer}>
                            <div className={styles.updateInputContainer}>
                                <label>
                                    Name
                                    <input className={styles.updateFormItem}
                                        name="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}/>
                                </label>
                                <label>
                                    Surname
                                    <input className={styles.updateFormItem}
                                        name="surname" 
                                        type="text"
                                        value={surname}
                                        onChange={(e) => setSurname(e.target.value)}/>
                                </label>
                                <label >
                                    Gender
                                    <select className={styles.updateFormItem}
                                        name="gender"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        >
                                        <option value="Woman">Woman</option>
                                        <option value="NB">Non-Binary</option>
                                        <option value="Other">Other</option>
                                        <option value="Man">Man</option>
                                    </select>
                                </label>
                                <label>
                                    Birthdate
                                    <input className={styles.updateFormItem}
                                        name="birthdate" 
                                        type="date"
                                        value={birthdate}
                                        onChange={(e) => setBirthdate(e.target.value)}/>
                                </label>
                            </div>
                            <button type="submit" className={styles.updateButton}>Update</button>
                        </form>
                    </div>
                    <Footer></Footer>
    		    </div>
            </>
        );
    }
};