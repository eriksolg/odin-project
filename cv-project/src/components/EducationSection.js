import React, { useState } from 'react'
import EditButton from './EditButton'
import FormGroup from './FormGroup'

const EducationRow = (props) => {

    const [hover, setHover] = useState(false);
    const [editing, setEditing] = useState(false);
    const [startEdit, setStartEdit] = useState(props.educationData.start);
    const [endEdit, setEndEdit] = useState(props.educationData.end);
    const [schoolNameEdit, setSchoolNameEdit] = useState(props.educationData.schoolName);
    const [degreeEdit, setDegreeEdit] = useState(props.educationData.degree);

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

    return (
        <li className="list-group-item hover-shade" key={props.educationData.schoolName}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {
                editing ?
                    <form onSubmit={submit.bind(this)}>

                        <FormGroup
                            name="start"
                            label="Start"
                            origin={startEdit}
                            type="date"
                            changeValue={setStartEdit.bind(this)} />

                        <FormGroup
                            name="end"
                            label="End"
                            origin={endEdit}
                            type="date"
                            changeValue={setEndEdit.bind(this)} />

                        <FormGroup
                            name="schoolName"
                            label="School name"
                            origin={schoolNameEdit}
                            type="text"
                            changeValue={setSchoolNameEdit.bind(this)} />

                        <FormGroup
                            name="degree"
                            label="Degree"
                            origin={degreeEdit}
                            type="text"
                            changeValue={setDegreeEdit.bind(this)} />

                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                    :
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
                            {hover && <EditButton edit={edit} />}
                        </div>

                    </div>
            }
        </li>
    )

}


const EducationSection = (props) => {

    const updateEducationData = (singleEducationData, singleEducationDataIndex) => {
        props.setState(
            {
                educationData: props.educationData.map((educationItem, index) => {
                    if (index == singleEducationDataIndex) {
                        return singleEducationData;
                    }
                }),
            }
        )
    }

    const educationRows = props.educationData.map((singleEducationData, index) =>
        <EducationRow
            educationData={singleEducationData}
            index={index}
            updateEducationData={updateEducationData.bind(this)} />
    );
    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title d-inline-block">Education</h3>

                <ul className="list-group list-group-flush card-columns">
                    {educationRows}
                </ul>

            </div>
        </div >
    )

}

export default EducationSection