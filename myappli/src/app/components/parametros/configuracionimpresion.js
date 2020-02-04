import React, {Component} from 'react';
import InputComponent from "../common2/inputcomponent";
import SelectComponent from "../common2/selectcomponent";
import './estilos/configuracionimprecion.css';

import Draggable from 'react-draggable'; // The default


class ConfiguracionImpresion extends Component {

    constructor(props){
        super(props);
        this.state = {
            modoCrear: false,
            nombreNuevoPerfil: '',
            modoDibujando: false,
        };

        this.renderSeleccionPerfil = this.renderSeleccionPerfil.bind(this);
        this.renderDibujo = this.renderDibujo.bind(this);
        this.renderSalvarDatos = this.renderSalvarDatos.bind(this);

        this.handleSelectChangeComponent = this.handleSelectChangeComponent.bind(this);
        this.handleInputChangeComponent = this.handleInputChangeComponent.bind(this);
        this.handleButtonOnClick = this.handleButtonOnClick.bind(this);

    }

    handleButtonOnClick(evt){
        if (evt.target.name === "btnCancelar"){
            this.setState({
                modoCrear: false,
            });
        }

        if (evt.target.name === "btnDibujar"){
            this.setState({
                modoDibujando: true,
            });
        }

        if (evt.target.name === "btnCancelarDibujo"){
            this.setState({
                modoDibujando: false,
            });
        }
    }

    handleSelectChangeComponent(evt){
        console.log(evt.target.name);
        if (evt.target.name === "perfilComprobante" && evt.target.value === "0"){
            this.setState({
                modoCrear: true,
            });
        }
    }

    handleInputChangeComponent(evt){
        console.log(evt.target.name);
        this.setState({
            [evt.target.name]: evt.target.value,
        });
    }

  

    renderSeleccionPerfil(){
        return (
            <div className="row mb-2">
                <div className="col-12" style={{border: "1px solid gray", borderRadius: "25px"}}>
                    <div className="form-row justify-content-center" style={{padding: "20px"}}>
                        <SelectComponent
                            unaLinea={true}
                            bloques={"col-2"}
                            labelBloques={"col-3 text-right"}
                            etiqueta={"Tipo de Comprobante"}
                            idSelect={"tipoComprobante"}
                            nombreSelect={"tipoComprobante"}
                            esJson={true}
                            nombreMostrar={"nombrePerfilComprobante"}
                            nombreValor={"idPerfilComprobante"}
                            contenido={[{idPerfilComprobante: 1, nombrePerfilComprobante: "tamaño ticket"},{idPerfilComprobante: 2, nombrePerfilComprobante: "tamaño A4"}]}
                            funcionControl={this.handleSelectChangeComponent}
                        />

                        {
                            !this.state.modoCrear && (
                                <SelectComponent
                                    unaLinea={true}
                                    bloques={"col-2"}
                                    labelBloques={"col-3 text-right"}
                                    etiqueta={"Perfil de Impresión"}
                                    idSelect={"perfilComprobante"}
                                    nombreSelect={"perfilComprobante"}
                                    esJson={true}
                                    nombreMostrar={"nombrePerfilComprobante"}
                                    nombreValor={"idPerfilComprobante"}
                                    contenido={[{idPerfilComprobante: '1', nombrePerfilComprobante: "tamaño ticket"},{idPerfilComprobante: '2', nombrePerfilComprobante: "tamaño A4"},{idPerfilComprobante: '0', nombrePerfilComprobante: "Pre-Impreso"}]}
                                    funcionControl={this.handleSelectChangeComponent}
                                />
                            )
                        }

                        {
                            this.state.modoCrear && (
                                <InputComponent
                                    unaLinea={true}
                                    bloques={"col-2"}
                                    labelBloques={"col-2 text-right"}
                                    etiqueta={"Nombre Nuevo Perfil"}
                                    idInput={"nombreNuevoPerfil"}
                                    nombreInput={"nombreNuevoPerfil"}
                                    valorDefecto={this.state.nombreNuevoPerfil}
                                    funcionControl={this.handleInputChangeComponent}
                                />
                            )
                        }

                        {
                            !this.state.modoCrear && (
                                <button
                                    className="btn btn-success ml-3"
                                >
                                    GUARDAR
                                </button>
                            )
                        }

                        {
                            this.state.modoCrear && (
                                <button
                                    className="btn btn-warning ml-3"
                                    name="btnDibujar"
                                    disabled={this.state.nombreNuevoPerfil === ''}
                                    onClick={this.handleButtonOnClick}
                                >
                                  
                                </button>
                            )
                        }

                        {
                            this.state.modoCrear && (
                                <button
                                    className="btn btn-danger ml-3"
                                    onClick={this.handleButtonOnClick}
                                    name="btnCancelar"
                                >
                                    CANCELAR
                                </button>
                            )
                        }

                    </div>
                </div>
            </div>
        );
    }

    renderDibujo(){
        const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
        const {deltaPosition, controlledPosition} = this.state;

        return (
            <React.Fragment>
                <div className="row justify-content-center mb-2">
                    <div className="col-12" style={{height: "900px", border: "solid 2px cyan"}} id="pizarra">
                        <div id="cuadro">

                        </div>
                    </div>
                </div>
                <br/>
            </React.Fragment>
        );
    }

    renderSalvarDatos(){
        return (
            <div id="fixed-bar">
                <button
                    className="btn btn-success"
                    style={{width: "150px"}}
                    name="btnGuardarDibujo"
                    onClick={this.handleButtonOnClick}
                >
                    GUARDAR
                </button>
                <button
                    className="btn btn-danger ml-5"
                    style={{width: "150px"}}
                    name="btnCancelarDibujo"
                    onClick={this.handleButtonOnClick}
                >
                    CANCELAR
                </button>

            </div>
        );
    }

    render() {
        return (
            <React.Fragment>
                {!this.state.modoDibujando && this.renderSeleccionPerfil()}

                {this.state.modoDibujando && this.renderDibujo()}

                {this.state.modoDibujando && this.renderSalvarDatos()}
            </React.Fragment>
        );
    }
}

export default ConfiguracionImpresion;