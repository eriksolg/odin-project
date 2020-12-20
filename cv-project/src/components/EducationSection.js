import React, { useState } from 'react'
import EditButton from './EditButton'
import FormGroup from './FormGroup'

const EducationRow = () => {

    const [hover, setHover] = useState(false);
    const [editing, setEditing] = useState(false);
    const [start, setStart] = useState('2016-01-01');
    const [end, setEnd] = useState('2019-01-01');
    const [schoolName, setSchoolName] = useState('Miina Härma Gümnaasium');
    const [degree, setDegree] = useState('Keskharidus');
    const [startEdit, setStartEdit] = useState(start);
    const [endEdit, setEndEdit] = useState(end);
    const [schoolNameEdit, setSchoolNameEdit] = useState(schoolName);
    const [degreeEdit, setDegreeEdit] = useState(degree);

    const edit = () => {
        setEditing(true);
    }

    const submit = () => {
        setEditing(false);
        setStart(startEdit);
        setEnd(endEdit);
        setSchoolName(schoolNameEdit);
        setDegree(degreeEdit);
    }

    const getFullYear = (date) => {
        return new Date(date).getFullYear();
    }

    return (
        <li className="list-group-item hover-shade" key={schoolName}
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
                            <strong>{getFullYear(start)}-{getFullYear(end)}</strong>
                        </div>

                        <div className="col-xl-7 offset-xl-1">
                            <span>{schoolName}</span>
                            <span> </span>
                            <span className="text-muted">{degree}</span>
                        </div>

                        <div className="cosl-xl-1">
                            {hover && <EditButton edit={edit} />}
                        </div>

                    </div>
            }
        </li>
    )

}


const EducationSection = () => {

    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title d-inline-block">Education</h3>

                <ul className="list-group list-group-flush card-columns">

                    <EducationRow />
                    <EducationRow />
                    <EducationRow />

                </ul>

            </div>
        </div >
    )

}

export default EducationSection