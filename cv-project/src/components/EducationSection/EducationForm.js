import { useEffect } from 'react'
import FormGroup from '../FormGroup/FormGroup'

const EducationForm = (props) => {

    useEffect(() => {
        return () => {
            if (props.cleanOnUnmount) {
                props.setStartEdit('');
                props.setEndEdit('');
                props.setSchoolNameEdit('');
                props.setDegreeEdit('');
            }
        }
    }, [])

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

export default EducationForm