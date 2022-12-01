import React, { useState, useEffect, useRef } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    setSpecSearch,
    setDocSearch,
    setSpecAuto,
    setDocAuto,
    resetSpecAuto,
} from './../../features/bookSlice'

const BookingPage = () => {
    const [searchState, setSearchState] = useState('specializations')
    const [searchField, setSearchField] = useState('')
    const [focus, setFocus] = useState(false)

    const dispatch = useDispatch()

    const { spec_id } = useParams()

    const specSearch = useSelector((state) => state.book.specs.search)
    const doctorSearch = useSelector((state) => state.book.doctors.search)
    const specAuto = useSelector((state) => state.book.specs.auto)
    const doctorAuto = useSelector((state) => state.book.doctors.auto)
    const authInfo = useSelector((state) => state.auth)

    useEffect(() => {
        if (searchState === 'specializations') {
            setSearchField(specSearch)
        } else if (searchState === 'doctors') {
            setSearchField(doctorSearch)
        }
    }, [searchState])

    const handleChange = (e) => {
        setSearchField((prev) => e.target.value)
        if (searchState === 'specializations') {
            if (e.target.value.length > 0) {
                // dispatch(resetSpecAuto())
                dispatch(
                    setSpecAuto({
                        token: authInfo.token,
                        attributes: {
                            page: 1,
                            limit: 10,
                            search: e.target.value,
                        },
                    })
                )
            }
        } else if (searchState === 'doctors') {
            setSearchField((prev) => e.target.value)
            if (e.target.value.length > 0) {
                // dispatch(resetSpecAuto())
                dispatch(
                    setDocAuto({
                        token: authInfo.token,
                        attributes: {
                            spec_id,
                            page: 1,
                            limit: 10,
                            search: e.target.value,
                        },
                    })
                )
            }
        }
    }
    const handleSearch = () => {
        if (searchState === 'specializations') {
            dispatch(setSpecSearch(searchField))
        } else if (searchState === 'doctors') {
            dispatch(setDocSearch(searchField))
        }
    }

    const handleClick = (e) => {
        console.log('haha')
        setSearchField('haha')
    }

    return (
        <div className="booking-wrapper p-3 d-flex flex-column w-100">
            <div className="mb-3">
                <span className="fs-4">Book appointment</span>
            </div>
            {searchState !== 'form' && (
                <div className="search">
                    <div className="inp form-group d-flex mb-3 flex-row w-100">
                        <input
                            type="text"
                            className="form-control flex-grow-9 me-2"
                            placeholder={`Search ${searchState}...`}
                            onChange={handleChange}
                            value={searchField}
                            onFocus={() => setFocus(true)}
                            onBlur={() => setFocus(false)}
                        />
                        <button
                            className="search-btn btn btn-primary flex-grow-3"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                    {focus && searchField.length > 0 && (
                        <div
                            className={'position-relative'}
                            style={{
                                top: '-10px',
                            }}
                        >
                            <div
                                className={
                                    'auto-wrapper position-absolute form-group d-flex mb-3 flex-row w-100'
                                }
                            >
                                <div
                                    className={'list-group me-2'}
                                    style={{
                                        // position: 'absolute',
                                        zIndex: 100,
                                        flexGrow: 9,
                                    }}
                                >
                                    {searchState === 'specializations'
                                        ? specAuto.map((elm) => (
                                              <button
                                                  key={elm._id}
                                                  className="list-group-item list-group-item-action"
                                                  onClick={handleClick}
                                                  style={{
                                                      pointerEvents: 'all',
                                                  }}
                                              >
                                                  {elm.name}
                                              </button>
                                          ))
                                        : doctorAuto.map((elm) => (
                                              <button
                                                  key={elm._id}
                                                  className="list-group-item list-group-item-action"
                                                  onClick={handleClick}
                                                  style={{
                                                      pointerEvents: 'all',
                                                  }}
                                              >
                                                  {`${elm.first_name} ${elm.last_name}`}
                                              </button>
                                          ))}
                                </div>
                                <button className="flex-grow-3 btn btn-primary invisible">
                                    Search
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <Outlet context={{ setSearchState }} />
        </div>
    )
}

export default BookingPage
