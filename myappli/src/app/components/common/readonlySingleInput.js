import React from 'react';
import PropTypes from 'prop-types';

const ReadOnlySingleInput = (props) => (
    <div className="row mt-1" >
        <div className={props.labelClass}>
        {props.obligatory == true ?
                <label className="text-danger">
                    {props.title}
                </label> :
                <label>
                    {props.title}
                </label>}
        </div>

        <div className={props.inputClass}>
            <input
                style={{ textTransform: 'uppercase'}} 
                className="form-control form-control-sm"
                name={props.name}
                type={props.inputType}
                value={props.content}
                onChange={props.controlFunc}
                placeholder={props.placeholder} 
                readOnly
                 />
        </div>
    </div>
);

ReadOnlySingleInput.propTypes = {
    inputType: PropTypes.oneOf(['text', 'number', 'date','email','tel']).isRequired,
    title: PropTypes.string.isRequired,
    name: PropTypes.string,
    controlFunc: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
}

export default ReadOnlySingleInput;