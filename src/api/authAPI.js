// import axios from './../app/axios'
import axios from 'axios'

export const authenticate = async (username, password) => {
    try {
        const res = await axios.post(
            'http://localhost:8080/auth/signin',
            {
                username,
                password,
            },
            {}
        )
        const data = res.data
        if (data.message) {
            return {
                error: data.message,
            }
        }
        return {
            username: data.username,
            role: data.role,
            token: data.token,
        }
    } catch (err) {
        return {
            error: 'Failed to authenticate',
        }
    }
}
