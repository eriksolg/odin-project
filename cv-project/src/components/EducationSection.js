import React, { component } from 'react'


class EducationSection extends React.Component {
    constructor() {
        super();

        this.state = {
            educationData: [
                {
                    yearStart: '2017',
                    yearEnd: '2019',
                    schoolName: 'Miina Härma Gümnaasium',
                    degree: 'Keskharidus',
                }
            ]
        }
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">Education</h3>
                    <ul class="list-group list-group-flush card-columns">
                        {this.state.educationData.map(item => {
                            const { yearStart, yearEnd, schoolName, degree } = item;
                            return (
                                <li class="list-group-item">
                                    <div className="row">
                                        <div className="col-xl-3 text-nowrap">
                                            <strong>{yearStart}-{yearEnd}</strong>
                                        </div>
                                        <div className="col-xl-8 offset-xl-1">
                                            <span>{schoolName}</span>
                                            <span> </span>
                                            <span className="text-muted">{degree}</span>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                        }

                    </ul>
                </div>
            </div >
        )
    }
}

export default EducationSection