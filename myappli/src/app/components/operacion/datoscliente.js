import React, { Component } from 'react';
import SingleInput from '../common/singleInput';
import ReadOnlySingleInput from '../common/readonlySingleInput';
import Select from '../common/select';

const opciones_tipo_moneda = ['PEN', 'USD'];

class DatosCliente extends Component {
    render() {
        return (
            <div id="datosCliente">
                <p className="form-text text-muted"> Datos del cliente
                </p>
                <div className="row">
                    <div className="col-8">
                        <div className="row">
                            <div className="col-6">
                                <SingleInput
                                    labelClass={'col'}
                                    inputClass={'col'}
                                    inputType={'text'}
                                    title={'Número de documento'}
                                    name={'numDocUsuario'}
                                    controlFunc={this.props.handleInputChange}
                                    content={this.props.numDocUsuario}
                                    max={'15'}
                                />
                            </div>
                            <div className="col-4">
                                <small className="form-text text-muted">
                                    <a
                                        className="text-primary"
                                        name="agregar_num_documento"
                                        onClick={this.props.buscarInfoCliente.bind(this,this.props.numDocUsuario)}>
                                        Buscar
                                        <i className="ml-1 fas fa-search"></i>
                                    </a>
                                    <a
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title="Limpiar info del cliente"
                                        className="ml-3 text-danger"
                                        onClick={this.props.clearInfoCliente.bind(this)}>
                                        <i className="fas fa-trash-alt"></i>
                                    </a>
                                    <button
                                        type="button"
                                        className="btn btn-sm ml-3 text-success"
                                        name="admin_cliente"
                                        data-toggle="modal"
                                        data-target="#modalAdminCliente"
                                        onClick={this.props.setAdminOption.bind(this, 'Cliente')}>
                                        Crear
                                        <i className=" ml-2 fas fa-plus-circle"></i>
                                    </button>
                                </small>
                            </div>
                        </div>
                        <ReadOnlySingleInput
                            labelClass={'col-3'}
                            inputClass={'col-8'}
                            title={'Tipo de documento'}
                            name={'tipDocUsuario'}
                            content={this.props.tipDocUsuario}
                            inputType={'text'} />
                        <ReadOnlySingleInput
                            labelClass={'col-3'}
                            inputClass={'col-8'}
                            inputType={'text'}
                            title={'Denominación o Razón Social'}
                            name={'razSocial'}
                            content={this.props.razSocial}
                        />
                        <ReadOnlySingleInput
                            labelClass={'col-3'}
                            inputClass={'col-8'}
                            inputType={'text'}
                            title={'Dirección del cliente'}
                            name={'desDireccionCliente'}
                            content={this.props.desDireccionCliente}
                        />
                        <ReadOnlySingleInput
                            labelClass={'col-3'}
                            inputClass={'col-8'}
                            inputType={'email'}
                            title={'Correo electrónico'}
                            name={'correoCliente'}
                            content={this.props.correoCliente}
                        />
                        <div className="row">
                            <div className="col-6">
                                <ReadOnlySingleInput
                                    labelClass={'col'}
                                    inputClass={'col'}
                                    inputType={'tel'}
                                    title={'Teléfono'}
                                    name={'telefonoCliente'}
                                    content={this.props.telefonoCliente}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <ReadOnlySingleInput
                                    labelClass={'col'}
                                    inputClass={'col'}
                                    inputType={'number'}
                                    title={'Código país'}
                                    name={'codPaisCliente'}
                                    content={this.props.codPaisCliente}
                                />
                            </div>
                            <div className="col-5">
                                <ReadOnlySingleInput
                                    labelClass={'col ml-4'}
                                    inputClass={'col'}
                                    inputType={'number'}
                                    title={'Código ubigeo'}
                                    name={'codUbigeoCliente'}
                                    content={this.props.codUbigeoCliente}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        {(this.props.movimiento == 0 && this.props.movimiento != '') && // 0 egreso
                            <SingleInput
                                labelClass={'col'}
                                inputClass={'col'}
                                inputType={'date'}
                                title={'DUA'}
                                name={'dua'}
                                controlFunc={this.props.handleInputChange}
                                content={this.props.dua}
                            />}
                        {((this.props.movimiento == 1 && this.props.tipoComprobante == 0) ||
                            (this.props.movimiento == 1 && this.props.tipoComprobante == 1) ||
                            (this.props.movimiento == 1 && this.props.tipoComprobante == 4)) && //0 boleta 1 factura
                            <SingleInput
                                labelClass={'col'}
                                inputClass={'col'}
                                inputType={'number'}
                                title={'Días a crédito'}
                                name={'aCreditoDias'}
                                controlFunc={this.props.handleInputChange}
                                content={this.props.aCreditoDias}
                            />}
                        {( this.props.movimiento == 1 && (this.props.tipoComprobante == 0 || this.props.tipoComprobante == 1 || this.props.tipoComprobante == 4))
                         && //otro
                            <ReadOnlySingleInput
                                labelClass={'col'}
                                inputClass={'col'}
                                inputType={'date'}
                                title={'Fecha de Vencimiento'}
                                name={'fecVencimiento'}
                                content={this.props.fecVencimiento}
                            />}
                        <Select
                            labelClass={'col text-danger'}
                            inputClass={'col'}
                            title={'Tipo de Moneda'}
                            name={'tipMoneda'}
                            placeholder={'Tipo de Moneda'}
                            controlFunc={this.props.handleSelectChange}
                            options={opciones_tipo_moneda}
                            notJson={true}
                            selectedOption={this.props.tipMoneda}
                            selectAll={false}
                        />

                        {this.props.tipMoneda === 'USD' &&
                            <SingleInput
                                labelClass={'col text-danger'}
                                inputClass={'col'}
                                inputType={'number'}
                                title={'Tipo de Cambio'}
                                name={'tipoCambio'}
                                controlFunc={this.props.handleInputChange}
                                content={this.props.tipoCambio}
                            />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default DatosCliente;
