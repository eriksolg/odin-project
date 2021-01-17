import React, { useState } from 'react'
import EducationRow from './EducationRow'
import EducationForm from './EducationForm'

const EducationSection = (props) => {

    const [startEdit, setStartEdit] = useState('');
    const [endEdit, setEndEdit] = useState('');
    const [schoolNameEdit, setSchoolNameEdit] = useState('');
    const [degreeEdit, setDegreeEdit] = useState('');
    let educationFormContent;
    let addNewEducationFormButtonContent;

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

    const deleteRow = (educationDataIndex)  => {
        props.setState(
            {
                educationData: props.educationData.filter((item, index) => educationDataIndex != index)
            }
        )
    }

    const educationRows = props.educationData.map((singleEducationData, index) =>
        <EducationRow
            educationData={singleEducationData}
            index={index}
            key={index}
            updateEducationData={updateEducationData.bind(this)}
            deleteRow={deleteRow.bind(this)} />
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

    if (props.educationFormOpen) {
        educationFormContent = (
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
        addNewEducationFormButtonContent = null;
    } else {
        educationFormContent = null;
        addNewEducationFormButtonContent = (
            <button className="btn btn-success" onClick={openEducationForm.bind(this)}>Add New</button>
        )
    }

    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title d-inline-block">Education</h3>
                <ul className="list-group list-group-flush card-columns">
                    {educationRows}
                </ul>
                {educationFormContent}
                {addNewEducationFormButtonContent}
            </div>
        </div >
    )

}

export default EducationSection