import api from "./apiconfig"

export async function login(email, password) {
    try {
        const authResponse = await api.post("auth/login",{
            email: email,
            password: password
        })
        return authResponse.data
    }
    catch(error) {
        throw new Error(error);
    }
}

export async function register(email, password, name, surname, gender, birthdate) {
    const mock_steam_id = "test-steam-id"
    try {
        const signupResponse = await api.post("auth/signup",{
            name: name,
            surname: surname,
            email: email,
            password: password,
            role: "user",
            steam_id: mock_steam_id,
            gender: gender,
            birthdate: birthdate
       })
       return signupResponse.data
    }
    catch(error) {
        throw new Error(error);
    }
}

export async function getUserInfoByToken() {
    try {
        const userInfo = await api.get("user", {
            headers: {
                Authorization: localStorage.getItem("api_token")
            }
        })
        return userInfo.data;
    }
    catch (error) {
        throw new Error(error);
    }
}

export async function updateUserInfo(name, surname, gender, birthdate) {
    try {
        const headers = {
            headers: {
                Authorization: localStorage.getItem("api_token")
            }
        }
        const updateUser = await api.patch("user", {
            name: name,
            surname: surname,
            gender: gender,
            birthdate: birthdate
        }, headers);
        return updateUser;
    }
    catch (error) {
        throw new Error(error)
    }
}

export function isLogged() {
    const logged = localStorage.getItem("api_token") != null;
    return logged;
}