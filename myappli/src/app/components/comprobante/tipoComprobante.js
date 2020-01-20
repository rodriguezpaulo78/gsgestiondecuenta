import React, { Component } from 'react';
import PropTypes from 'prop-types';

const TipoComprobante = (props) => (
    <div className="row mt-5 justify-content-center" style={props.conBordes? {border: "#000 solid 1px", width: '40%', marginLeft: "150px", borderRadius: "20px"}: {}}>
        <div className="col-12 text-center">
            {props.ruc}
        </div>
        <div className="col-12 text-center mt-3 mb-3" style={{backgroundColor: '#515151'}}>
            {props.tipoComprobante.toUpperCase()}
        </div>
        <div className="col-12 text-center">
            {props.serieOrden}
        </div>
    </div>
);

TipoComprobante.propTypes = {
    ruc: PropTypes.string.isRequired,
    conBordes: PropTypes.bool.isRequired,
    tipoComprobante: PropTypes.string.isRequired,
    serieOrden: PropTypes.string.isRequired,
};

export default TipoComprobante;