import { useState } from 'react'
import EditButton from './EditButton'
import FormGroup from './FormGroup'

const GeneralSection = (props) => {

    const [editing, setEditing] = useState(false);
    const [hover, setHover] = useState(false);
    const [addressEdit, setAddressEdit] = useState(props.address);
    const [phoneEdit, setPhoneEdit] = useState(props.phone);
    const [birthEdit, setBirthEdit] = useState(props.birth);
    const [emailEdit, setEmailEdit] = useState(props.email);
    let generalContent;

    const edit = () => {
        setEditing(true);
    }

    const submit = () => {
        setEditing(false);
        props.setState(
            {
                address: addressEdit,
                phone: phoneEdit,
                birth: birthEdit,
                email: emailEdit,
            }
        )
    }


    if (editing) {
        generalContent = (
            <form onSubmit={submit.bind(this)}>
                <FormGroup
                    name="address"
                    label="Address"
                    origin={addressEdit}
                    type="text"
                    changeValue={setAddressEdit.bind(this)} />

                <FormGroup
                    name="phone"
                    label="Phone"
                    origin={phoneEdit}
                    type="tel"
                    changeValue={setPhoneEdit.bind(this)} />

                <FormGroup
                    name="birth"
                    label="Birth"
                    origin={birthEdit}
                    type="date"
                    changeValue={setBirthEdit.bind(this)} />

                <FormGroup
                    name="email"
                    label="E-mail"
                    origin={emailEdit}
                    type="email"
                    changeValue={setEmailEdit.bind(this)} />

                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        )
    } else {
        generalContent = (
            <dl className="row list-group list-group-flush card-columns">
                <li className="list-group-item">
                    <div className="row">
                        <div className="col-xl-6">
                            <dt className="col-xl-3 text-nowrap d-inline-block">Address: </dt>
                            <dd className="col-xl-8 offset-xl-1 float-right text-xl-right">{props.address}</dd>
                        </div>
                        <div className="col-xl-6">
                            <dt className="col-xl-3 text-nowrap d-inline-block">Phone: </dt>
                            <dd className="col-xl-8 offset-xl-1 float-right text-xl-right">{props.phone}</dd>
                        </div>
                    </div>
                </li>
                <li className="list-group-item">
                    <div className="row">
                        <div className="col-xl-6">
                            <dt className="col-xl-3 text-nowrap d-inline-block">Birth: </dt>
                            <dd className="col-xl-8 offset-xl-1 float-right text-xl-right">{props.birth}</dd>
                        </div>
                        <div className="col-xl-6">
                            <dt className="col-xl-3 text-nowrap d-inline-block">E-mail: </dt>
                            <dd className="col-xl-8 offset-xl-1 float-right text-xl-right">{props.email}</dd>
                        </div>
                    </div>
                </li>
            </dl>
        )
    }

    return (
        <div className="card hover-shade"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className="card-body">
                <h3 className="card-title d-inline-block">General Info</h3>
                {hover && !editing && <EditButton edit={edit} />}
                {generalContent}
            </div>
        </div >
    )

}

export default GeneralSection