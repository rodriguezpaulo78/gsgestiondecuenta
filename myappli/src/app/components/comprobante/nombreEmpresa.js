import React, { Component } from 'react';
import PropTypes from 'prop-types';

const NombreEmpresa = (props) => (
    <div className="row">
        {props.esNombreImagen && (
            <React.Fragment>
                <div className="col-12">
                    <img src={props.nombreImagen} alt="Nombre" width={"80%"}/>
                </div>
                <div className="col-12">
                    <img src={props.logoImagen} alt="Logo" width={"90%"}/>
                </div>
            </React.Fragment>
        )}
        {!props.esNombreImagen && (
            <React.Fragment>
                <div className="col-12 text-center mb-3 display-4">
                    {props.nombreEmpresa.toUpperCase()}
                </div>
                <div className="col-12">
                    <div className="row">
                        <div className="col-6">
                            <img src={props.logoImagen} alt="Logo" width={"80%"}/>
                        </div>
                        <div className="col-6 text-center">
                            <p>{props.descripcion.toUpperCase()}</p>
                            <p>{props.direccion}</p>
                            <p>{props.numeros}</p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )}
    </div>
);

NombreEmpresa.propTypes = {
    esNombreImagen: PropTypes.bool.isRequired,
    nombreImagen: PropTypes.string,
    logoImagen: PropTypes.string,

    nombreEmpresa: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    direccion: PropTypes.string.isRequired,
    numeros: PropTypes.string.isRequired,
};

export default NombreEmpresa;