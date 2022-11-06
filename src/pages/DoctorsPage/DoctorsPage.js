import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    fetchDoctors,
    registerNewDoctor,
    editExistingDoctor,
    resetDoctorReg,
    resetDoctorEdit,
} from './../../features/doctorSlice'
import { uploadPhoto, resetUpload } from './../../features/uploadSlice'
import Modal from './../../components/Modal/Modal'

import './DoctorsPage.css'

const DoctorsPage = () => {
    const doctorsInfo = useSelector((state) => {
        return {
            doctors: state.doctor.doctors,
            loaded: state.doctor.doctorsLoaded,
            doctorRegging: state.doctor.doctorRegging,
            doctorRegged: state.doctor.doctorRegged,
            doctorEditing: state.doctor.doctorEditing,
            doctorEdited: state.doctor.doctorEdited,
        }
    })
    const authInfo = useSelector((state) => state.auth)
    const uploadInfo = useSelector((state) => state.upload)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchDoctors(authInfo.token))
    }, [])

    useEffect(() => {
        if (doctorsInfo.doctorRegged) {
            dispatch(resetDoctorReg())
            setRegisterModalActive(false)
            setRegFields((prev) =>
                prev.map((field) => {
                    return {
                        ...field,
                        value: '',
                    }
                })
            )
        }
        if (doctorsInfo.doctorEdited) {
            dispatch(resetDoctorEdit())
            setEditModalActive(false)
            setEditFields((prev) =>
                prev.map((field) => {
                    return {
                        ...field,
                        value: '',
                    }
                })
            )
        }
    }, [doctorsInfo])

    const [viewModalActive, setViewModalActive] = useState(false)
    const [editModalActive, setEditModalActive] = useState(false)
    const [registerModalActive, setRegisterModalActive] = useState(false)

    const [regFields, setRegFields] = useState([
        {
            label: 'first_name',
            name: 'First Name',
            required: true,
            value: '',
        },
        {
            label: 'last_name',
            required: true,
            value: '',
            name: 'Last Name',
        },
        {
            label: 'middle_name',
            name: 'Middle Name',
            required: true,
            value: '',
        },
        {
            required: true,
            label: 'iin',
            value: '',
            name: 'IIN',
        },
        {
            label: 'national_id_number',
            required: true,
            value: '',
            name: 'National ID number',
        },
        {
            label: 'date_of_birth',
            value: '',
            required: true,
            format: 'date',
            name: 'Date of birth',
        },
        {
            label: 'photo_url',
            required: true,
            name: 'Photo URL',
            format: 'file',
            value: '',
        },
        {
            required: true,
            label: 'department_id',
            name: 'Department ID',
            value: '',
        },
        {
            label: 'spec_id',
            required: true,
            name: 'Specialization ID',
            value: '',
        },
        {
            label: 'contact_number',
            value: '',
            name: 'Contact Number',
            required: true,
        },
        {
            label: 'experience',
            value: '',
            name: 'Experience',
            required: true,
            type: 'Number',
        },
        {
            label: 'category',
            required: true,
            value: '',
            name: 'Category',
        },
        {
            label: 'appointment_price',
            value: '',
            name: 'Price of appointment',
            required: true,
            type: 'Number',
        },
        {
            label: 'schedule',
            required: true,
            name: 'Schedule details',
            value: '',
        },
        {
            label: 'rating',
            value: '',
            required: true,
            name: 'Rating',
            type: 'Number',
        },
        {
            label: 'address',
            value: '',
            required: true,
            name: 'Address',
        },
        {
            label: 'degree',
            required: true,
            value: '',
            name: 'Degree',
        },
        {
            label: 'homepage_url',
            required: false,
            value: '',
            name: 'Homepage URL',
        },
    ])

    const [editFields, setEditFields] = useState([
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
            label: 'middle_name',
            name: 'Middle Name',
            value: '',
        },
        {
            label: 'iin',
            value: '',
            name: 'IIN',
        },
        {
            label: 'national_id_number',
            value: '',
            name: 'National ID number',
        },
        {
            label: 'date_of_birth',
            value: '',
            format: 'date',
            name: 'Date of birth',
        },
        {
            label: 'photo_url',
            name: 'Photo URL',
            format: 'file',
            value: '',
        },
        {
            label: 'department_id',
            name: 'Department ID',
            value: '',
        },
        {
            label: 'spec_id',
            name: 'Specialization ID',
            value: '',
        },
        {
            label: 'contact_number',
            value: '',
            name: 'Contact Number',
        },
        {
            label: 'experience',
            value: '',
            name: 'Experience',
            type: 'Number',
        },
        {
            label: 'category',
            value: '',
            name: 'Category',
        },
        {
            label: 'appointment_price',
            value: '',
            name: 'Price of appointment',
            type: 'Number',
        },
        {
            label: 'schedule',
            name: 'Schedule details',
            value: '',
        },
        {
            label: 'rating',
            value: '',
            name: 'Rating',
            type: 'Number',
        },
        {
            label: 'address',
            value: '',
            name: 'Address',
        },
        {
            label: 'degree',
            value: '',
            name: 'Degree',
        },
        {
            label: 'homepage_url',
            value: '',
            name: 'Homepage URL',
        },
    ])

    const [currentModal, setCurrentModal] = useState(null)

    const focus = useRef(null)
    const regBtnRef = useRef(null)

    const [fileEncoded, setFileEncoded] = useState(null)

    useEffect(() => {
        if (uploadInfo.url) {
            if (currentModal === 'reg') {
                setRegFields((prev) =>
                    prev.map((field) => {
                        if (field.format === 'file') {
                            return {
                                ...field,
                                file: uploadInfo.url,
                            }
                        }
                        return field
                    })
                )
            } else if (currentModal === 'edit') {
                setEditFields((prev) =>
                    prev.map((field) => {
                        if (field.format === 'file') {
                            return {
                                ...field,
                                file: uploadInfo.url,
                            }
                        }
                        return field
                    })
                )
            }
            dispatch(resetUpload())
        }
    }, [uploadInfo])

    useEffect(() => {
        if (fileEncoded) {
            dispatch(uploadPhoto({ file: fileEncoded, token: authInfo.token }))
        }
    }, [fileEncoded])

    const handleView = (doctor) => {
        focus.current = doctor
        setCurrentModal('view')
        setEditFields((prev) =>
            prev.map((field) => {
                return {
                    ...field,
                    value: doctor[field.label],
                }
            })
        )
        setViewModalActive(true)
    }

    const handleEdit = (doctor) => {
        focus.current = doctor
        setCurrentModal('edit')
        setEditFields((prev) =>
            prev.map((field) => {
                return {
                    ...field,
                    value: field.format === 'file' ? '' : doctor[field.label],
                }
            })
        )
        // console.log(editFields)
        setEditModalActive(true)
    }

    const handleRegister = () => {
        setCurrentModal('reg')
        setRegisterModalActive(true)
    }

    const register = (regFields) => {
        const attributes = {}
        regFields.forEach((field) => {
            if (field.value) {
                if (field.format === 'file') {
                    attributes[field.label] = field.file
                } else {
                    attributes[field.label] = field.value
                }
            }
        })
        dispatch(
            registerNewDoctor({
                token: authInfo.token,
                attributes,
            })
        )
    }

    const edit = (editFields, target) => {
        const attributes = {}
        editFields.forEach((field) => {
            if (field.format === 'file') {
                if (field.file) {
                    attributes[field.label] = field.file
                }
            } else {
                if (field.value !== target[field.label]) {
                    attributes[field.label] = field.value
                }
            }
        })
        attributes.user_id = target.user_id._id
        dispatch(
            editExistingDoctor({
                token: authInfo.token,
                attributes,
            })
        )
    }

    async function readFileAsDataURL(setFunc, file) {
        let fileReader = new FileReader()
        fileReader.onload = (e) => {
            setFunc(fileReader.result)
        }
        fileReader.readAsDataURL(file)
    }

    const controlFunc = (e, label, setFunc, state) => {
        setFunc((prev) => {
            const target = prev.find((field) => field.label === label)
            if (target.type === 'Number') {
                target.value = Number(e.target.value)
            } else if (target.format === 'file') {
                target.value = e.target.value
                readFileAsDataURL(setFileEncoded, e.target.files[0])
            } else {
                target.value = e.target.value
            }
            return [...prev]
        })
    }

    return (
        <div className="wrapper">
            {currentModal === 'reg' ? (
                <Modal
                    className="register"
                    active={registerModalActive}
                    setActive={setRegisterModalActive}
                >
                    <form>
                        {regFields.map((field) => {
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
                                            type={field.format || 'text'}
                                            className="form-control"
                                            required={field.required}
                                            id={field.label}
                                            onChange={(e) => {
                                                controlFunc(
                                                    e,
                                                    field.label,
                                                    setRegFields,
                                                    regFields
                                                )
                                            }}
                                            value={field.value}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                        <button
                            type="button"
                            className={
                                doctorsInfo.doctorRegging
                                    ? 'btn btn-primary disabled'
                                    : 'btn btn-primary'
                            }
                            onClick={(e) => {
                                register(regFields)
                            }}
                            ref={regBtnRef}
                        >
                            Register
                        </button>
                    </form>
                </Modal>
            ) : currentModal === 'edit' ? (
                <Modal
                    className="edit"
                    active={editModalActive}
                    setActive={setEditModalActive}
                >
                    {editFields.map((field) => {
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
                                        type={field.format || 'text'}
                                        className="form-control"
                                        id={field.label}
                                        onChange={(e) => {
                                            controlFunc(
                                                e,
                                                field.label,
                                                setEditFields,
                                                editFields
                                            )
                                        }}
                                        value={
                                            field.format === 'date'
                                                ? field.value
                                                      .toString()
                                                      .slice(0, 10)
                                                : field.value
                                        }
                                    />
                                </div>
                            </div>
                        )
                    })}
                    <button
                        type="button"
                        className={'btn btn-primary'}
                        onClick={() => {
                            edit(editFields, focus.current)
                        }}
                        ref={regBtnRef}
                    >
                        Edit
                    </button>
                </Modal>
            ) : currentModal === 'view' ? (
                <Modal
                    className="view"
                    active={viewModalActive}
                    setActive={setViewModalActive}
                >
                    {editFields.map((field) => {
                        return (
                            <div className="mb-3 row" key={field.label}>
                                <label
                                    for={field.label}
                                    className="col-sm-4 col-form-label"
                                >
                                    {field.name}
                                </label>
                                <div className="col-sm-8">
                                    {field.format === 'file' ? (
                                        <img
                                            src={field.value}
                                            alt="..."
                                            className="img-thumbnail"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={field.label}
                                            disabled
                                            onChange={() => {}}
                                            value={field.value.toString()}
                                        />
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </Modal>
            ) : (
                <></>
            )}
            <div className="d-flex flex-column flex-shrink-0 p-3">
                <div className="d-flex w-100 justify-content-between align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    <span className="fs-4">Doctors List</span>
                    <button
                        type="button"
                        className="btn btn-primary "
                        onClick={() => handleRegister()}
                    >
                        + New doctor
                    </button>
                </div>
                <hr />
                <div className="content h-100 overflow-hidden">
                    {doctorsInfo.loaded ? (
                        <table className="table table-hover h-100">
                            <thead>
                                <tr>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Middle Name</th>
                                    <th scope="col">Username</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody className="overflow-auto">
                                {doctorsInfo.doctors.map((doctor) => (
                                    <tr key={doctor._id}>
                                        <td>{doctor.first_name}</td>
                                        <td>{doctor.last_name}</td>
                                        <td>{doctor.middle_name}</td>
                                        <td>{doctor.user_id.username}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-light"
                                                onClick={() =>
                                                    handleView(doctor)
                                                }
                                            >
                                                View
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-light"
                                                onClick={() =>
                                                    handleEdit(doctor)
                                                }
                                            >
                                                Edit
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

export default DoctorsPage
