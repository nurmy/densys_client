import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    fetchAllPatients,
    registerPatient,
    editPatient,
} from '../api/patientAPI'

export const fetchPatients = createAsyncThunk(
    'patient/fetchPatients',
    async (token, thunkAPI) => {
        try {
            const data = await fetchAllPatients(token)
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

export const registerNewPatient = createAsyncThunk(
    'patient/registerNewPatient',
    async ({ token, attributes }, thunkAPI) => {
        try {
            const data = await registerPatient(token, attributes)
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

export const editExistingPatient = createAsyncThunk(
    'patient/editExistingPatient',
    async ({ token, attributes }, thunkAPI) => {
        try {
            const data = await editPatient(token, attributes)
            if (data.error) {
                return thunkAPI.rejectWithValue(data.error)
            }
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue('Failed to authenticate')
        }
    }
)

const patientSlice = createSlice({
    name: 'patient',
    initialState: {
        isLoading: false,
        hasError: false,
        patients: [],
        patientsLoaded: false,
        patientRegging: false,
        patientRegged: false,
        patientRegErr: false,
    },
    reducers: {
        resetPatientReg: (state) => {
            state.patientRegged = false
            state.hasError = false
        },
        resetPatientEdit: (state) => {
            state.patientEdited = false
            state.hasError = false
        },
    },
    extraReducers: {
        [fetchPatients.pending]: (state) => {
            state.isLoading = true
        },
        [fetchPatients.fulfilled]: (state, action) => {
            state.isLoading = false
            state.patients = action.payload
            state.patientsLoaded = true
        },
        [fetchPatients.rejected]: (state) => {
            state.isLoading = false
            state.hasError = true
        },
        [registerNewPatient.pending]: (state) => {
            state.patientRegging = true
        },
        [registerNewPatient.fulfilled]: (state, action) => {
            state.patientRegging = false
            state.patients.push(action.payload)
            state.patientRegged = true
        },
        [registerNewPatient.rejected]: (state) => {
            state.patientRegging = false
            state.hasError = true
        },
        [editExistingPatient.pending]: (state) => {
            state.patientEditing = true
        },
        [editExistingPatient.fulfilled]: (state, action) => {
            state.patientEditing = false
            console.log(action.payload)
            state.patients = state.patients.map((patient) => {
                if (patient._id.toString() === action.payload._id.toString()) {
                    return action.payload
                }
                return patient
            })
            state.patientEdited = true
        },
        [editExistingPatient.rejected]: (state) => {
            state.patientEditing = false
            state.hasError = true
        },
    },
})

export const { resetPatientReg, resetPatientEdit } = patientSlice.actions

export default patientSlice.reducer
