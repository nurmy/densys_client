import React, { useState, useEffect, useRef } from 'react'
import { Outlet, useOutletContext, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Modal from './../../components/Modal/Modal'
import { format } from 'date-fns'
import { fetchBookings } from './../../features/bookSlice'
import { registerRequest, resetReg } from './../../features/requestSlice'

const BookingForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { setSearchState } = useOutletContext()

    const isLoading = useSelector((state) => state.book.isLoading)
    const booked = useSelector((state) => state.book.booked)
    const selectedSpec = useSelector((state) => state.book.selectedSpec)
    const selectedDoctor = useSelector((state) => state.book.selectedDoctor)
    const requests = useSelector((state) => state.request)

    const bookings = useSelector((state) => state.book.bookings)

    const authInfo = useSelector((state) => state.auth)

    const [datesModalActive, setDatesModalActive] = useState(false)
    const dates = useRef([])
    const hoursRange = useRef([])

    const controlFunc = (e, label, setFunc) => {
        setFunc((prev) => {
            const target = prev.find((field) => field.label === label)
            if (target.type === 'Number') {
                target.value = Number(e.target.value)
            } else {
                target.value = e.target.value
            }
            return [...prev]
        })
    }

    const [regFields, setRegFields] = useState([
        {
            label: 'first_name',
            name: 'First Name',
            value: '',
        },
        {
            label: 'last_name',
            value: '',
            name: 'Last Name',
        },
        {
            label: 'doctor_id',
            name: 'Doctor ID',
            value: selectedDoctor._id.toString(),
        },
        {
            label: 'book_time',
            name: 'Appointment Time',
            value: '',
        },
        {
            label: 'phone_number',
            name: 'Phone Number',
            value: '',
        },
        {
            label: 'address',
            name: 'Address',
            value: '',
        },
        {
            label: 'notes',
            name: 'Notes',
            value: '',
        },
    ])

    useEffect(() => {
        dates.current = []
        hoursRange.current = []
        let currDate = new Date(Date.now())
        let obj = {}
        for (let i = 0; i < 7; i++) {
            currDate.setDate(currDate.getDate() + 1)
            obj = {
                day: new Date(currDate),
                slots: [],
            }
            for (let j = 9; j < 18; j++) {
                currDate.setHours(j, 0, 0, 0)
                obj.slots.push({ time: new Date(currDate), booked: false })
            }
            dates.current.push(obj)
        }

        for (let i = 9; i < 18; i++) {
            hoursRange.current.push(i - 9)
        }
    })

    useEffect(() => {
        setSearchState('form')
        dispatch(
            fetchBookings({
                token: authInfo.token,
                attributes: {
                    doctor_id: selectedDoctor._id,
                },
            })
        )
    }, [])

    useEffect(() => {
        if (bookings.loaded) {
            for (let date of dates.current) {
                for (let slot of date.slots) {
                    const booking = bookings.data.find((book) => {
                        return (
                            new Date(book.book_time).getTime() ===
                            slot.time.getTime()
                        )
                    })
                    if (booking) {
                        slot.booked = true
                    }
                }
            }
        }
    }, [bookings])

    const handleDateSelection = () => {
        setDatesModalActive(true)
    }

    const selectDate = (date) => {
        setRegFields((prev) => {
            const temp = [...prev]
            temp.forEach((field) => {
                if (field.label === 'book_time') {
                    field.value = date
                }
            })
            return temp
        })
        setDatesModalActive(false)
    }

    const submitRequest = () => {
        const attributes = {}
        regFields.forEach((field) => {
            attributes[field.label] = field.value
        })
        console.log(attributes)
        dispatch(
            registerRequest({
                token: authInfo.token,
                attributes,
            })
        )
    }

    useEffect(() => {
        if (requests.regged) {
            dispatch(resetReg())
            navigate('/patient/book')
        }
    }, [requests])

    return (
        <div className="p-2">
            {datesModalActive && (
                <Modal
                    className="dates-modal"
                    active={datesModalActive}
                    setActive={setDatesModalActive}
                >
                    <table className="table table-bordered h-100">
                        <thead>
                            <tr>
                                {dates.current.map(({ day }) => (
                                    <th scope="col text-center">
                                        {format(day, 'MMM dd')}
                                        <br /> {format(day, 'EEE')}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="overflow-auto">
                            {hoursRange.current.map((i) => (
                                <tr key={i}>
                                    {dates.current.map((date) => (
                                        <td>
                                            <button
                                                className={
                                                    isLoading ||
                                                    date.slots[i].booked
                                                        ? 'btn btn-secondary disabled'
                                                        : 'btn btn-light'
                                                }
                                                onClick={() =>
                                                    selectDate(
                                                        date.slots[i].time
                                                    )
                                                }
                                            >
                                                {format(
                                                    date.slots[i].time,
                                                    'HH:mm'
                                                )}
                                            </button>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Modal>
            )}

            <div>
                {regFields
                    .filter(
                        (field) =>
                            field.label !== 'doctor_id' &&
                            field.label !== 'book_time'
                    )
                    .map((field) => (
                        <div class="form-group row mb-3" key={field.label}>
                            <label
                                for={field.label}
                                class="col-sm-2 col-form-label"
                            >
                                {field.name}
                            </label>
                            <div class="col-sm-10">
                                <input
                                    type="text"
                                    class="form-control"
                                    id={field.label}
                                    onChange={(e) =>
                                        controlFunc(
                                            e,
                                            field.label,
                                            setRegFields
                                        )
                                    }
                                />
                            </div>
                        </div>
                    ))}
                <div class="form-group row mb-3">
                    <label for="docName" class="col-sm-2 col-form-label">
                        Doctor Name
                    </label>
                    <div class="col-sm-10">
                        <input
                            type="text"
                            class="form-control"
                            id="docName"
                            value={`${selectedDoctor.first_name} ${selectedDoctor.last_name}`}
                            disabled
                        />
                    </div>
                </div>
                <div class="form-group row mb-3">
                    <label for="spec" class="col-sm-2 col-form-label">
                        Specialization
                    </label>
                    <div class="col-sm-10">
                        <input
                            type="text"
                            class="form-control"
                            id="spec"
                            value={selectedSpec.name}
                            disabled
                        />
                    </div>
                </div>
                <div class="form-group row mb-3">
                    <label
                        for="appoitnmentDateS"
                        class="col-sm-2 col-form-label"
                    >
                        Preferred Date
                    </label>
                    <div class="col-sm-10">
                        <div className="data-wrapper d-flex">
                            <div className="flex-basis-0 flex-grow-9 me-3">
                                <input
                                    type="text"
                                    className="form-control w-100"
                                    id="appoitnmentDateS"
                                    value="No date selected"
                                    disabled
                                />
                            </div>
                            <div className="flex-basis-0 flex-grow-3">
                                <button
                                    className="btn btn-light w-100"
                                    onClick={handleDateSelection}
                                >
                                    Select date
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary" onClick={submitRequest}>
                    Submit
                </button>
            </div>
        </div>
    )
}

export default BookingForm
