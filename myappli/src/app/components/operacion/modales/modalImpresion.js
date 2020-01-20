import React, { Component } from 'react';
import Ticket from "../../comprobante/ticket";
import ButtonPrinter from "../../common/buttonPrinter";

class ModalImpresion extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {
        console.log(this.props);
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
                <div className="modal-dialog modal-dialog-scrollable modal-xl"
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
                                <div className="body-atajos" id="comprobante">
                                    <Ticket
                                        ancho={300}
                                        conBordes={false}

                                        tamLetraCabecera={"11px"}
                                        tamLetraTipo={"11px"}
                                        tamLetraCliente={"11px"}
                                        tamLetraDetalles={"11px"}
                                        tamLetraTotal={"11px"}

                                        tipoComprobante={"Factura Electrónica"}
                                        serie={"E001"} numero={1025558874}

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
                                    elemento={"comprobante"}
                                />
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}

export default ModalImpresion;
