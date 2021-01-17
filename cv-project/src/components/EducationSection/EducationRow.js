import React, { useState } from 'react'
import EditButton from '../Buttons/EditButton'
import DeleteButton from '../Buttons/DeleteButton'
import EducationForm from './EducationForm'

const EducationRow = (props) => {

    const [hover, setHover] = useState(false);
    const [editing, setEditing] = useState(false);
    const [startEdit, setStartEdit] = useState(props.educationData.start);
    const [endEdit, setEndEdit] = useState(props.educationData.end);
    const [schoolNameEdit, setSchoolNameEdit] = useState(props.educationData.schoolName);
    const [degreeEdit, setDegreeEdit] = useState(props.educationData.degree);
    let educationRowContent;

    const edit = () => {
        setEditing(true);
    }

    const submit = () => {
        setEditing(false);
        props.updateEducationData({
            start: startEdit,
            end: endEdit,
            schoolName: schoolNameEdit,
            degree: degreeEdit,
        }, props.index)
    }

    const getFullYear = (date) => {
        return new Date(date).getFullYear();
    }

    if (editing) {
        educationRowContent = (
                <EducationForm 
                        startEdit={startEdit}
                        endEdit={endEdit}
                        schoolNameEdit={schoolNameEdit}
                        degreeEdit={degreeEdit}
                        setStartEdit={setStartEdit}
                        setEndEdit={setEndEdit}
                        setSchoolNameEdit={setSchoolNameEdit}
                        setDegreeEdit={setDegreeEdit}
                        submit={submit}
                    />
        )
    } else {
        educationRowContent = (
            <div className="row">
                <div className="col-xl-3 text-nowrap">
                    <strong>{getFullYear(props.educationData.start)}-{getFullYear(props.educationData.end)}</strong>
                </div>
                <div className="col-xl-7 offset-xl-1">
                    <span>{props.educationData.schoolName}</span>
                    <span> </span>
                    <span className="text-muted">{props.educationData.degree}</span>
                </div>
                <div className="cosl-xl-1">
                    {hover && <DeleteButton delete={props.deleteRow.bind(this, props.index)} />}
                    {hover && <EditButton edit={edit} />}
                </div>
            </div>
        )
    }

    return (
        <li className="list-group-item hover-shade"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {educationRowContent}
        </li>
    )

}

export default EducationRow