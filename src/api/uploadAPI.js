// import axios from './../app/axios'
import axios from 'axios'

export const upload = async (file, token) => {
    try {
        const res = await axios.post(
            'http://localhost:8080/upload/photo',
            { data: file },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        const data = res.data
        if (data.message) {
            return {
                error: data.message,
            }
        }
        return {
            photoUrl: data.url,
        }
    } catch (err) {
        return {
            error: 'Failed to authenticate',
        }
    }
}
