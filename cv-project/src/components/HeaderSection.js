import React, { useEffect, useState } from 'react'
import EditButton from './EditButton'
import FormGroup from './FormGroup'


const HeaderSection = (props) => {

    const [editing, setEditing] = useState(false);
    const [hover, setHover] = useState(false);
    const [firstNameEdit, setFirstNameEdit] = useState(props.firstName);
    const [lastNameEdit, setLastNameEdit] = useState(props.lastName);
    const [professionEdit, setProfessionEdit] = useState(props.profession);
    let headerContent;

    const edit = () => {
        setEditing(true);
    }

    const submit = () => {
        setEditing(false);
        props.setState(
            {
                firstName: firstNameEdit,
                lastName: lastNameEdit,
                profession: professionEdit
            }
        )
    }


    if (editing) {
        headerContent = (
            <form onSubmit={submit.bind(this)}>
                <FormGroup
                    name="firstName"
                    label="First name"
                    origin={firstNameEdit}
                    type="text"
                    changeValue={setFirstNameEdit.bind(this)} />

                <FormGroup
                    name="lastName"
                    label="Last name"
                    origin={lastNameEdit}
                    type="text"
                    changeValue={setLastNameEdit.bind(this)} />


                <FormGroup
                    name="occupation"
                    label="Occuptation"
                    origin={professionEdit}
                    type="text"
                    changeValue={setProfessionEdit.bind(this)} />

                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        )
    } else {
        headerContent = (
            <header className="hover-shade"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <h1 className="d-inline-block">{props.firstName} {props.lastName}</h1>
                {hover ? <EditButton edit={edit} /> : null}
                <h3 className="text-muted">{props.profession}</h3>
            </header >
        )
    }


    return headerContent
}

export default HeaderSection