import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authenticate } from './../api/authAPI'

export const login = createAsyncThunk(
    'auth/login',
    async ({ username, password }, thunkAPI) => {
        try {
            const data = await authenticate(username, password)
            if (data.error) {
                thunkAPI.rejectWithValue(data.error)
            }
            console.log(data)
            return data
        } catch (err) {
            thunkAPI.rejectWithValue('Failed to authenticate')
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoading: false,
        hasError: false,
        username: null,
        role: null,
        token: null,
        authenticated: false,
    },
    reducers: {
        logout: (state) => {
            state.isLoading = false
            state.authenticated = false
            state.username = null
            state.role = null
            state.token = null
        },
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.isLoading = true
        },
        [login.fulfilled]: (state, action) => {
            state.isLoading = false
            state.authenticated = true
            state.username = action.payload.username
            state.role = action.payload.role
            state.token = action.payload.token
        },
        [login.rejected]: (state) => {
            state.isLoading = false
            state.hasError = true
        },
    },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
