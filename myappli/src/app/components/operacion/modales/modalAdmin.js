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
                                Crear {this.props.opcionAdmin}
                                <label className="text-primary ml-1 mt-1">
                                    <i className="fas fa-question-circle" data-toggle="tooltip"
                                        data-placement="bottom"
                                        title="Si el nombre existe se actualizarán los datos relacionados a este nombre, si no se creará uno nuevo." ></i>
                                </label>
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
                                    <div className="row">
                                        <div className="col">
                                            Grupo de Partida
                                        </div>
                                        <div className="col">
                                            <select className="form-control form-control-sm"
                                                name="nuevoGrupoPartida"
                                                onChange={this.props.handleSelectChange}
                                                value={this.props.nuevoGrupoPartida}>
                                                <option value="" disabled="disabled">
                                                    Grupo de Partida
                                                </option>
                                                {this.props.opciones_nuevo_grupo_partida.map((opt, i) => {
                                                    return (
                                                        opt.nombreGrupo!= ''&&
                                                        <option key={i}
                                                            value={opt.idGrupoPartida}>
                                                            {opt.nombreGrupo}
                                                        </option>
                                                    )
                                                })}
                                                <option value="OTRO">
                                                    OTRO
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    {this.props.nuevoGrupoPartida == 'OTRO' &&
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
                                     <SingleInput
                                        labelClass={'col'}
                                        inputClass={'col'}
                                        inputType={'number'}
                                        title={'Saldo Inicial'}
                                        name={'nuevoSaldoFuente'}
                                        controlFunc={this.props.handleInputChange}
                                        content={this.props.nuevoSaldoFuente}
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
                                    <Select
                                        name={'nuevoSucursalProducto'}
                                        title={'Sucursal'}
                                        labelClass={'col'}
                                        inputClass={'col'}
                                        keyName={'codSucursal'}
                                        valueName={'nombreSucursal'}
                                        options={this.props.sucursales}
                                        controlFunc={this.props.handleSelectChange}
                                        content={this.props.nuevoSucursalProducto}
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