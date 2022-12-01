import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    fetchRequests,
    removeRequest,
    resetDelete,
} from '../../features/requestSlice'
import { bookAppointment, resetBook } from '../../features/bookSlice'
import Modal from '../../components/Modal/Modal'
import { format } from 'date-fns'

// import './PatientsPage.css'

const RequestsPage = () => {
    const requests = useSelector((state) => state.request)
    const bookings = useSelector((state) => state.book)
    const authInfo = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchRequests(authInfo.token))
    }, [])

    const [viewModalActive, setViewModalActive] = useState(false)

    const [viewFields, setViewFields] = useState([
        {
            label: '_id',
            name: 'Request ID',
            value: '',
        },
        {
            label: 'first_name',
            name: "Patient's First Name",
            value: '',
        },
        {
            label: 'last_name',
            value: '',
            name: "Patient's Last Name",
        },
        {
            label: 'doctor_id',
            name: 'Doctor ID',
            value: '',
        },
        {
            label: 'book_time',
            name: 'Appointment Time',
            value: '',
        },
        {
            label: 'phone_number',
            name: "Patient's Phone Number",
            value: '',
        },
        {
            label: 'address',
            name: "Patient's Address",
            value: '',
        },
        {
            label: 'notes',
            name: "Patient's Notes",
            value: '',
        },
    ])

    const focus = useRef(null)

    const handleView = (request) => {
        console.log(viewFields)
        focus.current = request
        setViewFields((prev) =>
            prev.map((field) => {
                return {
                    ...field,
                    value: request[field.label],
                }
            })
        )
        setViewModalActive(true)
    }

    const handleReg = () => {
        const obj = {
            token: authInfo.token,
            attributes: {},
        }
        viewFields.forEach((field) => {
            if (field.label === 'doctor_id') {
                obj.attributes[field.label] = field.value._id
            } else {
                obj.attributes[field.label] = field.value
            }
        })
        dispatch(bookAppointment(obj))
    }

    const handleReject = () => {
        const req_id = viewFields.find((field) => field.label === '_id').value
        dispatch(
            removeRequest({
                token: authInfo.token,
                attributes: {
                    id: req_id,
                },
            })
        )
    }

    useEffect(() => {
        if (bookings.booked) {
            dispatch(resetBook())
            const req_id = viewFields.find(
                (field) => field.label === '_id'
            ).value
            dispatch(
                removeRequest({
                    token: authInfo.token,
                    attributes: {
                        id: req_id,
                    },
                })
            )
        }
    }, [bookings])

    useEffect(() => {
        if (requests.deleted) {
            dispatch(resetDelete())
            setViewModalActive(false)
        }
    }, [requests])

    return (
        <div className="wrapper">
            {viewModalActive && (
                <Modal
                    className="view"
                    active={viewModalActive}
                    setActive={setViewModalActive}
                >
                    <div className="wrapper">
                        {viewFields.map((field) => {
                            return (
                                <div className="mb-3 row" key={field.label}>
                                    <label
                                        for={field.label}
                                        className="col-sm-4 col-form-label"
                                    >
                                        {field.name}
                                    </label>
                                    <div className="col-sm-8">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={field.label}
                                            disabled
                                            onChange={() => {}}
                                            value={
                                                field.label === 'doctor_id'
                                                    ? field.value._id
                                                    : field.value
                                            }
                                        />
                                    </div>
                                </div>
                            )
                        })}
                        <div className="d-flex">
                            <button
                                className="btn btn-primary me-3"
                                onClick={() => handleReg()}
                            >
                                Approve
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={() => handleReject()}
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
            <div className="d-flex flex-column flex-shrink-0 p-3">
                <div className="d-flex w-100 justify-content-between align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    <span className="fs-4">Requests List</span>
                </div>
                <hr />
                <div className="content h-100 overflow-hidden">
                    {requests.loaded ? (
                        <table className="table table-hover h-100">
                            <thead>
                                <tr>
                                    <th scope="col">Patient's Name</th>
                                    <th scope="col">Doctor's Name</th>
                                    <th scope="col">Appointment Time</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody className="overflow-auto">
                                {requests.data.map((request) => (
                                    <tr key={request._id}>
                                        <td>{`${request.first_name} ${request.last_name}`}</td>
                                        <td>{`${request.doctor_id.first_name} ${request.doctor_id.last_name}`}</td>
                                        <td>
                                            {format(
                                                new Date(request.book_time),
                                                "MMMM dd, yyyy 'at' HH:mm"
                                            )}
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-light"
                                                onClick={() =>
                                                    handleView(request)
                                                }
                                            >
                                                View
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
            </div>
        </div>
    )
}

export default RequestsPage
