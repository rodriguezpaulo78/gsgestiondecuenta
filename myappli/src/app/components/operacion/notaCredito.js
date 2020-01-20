import React, { Component } from 'react';
import SingleInput from '../common/singleInput';

class NotaCredito extends Component {
    render() {
        return (
            <div id="notaCredito">
                {this.props.tipoComprobante == 3 &&
                    <div>
                        <p className="form-text text-muted"> Información Nota de Crédito</p>
                        <div className="row">
                            <div className="col-8 mt-1">
                                <SingleInput
                                    labelClass={'col-3'}
                                    inputClass={'col-8'}
                                    inputType={'text'}
                                    title={'Código Motivo'}
                                    name={'codMotivoNC'}
                                    controlFunc={this.props.handleInputChange}
                                    content={this.props.codMotivoNC}
                                    max={'11'}
                                    obligatory={(this.props.tipoComprobante == 3) ? true : false}
                                
                                />
                                <SingleInput
                                    labelClass={'col-3'}
                                    inputClass={'col-8'}
                                    inputType={'text'}
                                    title={'Descripción Motivo'}
                                    name={'descMotivoNC'}
                                    controlFunc={this.props.handleInputChange}
                                    content={this.props.descMotivoNC}
                                    max={'300'}
                                    obligatory={(this.props.tipoComprobante == 3) ? true : false}

                                />
                                <div className="row mt-1">

                                    <div className="col-3">
                                        <label className="text-danger">
                                            Tipo de Comprobante
                                </label>
                                    </div>
                                    <div className="col-8">
                                        <select
                                            className="form-control form-control-sm"
                                            name="tipoComprobanteNC"
                                            onChange={this.props.handleSelectChange}
                                            value={this.props.tipoComprobanteNC}>
                                            <option value="" disabled="disabled">
                                                Tipo de comprobante
                                        </option>
                                            {opciones_tipo_comprobanteNC.map(opt => {
                                                return (
                                                    <option key={opt}
                                                        value={opt}>
                                                        {opt == 0 && "Boleta"}
                                                        {opt == 1 && "Factura"}
                                                        {opt == 2 && "Otro"}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                                {this.props.tipoComprobanteNC == 2 &&
                                    <SingleInput
                                        labelClass={'col-3'}
                                        inputClass={'col-8'}
                                        inputType={'text'}
                                        title={'Comprobante'}
                                        name={'otrotipoComprobanteNC'}
                                        controlFunc={this.props.handleInputChange}
                                        content={this.props.otrotipoComprobanteNC}
                                        max={'30'}
                                    obligatory={(this.props.tipoComprobante == 3) ? true : false}

                                    />}
                                <div className="row">
                                    <div className="col-6">
                                        <SingleInput
                                            labelClass={'col-6'}
                                            inputClass={'col-5'}
                                            inputType={'text'}
                                            title={'Serie'}
                                            name={'numSerieComprobanteNC'}
                                            controlFunc={this.props.handleInputChange}
                                            content={this.props.numSerieComprobanteNC}
                                            max={'4'}
                                    obligatory={(this.props.tipoComprobante == 3) ? true : false}

                                        />
                                    </div>
                                    <div className="col-6">
                                        <div className="row mt-1">
                                            <div className="col-4">
                                                <label className="text-danger">
                                                    Número
                                        </label>
                                            </div>
                                            <div className="col-6">
                                                <input className="form-control form-control-sm"
                                                    type="tel"
                                                    maxLength="8"
                                                    name="numComprobanteNC"
                                                    onChange={this.props.handleInputChange}
                                                    value={this.props.numComprobanteNC}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 mt-1">
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

const opciones_tipo_comprobanteNC = [0, 1, 2]; //boleta, factura, otro

export default NotaCredito;
