import axios from 'axios'

export const createBooking = async (token, attributes) => {
    try {
        // console.log(token)
        const res = await axios.post(
            `http://localhost:8080/bookings`,
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

export const fetchAllBookings = async (token, attributes) => {
    try {
        // console.log(token)
        const res = await axios.get(
            `http://localhost:8080/bookings/${attributes.doctor_id}`,
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
