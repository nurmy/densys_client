import axios from 'axios'

export const createRequest = async (token, attributes) => {
    try {
        // console.log(token)
        const res = await axios.post(
            `http://localhost:8080/requests`,
            attributes,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
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

export const fetchAllRequests = async (token) => {
    try {
        // console.log(token)
        const res = await axios.get(`http://localhost:8080/requests`, {
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

export const deleteRequest = async (token, attributes) => {
    try {
        // console.log(token)
        const res = await axios.delete(
            `http://localhost:8080/requests/${attributes.id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
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
