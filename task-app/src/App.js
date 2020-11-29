import React, { Component } from 'react'
import Overview from './components/Overview'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      value: '',
      tasks: [],
    }
  }

  onChangeValue = event => {
    this.setState({ value: event.target.value });
  }

  onAddTask = event => {
    event.preventDefault();

    this.setState({
      tasks: this.state.tasks.concat(this.state.value),
      value: '',
    });
  }

  clearTasks = () => {
    this.setState({ tasks: []});
  }

  render() {

    const { value, tasks } = this.state;
    return (
      <div className="col-6 mx-auto mt-5">
        <form onSubmit={this.onAddTask}>
          <div className="form-group">
            <label htmlFor="taskInput">Enter task</label>
            <input
              id="taskInput"
              className="form-control"
              type="text"
              value={value}
              onChange={this.onChangeValue}
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!value}
            >
              Add task
            </button>
            <button
              className="btn btn-secondary"
              onClick={this.clearTasks}
              disabled={tasks.length === 0}
            >Clear
            </button>
          </div>
        </form>
        <Overview tasks={tasks}/>
      </div>
    )
  }
  
}

export default App;
