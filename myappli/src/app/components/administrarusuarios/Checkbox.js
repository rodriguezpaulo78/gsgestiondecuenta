import React from 'react';
import PropTypes from 'prop-types';

//Componente Checkbox que servirá para seleccionar permisos para un perfil
const Checkbox = ({ 
    type = 'checkbox', name, id , checked = false, onChange }) => (
      <input 
        id={id} 
        type={type} 
        name={name} 
        checked={checked} 
        onChange={onChange} />
);

Checkbox.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.number,
};

export default Checkbox;