import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import LoginPage from '../pages/LoginPage/LoginPage'
import AdminPage from '../pages/AdminPage/AdminPage'
import DoctorsPage from '../pages/DoctorsPage/DoctorsPage'
import PatientsPage from '../pages/PatientsPage/PatientsPage'
import SidebarLayout from '../components/SidebarLayout/SidebarLayout'

function App() {
    const authState = useSelector((state) => state.auth)
    return (
        <Routes>
            <Route path="/">
                <Route
                    path="admin"
                    element={
                        authState.role === 'admin' ? <SidebarLayout /> : <></>
                    }
                >
                    <Route index element={<AdminPage />}></Route>
                    <Route path="doctors" element={<DoctorsPage />}></Route>
                    <Route path="patients" element={<PatientsPage />}></Route>
                </Route>
                <Route path="login" element={<LoginPage />}></Route>
            </Route>
        </Routes>
    )
}

export default App
