import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: false,
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
    }
});

export default api