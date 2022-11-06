import { Navbar, Group, Code, ScrollArea, createStyles } from '@mantine/core'
import { IconGauge, IconTable } from '@tabler/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from './../../features/authSlice'

const Sidebar = () => {
    const [active, setActive] = useState('dashboard')
    const user_info = useSelector((state) => {
        return { username: state.auth.username, role: state.auth.role }
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logOut = () => {
        dispatch(logout())
        navigate('/login')
    }
    return (
        <div
            className="d-flex flex-column flex-shrink-0 p-3 bg-light"
            style={{ width: '280px' }}
        >
            <Link
                to="/admin"
                className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
            >
                <span className="fs-4">DenSys</span>
            </Link>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li
                    className="nav-item"
                    onClick={() => {
                        setActive('dashboard')
                    }}
                >
                    <Link
                        to="/admin"
                        className={
                            active === 'dashboard'
                                ? 'nav-link active'
                                : 'nav-link link-dark'
                        }
                        aria-current="page"
                    >
                        Dashboard
                    </Link>
                </li>
                <li
                    className="nav-item"
                    onClick={() => {
                        setActive('doctors')
                    }}
                >
                    <Link
                        to="/admin/doctors"
                        className={
                            active === 'doctors'
                                ? 'nav-link active'
                                : 'nav-link link-dark'
                        }
                    >
                        Doctors
                    </Link>
                </li>
                <li
                    className="nav-item"
                    onClick={() => {
                        setActive('patients')
                    }}
                >
                    <Link
                        to="/admin/patients"
                        className={
                            active === 'patients'
                                ? 'nav-link active'
                                : 'nav-link link-dark'
                        }
                    >
                        Patients
                    </Link>
                </li>
            </ul>
            <hr />
            <div className="dropdown">
                <div
                    className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
                    id="dropdownUser2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <strong>{user_info.username}</strong>
                </div>
                <ul
                    className="dropdown-menu text-small shadow"
                    aria-labelledby="dropdownUser2"
                >
                    <li>
                        <button
                            className="dropdown-item"
                            onClick={() => logOut()}
                        >
                            Log out
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
