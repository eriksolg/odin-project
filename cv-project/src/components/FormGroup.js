import { useEffect, useState } from 'react'

const FormGroup = (props) => {

    const [element, setElement] = useState(props.origin);

    const formGroupName = props.name;
    const formGroupLabel = props.label;
    const type = props.type;

    useEffect(() => {
        props.changeValue(element);

    }, [element]);


    return (
        <div className="form-group">
            <div className="row">
                <div className="col-sm-2">
                    <label htmlFor={formGroupName}>{formGroupLabel}</label>
                </div>
                <div className="col-sm-5">
                    <input id={formGroupName}
                        type={type}
                        className="form-control"
                        value={element}
                        onChange={(event) => {
                            setElement(event.target.value);
                        }}></input>
                </div>
            </div>
        </div>
    )
}

export default FormGroup