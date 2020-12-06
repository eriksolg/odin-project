import React, { Component } from 'react'

class GeneralSection extends React.Component {
    constructor() {
        super();

        this.state = {
            address: 'My Address 25, Jõhvi, Estonia',
            phone: '+372 12345678',
            birth: '11-11-YYYY',
            email: 'my.email@gmail.com',
        }
    }

    render() {
        const { address, phone, birth, email } = this.state;

        return (
            <div className="card">
                <div class="card-body">
                    <h3 class="card-title">General Info</h3>
                    <dl className="row list-group list-group-flush card-columns">
                        <li className="list-group-item">
                            <div class="row">
                                <div className="col-xl-6">
                                    <dt className="col-xl-3 text-nowrap d-inline-block">Address: </dt>
                                    <dd className="col-xl-9 float-right text-xl-right">{address}</dd>
                                </div>
                                <div className="col-xl-6">
                                    <dt className="col-xl-3 text-nowrap d-inline-block">Phone: </dt>
                                    <dd className="col-xl-9 float-right  text-xl-right">{phone}</dd>
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item">
                            <div className="row">
                                <div className="col-xl-6">
                                    <dt className="col-xl-3 text-nowrap d-inline-block">Birth: </dt>
                                    <dd className="col-xl-9 float-right  text-xl-right">{birth}</dd>
                                </div>
                                <div className="col-xl-6">
                                    <dt className="col-xl-3 text-nowrap d-inline-block">E-mail: </dt>
                                    <dd className="col-xl-9 float-right  text-xl-right">{email}</dd>
                                </div>
                            </div>
                        </li>
                    </dl>
                </div>
            </div>
        )
    }
}

export default GeneralSection