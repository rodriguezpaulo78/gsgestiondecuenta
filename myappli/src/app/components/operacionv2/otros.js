import React, {Component} from 'react';
import InputComponent from "../common2/inputcomponent";
import FechaComponent from "../common2/fechacomponent";
import SelectComponent from "../common2/selectcomponent";
import DataListComponent from "../common2/datalistcomponent";

class Otros extends Component {
    render() {
        return (
            <div className="row justify-content-center">

                <div className="col-12 mt-3">
                    <div className="form-row">
                        <InputComponent
                            bloques={"col-6 col-sm-6 col-md-1"}
                            etiqueta={"D. Credito"}
                            idInput={"dcredito"}
                            nombreInput={"dcredito"}
                            readOnly={false}
                            valorDefecto={this.props.aCreditoDias}
                            funcionControl={this.props.handleChangeInputComponent}
                        />

                        <FechaComponent
                            bloques={"col-6 col-sm-6 col-md-2"}
                            etiqueta={"F.V."}
                            idSelect={"fv"}
                            nombreSelect={"fv"}
                            valorDefecto={this.props.fecVencimiento}
                            funcionControl={() => {}}
                        />

                        <SelectComponent
                            bloques={"col-6 col-sm-6 col-md-2"}
                            etiqueta={"S / $"}
                            idSelect={"solesdolares"}
                            nombreSelect={"solesdolares"}
                            esJson={true}
                            nombreValor={"valor"}
                            nombreMostrar={"nombre"}
                            valorDefecto={this.props.tipMoneda}
                            contenido={[
                                {valor: "PEN", nombre: "PEN"},
                                {valor: "USD", nombre: "USD"},
                            ]}
                            funcionControl={this.props.handleChangeSelectComponent}
                        />

                        <InputComponent
                            bloques={"col-6 col-sm-6 col-md-2"}
                            etiqueta={"T.C."}
                            idInput={"tc"}
                            nombreInput={"tc"}
                            readOnly={false}
                            valorDefecto={this.props.tipoCambio}
                            desactivado={this.props.tipMoneda !== "USD"}
                            funcionControl={this.props.handleChangeInputComponent}
                        />


                        <InputComponent
                            tipoInput={"number"}
                            bloques={"col-6 col-sm-6 col-md-2"}
                            etiqueta={"Otros C."}
                            idInput={"otrosc"}
                            nombreInput={"otrosc"}
                            readOnly={false}
                            valorDefecto={this.props.sumOtrosCargos}
                            funcionControl={this.props.handleChangeInputComponent }
                        />

                        {/* Código de operación */}
                        <InputComponent
                            tipoInput={"number"}
                            bloques={"col-6 col-sm-6 col-md-3"}
                            etiqueta={"Ref"}
                            idInput={"ref"}
                            nombreInput={"ref"}
                            readOnly={false}
                            valorDefecto={this.props.codOperacionRelacionado}
                            funcionControl={this.props.handleChangeInputComponent}
                        />


                    </div>
                </div>
            </div>
        );
    }
}

export default Otros;