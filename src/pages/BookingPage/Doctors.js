import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    useOutletContext,
    useNavigate,
    useLocation,
    useParams,
} from 'react-router-dom'
import {
    fetchDoctors,
    setDoctor,
    resetSearch,
    countAllDoctors,
} from './../../features/bookSlice'

import './Doctors.css'

const Doctors = () => {
    const authInfo = useSelector((state) => state.auth)
    const doctors = useSelector((state) => state.book.doctors)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const search = useSelector((state) => state.book.doctors.search)
    const count = useSelector((state) => state.book.doctors.count)

    const location = useLocation()
    const { spec_id } = useParams()
    const [page, setPage] = useState(1)

    const { setSearchState } = useOutletContext()

    useEffect(() => {
        setSearchState('doctors')
        dispatch(
            countAllDoctors({
                token: authInfo.token,
                attributes: {
                    spec_id,
                    search: search,
                },
            })
        )
        dispatch(
            fetchDoctors({
                token: authInfo.token,
                attributes: {
                    spec_id,
                    page: page,
                    limit: 7,
                    search: search,
                },
            })
        )
    }, [])

    useEffect(() => {
        dispatch(
            fetchDoctors({
                token: authInfo.token,
                attributes: {
                    spec_id,
                    page: page,
                    limit: 7,
                    search: search,
                },
            })
        )
    }, [page])

    useEffect(() => {
        setPage(1)
        dispatch(
            countAllDoctors({
                token: authInfo.token,
                attributes: {
                    spec_id,
                    search: search,
                },
            })
        )
        dispatch(
            fetchDoctors({
                token: authInfo.token,
                attributes: {
                    spec_id,
                    page: page,
                    limit: 7,
                    search: search,
                },
            })
        )
    }, [search])

    const selectDoctor = (doctor) => {
        dispatch(setDoctor(doctor))
        dispatch(resetSearch())
        navigate(`${location.pathname}/${doctor._id}`)
    }

    return (
        <div>
            <div className="content h-80 overflow-hidden">
                {doctors.loaded ? (
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">First name</th>
                                <th scope="col">Last name</th>
                                <th scope="col">Degree</th>
                                <th scope="col">Rating</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody className="overflow-auto">
                            {doctors.data.map((doctor) => (
                                <tr key={doctor._id}>
                                    <td className="">
                                        <div className="photo-wrapper me-0">
                                            <img
                                                src={doctor.photo_url}
                                                alt=""
                                                className="photo"
                                            />
                                        </div>
                                    </td>
                                    <td>{doctor.first_name}</td>
                                    <td>{doctor.last_name}</td>
                                    <td>{doctor.degree}</td>
                                    <td>{doctor.rating}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => selectDoctor(doctor)}
                                        >
                                            Book
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div>Loading</div>
                )}
            </div>
            <nav aria-label="" className="mb-3">
                <ul className="pagination">
                    <li className="page-item">
                        <button
                            href="#"
                            className={
                                page === 1 ? 'page-link disabled' : 'page-link'
                            }
                            onClick={() => setPage((prev) => prev - 1)}
                        >
                            Previous
                        </button>
                    </li>
                    {Array.from(
                        { length: Math.ceil(count / 7) },
                        (_, i) => i + 1
                    ).map((i) => (
                        <li className="page-item">
                            <button
                                href="#"
                                className={
                                    page === i
                                        ? 'page-link active'
                                        : 'page-link'
                                }
                                onClick={() => setPage(i)}
                            >
                                {i}
                            </button>
                        </li>
                    ))}
                    <li className="page-item">
                        <button
                            href="#"
                            className={
                                page === Math.ceil(count / 7)
                                    ? 'page-link disabled'
                                    : 'page-link'
                            }
                            onClick={() => setPage((prev) => prev + 1)}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Doctors
