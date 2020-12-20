import React, { Component } from 'react'
import EditButton from './EditButton'

class GeneralSection extends React.Component {
    constructor() {
        super();

        this.state = {
            editing: false,
            hover: false,
            address: 'My Address 25, Jõhvi, Estonia',
            phone: '+372 12345678',
            birth: '1991-11-11',
            email: 'my.email@gmail.com',
            addressEdit: '',
            phoneEdit: '',
            birthEdit: '',
            emailEdit: ''
        }
    }

    edit() {
        this.setState({
            editing: true,
            addressEdit: this.state.address,
            phoneEdit: this.state.phone,
            birthEdit: this.state.birth,
            emailEdit: this.state.email
        });
    }

    submit() {
        this.setState({
            editing: false,
            address: this.state.addressEdit,
            phone: this.state.phoneEdit,
            birth: this.state.birthEdit,
            email: this.state.emailEdit,
            addressEdit: '',
            phoneEdit: '',
            birthEdit: '',
            emailEdit: ''
        })
    }

    render() {
        const { address, phone, birth, email, addressEdit, phoneEdit, birthEdit, emailEdit } = this.state;

        return (
            <div className="card hover-shade"
                onMouseEnter={() => this.setState({
                    hover: true,
                })}
                onMouseLeave={() => this.setState({
                    hover: false
                })}
            >
                <div className="card-body">
                    <h3 className="card-title d-inline-block">General Info</h3>
                    {this.state.hover && !this.state.editing && <EditButton edit={this.edit.bind(this)} />}
                    {
                        this.state.editing ?
                            <form onSubmit={this.submit.bind(this)}>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <label htmlFor="addressInput">Address</label>
                                        </div>
                                        <div className="col-sm-5">
                                            <input id="addressInput"
                                                type="text"
                                                className="form-control"
                                                value={addressEdit}
                                                onChange={(event) => {
                                                    this.setState({ addressEdit: event.target.value });
                                                }}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <label htmlFor="phoneInput">Phone</label>
                                        </div>
                                        <div className="col-sm-5">
                                            <input id="phoneInput"
                                                type="tel"
                                                className="form-control"
                                                value={phoneEdit}
                                                onChange={(event) => {
                                                    this.setState({ phoneEdit: event.target.value });
                                                }}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <label htmlFor="birthInput">Birth</label>
                                        </div>
                                        <div className="col-sm-5">
                                            <input
                                                id="birthInput"
                                                type="date"
                                                className="form-control"
                                                value={birthEdit}
                                                onChange={(event) => {
                                                    this.setState({ birthEdit: event.target.value });
                                                }}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <label htmlFor="emailInput">E-mail</label>
                                        </div>
                                        <div className="col-sm-5">
                                            <input
                                                id="emailInput"
                                                type="email"
                                                className="form-control"
                                                value={emailEdit}
                                                onChange={(event) => {
                                                    this.setState({ emailEdit: event.target.value });
                                                }}></input>
                                        </div>
                                    </div>
                                </div>
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
            </div>
        )
    }
}

export default GeneralSection