import { useEffect } from 'react'
import FormGroup from '../FormGroup/FormGroup'

const ProfessionalForm = (props) => {

    useEffect(() => {
        return () => {
            if (props.cleanOnUnmount) {
                props.setStartEdit('');
                props.setEndEdit('');
                props.setCompanyNameEdit('');
                props.setProfessionEdit('');
                props.setDescriptionEdit('');
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
                required="true"
                changeValue={props.setStartEdit.bind(this)} />

            <FormGroup
                name="end"
                label="End"
                origin={props.endEdit}
                type="date"
                required="true"
                changeValue={props.setEndEdit.bind(this)} />

            <FormGroup
                name="companyName"
                label="Company name"
                origin={props.companyNameEdit}
                type="text"
                changeValue={props.setCompanyNameEdit.bind(this)} />

            <FormGroup
                name="profession"
                label="Profession"
                origin={props.professionEdit}
                type="text"
                changeValue={props.setProfessionEdit.bind(this)} />

            <FormGroup
                name="description"
                label="Description"
                origin={props.descriptionEdit}
                type="text"
                changeValue={props.setDescriptionEdit.bind(this)} />

            <button type="submit" className="btn btn-success">Submit</button>
        </form>
    )
}

export default ProfessionalForm