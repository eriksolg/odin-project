import React, { component } from 'react'
import EditButton from './EditButton'

class ProfessionalSection extends React.Component {
    constructor() {
        super();

        this.state = {
            professionalData: [
                {
                    editing: false,
                    hover: false,
                    start: '2017-01-01',
                    end: '2019-01-01',
                    companyName: 'AS Pets ja pojad',
                    profession: 'AD haldur',
                    description: 'Done this and that.',
                    companyNameEdit: '',
                    professionEdit: '',
                    descriptionEdit: '',
                },
                {
                    editing: false,
                    hover: false,
                    start: '2017-01-01',
                    end: '2019-01-01',
                    companyName: 'AS Pets ja pojad',
                    profession: 'AD haldur',
                    description: 'Done this and that.',
                    companyNameEdit: '',
                    professionEdit: '',
                    descriptionEdit: '',
                },
                {
                    editing: false,
                    hover: false,
                    start: '2017-01-01',
                    end: '2019-01-01',
                    companyName: 'AS Pets ja pojad',
                    profession: 'AD haldur',
                    description: 'Done this and that.',
                    companyNameEdit: '',
                    professionEdit: '',
                    descriptionEdit: '',
                }
            ]
        }
    }

    edit(index) {
        let professionalDataClone = this.state.professionalData;
        professionalDataClone.map((iterItem, itemIndex) => {
            if (index == itemIndex) {
                iterItem.editing = true;
                iterItem.hover = false;
                iterItem.startEdit = iterItem.start;
                iterItem.endEdit = iterItem.end;
                iterItem.companyNameEdit = iterItem.companyName;
                iterItem.professionEdit = iterItem.profession;
                iterItem.descriptionEdit = iterItem.description;

            }
        });

        this.setState({
            professionalData: professionalDataClone
        });
    }


    submit(index) {
        let professionalDataClone = this.state.professionalData;
        professionalDataClone.map((iterItem, itemIndex) => {
            if (index == itemIndex) {
                iterItem.editing = false;
                iterItem.hover = false;
                iterItem.start = iterItem.startEdit;
                iterItem.end = iterItem.endEdit;
                iterItem.companyName = iterItem.companyNameEdit;
                iterItem.profession = iterItem.professionEdit;
                iterItem.description = iterItem.descriptionEdit;
            }
        });

        this.setState({
            professionalData: professionalDataClone
        });
    }

    handlePropertyEdit(index, property, value) {
        let professionalDataClone = this.state.professionalData;
        professionalDataClone.map((iterItem, itemIndex) => {
            if (index == itemIndex) {
                iterItem[property] = value;
            }
        });

        this.setState({
            professionalData: professionalDataClone
        });
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title d-inline-block">Professional</h3>
                    <ul className="list-group list-group-flush card-columns">
                        {this.state.professionalData.map((item, index) => {
                            const { editing, hover, start, end, companyName, profession, description, startEdit, endEdit, companyNameEdit, professionEdit, descriptionEdit } = item;
                            return (
                                <li className="list-group-item hover-shade" key={item}
                                    onMouseEnter={() => this.handlePropertyEdit(index, 'hover', true)}
                                    onMouseLeave={() => this.handlePropertyEdit(index, 'hover', false)}
                                >
                                    {
                                        editing ?
                                            <form onSubmit={this.submit.bind(this, index)}>
                                                <div className="form-group">
                                                    <div className="row">
                                                        <div className="col-sm-2">
                                                            <label htmlFor="startInput">Start</label>
                                                        </div>
                                                        <div className="col-sm-5">
                                                            <input id="startInput"
                                                                type="date"
                                                                className="form-control"
                                                                value={startEdit}
                                                                onChange={(event) => {
                                                                    this.handlePropertyEdit(index, 'startEdit', event.target.value);
                                                                }}></input>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="row">
                                                        <div className="col-sm-2">
                                                            <label htmlFor="endInput">End</label>
                                                        </div>
                                                        <div className="col-sm-5">
                                                            <input id="endInput"
                                                                type="date"
                                                                className="form-control"
                                                                value={endEdit}
                                                                onChange={(event) => {
                                                                    this.handlePropertyEdit(index, 'endEdit', event.target.value);
                                                                }}></input>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="row">
                                                        <div className="col-sm-2">
                                                            <label htmlFor="companyNameInput">Company name</label>
                                                        </div>
                                                        <div className="col-sm-5">
                                                            <input
                                                                id="companyNameInput"
                                                                type="text"
                                                                className="form-control"
                                                                value={companyNameEdit}
                                                                onChange={(event) => {
                                                                    this.handlePropertyEdit(index, 'companyNameEdit', event.target.value);
                                                                }}></input>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="row">
                                                        <div className="col-sm-2">
                                                            <label htmlFor="professionInput">Profession</label>
                                                        </div>
                                                        <div className="col-sm-5">
                                                            <input
                                                                id="professionInput"
                                                                type="text"
                                                                className="form-control"
                                                                value={professionEdit}
                                                                onChange={(event) => {
                                                                    this.handlePropertyEdit(index, 'professionEdit', event.target.value);
                                                                }}></input>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="row">
                                                        <div className="col-sm-2">
                                                            <label htmlFor="descriptionInput">Description</label>
                                                        </div>
                                                        <div className="col-sm-5">
                                                            <input
                                                                id="descriptionInput"
                                                                type="textarea"
                                                                className="form-control"
                                                                value={descriptionEdit}
                                                                onChange={(event) => {
                                                                    this.handlePropertyEdit(index, 'descriptionEdit', event.target.value);
                                                                }}></input>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn btn-success">Submit</button>
                                            </form>
                                            :
                                            <div className="row">
                                                <div className="col-xl-3 text-nowrap">
                                                    <strong>{new Date(start).getFullYear()}-{new Date(end).getFullYear()}</strong>
                                                </div>
                                                <div className="col-xl-7 offset-xl-1">
                                                    <span>{companyName}</span>
                                                    <span> </span>
                                                    <span className="text-muted">{profession}</span>
                                                    <p className="text-justify">{description}</p>
                                                </div>
                                                <div className="cosl-xl-1">
                                                    {hover && <EditButton edit={this.edit.bind(this, index)} />}
                                                </div>
                                            </div>
                                    }
                                </li>
                            )
                        })}
                    </ul>

                </div>
            </div >
        )
    }
}

export default ProfessionalSection