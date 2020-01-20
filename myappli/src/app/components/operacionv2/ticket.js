import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ticket extends Component{
    constructor(prosp){
        super(prosp);

        this.state = {
            // DATOS DE LA EMPRESA
            nombreComercial: "",
            razonSocial: "",
            ruc: "",
            direccion: "",
            telefono: "",
            rubros: "",
            imagenEmpresa: "",
            nombres: "",
            apellidoP: "",
            apellidoM: "",

            // DATOS DEL COMPROBANTE
            tipoComprobante: this.props.tipoComprobante,
            serie: this.props.serie,
            numero: this.props.numero,

            // DATOS DEL CLIENTE
            // this.props.rucCliente,
            // this.props.cliente,
            // this.props.direccionCliente,
            telefonoCliente: this.props.telefonoCliente,
            correoCliente: this.props.correoCliente,

            // DETALLES DE LA VENTA
            cabezarasDescripcion: this.props.cabezarasDescripcion,

            detalle: "",

            // TOTALES
            // this.props.totalValorCompra,        // Total Valor de Compra/Venta
            // this.props.sumatoriaTributos,       // Sumatoria de Tributos
            // this.props.totalDescuento,          // Total Descuento
            // this.props.sumatoriaOtrosCargos,    // Sumatoria otros cargos
            // this.props.totalPrecioVenta,        // Total precio de venta

            horaActual: '',

            styleContenedor: {
                width: this.props.ancho,
                height: this.props.alto,
                border: this.props.conBordes? "#000 solid 1px":"",
                paddingBottom: "15px",
            },

        };

        this.renderCabecera = this.renderCabecera.bind(this);
        this.renderDatosFactura = this.renderDatosFactura.bind(this);
        this.renderDatosCliente = this.renderDatosCliente.bind(this);
        this.renderDetallesVenta = this.renderDetallesVenta.bind(this);
        this.renderTotales = this.renderTotales.bind(this);
        this.obtenerDatosEmpresa = this.obtenerDatosEmpresa.bind(this);
        this.renderDetalleGeneral = this.renderDetalleGeneral.bind(this);

    }

    obtenerDatosEmpresa(){
        fetch('/api/negocio/datoscomprobante')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    nombreComercial: data.nombre_comercial,
                    razonSocial: data.razon_social,
                    ruc: data.ruc,
                    direccion: data.direccion,
                    telefono: data.contacto,
                    rubros: data.rubros,
                    imagenEmpresa: data.imagenEmpresa,
                    nombres: data.nombres,
                    apellidoP: data.apellidosp,
                    apellidoM: data.apellidosm,
                });
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.obtenerDatosEmpresa();
    }

    renderCabecera(){
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-12 text-center">
                        <img src={this.state.imagenEmpresa} alt="Logo empresa" width="70%"/>
                    </div>
                </div>
                <div className="row text-center" style={{fontSize: this.props.tamLetraCabecera? this.props.tamLetraCabecera: ''}}>
                    <div className="col-12">
                        {this.state.nombreComercial}
                    </div>
                    {
                        this.state.ruc.toString()[0] === "1"? (
                                <div className="col-12">
                                    De: {this.state.nombres + " " + this.state.apellidoP + " " + this.state.apellidoM}
                                </div>
                            )
                            :
                            (
                                <div className="col-12">
                                    {this.state.razonSocial}
                                </div>
                            )

                    }
                </div>
                <div className="row text-center" style={{fontSize: this.props.tamLetraCabecera? this.props.tamLetraCabecera: ''}}>
                    <div className="col-12">
                        RUC: {this.state.ruc} <br/> {this.state.direccion}
                    </div>
                </div>
                <div className="row text-center" style={{fontSize: this.props.tamLetraCabecera? this.props.tamLetraCabecera: ''}}>
                    <div className="col-12">
                        Contacto: {this.state.telefono}
                    </div>
                </div>
                <div className="row text-center" style={{fontSize: this.props.tamLetraCabecera? this.props.tamLetraCabecera: ''}}>
                    <div className="col-12">
                        {this.state.rubros}
                    </div>
                </div>
            </React.Fragment>
        );
    }

    renderDatosFactura(){
        return (
            <React.Fragment>
                <div className="row text-center" style={{fontSize: this.props.tamLetraTipo ? this.props.tamLetraTipo: ''}}>
                    <div className="col-12">
                        <strong>
                            {(this.props.tipoComprobante === "0") && "Boleta Electrónica"}
                            {(this.props.tipoComprobante === "1") && "Factura Electrónica"}
                            {(this.props.tipoComprobante === "2") && "Pago"}
                            {(this.props.tipoComprobante === "3") && "Nota de Credito"}
                            {(this.props.tipoComprobante === "4") && "Pedido"}
                        </strong>
                    </div>
                    {
                        ((this.props.tipoComprobante === "0") || (this.props.tipoComprobante === "1")) && (
                            <div className="col-12">
                                {this.props.serie} - {this.props.numero}
                            </div>
                        )
                    }
                </div>
            </React.Fragment>
        );
    }

    renderDatosCliente(){

        return (
            <React.Fragment>
                <hr/>
                <div className="row" style={{fontSize: this.props.tamLetraCliente? this.props.tamLetraCliente: ''}}>
                    <div className="col-12">
                        RUC/DNI: {this.props.rucCliente} <br/>
                        CLIENTE: {this.props.cliente} <br/>
                        DIRECCIÓN: {this.props.direccionCliente} <br/>
                    </div>
                </div>
                <hr/>
            </React.Fragment>
        );
    }

    renderDetallesVenta(){
        /*       DETALLES DE LA VENTA
            cabezarasDescripcion: [],
            items: [{cant: 2, descripcion: "bancas", precio: "6.5", subtotal: "51.54"}],
         */
        return (
            <React.Fragment>
                {this.props.detalleGeneralReferencia.length > 0 && (
                    <React.Fragment>
                        <div className="row" style={{fontSize: this.props.tamLetraDetalles? this.props.tamLetraDetalles: ''}}>
                            <div className="col-12">
                                <strong>Detalle: </strong> {this.props.detalleGeneralReferencia}
                            </div>
                        </div>
                        <hr/>
                    </React.Fragment>
                )}
                <div className="row">
                    <div className="col-2" id="colTabla">
                        <table className="" style={{fontSize: this.props.tamLetraDetalles? this.props.tamLetraDetalles: ''}}>
                            <thead>
                            <tr key={0}>
                                {this.state.cabezarasDescripcion.map((elemento, i) => {
                                    return (
                                        <td>
                                            {elemento.toUpperCase()}
                                        </td>
                                    )
                                })}
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.items.map((elemento, i) => {
                                return (
                                    <tr key={i + 1}>
                                        <td align="center">{elemento.modal_cantidad}</td>
                                        <td>{elemento.modal_descripcion.toLocaleUpperCase()}</td>
                                        <td align="right">{elemento.modal_precUnitario}</td>
                                        <td align="right">{elemento.modal_precTotal}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    renderTotales(){
        /*
        // TOTALES
            totalValorCompra: 0,        // Total Valor de Compra/Venta
            sumatoriaTributos: 0,       // Sumatoria de Tributos
            totalDescuento: 0,          // Total Descuento
            sumatoriaOtrosCargos: 0,    // Sumatoria otros cargos
            totalPrecioVenta: 0,        // Total precio de venta
         */
        return(
            <div className="row text-right" style={{fontSize: this.props.tamLetraTotal? this.props.tamLetraTotal: ''}}>
                <div className="offset-1 col-11 align-self-end ">
                    <table style={{marginRight: "10px"}}>
                        <thead>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>OP. GRAVADA: </td>
                            <td>S/ {parseFloat(this.props.totalValorCompra).toFixed(2)}</td>
                        </tr>

                        <tr>
                            <td>IGV: </td>
                            <td>S/ {parseFloat(this.props.sumatoriaTributos).toFixed(2)}</td>
                        </tr>

                        <tr>
                            <td>TOT. DSCTO: </td>
                            <td>S/ {parseFloat(this.props.totalDescuento).toFixed(2)}</td>
                        </tr>

                        <tr>
                            <td>OTROS CARGOS: </td>
                            <td>S/ {parseFloat(this.props.sumatoriaOtrosCargos).toFixed(2)}</td>
                        </tr>

                        <tr>
                            <td><strong>IMPORTE TOTAL: </strong></td>
                            <td><strong>S/ {this.props.totalPrecioVenta === null? "0.00": parseFloat(this.props.totalPrecioVenta).toFixed(2)}</strong></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    renderDetalleGeneral(){
        return (
            <React.Fragment>
                <div className="row" style={{fontSize: this.props.tamLetraCliente? this.props.tamLetraCliente: ''}}>
                    <div className="col-12">
                        <strong>Detalle: </strong> {this.props.detalleGeneralReferencia}
                    </div>
                </div>
                <hr/>
            </React.Fragment>
        );
    }

    render(){
        return (
            <div className="row">
                <div className="col-12">
                    <div className="row" style={this.state.styleContenedor}>
                        <div className="col-12">
                            {this.renderCabecera()}
                        </div>

                        <div className="col-12">
                            {this.renderDatosFactura()}
                        </div>

                        <div className="col-12">
                            {this.renderDatosCliente()}
                        </div>

                        <div className="col-12">
                            {this.props.items.length !== 0 && this.renderDetallesVenta()}
                            {this.props.items.length === 0 && this.renderDetalleGeneral()}
                        </div>

                        <div className="col-12">
                            <hr/>
                            {this.renderTotales()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Ticket.propTypes = {
    ancho: PropTypes.number.isRequired,
    alto: PropTypes.number,
    conBordes: PropTypes.bool.isRequired,

    nombreComercial: PropTypes.string.isRequired,
    razonSocial: PropTypes.string.isRequired,
    ruc: PropTypes.number.isRequired,
    direccion: PropTypes.string.isRequired,
    telefono: PropTypes.string.isRequired,
    rubros: PropTypes.string.isRequired,
    imagenEmpresa: PropTypes.string.isRequired,
    nombres: PropTypes.string,
    apellidoP: PropTypes.string,
    apellidoM: PropTypes.string,

    // DATOS DEL COMPROBANTE
    tipoComprobante: PropTypes.string.isRequired,
    serie: PropTypes.string.isRequired,
    numero: PropTypes.number.isRequired,

    // DATOS DEL CLIENTE
    rucCliente: PropTypes.string,
    cliente: PropTypes.string,
    direccionCliente: PropTypes.string,
    telefonoCliente: PropTypes.string,
    correoCliente: PropTypes.string,

    // DATOS DEL COMPROBANTE
    cabezarasDescripcion: PropTypes.arrayOf(PropTypes.string).isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Ticket;