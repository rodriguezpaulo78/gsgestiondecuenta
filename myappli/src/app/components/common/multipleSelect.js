import React from 'react';
import PropTypes from 'prop-types';

const MultipleSelect = (props) => (
    <div className="col mt-1">
        <div className="form-group">
            <div className={props.labelClass}>
                <label>
                    {props.title}
                </label>
            </div>
            <div className={props.inputClass}>
                <select
                    multiple
                    name={props.name}
                    value={props.selectedOption}
                    onChange={props.controlFunc}
                    className="custom-select"
                    size={props.size}>

                    <option value="">
                        {props.placeholder}
                    </option>

                    {props.options.map(opt => {
                        return (
                            <option key={opt}
                                value={opt}>
                                        {opt}                     
                            </option>

                        )
                    })}
                </select>
            </div>
        </div>
    </div>
);

MultipleSelect.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    selectedOption: PropTypes.string,
    controlFunc: PropTypes.func.isRequired,
    placeholder: PropTypes.string
};

export default MultipleSelect;