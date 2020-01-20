import  React, { Component } from 'react';
import Ticket from "../ticket";
import A4 from "../../comprobante/a4";
import ButtonPrinter from "../../common/buttonPrinter";
import PropTypes from 'prop-types';

class ModalImpresion extends Component{
    constructor(props){
        super(props);
    }


    render(){
        return(
            <div className="modal fade"
                 id="modal_ver_ticket"
                 tabIndex="-1"
                 role="dialog"
                 aria-labelledby="modal_ver_ticket"
                 aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-scrollable"
                    role="document"
                >
                        <div className="modal-content" style={{ height: '800px' }}>
                            <div className="modal-header">
                                <h4 className="modal title">
                                    Ver Ticket de Impresión
                                </h4>
                                <button type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="body-atajos" id="comprobanteImpresion">
                                    <Ticket
                                        ancho={"40%"}
                                        conBordes={false}

                                        tamLetraCabecera={"20px"} // 100px
                                        tamLetraTipo={"18px"} // 100px
                                        tamLetraCliente={"19px"} // 100px
                                        tamLetraDetalles={"18px"} // 100px
                                        tamLetraTotal={"19px"} // 100px

                                        tipoComprobante={this.props.tipoComprobanteM}
                                        serie={this.props.numSerieComprobanteM} numero={this.props.numComprobanteM}

                                        // Cliente
                                        rucCliente={this.props.numDocumentoClienteM}
                                        cliente={this.props.razonSocialClienteM}
                                        direccionCliente={this.props.direccionClienteM}
                                        telefonoCliente={"342877342"}
                                        correoCliente={"correo@correo.com"}

                                        // detalles de comprobante
                                        cabezarasDescripcion={["Cant.", "Descripcion", "Precio", "SubTotal"]}
                                        items={this.props.items}

                                        // TOTALES
                                        totalValorCompra={this.props.totalValorCompraM}
                                        sumatoriaTributos={this.props.sumatoriaTributosM}
                                        totalDescuento={this.props.totalDescuentoM}
                                        totalPrecioVenta={this.props.totalPrecioVentaM}
                                        sumatoriaOtrosCargos={this.props.sumatoriaOtrosCargosM}
                                        detalleGeneralReferencia={this.props.detalleGeneralM}
                                        aCuenta={this.props.aCuentaM}

                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal"
                                >
                                    Cancelar
                                </button>
                                <ButtonPrinter
                                    classButton={"btn-warning"}
                                    elemento={"comprobanteImpresion"}
                                />
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}

ModalImpresion.propTypes = {
    numDocumentoClienteM: PropTypes.string.isRequired,
    razonSocialClienteM: PropTypes.string.isRequired,
    direccionClienteM: PropTypes.string.isRequired,
    telefonoCliente: PropTypes.string.isRequired,
    correoCliente: PropTypes.string.isRequired,

    totalValorCompraM: PropTypes.string.isRequired,
    sumatoriaTributosM: PropTypes.string.isRequired,
    totalDescuentoM: PropTypes.string.isRequired,
    totalPrecioVentaM: PropTypes.string.isRequired,
    sumatoriaOtrosCargosM: PropTypes.string.isRequired,
    detalleGeneralM: PropTypes.string.isRequired,

    tipoComprobanteM: PropTypes.number.isRequired,
    numSerieComprobanteM: PropTypes.string,
    numComprobanteM: PropTypes.number,

    items: PropTypes.array,

};

export default ModalImpresion;
