import React, { Component } from 'react'
import uniqid from "uniqid";
import Overview from './components/Overview'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      value: '',
      editValue: '',
      tasks: [],
      taskInEditing: null,
      lastId: 1,
    }
  }

  onChangeValue = event => {
    this.setState({ value: event.target.value });
  }

  onChangeEditValue = event => {
    this.setState( {editValue: event.target.value});
  }

  onAddTask = event => {
    event.preventDefault();

    this.setState({
      tasks: this.state.tasks.concat({
        id: this.state.lastId,
        task: this.state.value}
        ),
      value: '',
      lastId: this.state.lastId + 1,
    });
  }

  clearTasks = () => {
    this.setState({ tasks: []});
  }

  deleteTask = (id) => {
    this.setState({
      tasks: this.state.tasks.filter((task) => {return task.id !== id}),
    });
  }

  editTask = (id) => {
    this.setState({
      taskInEditing: id,
      editValue: this.state.tasks.find(item => item.id == id).task,
    });
  }

  submitTask = (id) => {
    this.setState({
      tasks: this.state.tasks.map((item) => {
        let currentId = item.id;
        let currentTask = item.task;
        if (currentId == id) {
          currentTask = this.state.editValue
        }
        return {
          id: currentId,
          task: currentTask,
        }
      }),
      taskInEditing: null,
      editValue: '',
    })
  }

  render() {

    const { value, editValue, tasks, taskInEditing } = this.state;
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
        <Overview
          tasks={tasks}
          editValue={editValue}
          handleDelete={this.deleteTask}
          handleEdit={this.editTask}
          handleSubmit={this.submitTask}
          onChangeEditValue={this.onChangeEditValue}
          taskInEditing={taskInEditing}/>
      </div>
    )
  }
  
}

export default App;
