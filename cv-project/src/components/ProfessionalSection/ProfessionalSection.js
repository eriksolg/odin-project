import { useState } from 'react'
import ProfessionalRow from './ProfessionalRow'
import ProfessionalForm from './ProfessionalForm'

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

    const deleteRow = (professionalDataIndex)  => {
        props.setState(
            {
                professionalData: props.professionalData.filter((item, index) => professionalDataIndex != index)
            }
        )
    }


    const professionalRows = props.professionalData.map((singleProfessionalData, index) =>
        <ProfessionalRow
            professionalData={singleProfessionalData}
            index={index}
            key={index}
            updateProfessionalData={updateProfessionalData.bind(this)}
            deleteRow={deleteRow.bind(this)} />
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
                cleanOnUnmount='true'
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
                </ul>
                {professionalFormContent}
                {addNewProfessionalFormButtonContent}
            </div>
        </div >
    )
}

export default ProfessionalSection