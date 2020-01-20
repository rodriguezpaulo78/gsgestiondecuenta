import React, { Component } from 'react';
import SingleInput from '../common/singleInput';
import ReadOnlySingleInput from '../common/readonlySingleInput';

class InformacionGeneral extends Component {
    constructor(props){
        super(props);

    }


    render() {
        return (
            <div id="informacionGeneral">
                <p className="form-text text-muted"> Información general</p>
                <div className="row">
                    <div className="col-4">
                        {/* tipo operacion*/}
                        <div className="row">
                            <div className="col-8">
                                <ReadOnlySingleInput
                                    labelClass={'col'}
                                    inputClass={'col'}
                                    inputType={'text'}
                                    title={'Sucursal'}
                                    name={'nombreSucursal'}
                                    content={(this.props.codSucursal == null ||
                                        this.props.codSucursal == '') ? '' : this.props.nombreSucursal}
                                    obligatory={(this.props.tipoComprobante == 4 || this.props.tipoComprobante == 0 ||
                                        this.props.tipoComprobante == 1) ? true : false}
                                />
                            </div>
                            <div className="col-4">
                                <small className="form-text text-muted">
                                    <button
                                        type="button"
                                        className="btn btn-sm text-primary"
                                        name="agregar_sucursal"
                                        data-toggle="modal"
                                        data-target="#modalSucursales"
                                        onClick={this.props.loadMultipleSelectValues.bind(this, 'agregar_sucursal')}>
                                        Agregar
                                        <i className="ml-2 fas fa-plus-circle"></i>
                                    </button>
                                </small>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8">
                                <ReadOnlySingleInput
                                    labelClass={'col'}
                                    inputClass={'col'}
                                    inputType={'text'}
                                    title={'Tipo de Operación'}
                                    name={'tipOperacion'}
                                    content={
                                        (this.props.tipOperacion == null || this.props.tipOperacion == '')
                                            ? '-'
                                            : this.props.tipOperacion + '-' + this.props.nombreOperacion}
                                />
                            </div>
                            <div className="col-4">
                                <small className="form-text text-muted">
                                    <button
                                        type="button"
                                        className="btn btn-sm text-primary"
                                        name="agregar_operacion"
                                        data-toggle="modal"
                                        data-target="#modalOperaciones"
                                        onClick={this.props.loadMultipleSelectValues.bind(this, 'agregar_operacion')}>
                                        Agregar
                                        <i className="ml-2 fas fa-plus-circle"></i>
                                    </button>
                                </small>
                            </div>
                        </div>
                        <SingleInput
                            labelClass={'col-4'}
                            inputClass={'col-6'}
                            inputType={'number'}
                            title={'Código Mes'}
                            name={'codMes'}
                            controlFunc={this.props.handleInputChange}
                            content={this.props.codMes}
                            max={'6'}
                            obligatory={(this.props.tipoComprobante == 4 || this.props.tipoComprobante == 0 ||
                                this.props.tipoComprobante == 1) ? true : false}
                        />
                        <br />
                        <div className="row">
                            <div className="col-8">
                                <ReadOnlySingleInput
                                    labelClass={'col'}
                                    inputClass={'col'}
                                    inputType={'text'}
                                    title={'Fuente'}
                                    name={'nombreFuente'}
                                    content={this.props.nombreFuente}
                                    obligatory={(this.props.tipoComprobante == 4 || this.props.tipoComprobante == 0 ||
                                        this.props.tipoComprobante == 1) ? true : false}
                                />
                            </div>
                            <div className="col-4">
                                <small className="form-text text-muted">
                                    <button
                                        type="button"
                                        className="btn btn-sm text-primary"
                                        name="agregar_fuente"
                                        data-toggle="modal"
                                        data-target="#modalFuentes"
                                        onClick={this.props.loadMultipleSelectValues.bind(this, 'agregar_fuente')}>
                                        Agregar
                                        <i className="ml-2 fas fa-plus-circle"></i>
                                    </button>
                                </small>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="row">
                            <div className="col">
                                <ReadOnlySingleInput
                                    labelClass={'col'}
                                    inputClass={'col'}
                                    inputType={'text'}
                                    title={'Código Partida'}
                                    name={'idPartida'}
                                    content={this.props.idPartida == 1 ? '' : this.props.idPartida}
                                    obligatory={(this.props.tipoComprobante == 4 || this.props.tipoComprobante == 0 ||
                                        this.props.tipoComprobante == 1) ? true : false}
                                />
                            </div>
                            <div className="col-4">
                                <small className="form-text text-muted">
                                    <button
                                        type="button"
                                        className="btn btn-sm text-primary"
                                        name="agregar_cod_partida"
                                        data-toggle="modal"
                                        data-target="#modalPartidas"
                                        onClick={this.props.loadMultipleSelectValues.bind(this, 'agregar_cod_partida')}>
                                        Agregar
                                        <i className="ml-2 fas fa-plus-circle"></i>
                                    </button>
                                </small>
                            </div>
                        </div>
                        <ReadOnlySingleInput
                            labelClass={'col-4'}
                            inputClass={'col-6'}
                            inputType={'text'}
                            title={'Nombre Partida'}
                            name={'nombrePartida'}
                            content={this.props.nombrePartida}
                            obligatory={(this.props.tipoComprobante == 4 || this.props.tipoComprobante == 0 ||
                                this.props.tipoComprobante == 1) ? true : false}
                        />
                        <ReadOnlySingleInput
                            labelClass={'col-4'}
                            inputClass={'col-6'}
                            inputType={'text'}
                            title={'Grupo Partida'}
                            name={'grupoPartida'}
                            content={this.props.grupoPartida == 1 ? '' : this.props.grupoPartida}

                            obligatory={(this.props.tipoComprobante == 4 || this.props.tipoComprobante == 0 ||
                                this.props.tipoComprobante == 1) ? true : false}
                        />

                        {this.props.tipoComprobante != 3 &&
                            <SingleInput
                                labelClass={'col-4'}
                                inputClass={'col-6'}
                                inputType={'number'}
                                title={'Código Operación'}
                                name={'codOperacionRelacionado'}
                                controlFunc={this.props.handleInputChange}
                                content={this.props.codOperacionRelacionado}
                                obligatory={(this.props.tipoComprobante == 2) ? true : false}
                            />}
                    </div>
                    <div className="col-4">
                        <div className="row">
                            <div className="col text-danger">
                                Tipo de comprobante
                            </div>
                            <div className="col">
                                <select className="form-control form-control-sm"
                                    name="tipoComprobante"
                                    onChange={this.props.handleSelectChange}
                                    value={this.props.tipoComprobante}>
                                    <option value="" disabled="disabled">
                                        Tipo de comprobante
                                    </option>
                                    {opciones_tipo_comprobante.map(opt => {
                                        return (
                                            <option key={opt}
                                                value={opt}>
                                                {opt == 0 && "Boleta"}
                                                {opt == 1 && "Factura"}
                                                {opt == 3 && "Nota de Crédito"}
                                                {opt == 2 && "Pago"}
                                                {opt == 4 && "Otro"}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <SingleInput
                                    labelClass={'col-4'}
                                    inputClass={'col-8'}
                                    inputType={'text'}
                                    title={'Serie'}
                                    name={'numSerieComprobante'}
                                    controlFunc={this.props.handleInputChange}
                                    content={this.props.numSerieComprobante}
                                    max={'4'}
                                    obligatory={(this.props.tipoComprobante == 0 ||
                                        this.props.tipoComprobante == 1) ? true : false}
                                />
                            </div>
                            <div className="col">
                                <div className="row mt-1">
                                    <div className="col-4">
                                        {(this.props.tipoComprobante == 0 ||
                                            this.props.tipoComprobante == 1) ?
                                            <label className="text-danger">
                                                Número
                                            </label> :
                                            <label>
                                                Número
                                        </label>}
                                    </div>
                                    <div className="col-8">
                                        <input className="form-control form-control-sm"
                                            type="tel"
                                            maxLength="8"
                                            name="numComprobante"
                                            onChange={this.props.handleInputChange}
                                            value={this.props.numComprobante}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <SingleInput
                            labelClass={'col text-danger'}
                            inputClass={'col'}
                            inputType={'date'}
                            title={'Fecha de Emisión'}
                            name={'fecEmision'}
                            controlFunc={this.props.handleInputChange}
                            content={this.props.fecEmision}
                        />
                        <ReadOnlySingleInput
                            labelClass={'col text-danger'}
                            inputClass={'col'}
                            inputType={'text'}
                            title={'Hora de Emisión'}
                            name={'horEmision'}
                            content={this.props.horEmision}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const opciones_tipo_comprobante = [0, 1, 3, 2, 4]; //boleta, factura, nota credito, pago, otro

export default InformacionGeneral;
