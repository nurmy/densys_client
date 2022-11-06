// import axios from './../app/axios'
import axios from 'axios'

export const fetchAllDoctors = async (token) => {
    try {
        // console.log(token)
        const res = await axios.get('http://localhost:8080/doctors', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        // console.log(res)
        if (res.message) {
            return {
                error: res.message,
            }
        }
        const data = res.data
        return data
    } catch (err) {
        return {
            error: 'Failed to authenticate',
        }
    }
}

export const registerDoctor = async (token, attributes) => {
    try {
        // console.log(token)
        const res = await axios.post(
            'http://localhost:8080/doctors',
            attributes,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        if (res.message) {
            return {
                error: res.message,
            }
        }
        const data = res.data
        return data
    } catch (err) {
        return {
            error: 'Failed to authenticate',
        }
    }
}

export const editDoctor = async (token, attributes) => {
    try {
        // console.log(token)
        const res = await axios.patch(
            `http://localhost:8080/doctors/${attributes.user_id}`,
            attributes,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        if (res.message) {
            return {
                error: res.message,
            }
        }
        const data = res.data
        return data
    } catch (err) {
        return {
            error: 'Failed to authenticate',
        }
    }
}
