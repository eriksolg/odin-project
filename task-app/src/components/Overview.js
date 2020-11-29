import React from "react";

const TaskName = (props) => {
    return (
        <span>
            {props.task.id} {props.task.task}
        </span>
    )
}

const TaskInput = (props) => {
    return (
        <span>
           {props.task.id}
           <span> </span>
             <input
                type="text"
                value={props.editValue}
                onChange={props.onChange}
            />
        </span>

    )
}

const EditButton = (props) => {
    return (
        <button
            className="btn btn-secondary float-right"
            onClick={props.handler}
        >
            EDIT
        </button>
    )
}

const SubmitButton = (props) => {
    return (
        <button
            className="btn btn-primary float-right"
            type="submit"
        >
            SUBMIT
        </button>
    )
}

const Overview = (props) => {
    return (
        <ul className="list-group list-group-flush">
            {props.tasks.map(item => {
                let editRow;

                if (item.id === props.taskInEditing) {
                    editRow = true;
                } else {
                    editRow = false;
                }
                return <li className="list-group-item" key={item.id}>
                    <form onSubmit={props.handleSubmit.bind(this, item.id)}>
                        {editRow ?
                            <TaskInput key="1" task={item} onChange={props.onChangeEditValue} editValue={props.editValue}/> :
                            <TaskName task={item} />
                        }
                        <button className="btn btn-danger float-right" onClick={props.handleDelete.bind(this, item.id)}>DELETE</button>
                        {editRow ?
                            <SubmitButton /> :
                            <EditButton handler={props.handleEdit.bind(this, item.id)} />
                        }
                    </form>
                    </li>;
            }
            )}
        </ul>
    )
}

export default Overview;