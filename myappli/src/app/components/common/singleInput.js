import React from 'react';
import PropTypes from 'prop-types';

const SingleInput = (props) => (
    <div className="row mt-1">
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
                style={{ textTransform: 'uppercase' }}
                className={"form-control form-control-sm " + props.inputClass}
                name={props.name}
                type={props.inputType}
                value={props.content}
                onChange={props.controlFunc}
                onBlur={props.controlBlurFunc}
                placeholder={props.placeholder}
                maxLength={props.max}
                min="0"
            />
        </div>
    </div>
);

SingleInput.propTypes = {
    inputType: PropTypes.oneOf(['text', 'number', 'date', 'email', 'tel']).isRequired,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    controlFunc: PropTypes.func,
    controlBlurFunc: PropTypes.func,
}

export default SingleInput;