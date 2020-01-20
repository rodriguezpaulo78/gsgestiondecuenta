import React from "react";
import PropTypes from 'prop-types';

const SuperBoton = (props) => (
    <button
        type="button"
        className="btn btn-lg btn-success btn-block text-center"
        style={{
            "height": props.heightBtn !== ""? props.heightBtn + "px": "",
            "backgroundColor": props.backgroundColor !== ""? props.backgroundColor: "",
            "color": props.fontColor !== ""? props.fontColor: ""
        }}
        name={props.name}
        onClick={props.eventOnClick}
    >
        {props.text}
    </button>
);

SuperBoton.propTypes = {
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    heightBtn: PropTypes.number,
};

export default SuperBoton;