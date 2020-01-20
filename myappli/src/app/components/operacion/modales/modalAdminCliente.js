import React, { Component } from 'react';
import SingleInput from '../../common/singleInput';

class ModalAdminCliente extends Component {
    render() {
        return (
            <div className="modal fade"
                id="modalAdminCliente"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="modalAdminCliente"
                aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-scrollable"
                    role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalAdminCliente">
                                Crear {this.props.opcionAdmin}
                            </h5>
                            <label className="text-primary ml-1 mt-1">
                                <i className="fas fa-question-circle" data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="Si el número de documento existe, se actualizarán los datos relacionados a este número." ></i>
                            </label>
                            <button type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={this.props.clearNuevo.bind(this)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body h-75">
                            {/* Formulario modal */}
                            <div className="row">
                                <div className="col">
                                    <div className="row">
                                        <div className="ml-5 col-4">
                                            Tipo de Documento
                                                 </div>
                                        <div className="col-6">
                                            <select className="form-control form-control-sm"
                                                name="nuevoTipDocUsuario"
                                                onChange={this.props.handleSelectChange}
                                                value={this.props.nuevoTipDocUsuario}
                                            >
                                                <option value="" disabled="disabled">
                                                    Tipo de documento
                                                </option>
                                                {Documentos.map((value, i) => {
                                                    return (
                                                        <option key={i} value={value.cod}>
                                                            {value.nombre}
                                                        </option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <SingleInput
                                        labelClass={'ml-5 col-4'}
                                        inputClass={'col-6'}
                                        inputType={'number'}
                                        title={'Número de documento'}
                                        name={'nuevoNumDocUsuario'}
                                        controlFunc={this.props.handleInputChange}
                                        content={this.props.nuevoNumDocUsuario}
                                        max={'15'}
                                    />

                                    <SingleInput
                                        labelClass={'ml-5 col-4'}
                                        inputClass={'col-6'}
                                        inputType={'text'}
                                        title={'Razón Social'}
                                        name={'nuevoRazSocial'}
                                        controlFunc={this.props.handleInputChange}
                                        content={this.props.nuevoRazSocial}
                                    />
                                    <SingleInput
                                        labelClass={'ml-5 col-4'}
                                        inputClass={'col-6'}
                                        inputType={'text'}
                                        title={'Dirección'}
                                        name={'nuevoDesDireccionCliente'}
                                        controlFunc={this.props.handleInputChange}
                                        content={this.props.nuevoDesDireccionCliente}
                                    />
                                    <SingleInput
                                        labelClass={'ml-5 col-4'}
                                        inputClass={'col-6'}
                                        inputType={'tel'}
                                        title={'Teléfono'}
                                        name={'nuevoTelefonoCliente'}
                                        controlFunc={this.props.handleInputChange}
                                        content={this.props.nuevoTelefonoCliente}
                                        max={'15'}
                                    />
                                    <SingleInput
                                        labelClass={'ml-5 col-4'}
                                        inputClass={'col-6'}
                                        inputType={'text'}
                                        title={'Correo electrónico'}
                                        name={'nuevoCorreoCliente'}
                                        controlFunc={this.props.handleInputChange}
                                        content={this.props.nuevoCorreoCliente}
                                        max={'45'}
                                    />
                                    <SingleInput
                                        labelClass={'ml-5 col-4'}
                                        inputClass={'col-6'}
                                        inputType={'text'}
                                        title={'Código país'}
                                        name={'nuevoCodPaisCliente'}
                                        controlFunc={this.props.handleInputChange}
                                        content={this.props.nuevoCodPaisCliente}
                                        max={'2'}
                                    />
                                    <SingleInput
                                        labelClass={'ml-5 col-4'}
                                        inputClass={'col-6'}
                                        inputType={'text'}
                                        title={'Código ubigeo'}
                                        name={'nuevoCodUbigeoCliente'}
                                        controlFunc={this.props.handleInputChange}
                                        content={this.props.nuevoCodUbigeoCliente}
                                        max={'15'}
                                    />
                                </div>
                            </div>
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
                                    onClick={this.props.saveNuevo.bind(this, this.props.opcionAdmin)}>
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

const Documentos = [{ cod: "0", nombre: "OTROS TIPOS DE DOCUMENTOS" },
{ cod: "1", nombre: "DOCUMENTO NACIONAL DE IDENTIDAD (DNI)" },
{ cod: "4", nombre: "CARNET DE EXTRANJERIA" },
{ cod: "6", nombre: "REGISTRO ÚNICO DE CONTRIBUYENTES (RUC)" },
{ cod: "7", nombre: "PASAPORTE" },
{ cod: "A", nombre: "CÉDULA DIPLOMÁTICA DE IDENTIDAD" }];

export default ModalAdminCliente;