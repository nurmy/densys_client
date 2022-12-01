import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    fetchSpecDoctors,
    countDoctors,
    fetchAllDoctors,
} from '../api/doctorAPI'
import { fetchAllSpecs, countSpecs } from '../api/specAPI'
import { createBooking, fetchAllBookings } from '../api/bookingAPI'

export const fetchSpecs = createAsyncThunk(
    'book/fetchSpecs',
    async ({ token, attributes }, thunkAPI) => {
        try {
            const data = await fetchAllSpecs(token, attributes)
            if (data.error) {
                return thunkAPI.rejectWithValue(data.error)
            }
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue('Failed to authenticate')
        }
    }
)

export const countAllSpecs = createAsyncThunk(
    'book/countAllSpecs',
    async ({ token, attributes }, thunkAPI) => {
        try {
            const data = await countSpecs(token, attributes)
            if (data.error) {
                return thunkAPI.rejectWithValue(data.error)
            }
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue('Failed to authenticate')
        }
    }
)

export const countAllDoctors = createAsyncThunk(
    'book/countAllDoctors',
    async ({ token, attributes }, thunkAPI) => {
        try {
            const data = await countDoctors(token, attributes)
            if (data.error) {
                return thunkAPI.rejectWithValue(data.error)
            }
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue('Failed to authenticate')
        }
    }
)

export const fetchDoctors = createAsyncThunk(
    'book/fetchDoctors',
    async ({ token, attributes }, thunkAPI) => {
        try {
            const data = await fetchSpecDoctors(token, attributes)
            if (data.error) {
                return thunkAPI.rejectWithValue(data.error)
            }
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue('Failed to authenticate')
        }
    }
)

export const bookAppointment = createAsyncThunk(
    'book/bookAppointment',
    async ({ token, attributes }, thunkAPI) => {
        try {
            const data = await createBooking(token, attributes)
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

export const fetchBookings = createAsyncThunk(
    'book/fetchBookings',
    async ({ token, attributes }, thunkAPI) => {
        try {
            const data = await fetchAllBookings(token, attributes)
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

export const setSpecAuto = createAsyncThunk(
    'book/setSpecAuto',
    async ({ token, attributes }, thunkAPI) => {
        try {
            const data = await fetchAllSpecs(token, attributes)
            if (data.error) {
                return thunkAPI.rejectWithValue(data.error)
            }
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue('Failed to authenticate')
        }
    }
)

export const setDocAuto = createAsyncThunk(
    'book/setDocAuto',
    async ({ token, attributes }, thunkAPI) => {
        try {
            const data = await fetchSpecDoctors(token, attributes)
            if (data.error) {
                return thunkAPI.rejectWithValue(data.error)
            }
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue('Failed to authenticate')
        }
    }
)

const bookSlice = createSlice({
    name: 'book',
    initialState: {
        specs: {
            isLoading: false,
            loaded: false,
            hasError: false,
            data: [],
            search: '',
            auto: [],
            autoLoaded: false,
            autoLoading: false,
            count: 0,
        },
        doctors: {
            loaded: false,
            isLoading: false,
            hasError: false,
            data: [],
            search: '',
            auto: [],
            autoLoaded: false,
            autoLoading: false,
            count: 0,
        },
        bookings: {
            loaded: false,
            isLoading: false,
            hasError: false,
            data: [],
        },
        selectedSpec: null,
        selectedDoctor: null,
        booked: false,
        hasError: false,
        isLoading: false,
    },
    reducers: {
        setSpec: (state, action) => {
            state.selectedSpec = action.payload
        },
        setDoctor: (state, action) => {
            state.selectedDoctor = action.payload
        },
        resetBook: (state) => {
            state.booked = false
            state.hasError = false
            state.isLoading = false
        },
        setSpecSearch: (state, action) => {
            state.specs.search = action.payload
        },
        setDocSearch: (state, action) => {
            state.doctors.search = action.payload
        },
        resetSearch: (state) => {
            state.doctors.search = ''
            state.specs.search = ''
        },
        resetSpecAuto: (state) => {
            state.specs.auto = []
            state.specs.autoLoaded = false
            state.specs.autoLoading = false
        },
    },
    extraReducers: {
        [fetchDoctors.pending]: (state) => {
            state.doctors.isLoading = true
        },
        [fetchDoctors.fulfilled]: (state, action) => {
            state.doctors.isLoading = false
            state.doctors.data = action.payload
            state.doctors.loaded = true
        },
        [fetchDoctors.rejected]: (state) => {
            state.doctors.isLoading = false
            state.doctors.hasError = true
        },
        [countAllDoctors.pending]: (state) => {},
        [countAllDoctors.fulfilled]: (state, action) => {
            state.doctors.count = action.payload
        },
        [countAllDoctors.rejected]: (state) => {
            state.doctors.hasError = true
        },
        [fetchSpecs.pending]: (state) => {
            state.specs.isLoading = true
        },
        [fetchSpecs.fulfilled]: (state, action) => {
            state.specs.isLoading = false
            state.specs.data = action.payload
            state.specs.loaded = true
        },
        [fetchSpecs.rejected]: (state) => {
            state.specs.isLoading = false
            state.specs.hasError = true
        },
        [countAllSpecs.pending]: (state) => {},
        [countAllSpecs.fulfilled]: (state, action) => {
            state.specs.count = action.payload
        },
        [countAllSpecs.rejected]: (state) => {
            state.specs.hasError = true
        },
        [setSpecAuto.pending]: (state) => {
            state.specs.autoLoading = true
        },
        [setSpecAuto.fulfilled]: (state, action) => {
            state.specs.autoLoading = false
            state.specs.auto = action.payload
            state.specs.autoLoaded = true
        },
        [setSpecAuto.rejected]: (state) => {
            state.specs.autoLoading = false
            state.specs.hasError = true
        },
        [bookAppointment.pending]: (state) => {
            state.isLoading = true
        },
        [bookAppointment.fulfilled]: (state) => {
            state.isLoading = false
            state.booked = true
            state.loaded = true
        },
        [bookAppointment.rejected]: (state) => {
            state.isLoading = false
            state.hasError = true
        },
        [fetchBookings.pending]: (state) => {
            state.bookings.isLoading = true
        },
        [fetchBookings.fulfilled]: (state, action) => {
            state.bookings.isLoading = false
            state.bookings.data = action.payload
            state.bookings.loaded = true
        },
        [fetchBookings.rejected]: (state) => {
            state.bookings.isLoading = false
            state.bookings.hasError = true
        },
        [setDocAuto.pending]: (state) => {
            state.doctors.autoLoading = true
        },
        [setDocAuto.fulfilled]: (state, action) => {
            state.doctors.autoLoading = false
            state.doctors.auto = action.payload
            state.doctors.autoLoaded = true
        },
        [setDocAuto.rejected]: (state) => {
            state.doctors.autoLoading = false
            state.doctors.hasError = true
        },
    },
})

export const {
    setSpec,
    setDoctor,
    resetBook,
    setDocSearch,
    setSpecSearch,
    resetSearch,
    resetSpecAuto,
} = bookSlice.actions

export default bookSlice.reducer
