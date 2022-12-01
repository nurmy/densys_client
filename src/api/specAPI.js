import axios from 'axios'

export const fetchAllSpecs = async (token, attributes) => {
    try {
        // console.log(token)
        const res = await axios.get(
            `http://localhost:8080/specs?page=${attributes.page}&limit=${attributes.limit}&search=${attributes.search}`,
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

export const countSpecs = async (token, attributes) => {
    try {
        // console.log(token)
        const res = await axios.get(
            `http://localhost:8080/specs/count?search=${attributes.search}`,
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
