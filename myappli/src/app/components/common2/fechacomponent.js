import React from 'react';
import PropTypes from 'prop-types';

const FechaComponent = (props) => (
    <React.Fragment>
        <div className={props.bloques + " text-center"}>
            <label htmlFor={props.idSelect}>{props.etiqueta}</label>
            <input
                type="date"
                className="form-control"
                id={props.idSelect}
                name={props.nombreSelect}
                placeholder={props.placeholder}
                value={props.valorDefecto}
                onChange={props.funcionControl}
            />
        </div>
    </React.Fragment>
);

FechaComponent.propTypes = {
    bloques: PropTypes.string.isRequired,
    etiqueta: PropTypes.string.isRequired,
    idSelect: PropTypes.string.isRequired,
    nombreSelect: PropTypes.string.isRequired,

    valorDefecto: PropTypes.string,

    funcionControl: PropTypes.func.isRequired,
};


export default FechaComponent;