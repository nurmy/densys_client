import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import LoginPage from '../pages/LoginPage/LoginPage'
import AdminPage from '../pages/AdminPage/AdminPage'
import DoctorsPage from '../pages/DoctorsPage/DoctorsPage'
import PatientsPage from '../pages/PatientsPage/PatientsPage'
import RequestsPage from '../pages/RequestsPage/RequestsPage'
import BookingPage from '../pages/BookingPage/BookingPage'
import Specializations from '../pages/BookingPage/Specializations'
import Doctors from '../pages/BookingPage/Doctors'
import BookingForm from '../pages/BookingPage/BookingForm'
import SidebarLayout from '../components/SidebarLayout/SidebarLayout'

function App() {
    const authState = useSelector((state) => state.auth)
    return (
        <Routes>
            <Route path="/">
                <Route
                    path="admin"
                    element={
                        authState.role === 'admin' ? (
                            <SidebarLayout role="admin" />
                        ) : (
                            <></>
                        )
                    }
                >
                    <Route index element={<AdminPage />}></Route>
                    <Route path="doctors" element={<DoctorsPage />}></Route>
                    <Route path="patients" element={<PatientsPage />}></Route>
                    <Route path="requests" element={<RequestsPage />}></Route>
                </Route>
                <Route
                    path="patient"
                    element={
                        authState.role === 'patient' ? (
                            <SidebarLayout role="patient" />
                        ) : (
                            <></>
                        )
                    }
                >
                    <Route index element={<AdminPage />}></Route>
                    <Route path="book" element={<BookingPage />}>
                        <Route index element={<Specializations />}></Route>
                        <Route path=":spec_id" element={<Doctors />}></Route>
                        <Route
                            path=":spec_id/:doctor_id"
                            element={<BookingForm />}
                        ></Route>
                    </Route>
                </Route>
                <Route path="login" element={<LoginPage />}></Route>
            </Route>
        </Routes>
    )
}

export default App
