import { useEffect, useState } from 'react';
import { getUserInfoByToken, isLogged, register, updateUserInfo } from '../../services/auth'
import { useNavigate } from "react-router-dom" 

export const Profile = () => {
    const navigate = useNavigate();
    
    async function updateProfileAction(e) {
        e.preventDefault();

        const form = e.target;
		const formData = new FormData(form);

        try {
			const response_data = await updateUserInfo(formData.get("email"), formData.get("password"), formData.get("name"), formData.get("surname"), formData.get("gender"), formData.get("birthdate"));
			
		}
		catch (error) {
			alert(error.message);
		}
    }

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('Woman')
    const [birthdate, setBirthdate] = useState(new Date())

    useEffect(() => {
        const getFormData = async() => {
            const userInfo = await getUserInfoByToken();
            
            setName(userInfo.name);
            setSurname(userInfo.surname);
            setEmail(userInfo.email);
            setGender(userInfo.gender);
            setBirthdate(userInfo.birthdate);
        }
        getFormData();
    }, [])

    if(isLogged()) // Set DateTime correctly
    {
        return (
            <>
                <h1>Your Profile</h1>
                <form onSubmit={updateProfileAction}>
                    <label for="name">Name</label>
                    <input 
                        name="name" 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </input>
                    <label for="surname">Surname</label>
                    <input 
                        name="surname" 
                        type="text"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        >
                    </input>
                    <label for="email">Email</label>
                    <input 
                        name="email" 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </input>
                    <label for="gender">Gender</label>
                    <select 
                        name="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="Woman">Woman</option>
                        <option value="NB">Non-Binary</option>
                        <option value="Other">Other</option>
                        <option value="Man">Man</option>
                    </select>
                    <label for="birthdate">Birthdate</label>
                    <input 
                        name="birthdate" 
                        type="date"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                    >
                    </input>
                    <button type="submit">Update Info</button>
                </form>
            </>
        );
    }
};