import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { login } from './../../features/authSlice'

import './LoginPage.css'

const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const state = useSelector((state) => state.auth)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login({ username, password }))
    }

    useEffect(() => {
        if (state.isLoading) {
            btnRef.current.disabled = true
        } else {
            btnRef.current.disabled = false
        }
        if (state.authenticated) {
            navigate('/admin')
        }
    }, [state])

    const btnRef = useRef(null)

    return (
        <div className="login-form-wrapper">
            <div className="login-form">
                <form>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={handleSubmit}
                        ref={btnRef}
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
