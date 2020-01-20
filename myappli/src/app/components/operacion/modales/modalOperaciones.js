import React, { Component } from 'react';

class ModalOperaciones extends Component {
    render() {
        return (
            <div className="modal fade"
                id="modalOperaciones"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="modalOperaciones"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-lg"
                    role="document">
                    <div className="modal-content" style={{ height: '500px' }}>
                        <div className="modal-header">
                            <div className="col">
                                <h5 className="modal-title" id="modalOperaciones">
                                    Elegir Tipo de Operación
                                </h5>
                            </div>
                            <div className="col text-center">
                                <label>
                                    Buscar
                                </label>
                                <input
                                    className="ml-2 text-center"
                                    type="text"
                                    id="inputSearchOperaciones"
                                    ref={this.props.ref_operacion}
                                    onKeyUp={this.props.buscarPor.bind(this, 'buscar_por_operacion')}
                                />
                                <button className="ml-2 btn btn-outline-primary btn-sm my-2 my-sm-0"
                                    type="submit">
                                    <i className="ml-1 fas fa-search"></i>
                                </button>
                            </div>
                            <button type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={this.props.clearModal.bind(this, 'Operacion')}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {/* Formulario modal */}
                            <div className="row">
                                <div className="table-responsive text-center mt-2">
                                    <table className="table table-sm table-bordered" id="idTablaOperaciones">
                                        <thead>
                                            <tr className="clickable-row">
                                                {this.props.cabeceras_modal_select.map((value, i) => {
                                                    return (
                                                        <th key={i}>
                                                            {value}
                                                        </th>
                                                    )
                                                })}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="custom-doubleclicked"
                                                data-dismiss="modal"
                                                onClick={this.props.getFilaOperacion.bind(this, '', '')}>
                                                <td> -
                                                </td>
                                                <td>
                                                    -
                                                </td>
                                            </tr>
                                            {Operaciones.map((value, i) => {
                                                return (
                                                    <tr className="custom-doubleclicked"
                                                        key={i}
                                                        data-dismiss="modal"
                                                        onClick={this.props.getFilaOperacion.bind(this, value.tipOperacion, value.nombreOperacion)}>
                                                        <td>
                                                            {value.tipOperacion}
                                                        </td>
                                                        <td>
                                                            {value.nombreOperacion}
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <p className="form-text text-muted text-center custom-footer-text">
                            Busque un elemento y luego haga click sobre éste para registrarlo.
                        </p>
                        <div className="modal-footer">
                            <button type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={this.props.clearModal.bind(this, 'Operacion')}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const Operaciones = [
    { tipOperacion: "101", nombreOperacion: "Venta interna" },
    { tipOperacion: "112", nombreOperacion: "Venta Interna - Sustenta Gastos Deducibles Persona Natural" },
    { tipOperacion: "113", nombreOperacion: "Venta Interna-NRUS" },
    { tipOperacion: "200", nombreOperacion: "Exportación de Bienes" },
    { tipOperacion: "201", nombreOperacion: "Exportación de Servicios – Prestación servicios realizados íntegramente en el país" },
    { tipOperacion: "202", nombreOperacion: "Exportación de Servicios – Prestación de servicios de hospedaje No Domiciliado" },
    { tipOperacion: "203", nombreOperacion: "Exportación de Servicios – Transporte de navieras" },
    { tipOperacion: "204", nombreOperacion: "Exportación de Servicios – Servicios a naves y aeronaves de bandera extranjera" },
    { tipOperacion: "205", nombreOperacion: "Exportación de Servicios - Servicios que conformen un Paquete Turístico" },
    { tipOperacion: "206", nombreOperacion: "Exportación de Servicios – Servicios complementarios al transporte de carga" },
    { tipOperacion: "207", nombreOperacion: "Exportación de Servicios – Suministro de energía eléctrica a favor de sujetos domiciliados en ZED" },
    { tipOperacion: "208", nombreOperacion: "Exportación de Servicios – Prestación servicios realizados parcialmente en el extranjero" },
    { tipOperacion: "301", nombreOperacion: "Operaciones con Carta de porte aéreo (emitidas en el ámbito nacional)" },
    { tipOperacion: "302", nombreOperacion: "Operaciones de Transporte ferroviario de pasajeros" },
    { tipOperacion: "303", nombreOperacion: "Operaciones de Pago de regalía petrolera" },
    { tipOperacion: "401", nombreOperacion: "Ventas no domiciliados que no califican como exportación" },
    { tipOperacion: "1001", nombreOperacion: "Operación Sujeta a Detracción" },
    { tipOperacion: "1002", nombreOperacion: "Operación Sujeta a Detracción- Recursos Hidrobiológicos" },
    { tipOperacion: "1003", nombreOperacion: "Operación Sujeta a Detracción- Servicios de Transporte Pasajeros" },
    { tipOperacion: "1004", nombreOperacion: "Operación Sujeta a Detracción- Servicios de Transporte Carga" },
    { tipOperacion: "2001", nombreOperacion: "Operación Sujeta a Percepción" }
];

export default ModalOperaciones;