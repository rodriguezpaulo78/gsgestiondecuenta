import React, { Component } from 'react';
import SingleInput from '../../common/singleInput';
import Select from '../../common/select';

class ModalAdminEditar extends Component {
    render() {
        return (
            <div className="modal fade"
                id="modalAdminEditar"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="modalAdminEditar"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable"
                    role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalAdminEditar">
                                Editar {this.props.opcionAdmin}
                            </h5>
                            <button type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={this.props.clearNuevo.bind(this)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {/* Formulario modal */}
                            {this.props.opcionAdmin == 'Sucursal' &&
                                <div>
                                    <SingleInput
                                        labelClass={'col'}
                                        inputClass={'col'}
                                        inputType={'text'}
                                        title={'Nombre Sucursal'}
                                        name={'nuevoNombreSucursal'}
                                        controlFunc={this.props.handleInputChange}
                                        content={this.props.nuevoNombreSucursal}
                                    />
                                    <SingleInput
                                        labelClass={'col'}
                                        inputClass={'col'}
                                        inputType={'text'}
                                        title={'Dirección'}
                                        name={'nuevodireccionSucursal'}
                                        controlFunc={this.props.handleInputChange}
                                        content={this.props.nuevodireccionSucursal}
                                    />
                                    <SingleInput
                                        labelClass={'col'}
                                        inputClass={'col'}
                                        inputType={'text'}
                                        title={'Distrito'}
                                        name={'nuevoDistrito'}
                                        controlFunc={this.props.handleInputChange}
                                        content={this.props.nuevoDistrito}
                                    />
                                    <SingleInput
                                        labelClass={'col'}
                                        inputClass={'col'}
                                        inputType={'text'}
                                        title={'Provincia'}
                                        name={'nuevoProvincia'}
                                        controlFunc={this.props.handleInputChange}
                                        content={this.props.nuevoProvincia}
                                    />
                                    <SingleInput
                                        labelClass={'col'}
                                        inputClass={'col'}
                                        inputType={'text'}
                                        title={'Departamento'}
                                        name={'nuevoDepartamento'}
                                        controlFunc={this.props.handleInputChange}
                                        content={this.props.nuevoDepartamento}
                                    />
                                </div>
                            }
                            {this.props.opcionAdmin == 'Partida' &&
                                <div>
                                    <SingleInput
                                        labelClass={'col'}
                                        inputClass={'col'}
                                        inputType={'text'}
                                        title={'Nombre Partida'}
                                        name={'nuevoNombrePartida'}
                                        controlFunc={this.props.handleInputChange}
                                        content={this.props.nuevoNombrePartida}
                                    />
                                    <Select
                                        labelClass={'col'}
                                        inputClass={'col'}
                                        title={'Grupo'}
                                        name={'nuevoGrupoPartida'}
                                        placeholder={'Grupo de Partida'}
                                        controlFunc={this.props.handleSelectChange}
                                        options={opciones_nuevo_grupo_partida}
                                        selectedOption={this.props.nuevoGrupoPartida} />
                                    {this.props.nuevoGrupoPartida == 'Otro' &&
                                        <SingleInput
                                            labelClass={'col'}
                                            inputClass={'col'}
                                            inputType={'text'}
                                            title={'Nuevo Grupo'}
                                            name={'nuevoOtroGrupoPartida'}
                                            controlFunc={this.props.handleInputChange}
                                            content={this.props.nuevoOtroGrupoPartida}
                                        />
                                    }
                                </div>
                            }
                            {this.props.opcionAdmin == 'Fuente' &&
                                <div>
                                    <SingleInput
                                        labelClass={'col'}
                                        inputClass={'col'}
                                        inputType={'text'}
                                        title={'Nombre Fuente'}
                                        name={'nuevoNombreFuente'}
                                        controlFunc={this.props.handleInputChange}
                                        content={this.props.nuevoNombreFuente}
                                    />
                                </div>
                            }
                            {this.props.opcionAdmin == 'Producto' &&
                                <div>
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
                                </div>
                            }
                        </div>
                        <p className="form-text text-muted text-center custom-footer-text">
                            Agregue un nuevo elemento y haga click en Registrar.
                                </p>
                        <div className="modal-footer">
                            <button type="button"
                                className="btn btn-secondary"
                                onClick={this.props.clearNuevo.bind(this, this.props.opcionAdmin)}
                                data-dismiss="modal">
                                Cancelar
                                    </button>
                            <div className="mt-2">
                                <button type="submit"
                                    className="btn btn-primary mb-2"
                                    onClick={this.props.saveNuevo.bind(this, this.props.opcionAdmin)}
                                    data-dismiss="modal">
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

const opciones_nuevo_grupo_partida = ['Grupo 1', 'Grupo 2', 'Otro'];

export default ModalAdminEditar;