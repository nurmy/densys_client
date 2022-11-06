import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    fetchPatients,
    registerNewPatient,
    editExistingPatient,
    resetPatientReg,
    resetPatientEdit,
} from './../../features/patientSlice'
import Modal from './../../components/Modal/Modal'

import './PatientsPage.css'

const PatientsPage = () => {
    const patientsInfo = useSelector((state) => {
        return {
            patients: state.patient.patients,
            loaded: state.patient.patientsLoaded,
            patientRegging: state.patient.patientRegging,
            patientRegged: state.patient.patientRegged,
            patientEditing: state.patient.patientEditing,
            patientEdited: state.patient.patientEdited,
        }
    })
    const authInfo = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPatients(authInfo.token))
    }, [])

    useEffect(() => {
        if (patientsInfo.patientRegged) {
            dispatch(resetPatientReg())
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
        if (patientsInfo.patientEdited) {
            dispatch(resetPatientEdit())
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
    }, [patientsInfo])

    const [viewModalActive, setViewModalActive] = useState(false)
    const [editModalActive, setEditModalActive] = useState(false)
    const [registerModalActive, setRegisterModalActive] = useState(false)

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
            label: 'email',
            value: '',
            name: 'Email',
        },
        {
            label: 'contact_number',
            value: '',
            name: 'Contact Number',
        },
        {
            label: 'emergency_contact',
            value: '',
            name: 'Emergency Contact Number',
        },
        {
            label: 'address',
            value: '',
            name: 'Address',
        },
        {
            label: 'blood_group',
            value: '',
            name: 'Blood group',
        },
        {
            label: 'marital_status',
            value: '',
            name: 'Marital status',
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
            label: 'email',
            value: '',
            name: 'Email',
        },
        {
            label: 'contact_number',
            value: '',
            name: 'Contact Number',
        },
        {
            label: 'emergency_contact',
            value: '',
            name: 'Emergency Contact Number',
        },
        {
            label: 'address',
            value: '',
            name: 'Address',
        },
        {
            label: 'blood_group',
            value: '',
            name: 'Blood group',
        },
        {
            label: 'marital_status',
            value: '',
            name: 'Marital status',
        },
    ])

    const [viewFields, setViewFields] = useState([
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
            name: 'Date of birth',
        },
        {
            label: 'email',
            value: '',
            name: 'Email',
        },
        {
            label: 'contact_number',
            value: '',
            name: 'Contact Number',
        },
        {
            label: 'emergency_contact',
            value: '',
            name: 'Emergency Contact Number',
        },
        {
            label: 'address',
            value: '',
            name: 'Address',
        },
        {
            label: 'blood_group',
            value: '',
            name: 'Blood group',
        },
        {
            label: 'marital_status',
            value: '',
            name: 'Marital status',
        },
        {
            label: 'registration_date',
            value: '',
            name: 'Registration date',
        },
    ])

    const [currentModal, setCurrentModal] = useState(null)

    const focus = useRef(null)
    const regBtnRef = useRef(null)

    const handleView = (patient) => {
        focus.current = patient
        setCurrentModal('view')
        setViewFields((prev) =>
            prev.map((field) => {
                return {
                    ...field,
                    value: patient[field.label],
                }
            })
        )
        setViewModalActive(true)
    }

    const handleEdit = (patient) => {
        focus.current = patient
        setCurrentModal('edit')
        setEditFields((prev) =>
            prev.map((field) => {
                return {
                    ...field,
                    value: patient[field.label],
                }
            })
        )
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
                attributes[field.label] = field.value
            }
        })
        dispatch(
            registerNewPatient({
                token: authInfo.token,
                attributes,
            })
        )
    }

    const edit = (editFields, target) => {
        const attributes = {}
        editFields.forEach((field) => {
            if (field.value !== target[field.label]) {
                attributes[field.label] = field.value
            }
        })
        attributes.user_id = target.user_id._id
        dispatch(
            editExistingPatient({
                token: authInfo.token,
                attributes,
            })
        )
    }

    const controlFunc = (e, label, setFunc, state) => {
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

    return (
        <div className="wrapper">
            {currentModal === 'reg' ? (
                <Modal
                    className="register"
                    active={registerModalActive}
                    setActive={setRegisterModalActive}
                >
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
                            patientsInfo.doctorRegging
                                ? 'btn btn-primary disabled'
                                : 'btn btn-primary'
                        }
                        onClick={() => register(regFields)}
                        ref={regBtnRef}
                    >
                        Register
                    </button>
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
                                        value={field.value.toString()}
                                    />
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
                    <span className="fs-4">Patients List</span>
                    <button
                        type="button"
                        className="btn btn-primary "
                        onClick={() => handleRegister()}
                    >
                        + New patient
                    </button>
                </div>
                <hr />
                <div className="content h-100 overflow-hidden">
                    {patientsInfo.loaded ? (
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
                                {patientsInfo.patients.map((patient) => (
                                    <tr key={patient._id}>
                                        <td>{patient.first_name}</td>
                                        <td>{patient.last_name}</td>
                                        <td>{patient.middle_name}</td>
                                        <td>{patient.user_id.username}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-light"
                                                onClick={() =>
                                                    handleView(patient)
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
                                                    handleEdit(patient)
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

export default PatientsPage
