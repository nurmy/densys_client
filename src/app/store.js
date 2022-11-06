import { configureStore } from '@reduxjs/toolkit'

import authReducer from './../features/authSlice'
import doctorReducer from './../features/doctorSlice'
import patientReducer from './../features/patientSlice'
import uploadReducer from './../features/uploadSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        doctor: doctorReducer,
        patient: patientReducer,
        upload: uploadReducer,
    },
})

export default store
