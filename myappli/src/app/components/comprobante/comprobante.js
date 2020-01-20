import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TipoComprobante from "./tipoComprobante";
import NombreEmpresa from "./nombreEmpresa";

import './comprobante.estilo.css';
import Select from "../common/select";

class Comprobante extends Component{
    constructor(props){
        super(props);

        this.state = {
            styleContenedor: {
                width: this.props.tipoImpresion === "ticket"?  this.props.ancho? this.props.ancho: "200px": "" ,
                height: this.props.tipoImpresion === "ticket"?  this.props.ancho? this.props.ancho: "500px": "" ,
                border: this.props.conBorde? "#000 solid 1px":"",
            },
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="row" style={this.state.styleContenedor}>
                    <div className="col-6">
                        <div className="row">
                            <NombreEmpresa
                                esNombreImagen={false}
                                nombreEmpresa={"Mi Empresa"}
                                descripcion={"Empresa dedicada a la distribución de productos"}
                                direccion={"Domiciliado en la dirección"}
                                numeros={"+51 949 044 802"}
                                logoImagen={"http://shmector.com/_ph/13/510962645.png"}
                            />

                        </div>
                    </div>
                    <div className="col-6">
                        <TipoComprobante ruc={10723786296} conBordes={true} tipoComprobante={"Factura"} serieOrden={"c001-00001"}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

Comprobante.propTypes = {
    ancho: PropTypes.string.isRequired,
    alto: PropTypes.string.isRequired,
};


export default Comprobante;