import React, { component } from 'react'

class ProfessionalSection extends React.Component {
    constructor() {
        super();

        this.state = {
            editing: false,
            professionalData: [
                {
                    yearStart: '2017',
                    yearEnd: '2019',
                    companyName: 'AS Pets ja pojad',
                    profession: 'AD haldur',
                    description: 'Done this and that.',
                }
            ]
        }
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">Professional</h3>
                    {
                        this.state.editing ?
                            <form>

                            </form>
                            :
                            <ul class="list-group list-group-flush card-columns">
                                {this.state.professionalData.map(item => {
                                    const { yearStart, yearEnd, companyName, profession, description } = item;
                                    return (
                                        <li class="list-group-item">
                                            <div className="row">
                                                <div className="col-xl-3 text-nowrap">
                                                    <strong>{yearStart}-{yearEnd}</strong>
                                                </div>
                                                <div className="col-xl-8 offset-xl-1">
                                                    <span>{companyName}</span>
                                                    <span> </span>
                                                    <span className="text-muted">{profession}</span>
                                                    <p className="text-justify">{description}</p>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                    }
                </div>
            </div >
        )
    }
}

export default ProfessionalSection