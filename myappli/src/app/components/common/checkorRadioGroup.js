import React from 'react';
import PropTypes from 'prop-types';

const CheckOrRadioGroup = (props) => (
    <div>
        <label className = "form-label">
            {props.title}
        </label>
        <div className = "checkbox-group">
            {props.options.map(option => {
                return (
                    <label key = {option}
                           className = "form-label">
                           <input className = "form-checkbox"
                                  name = {props.setName}
                                  onChange = {props.controlFunc}
                                  value = {option}
                                  checked = {props.selectedOptions.indexOf(option) > -1}
                                  type = {props.type} />

                            {option}      
                    </label>
                )
            })}
        </div>
    </div>
);

CheckOrRadioGroup.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['radio', 'checkbox']).isRequired,
    setName: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    selectedOptions: PropTypes.array,
    controlFunc: PropTypes.func.isRequired
};

export default CheckOrRadioGroup;