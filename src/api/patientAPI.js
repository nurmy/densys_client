import axios from 'axios'

export const fetchAllPatients = async (token) => {
    try {
        const res = await axios.get('http://localhost:8080/patients', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
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

export const registerPatient = async (token, attributes) => {
    try {
        const res = await axios.post(
            'http://localhost:8080/patients',
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

export const editPatient = async (token, attributes) => {
    try {
        // console.log(token)
        const res = await axios.patch(
            `http://localhost:8080/patients/${attributes.user_id}`,
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
