import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './comprobanteA4.css';
const conversor = require('conversor-numero-a-letras-es-ar');

class A4 extends Component{
    constructor(prosp){
        super(prosp);

        console.log("PROPS de TICKET");
        console.log(this.props);
        console.log("---------------------");

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

        this.obtenerDatosEmpresa = this.obtenerDatosEmpresa.bind(this);
        this.renderCabecera = this.renderCabecera.bind(this);
        this.renderDatosClientes = this.renderDatosClientes.bind(this);
        this.renderDetallesVenta = this.renderDetallesVenta.bind(this);
        this.renderTotales = this.renderTotales.bind(this);
        this.renderLetrasPrecio = this.renderLetrasPrecio.bind(this);

        this.obtenerDatosEmpresa();
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
        //this.obtenerDatosEmpresa();
    }

    renderCabecera(){
        return (
            <div className="row mt-2">
                <div className="col-3 mt-2 text-center">
                    <img src={this.state.imagenEmpresa} alt="Logo empresa" width="60%"/>
                </div>

                <div className="col-5 mt-2" style={{fontSize: this.props.tamLetraCabecera? this.props.tamLetraCabecera: ''}}>
                    {this.state.nombreComercial} <br/>
                    {
                        this.state.ruc.toString()[0] === "1"? (
                                <div className="col-12">
                                    De: {this.state.nombres + " " + this.state.apellidoP + " " + this.state.apellidoM} <br/>
                                </div>
                            )
                            :
                            (
                                <div className="col-12">
                                    {this.state.razonSocial} <br/>
                                </div>
                            )

                    }
                    {this.state.rubros} <br/>
                    {this.state.direccion}
                </div>

                <div className="col-4 mt-2" style={{border: "solid 1px black", borderRadius: "50px", fontSize: this.props.tamLetraTipo ? this.props.tamLetraTipo: ''}}>
                    <div className="row text-center">
                        <div className="col-12 mt-5">
                            RUC: {this.state.ruc}
                        </div>
                        <div className="col-12 mt-5">
                            <strong>
                            {this.props.tipoComprobante === "0" && ("BOLETA ELECTRÓNICA") }
                            {this.props.tipoComprobante === "1" && ("FACTURA ELECTRÓNICA") }
                            {this.props.tipoComprobante === "2" && ("PAGO") }
                            {this.props.tipoComprobante === "4" && ("OTRO") }
                            </strong>
                        </div>
                        <div className="col-12 mt-5">
                            Nro. {this.props.serie} - {this.props.numero}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderDatosClientes(){
        return (
            <div className="row" style={{marginTop: '100px', padding: '80px', border: "solid 1px black", borderRadius: "50px", fontSize: this.props.tamLetraTipo ? this.props.tamLetraTipo: ''}}>
                <div className="col-12">
                    <table>
                        <tr>
                            <td><strong>Cliente:</strong></td>
                            <td>{this.props.cliente}</td>
                        </tr>
                        <tr>
                            <td><strong>RUC:</strong></td>
                            <td>{this.props.rucCliente}</td>
                        </tr>
                        <tr>
                            <td><strong>Dirección:</strong></td>
                            <td>{this.props.direccionCliente}</td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }

    renderDetallesVenta(){
        return (
            <React.Fragment>
                {this.props.detalleGeneralReferencia.length > 0 && (
                    <React.Fragment>
                        <div className="row mt-4" style={{fontSize: this.props.tamLetraDetalles? this.props.tamLetraDetalles: ''}}>
                            <div className="col-12">
                                <strong>Detalle: </strong> {this.props.detalleGeneralReferencia}
                            </div>
                        </div>
                        <hr/>
                    </React.Fragment>
                )}
                <div className="row" style={{marginTop: '60px'}}>
                    <div className="col-12">
                        <div className="datagrid">
                            <table style={{fontSize: this.props.tamLetraDetalles? this.props.tamLetraDetalles: '', width: '100%'}}>
                                <thead>
                                <tr key={0}>
                                    {this.state.cabezarasDescripcion.map((elemento, i) => {
                                        return (
                                            <td align="center" bgcolor="#9b9b9b" style={{borderRight: "1px solid #999", borderLeft: "1px solid #999", borderBottom: "1px solid #999", borderTop: "1px solid #999"}}>
                                                {elemento.toUpperCase()}
                                            </td>
                                        )
                                    })}
                                </tr>
                                </thead>
                                <tbody>
                                {this.props.items.map((elemento, i) => {
                                    if ((this.props.items.length - 1) !== i){
                                        return (
                                            <tr key={i + 1}>
                                                <td align="center" style={{borderLeft: "1px solid #999"}}>{elemento.modal_cantidad}</td>
                                                <td style={{borderLeft: "1px solid #999"}}>{elemento.modal_descripcion}</td>
                                                <td align="right" style={{borderLeft: "1px solid #999"}}>{elemento.modal_precUnitario}</td>
                                                <td align="right" style={{borderLeft: "1px solid #999", borderRight: "1px solid #999"}}>{elemento.modal_precTotal}</td>
                                            </tr>
                                        )
                                    }else{
                                        return (
                                            <tr key={i + 1}>
                                                <td align="center" style={{borderLeft: "1px solid #999", borderBottom: "1px solid #999"}}>{elemento.modal_cantidad}</td>
                                                <td style={{borderLeft: "1px solid #999", borderBottom: "1px solid #999"}}>{elemento.modal_descripcion}</td>
                                                <td align="right" style={{borderLeft: "1px solid #999", borderBottom: "1px solid #999"}}>{elemento.modal_precUnitario}</td>
                                                <td align="right" style={{borderLeft: "1px solid #999", borderBottom: "1px solid #999", borderRight: "1px solid #999"}}>{elemento.modal_precTotal}</td>
                                            </tr>
                                        )
                                    }
                                })}
                                </tbody>
                            </table>
                        </div>
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
            <div className="row" style={{fontSize: this.props.tamLetraTotal? this.props.tamLetraTotal: '', marginTop: '30px'}}>
                <div className="offset-9 col-3">
                    <table>
                        <thead>
                        <tr>
                            <td width="950px"></td>
                            <td></td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Total de Compra:</td>
                            <td> S/ {this.props.totalValorCompra}</td>
                        </tr>

                        <tr>
                            <td>Total Tributos:</td>
                            <td> S/ {this.props.sumatoriaTributos}</td>
                        </tr>

                        <tr>
                            <td>Total Descuento:</td>
                            <td> S/ {this.props.totalDescuento}</td>
                        </tr>

                        <tr>
                            <td>Otros Cargos:</td>
                            <td> S/ {this.props.sumatoriaOtrosCargos}</td>
                        </tr>

                        <tr>
                            <td><strong>TOTAL: </strong></td>
                            <td><strong> S/ {this.props.totalPrecioVenta}</strong></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    renderLetrasPrecio(){
        let ClaseConversor = conversor.conversorNumerosALetras;
        let miConversor = new ClaseConversor();
        console.log("PRECIO TOTAL:", parseInt((parseFloat(this.props.totalPrecioVenta) - parseInt(this.props.totalPrecioVenta)).toFixed(2) * 100));
        return (
            <div className="row" style={{fontSize: this.props.tamLetraTotal? this.props.tamLetraTotal: '', marginTop: '60px'}}>
                <div className="col-12" style={{border: "1px solid black", borderRadius: "30px"}}>
                    SON: {(this.props.totalPrecioVenta > 0) && (miConversor.convertToText(parseInt(this.props.totalPrecioVenta)).toUpperCase())} CON {parseInt((parseFloat(this.props.totalPrecioVenta) - parseInt(this.props.totalPrecioVenta)).toFixed(2) * 100)} / 100 SOLES
                </div>
            </div>
            );
    }

    render(){
        return (
            <div className="container-fluid">
                {this.renderCabecera()}

                {this.renderDatosClientes()}

                {this.renderDetallesVenta()}

                {this.renderTotales()}

                {this.renderLetrasPrecio()}
            </div>
        );
    }
}

A4.propTypes = {
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

export default A4;