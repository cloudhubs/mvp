import axios from 'axios';

const app = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*',
    }
})

export default app;