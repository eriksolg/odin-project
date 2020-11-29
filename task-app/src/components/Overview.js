import React from "react";
import uniqid from "uniqid";


const Overview = (props) => {
    return (
        <ul className="list-group list-group-flush">
            {props.tasks.map(item => {
                return <li className="list-group-item" key={uniqid()}>
                    {item.id} {item.task}
                    <button className="btn btn-danger float-right" onClick={props.handleDelete.bind(this, item.id)}>DELETE</button>
                    </li>;
            }
            )}
        </ul>
    )
}

export default Overview;