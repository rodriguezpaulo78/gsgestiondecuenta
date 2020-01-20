import React, { Component } from 'react';
import SingleInput from '../common/singleInput';
import ReadOnlySingleInput from '../common/readonlySingleInput';

class Totales extends Component {
    render() {
        return (
            <div id="totales">
                <div className="row">
                    <div className="col-7">
                    </div>
                    <div className="col-5">
                        <ReadOnlySingleInput
                            labelClass={'col-5'}
                            inputClass={'col-4'}
                            inputType={'number'}
                            title={'Total Valor de Compra/Venta'}
                            content={this.props.sumTotValVenta}
                        />
                        <ReadOnlySingleInput
                            labelClass={'col-5'}
                            inputClass={'col-4'}
                            inputType={'number'}
                            title={'Sumatoria de Tributos'}
                            content={this.props.sumTotTributos}
                        />
                        <div className="row mt-1">
                            <div className="col-5">
                                <label>
                                    Total Descuento
                            </label>
                                 
                            </div>
                            <div className="col-4">
                                <input
                                    style={{ textTransform: 'uppercase' }}
                                    className="form-control form-control-sm"
                                    name={'sumDescTotal'}
                                    type={'number'}
                                    value={this.props.sumDescTotal}
                                    onChange={this.props.handleInputChange}
                                    min="0"
                                    placeholder={'0'}
                                />
                            </div>
                        </div>

                        <SingleInput
                            labelClass={'col-5'}
                            inputClass={'col-7'}
                            inputType={'number'}
                            title={'Sumatoria otros cargos'}
                            name={'sumOtrosCargos'}
                            controlFunc={this.props.handleInputChange}
                            content={this.props.sumOtrosCargos}
                            placeholder={'0'}
                        />

                        {this.props.tipoComprobante == 2 &&
                            <SingleInput
                                labelClass={'col-5'}
                                inputClass={'col-4'}
                                inputType={'number'}
                                title={'Total precio de venta'}
                                content={this.props.sumPrecioVenta}
                                name={'sumPrecioVenta'}
                                controlFunc={this.props.handleInputChange}
                                placeholder={'0'}
                            />
                        }
                        {this.props.tipoComprobante != 2 &&
                            <ReadOnlySingleInput
                                labelClass={'col-5'}
                                inputClass={'col-4'}
                                inputType={'number'}
                                title={'Total precio de venta'}
                                content={this.props.sumPrecioVenta}
                            />
                        }
                        {/* <ReadOnlySingleInput
                            labelClass={'col-5'}
                            inputClass={'col-4'}
                            inputType={'number'}
                            title={'Costo de servicio'}
                            placeholder={this.props.costServicio} />
                        <ReadOnlySingleInput
                            labelClass={'col-5'}
                            inputClass={'col-3'}
                            inputType={'number'}
                            title={'Costo de Venta'}
                            placeholder={this.props.costVenta} />
                        <ReadOnlySingleInput
                            labelClass={'col-5'}
                            inputClass={'col-3'}
                            inputType={'number'}
                            title={'Utilidad'}
                            placeholder={this.props.utilidad} />*/}
                        <SingleInput
                            labelClass={'col-5 text-danger'}
                            inputClass={'col-7'}
                            inputType={'number'}
                            title={this.props.tipMoneda == 'PEN' ? 'A cuenta Ingreso/Egreso' : 'A cuenta Ingreso/Egreso (en USD)'}
                            name={'aCuenta'}
                            controlFunc={this.props.handleInputChange}
                            content={this.props.aCuenta}
                            placeholder={'0'}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Totales;