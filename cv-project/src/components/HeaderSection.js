import React, { component } from 'react'
import EditButton from './EditButton'



class HeaderSection extends React.Component {
    constructor() {
        super();

        this.state = {
            editing: false,
            hover: false,
            firstName: 'Michelangelo',
            lastName: 'Crisostomus',
            profession: 'IT-specialist',
            firstNameEdit: '',
            lastNameEdit: '',
            professionEdit: ''
        }
    }

    toggleHover() {
        this.setState({
            hover: !this.state.hover,
        });
    }

    edit() {
        this.setState({
            editing: true,
            firstNameEdit: this.state.firstName,
            lastNameEdit: this.state.lastName,
            professionEdit: this.state.profession
        });
    }

    submit() {
        this.setState({
            editing: false,
            firstName: this.state.firstNameEdit,
            lastName: this.state.lastNameEdit,
            profession: this.state.professionEdit,
            firstNameEdit: '',
            lastNameEdit: '',
            professionEdit: ''
        })
    }

    render() {
        const { firstName, lastName, profession, firstNameEdit, lastNameEdit, professionEdit } = this.state;

        return (
            this.state.editing ?
                <form onSubmit={this.submit.bind(this)}>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-2">
                                <label htmlFor="firstNameInput">First name</label>
                            </div>
                            <div className="col-sm-5">
                                <input id="firstNameInput"
                                    type="text"
                                    className="form-control"
                                    value={firstNameEdit}
                                    onChange={(event) => {
                                        this.setState({ firstNameEdit: event.target.value });
                                    }}></input>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-2">
                                <label htmlFor="firstNameInput">Surname</label>
                            </div>
                            <div className="col-sm-5">
                                <input id="lastNameInput"
                                    type="text"
                                    className="form-control"
                                    value={lastNameEdit}
                                    onChange={(event) => {
                                        this.setState({ lastNameEdit: event.target.value });
                                    }}></input>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-2">
                                <label htmlFor="occupationInput">Occupation</label>
                            </div>
                            <div className="col-sm-5">
                                <input
                                    id="occupationInput"
                                    type="text"
                                    className="form-control"
                                    value={professionEdit}
                                    onChange={(event) => {
                                        this.setState({ professionEdit: event.target.value });
                                    }}></input>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
                :
                <header className="hover-shade"
                    onMouseEnter={() => this.setState({
                        hover: true,
                    })}
                    onMouseLeave={() => this.setState({
                        hover: false
                    })}
                >
                    <h1 className="d-inline-block">{firstName} {lastName}</h1>
                    {this.state.hover && !this.state.editing && <EditButton edit={this.edit.bind(this)} />}
                    <h3 className="text-muted">{profession}</h3>
                </header>
        )
    }
}

export default HeaderSection