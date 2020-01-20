import React from 'react';
import PropTypes from 'prop-types';

const Select = (props) => (
    <div className="row mt-1">
        <div className={props.labelClass}>
            <label>
                {props.title}
            </label>
        </div>
        <div className={props.inputClass}>
            <select name={props.name}
                value={props.selectedOption}
                onChange={props.controlFunc}
                className="form-control form-control-sm"
            >

                <option value="" disabled="disabled">
                    {props.placeholder}
                </option>

                {props.selectAll?
                    <option value={props.keyDefault}>
                        {props.valueDefault}
                    </option>:""
                }
                {
                    !props.notJson?
                        props.options.map((opt, i) => {
                            if (opt[props.valueName] !== null){
                                return (
                                    <option key={i}
                                            value={opt[props.keyName]}>
                                        {opt[props.valueName]}
                                    </option>
                                )
                            }
                        }):
                        props.options.map((opt, i) => {
                            return (
                                <option key={i}
                                        value={opt}>
                                    {opt}
                                </option>
                            )
                        })
                }
            </select>
        </div>

    </div>
);

Select.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    selectedOption: PropTypes.string,
    controlFunc: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    keyName: PropTypes.string.isRequired,
    valueName: PropTypes.string.isRequired
};

export default Select;