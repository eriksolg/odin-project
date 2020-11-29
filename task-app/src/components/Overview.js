import React from "react";
import uniqid from "uniqid";

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
            onClick={props.handler}
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

                if (item.id == props.taskInEditing) {
                    editRow = true;
                } else {
                    editRow = false;
                }
                return <li className="list-group-item" key={uniqid()}>
                    {editRow ?
                        <TaskInput key="1" task={item} onChange={props.onChangeEditValue} editValue={props.editValue}/> :
                        <TaskName task={item} />
                    }
                    <button className="btn btn-danger float-right" onClick={props.handleDelete.bind(this, item.id)}>DELETE</button>
                    {editRow ?
                        <SubmitButton handler={props.handleSubmit.bind(this, item.id)} /> :
                        <EditButton handler={props.handleEdit.bind(this, item.id)} />
                    }
                    </li>;
            }
            )}
        </ul>
    )
}

export default Overview;