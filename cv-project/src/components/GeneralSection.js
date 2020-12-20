import { useState } from 'react'
import EditButton from './EditButton'
import FormGroup from './FormGroup'

const GeneralSection = () => {

    const [editing, setEditing] = useState(false);
    const [hover, setHover] = useState(false);
    const [address, setAddress] = useState('My Address 25, Jõhvi, Estonia');
    const [phone, setPhone] = useState('+372 12345678');
    const [birth, setBirth] = useState('1991-11-11');
    const [email, setEmail] = useState('my.email@gmail.com');
    const [addressEdit, setAddressEdit] = useState(address);
    const [phoneEdit, setPhoneEdit] = useState(phone);
    const [birthEdit, setBirthEdit] = useState(birth);
    const [emailEdit, setEmailEdit] = useState(email);

    const edit = () => {
        setEditing(true);
    }

    const submit = () => {
        setEditing(false);
        setAddress(addressEdit);
        setPhone(phoneEdit);
        setBirth(birthEdit);
        setEmail(emailEdit);
    }

    return (
        <div className="card hover-shade"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className="card-body">
                <h3 className="card-title d-inline-block">General Info</h3>
                {hover && !editing && <EditButton edit={edit} />}
                {
                    editing ?
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
                        :
                        <dl className="row list-group list-group-flush card-columns">
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-xl-6">
                                        <dt className="col-xl-3 text-nowrap d-inline-block">Address: </dt>
                                        <dd className="col-xl-8 offset-xl-1 float-right text-xl-right">{address}</dd>
                                    </div>
                                    <div className="col-xl-6">
                                        <dt className="col-xl-3 text-nowrap d-inline-block">Phone: </dt>
                                        <dd className="col-xl-8 offset-xl-1 float-right text-xl-right">{phone}</dd>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-xl-6">
                                        <dt className="col-xl-3 text-nowrap d-inline-block">Birth: </dt>
                                        <dd className="col-xl-8 offset-xl-1 float-right text-xl-right">{birth}</dd>
                                    </div>
                                    <div className="col-xl-6">
                                        <dt className="col-xl-3 text-nowrap d-inline-block">E-mail: </dt>
                                        <dd className="col-xl-8 offset-xl-1 float-right text-xl-right">{email}</dd>
                                    </div>
                                </div>
                            </li>
                        </dl>
                }
            </div>
        </div >
    )

}

export default GeneralSection