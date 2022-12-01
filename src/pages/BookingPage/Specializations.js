import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useOutletContext, useNavigate, useLocation } from 'react-router-dom'
import {
    fetchSpecs,
    setSpec,
    resetSearch,
    countAllSpecs,
} from './../../features/bookSlice'

const Specializations = () => {
    const authInfo = useSelector((state) => state.auth)
    const specs = useSelector((state) => state.book.specs)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const search = useSelector((state) => state.book.specs.search)
    const count = useSelector((state) => state.book.specs.count)

    const location = useLocation()
    const [page, setPage] = useState(1)

    const { setSearchState } = useOutletContext()

    useEffect(() => {
        setSearchState('specializations')
        dispatch(
            countAllSpecs({
                token: authInfo.token,
                attributes: {
                    search: search,
                },
            })
        )
        dispatch(
            fetchSpecs({
                token: authInfo.token,
                attributes: {
                    page: page,
                    limit: 8,
                    search: search,
                },
            })
        )
    }, [])

    useEffect(() => {
        setSearchState('specializations')
        dispatch(
            fetchSpecs({
                token: authInfo.token,
                attributes: {
                    page: page,
                    limit: 8,
                    search: search,
                },
            })
        )
    }, [page])

    useEffect(() => {
        setPage(1)
        dispatch(
            countAllSpecs({
                token: authInfo.token,
                attributes: {
                    search: search,
                },
            })
        )
        dispatch(
            fetchSpecs({
                token: authInfo.token,
                attributes: {
                    page: page,
                    limit: 8,
                    search: search,
                },
            })
        )
    }, [search])

    const selectSpec = (spec) => {
        dispatch(setSpec(spec))
        dispatch(resetSearch())
        navigate(`${location.pathname}/${spec._id}`)
    }

    return (
        <div>
            <div className="content h-80 overflow-hidden">
                {specs.loaded ? (
                    <div className="wrapper">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody className="overflow-auto">
                                {specs.data.map((spec) => (
                                    <tr key={spec._id}>
                                        <td>{spec.name}</td>
                                        <td>{spec.description}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => selectSpec(spec)}
                                            >
                                                Select
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>Loading</div>
                )}
            </div>
            <div className="mb-3">
                <nav aria-label="" className="mb-5">
                    <ul className="pagination">
                        <li className="page-item">
                            <button
                                href="#"
                                className={
                                    page === 1
                                        ? 'page-link disabled'
                                        : 'page-link'
                                }
                                onClick={() => setPage((prev) => prev - 1)}
                            >
                                Previous
                            </button>
                        </li>
                        {Array.from(
                            { length: Math.ceil(count / 8) },
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
                                    page === Math.ceil(count / 8)
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
        </div>
    )
}

export default Specializations
