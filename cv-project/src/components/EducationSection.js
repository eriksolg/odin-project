import React, { component } from 'react'

class EducationSection extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">Education</h3>
                    <ul class="list-group list-group-flush card-columns">
                        <li class="list-group-item">
                            <div className="row">
                                <div className="col-xl-3 text-nowrap">
                                    <strong>2017-2019</strong>
                                </div>
                                <div className="col-xl-8 offset-xl-1">
                                    <span>School Name</span>
                                    <span> </span>
                                    <span className="text-muted">Keskharidus</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div >
        )
    }
}

export default EducationSection