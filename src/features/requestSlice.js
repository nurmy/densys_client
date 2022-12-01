import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    createRequest,
    fetchAllRequests,
    deleteRequest,
} from '../api/requestAPI'

export const registerRequest = createAsyncThunk(
    'request/registerRequest',
    async ({ token, attributes }, thunkAPI) => {
        try {
            const data = await createRequest(token, attributes)
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

export const fetchRequests = createAsyncThunk(
    'request/fetchRequests',
    async (token, thunkAPI) => {
        try {
            const data = await fetchAllRequests(token)
            if (data.error) {
                return thunkAPI.rejectWithValue(data.error)
            }
            console.log(data)
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue('Failed to authenticate')
        }
    }
)

export const removeRequest = createAsyncThunk(
    'request/removeRequest',
    async ({ token, attributes }, thunkAPI) => {
        try {
            const data = await deleteRequest(token, attributes)
            if (data.error) {
                return thunkAPI.rejectWithValue(data.error)
            }
            console.log(data)
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue('Failed to authenticate')
        }
    }
)

const requestSlice = createSlice({
    name: 'request',
    initialState: {
        loaded: false,
        hasError: false,
        isLoading: false,
        data: [],
        regged: false,
        regging: false,
        deleting: false,
        deleted: false,
    },
    reducers: {
        resetReg: (state) => {
            state.regged = false
            state.hasError = false
            state.regging = false
        },
        resetDelete: (state) => {
            state.deleted = false
            state.hasError = false
            state.deleting = false
        },
    },
    extraReducers: {
        [registerRequest.pending]: (state) => {
            state.regging = true
        },
        [registerRequest.fulfilled]: (state) => {
            state.regging = false
            state.regged = true
        },
        [registerRequest.rejected]: (state) => {
            state.regging = false
            state.hasError = true
        },
        [removeRequest.pending]: (state) => {
            state.deleting = true
        },
        [removeRequest.fulfilled]: (state, action) => {
            state.deleting = false
            state.deleted = true
            state.data = state.data.filter(
                (req) => req._id !== action.payload._id
            )
        },
        [removeRequest.rejected]: (state) => {
            state.deleting = false
            state.hasError = true
        },
        [fetchRequests.pending]: (state) => {
            state.isLoading = true
        },
        [fetchRequests.fulfilled]: (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.loaded = true
        },
        [fetchRequests.rejected]: (state) => {
            state.isLoading = false
            state.hasError = true
        },
    },
})

export const { resetReg, resetDelete } = requestSlice.actions

export default requestSlice.reducer
