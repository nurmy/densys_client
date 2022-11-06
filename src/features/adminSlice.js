import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAllDoctors, registerDoctor } from '../api/doctorAPI'

export const fetchDoctors = createAsyncThunk(
    'admin/fetchDoctors',
    async (token, thunkAPI) => {
        try {
            const data = await fetchAllDoctors(token)
            console.log(data)
            if (data.error) {
                return thunkAPI.rejectWithValue(data.error)
            }
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue('Failed to authenticate')
        }
    }
)

export const registerNewDoctor = createAsyncThunk(
    'admin/registerNewDoctor',
    async ({ token, attributes }, thunkAPI) => {
        try {
            const data = await registerDoctor(token)
            console.log(data)
            if (data.error) {
                return thunkAPI.rejectWithValue(data.error)
            }
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue('Failed to authenticate')
        }
    }
)

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        isLoading: false,
        hasError: false,
        doctors: [],
        patients: [],
        doctorsLoaded: false,
        patientsLoaded: false,
        doctorRegging: false,
        doctorRegged: false,
        doctorRegErr: false,
    },
    reducers: {},
    extraReducers: {
        [fetchDoctors.pending]: (state) => {
            state.isLoading = true
        },
        [fetchDoctors.fulfilled]: (state, action) => {
            state.isLoading = false
            state.doctors = action.payload
            state.doctorsLoaded = true
        },
        [fetchDoctors.rejected]: (state) => {
            state.isLoading = false
            state.hasError = true
        },
        [registerNewDoctor.pending]: (state) => {
            state.doctorRegging = true
        },
        [registerNewDoctor.fulfilled]: (state, action) => {
            state.isLoading = false
            state.doctors = action.payload
            state.doctorsLoaded = true
        },
        [registerNewDoctor.rejected]: (state) => {
            state.isLoading = false
            state.hasError = true
        },
    },
})

export default adminSlice.reducer
