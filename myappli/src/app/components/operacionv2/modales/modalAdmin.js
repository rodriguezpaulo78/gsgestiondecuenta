import React, { Component } from 'react';
import SingleInput from '../../common/singleInput';
import Select from "../../common/select";

class ModalAdmin extends Component {
    render() {
        return (
            <div className="modal fade"
                id="modalAdmin"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="modalAdmin"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable"
                    role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalAdmin">
                                Crear {this.props.opcionAdminOld}
                                <label className="text-primary ml-1 mt-1">
                                    <i className="fas fa-question-circle" data-toggle="tooltip"
                                        data-placement="bottom"
                                        title="Si el nombre existe se actualizarán los datos relacionados a este nombre, si no se creará uno nuevo." ></i>
                                </label>
                            </h5>
                            <button type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {/* Formulario modal */}
                                <SingleInput
                                    labelClass={'col'}
                                    inputClass={'col'}
                                    inputType={'text'}
                                    title={'Nombre Producto'}
                                    name={'nuevoNombreProducto'}
                                    controlFunc={this.props.handleInputChange}
                                    content={this.props.nuevoNombreProducto}
                                    max={'50'}
                                />
                                <Select
                                    name={'nuevoSucursalProducto'}
                                    title={'Sucursal'}
                                    labelClass={'col'}
                                    inputClass={'col'}
                                    keyName={'codSucursal'}
                                    valueName={'nombreSucursal'}
                                    options={this.props.sucursales}
                                    controlFunc={this.props.handleSelectChange}
                                    selectedOption={this.props.nuevoSucursalProducto}
                                />
                                <Select
                                    name={'nuevoUnidadMedidaProducto'}
                                    title={'Unidad Medida'}
                                    labelClass={'col'}
                                    inputClass={'col'}
                                    keyName={'codUnidadMedida'}
                                    valueName={'nombre'}
                                    options={this.props.opcionesTipoMedida}
                                    controlFunc={this.props.handleSelectChange}
                                    content={this.props.nuevoUnidadMedidaProducto}
                                />
                                <SingleInput
                                    labelClass={'col'}
                                    inputClass={'col'}
                                    inputType={'number'}
                                    title={'Precio'}
                                    name={'nuevoPrecioProducto'}
                                    controlFunc={this.props.handleInputChange}
                                    content={this.props.nuevoPrecioProducto}
                                    max={'6'}
                                />
                                <SingleInput
                                    labelClass={'col'}
                                    inputClass={'col'}
                                    inputType={'number'}
                                    title={'Stock'}
                                    name={'nuevoStockProducto'}
                                    controlFunc={this.props.handleInputChange}
                                    content={this.props.nuevoStockProducto}
                                    max={'6'}
                                />
                                <SingleInput
                                    labelClass={'col'}
                                    inputClass={'col'}
                                    inputType={'number'}
                                    title={'Costo de Venta'}
                                    name={'nuevoCostoVenta'}
                                    controlFunc={this.props.handleInputChange}
                                    content={this.props.nuevoCostoVenta}
                                    max={'6'}
                                />
                                <Select
                                    name={'nuevoIdPartida'}
                                    title={'Partida'}
                                    labelClass={'col'}
                                    inputClass={'col'}
                                    keyName={'idPartida'}
                                    valueName={'nombrePartida'}
                                    options={this.props.listaPartidas}
                                    controlFunc={this.props.handleSelectChange}
                                    selectedOption={this.props.nuevoIdPartida}
                                />
                                <SingleInput
                                    labelClass={'col'}
                                    inputClass={'col'}
                                    inputType={'date'}
                                    title={'Fecha de Vencimiento'}
                                    name={'nuevaFechaVencimiento'}
                                    controlFunc={this.props.handleInputChange}
                                    content={this.props.nuevaFechaVencimiento}
                                />
                                <SingleInput
                                    labelClass={'col'}
                                    inputClass={'col'}
                                    inputType={'number'}
                                    title={'Num. de Serie'}
                                    name={'nuevoSerieProducto'}
                                    controlFunc={this.props.handleInputChange}
                                    content={this.props.nuevoSerieProducto}
                                    max={'15'}
                                />
                        </div>
                        <p className="form-text text-muted text-center custom-footer-text">
                            Agregue un nuevo elemento y haga click en Registrar.
                                </p>
                        <div className="modal-footer">
                            <button type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal">
                                Cancelar
                                    </button>
                            <div className="mt-2">
                                <button type="submit"
                                    className="btn btn-primary mb-2"
                                    onClick={this.props.saveNuevo.bind(this, 'Producto')}
                                >
                                    Registrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default ModalAdmin;