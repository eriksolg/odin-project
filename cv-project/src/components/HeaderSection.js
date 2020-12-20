import React, { useEffect, useState } from 'react'
import EditButton from './EditButton'
import FormGroup from './FormGroup'


const HeaderSection = () => {

    const [editing, setEditing] = useState(false);
    const [hover, setHover] = useState(false);
    const [firstName, setFirstName] = useState('Michelangelo');
    const [lastName, setLastName] = useState('Crisostomus');
    const [profession, setProfession] = useState('IT-specialist');
    const [firstNameEdit, setFirstNameEdit] = useState(firstName);
    const [lastNameEdit, setLastNameEdit] = useState(lastName);
    const [professionEdit, setProfessionEdit] = useState(profession);


    const edit = () => {
        setEditing(true);
    }

    const submit = () => {
        setEditing(false);
        setFirstName(firstNameEdit);
        setLastName(lastNameEdit);
        setProfession(professionEdit);
    }

    return (
        editing ?
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
            :
            <header className="hover-shade"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <h1 className="d-inline-block">{firstName} {lastName}</h1>
                {hover ? <EditButton edit={edit} /> : null}
                <h3 className="text-muted">{profession}</h3>
            </header >
    )

}

export default HeaderSection