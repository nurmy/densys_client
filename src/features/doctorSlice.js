import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAllDoctors, registerDoctor, editDoctor } from '../api/doctorAPI'

export const fetchDoctors = createAsyncThunk(
    'doctor/fetchDoctors',
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
    'doctor/registerNewDoctor',
    async ({ token, attributes }, thunkAPI) => {
        try {
            const data = await registerDoctor(token, attributes)
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

export const editExistingDoctor = createAsyncThunk(
    'doctor/editExistingDoctor',
    async ({ token, attributes }, thunkAPI) => {
        try {
            const data = await editDoctor(token, attributes)
            if (data.error) {
                return thunkAPI.rejectWithValue(data.error)
            }
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue('Failed to authenticate')
        }
    }
)

const doctorSlice = createSlice({
    name: 'doctor',
    initialState: {
        isLoading: false,
        hasError: false,
        doctors: [],
        doctorsLoaded: false,
        doctorRegging: false,
        doctorRegged: false,
        doctorRegErr: false,
    },
    reducers: {
        resetDoctorReg: (state) => {
            state.doctorRegged = false
            state.hasError = false
        },
        resetDoctorEdit: (state) => {
            state.doctorEdited = false
            state.hasError = false
        },
    },
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
            state.doctorRegging = false
            state.doctors.push(action.payload)
            state.doctorRegged = true
        },
        [registerNewDoctor.rejected]: (state) => {
            state.doctorRegging = false
            state.hasError = true
        },
        [editExistingDoctor.pending]: (state) => {
            state.doctorEditing = true
        },
        [editExistingDoctor.fulfilled]: (state, action) => {
            state.doctorEditing = false
            console.log(action.payload)
            state.doctors = state.doctors.map((doctor) => {
                if (doctor._id.toString() === action.payload._id.toString()) {
                    return action.payload
                }
                return doctor
            })
            state.doctorEdited = true
        },
        [editExistingDoctor.rejected]: (state) => {
            state.doctorEditing = false
            state.hasError = true
        },
    },
})

export const { resetDoctorReg, resetDoctorEdit } = doctorSlice.actions

export default doctorSlice.reducer
