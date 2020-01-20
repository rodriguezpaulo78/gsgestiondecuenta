import React, {Component} from 'react';
import SelectComponent from "../common2/selectcomponent";
import InputComponent from "../common2/inputcomponent";
import FechaComponent from "../common2/fechacomponent";

class DatosGenerales extends Component {
    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-12">
                    <div className="form-row">
                        <SelectComponent
                            bloques={"col-12 col-sm-4"}
                            etiqueta={"T. Movimiento"}
                            idSelect={"tipomovimiento"}
                            nombreSelect={"tipomovimiento"}
                            placeholder={"Seleccione uno"}

                            esJson={true}
                            contenido={[
                                {id: 2, msg: "Tipo Movimiento"},
                                {id: 1, msg: "Ingreso"},
                                {id: 0, msg: "Egreso"}
                            ]}
                            valorDefecto={this.props.tipoMovimientoSeleccionado.toString()}

                            nombreValor={"id"}
                            nombreMostrar={"msg"}

                            funcionControl={this.props.handleChangeSelectComponent}
                        />

                        <SelectComponent
                            bloques={"col-12 col-sm-4"}
                            etiqueta={"Sucursal"}
                            idSelect={"sucursal"}
                            nombreSelect={"sucursal"}
                            placeholder={"Seleccione uno"}

                            esJson={true}
                            contenido={this.props.listaSucursales}
                            valorDefecto={this.props.sucursalSeleccionado.toString()}

                            nombreValor={"codSucursal"}
                            nombreMostrar={"nombreSucursal"}

                            funcionControl={this.props.handleChangeSelectComponent}
                        />

                        <SelectComponent
                            bloques={"col-12 col-sm-4"}
                            etiqueta={"Fuente"}
                            idSelect={"fuente"}
                            nombreSelect={"fuente"}
                            placeholder={"Seleccione uno"}

                            esJson={true}
                            contenido={this.props.listaFuentes}

                            nombreValor={"codFuente"}
                            nombreMostrar={"fuente"}
                            valorDefecto={this.props.fuenteSeleccionada}
                            funcionControl={this.props.handleChangeSelectComponent}
                        />

                    </div>
                </div>

                <div className="col-12 mt-3">
                    <div className="form-row">
                        <SelectComponent
                            bloques={"col-6 col-sm-4"}
                            etiqueta={"Comprobante"}
                            idSelect={"comprobante"}
                            nombreSelect={"comprobante"}
                            placeholder={"Seleccione uno"}

                            esJson={true}
                            contenido={[
                                {opt: 0, nombre: "Boleta"},
                                {opt: 1, nombre: "Factura"},
                                {opt: 3, nombre: "Nota de Crédito"},
                                {opt: 2, nombre: "Pago"},
                                {opt: 4, nombre: "Otro"},
                            ]}
                            nombreValor={"opt"}
                            nombreMostrar={"nombre"}
                            valorDefecto={this.props.tipoComprobanteSeleccionado}
                            funcionControl={this.props.handleChangeSelectComponent}
                        />

                        <FechaComponent
                            bloques={"col-6 col-sm-4"}
                            etiqueta={"Fecha"}
                            idSelect={"fecha"}
                            nombreSelect={"fecha"}
                            funcionControl={this.props.handleChangeInputComponent}
                            valorDefecto={this.props.fechaActual}
                        />

                        <InputComponent
                            bloques={"col-6 col-sm-2"}
                            etiqueta={"Serie"}
                            idInput={"serie"}
                            nombreInput={"serie"}
                            valorDefecto={this.props.numSerieComprobante}
                            funcionControl={this.props.handleChangeInputComponent}
                        />

                        <InputComponent
                            tipoInput={"number"}
                            bloques={"col-6 col-sm-2"}
                            etiqueta={"Número"}
                            idInput={"numero"}
                            nombreInput={"numero"}
                            valorDefecto={this.props.numComprobante}
                            funcionControl={this.props.handleChangeInputComponent}
                        />

                    </div>
                </div>
            </div>
        );
    }
}

export default DatosGenerales;