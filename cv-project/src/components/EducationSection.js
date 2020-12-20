import React, { component } from 'react'
import EditButton from './EditButton'


class EducationSection extends React.Component {
    constructor() {
        super();

        this.state = {
            educationData: [
                {
                    editing: false,
                    hover: false,
                    start: '2016-01-01',
                    end: '2019-01-01',
                    schoolName: 'Miina Härma Gümnaasium',
                    degree: 'Keskharidus',
                    startEdit: '',
                    endEdit: '',
                    schoolNameEdit: '',
                    degreeEdit: ''
                },
                {
                    editing: false,
                    hover: false,
                    start: '2016-01-01',
                    end: '2019-01-01',
                    schoolName: 'Miina Härma Gümnaasium',
                    degree: 'Keskharidus',
                    startEdit: '',
                    endEdit: '',
                    schoolNameEdit: '',
                    degreeEdit: ''
                },
                {
                    editing: false,
                    hover: false,
                    start: '2016-01-01',
                    end: '2019-01-01',
                    schoolName: 'Miina Härma Gümnaasium',
                    degree: 'Keskharidus',
                    startEdit: '',
                    endEdit: '',
                    schoolNameEdit: '',
                    degreeEdit: ''
                }
            ]
        }
    }

    edit(index) {
        let educationDataClone = this.state.educationData;
        educationDataClone.map((iterItem, itemIndex) => {
            if (index == itemIndex) {
                iterItem.editing = true;
                iterItem.hover = false;
                iterItem.startEdit = iterItem.start;
                iterItem.endEdit = iterItem.end;
                iterItem.schoolNameEdit = iterItem.schoolName;
                iterItem.degreeEdit = iterItem.degree;
            }
        });

        this.setState({
            educationData: educationDataClone
        });
    }

    handlePropertyEdit(index, property, value) {
        let educationDataClone = this.state.educationData;
        educationDataClone.map((iterItem, itemIndex) => {
            if (index == itemIndex) {
                iterItem[property] = value;
            }
        });

        this.setState({
            educationData: educationDataClone
        });
    }

    submit(index) {
        let educationDataClone = this.state.educationData;
        educationDataClone.map((iterItem, itemIndex) => {
            if (index == itemIndex) {
                iterItem.editing = false;
                iterItem.hover = false;
                iterItem.start = iterItem.startEdit;
                iterItem.end = iterItem.endEdit;
                iterItem.schoolName = iterItem.schoolNameEdit;
                iterItem.degree = iterItem.degreeEdit;
            }
        });

        this.setState({
            educationData: educationDataClone
        });
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title d-inline-block">Education</h3>

                    <ul className="list-group list-group-flush card-columns">
                        {this.state.educationData.map((item, index) => {
                            const { editing, hover, start, end, schoolName, degree, startEdit, endEdit, schoolNameEdit, degreeEdit } = item;
                            return (
                                <li className="list-group-item hover-shade" key={index}
                                    onMouseEnter={() => this.handlePropertyEdit(index, 'hover', true)}
                                    onMouseLeave={() => this.handlePropertyEdit(index, 'hover', false)}>
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
                                                            <label htmlFor="schoolNameInput">School name</label>
                                                        </div>
                                                        <div className="col-sm-5">
                                                            <input
                                                                id="schoolNameInput"
                                                                type="text"
                                                                className="form-control"
                                                                value={schoolNameEdit}
                                                                onChange={(event) => {
                                                                    this.handlePropertyEdit(index, 'schoolNameEdit', event.target.value);
                                                                }}></input>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="row">
                                                        <div className="col-sm-2">
                                                            <label htmlFor="degreeInput">Degree</label>
                                                        </div>
                                                        <div className="col-sm-5">
                                                            <input
                                                                id="degreeInput"
                                                                type="text"
                                                                className="form-control"
                                                                value={degreeEdit}
                                                                onChange={(event) => {
                                                                    this.handlePropertyEdit(index, 'degreeEdit', event.target.value);
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
                                                    <span>{schoolName}</span>
                                                    <span> </span>
                                                    <span className="text-muted">{degree}</span>
                                                </div>
                                                <div className="cosl-xl-1">
                                                    {hover && <EditButton edit={this.edit.bind(this, index)} />}
                                                </div>

                                            </div>
                                    }
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