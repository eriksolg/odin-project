import { useState } from 'react'
import EditButton from './EditButton'
import FormGroup from './FormGroup'

const ProfessionalRow = (props) => {

    const [hover, setHover] = useState(false);
    const [editing, setEditing] = useState(false);
    const [startEdit, setStartEdit] = useState(props.professionalData.start);
    const [endEdit, setEndEdit] = useState(props.professionalData.end);
    const [companyNameEdit, setCompanyNameEdit] = useState(props.professionalData.companyName);
    const [professionEdit, setProfessionEdit] = useState(props.professionalData.profession);
    const [descriptionEdit, setDescriptionEdit] = useState(props.professionalData.description);


    const edit = () => {
        setEditing(true);
    }

    const submit = () => {
        setEditing(false);
        props.updateProfessionalData({
            start: startEdit,
            end: endEdit,
            companyName: companyNameEdit,
            profession: professionEdit,
            description: descriptionEdit
        }, props.index)
    }

    const getFullYear = (date) => {
        return new Date(date).getFullYear();
    }

    return (
        <li className="list-group-item hover-shade" key={props.professionalData.companyName}
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
                            name="companyName"
                            label="Company name"
                            origin={companyNameEdit}
                            type="text"
                            changeValue={setCompanyNameEdit.bind(this)} />

                        <FormGroup
                            name="profession"
                            label="Profession"
                            origin={professionEdit}
                            type="text"
                            changeValue={setProfessionEdit.bind(this)} />

                        <FormGroup
                            name="description"
                            label="Description"
                            origin={descriptionEdit}
                            type="text"
                            changeValue={setDescriptionEdit.bind(this)} />

                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                    :
                    <div className="row">

                        <div className="col-xl-3 text-nowrap">
                            <strong>{getFullYear(props.professionalData.start)}-{getFullYear(props.professionalData.end)}</strong>
                        </div>

                        <div className="col-xl-7 offset-xl-1">
                            <span>{props.professionalData.companyName}</span>
                            <span> </span>
                            <span className="text-muted">{props.professionalData.profession}</span>
                            <p className="text-justify">{props.professionalData.description}</p>
                        </div>

                        <div className="cosl-xl-1">
                            {hover && <EditButton edit={edit} />}
                        </div>
                    </div>
            }
        </li>
    )

}

const ProfessionalSection = (props) => {

    const updateProfessionalData = (singleProfessionalData, singleProfessionalDataIndex) => {
        props.setState(
            {
                professionalData: props.professionalData.map((educationItem, index) => {
                    if (index == singleProfessionalDataIndex) {
                        return singleProfessionalData;
                    }
                }),
            }
        )
    }

    const professionalRows = props.professionalData.map((singleProfessionalData, index) =>
        <ProfessionalRow
            professionalData={singleProfessionalData}
            index={index}
            updateProfessionalData={updateProfessionalData.bind(this)} />
    );

    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title d-inline-block">Professional</h3>
                <ul className="list-group list-group-flush card-columns">
                    {professionalRows}
                </ul>

            </div>
        </div >
    )
}

export default ProfessionalSection