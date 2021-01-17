import { useState } from 'react'
import EditButton from './EditButton'
import FormGroup from './FormGroup'

const ProfessionalForm = (props) => {
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

const ProfessionalRow = (props) => {

    const [hover, setHover] = useState(false);
    const [editing, setEditing] = useState(false);
    const [startEdit, setStartEdit] = useState(props.professionalData.start);
    const [endEdit, setEndEdit] = useState(props.professionalData.end);
    const [companyNameEdit, setCompanyNameEdit] = useState(props.professionalData.companyName);
    const [professionEdit, setProfessionEdit] = useState(props.professionalData.profession);
    const [descriptionEdit, setDescriptionEdit] = useState(props.professionalData.description);
    let professionalRowContent;

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


    if (editing) {
        professionalRowContent = (
            <ProfessionalForm 
                startEdit={startEdit}
                endEdit={endEdit}
                companyNameEdit={companyNameEdit}
                professionEdit={professionEdit}
                descriptionEdit={descriptionEdit}
                setStartEdit={setStartEdit}
                setEndEdit={setEndEdit}
                setCompanyNameEdit={setCompanyNameEdit}
                setProfessionEdit={setProfessionEdit}
                setDescriptionEdit={setDescriptionEdit}
                submit={submit}
            />
        )
    } else {
        professionalRowContent = (
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
        )
    }

    return (
        <li className="list-group-item hover-shade" key={props.professionalData.companyName}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {professionalRowContent}
        </li>
    )
}

const ProfessionalSection = (props) => {

    const [startEdit, setStartEdit] = useState('');
    const [endEdit, setEndEdit] = useState('');
    const [companyNameEdit, setCompanyNameEdit] = useState('');
    const [professionEdit, setProfessionEdit] = useState('');
    const [descriptionEdit, setDescriptionEdit] = useState('');
    let professionalFormContent;
    let addNewProfessionalFormButtonContent;

    const updateProfessionalData = (singleProfessionalData, singleProfessionalDataIndex) => {
        props.setState(
            {
                professionalData: props.professionalData.map((professionalItem, index) => {
                    if (index === singleProfessionalDataIndex) {
                        return singleProfessionalData;
                    }
                    return professionalItem;
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

    const openProfessionalForm = () => {
        props.setState({
            professionalFormOpen: true
        })
    }


    const submit = () => {
        props.setState(prevState => ({
            professionalFormOpen: false,
            professionalData: [...prevState.professionalData,
                {
                    start: startEdit,
                    end: endEdit,
                    companyName: companyNameEdit,
                    profession: professionEdit,
                    description: descriptionEdit,
                }]
        }));

    }

    if (props.professionalFormOpen) {
        professionalFormContent = (
            <ProfessionalForm 
                startEdit={startEdit}
                endEdit={endEdit}
                companyNameEdit={companyNameEdit}
                professionEdit={professionEdit}
                descriptionEdit={descriptionEdit}
                setStartEdit={setStartEdit}
                setEndEdit={setEndEdit}
                setCompanyNameEdit={setCompanyNameEdit}
                setProfessionEdit={setProfessionEdit}
                setDescriptionEdit={setDescriptionEdit}
                submit={submit}
            />
        )
        addNewProfessionalFormButtonContent = null;
    } else {
        professionalFormContent = null;
        addNewProfessionalFormButtonContent = (
            <button className="btn btn-success" onClick={openProfessionalForm.bind(this)}>Add New</button>
        )
    }

    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title d-inline-block">Professional</h3>
                <ul className="list-group list-group-flush card-columns">
                    {professionalRows}
                    {professionalFormContent}
                </ul>
                {addNewProfessionalFormButtonContent}
            </div>
        </div >
    )
}

export default ProfessionalSection