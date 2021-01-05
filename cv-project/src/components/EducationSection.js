import React, { useState } from 'react'
import EditButton from './EditButton'
import FormGroup from './FormGroup'

const EducationForm = (props) => {
    return (
        <form onSubmit={props.submit.bind(this)}>

            <FormGroup
                name="start"
                label="Start"
                origin={props.startEdit}
                type="date"
                changeValue={props.setStartEdit.bind(this)} />

            <FormGroup
                name="end"
                label="End"
                origin={props.endEdit}
                type="date"
                changeValue={props.setEndEdit.bind(this)} />

            <FormGroup
                name="schoolName"
                label="School name"
                origin={props.schoolNameEdit}
                type="text"
                changeValue={props.setSchoolNameEdit.bind(this)} />

            <FormGroup
                name="degree"
                label="Degree"
                origin={props.degreeEdit}
                type="text"
                changeValue={props.setDegreeEdit.bind(this)} />

        <button type="submit" className="btn btn-success">Submit</button>
    </form>
    )
}

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

    const [startEdit, setStartEdit] = useState('');
    const [endEdit, setEndEdit] = useState('');
    const [schoolNameEdit, setSchoolNameEdit] = useState('');
    const [degreeEdit, setDegreeEdit] = useState('');

    const updateEducationData = (singleEducationData, singleEducationDataIndex) => {
        props.setState(
            {
                educationData: props.educationData.map((educationItem, index) => {
                    if (index === singleEducationDataIndex) {
                        return singleEducationData;
                    }
                    return educationItem;
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

    const openEducationForm = () => {
        props.setState({
            educationFormOpen: true
        })
    }

    const submit = () => {
        props.setState(prevState => ({
            educationFormOpen: false,
            educationData: [...prevState.educationData,
                {
                    start: startEdit,
                    end: endEdit,
                    schoolName: schoolNameEdit,
                    degree: degreeEdit
                }]
        }));

    }

    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title d-inline-block">Education</h3>
                <ul className="list-group list-group-flush card-columns">
                    {educationRows}
                    {
                        props.educationFormOpen ?

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
                        :
                        null
                    }
                </ul>
                {
                    props.educationFormOpen ?
                    null
                    :
                    <button className="btn btn-success" onClick={openEducationForm.bind(this)}>Add New</button>
                }
            </div>
        </div >
    )

}

export default EducationSection