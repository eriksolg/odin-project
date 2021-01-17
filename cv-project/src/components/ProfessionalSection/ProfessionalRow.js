import React, { useState } from 'react'
import EditButton from '../Buttons/EditButton'
import DeleteButton from '../Buttons/DeleteButton'
import ProfessionalForm from './ProfessionalForm'

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
            {professionalRowContent}
        </li>
    )
}

export default ProfessionalRow