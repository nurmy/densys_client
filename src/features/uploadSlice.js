import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { upload } from './../api/uploadAPI'

export const uploadPhoto = createAsyncThunk(
    'upload/uploadPhoto',
    async ({ file, token }, thunkAPI) => {
        try {
            const data = await upload(file, token)
            if (data.error) {
                thunkAPI.rejectWithValue(data.error)
            }
            return data
        } catch (err) {
            thunkAPI.rejectWithValue('Failed to authenticate')
        }
    }
)

const uploadSlice = createSlice({
    name: 'upload',
    initialState: {
        isLoading: false,
        hasError: false,
        url: null,
    },
    reducers: {
        resetUpload: (state) => {
            state.isLoading = false
            state.hasError = false
            state.url = null
        },
    },
    extraReducers: {
        [uploadPhoto.pending]: (state) => {
            state.isLoading = true
        },
        [uploadPhoto.fulfilled]: (state, action) => {
            state.isLoading = false
            state.url = action.payload.photoUrl
        },
        [uploadPhoto.rejected]: (state) => {
            state.isLoading = false
            state.hasError = true
        },
    },
})

export const { resetUpload } = uploadSlice.actions

export default uploadSlice.reducer
