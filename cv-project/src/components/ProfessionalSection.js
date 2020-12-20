import { useState } from 'react'
import EditButton from './EditButton'
import FormGroup from './FormGroup'

const ProfessionalRow = () => {

    const [hover, setHover] = useState(false);
    const [editing, setEditing] = useState(false);
    const [start, setStart] = useState('2017-01-01');
    const [end, setEnd] = useState('2019-01-01');
    const [companyName, setCompanyName] = useState('AS Pets ja Pojad');
    const [profession, setProfession] = useState('AD haldur');
    const [description, setDescription] = useState('Tegin seda ja toda');
    const [startEdit, setStartEdit] = useState(start);
    const [endEdit, setEndEdit] = useState(end);
    const [companyNameEdit, setCompanyNameEdit] = useState(companyName);
    const [professionEdit, setProfessionEdit] = useState(profession);
    const [descriptionEdit, setDescriptionEdit] = useState(description);


    const edit = () => {
        setEditing(true);
    }

    const submit = () => {
        setEditing(false);
        setStart(startEdit);
        setEnd(endEdit);
        setCompanyName(companyNameEdit);
        setProfession(professionEdit);
        setDescription(descriptionEdit)
    }

    const getFullYear = (date) => {
        return new Date(date).getFullYear();
    }

    return (
        <li className="list-group-item hover-shade" key={companyName}
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
                            <strong>{getFullYear(start)}-{getFullYear(end)}</strong>
                        </div>

                        <div className="col-xl-7 offset-xl-1">
                            <span>{companyName}</span>
                            <span> </span>
                            <span className="text-muted">{profession}</span>
                            <p className="text-justify">{description}</p>
                        </div>

                        <div className="cosl-xl-1">
                            {hover && <EditButton edit={edit} />}
                        </div>
                    </div>
            }
        </li>
    )

}

const ProfessionalSection = () => {
    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title d-inline-block">Professional</h3>
                <ul className="list-group list-group-flush card-columns">
                    <ProfessionalRow />
                    <ProfessionalRow />
                    <ProfessionalRow />
                </ul>

            </div>
        </div >
    )
}

export default ProfessionalSection