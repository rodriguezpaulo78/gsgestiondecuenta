import React, {Component} from 'react';
import InputComponent from "../common2/inputcomponent";
import SelectComponent from "../common2/selectcomponent";

class DatosCliente extends Component {
    constructor(props){
        super(props);

        this.renderModal = this.renderModal.bind(this);
    }

    renderModal(){
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
                                Crear Cliente 
                            </h5>
                            <label className="text-primary ml-1 mt-1">
                                <i className="fas fa-question-circle" data-toggle="tooltip"
                                   data-placement="bottom"
                                   title="Si el número de documento existe, se actualizarán los datos relacionados a este número." />
                            </label>
                            <button type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={this.props.borrarDatosSobreCliente}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body h-75">
                            {/* Formulario modal */}

                            <div className="form-row mt-1">
                                <SelectComponent
                                    bloques={"col-8"}
                                    labelBloques={"col-4 text-danger"}
                                    etiqueta={"Tipo Documento"}
                                    idSelect={"nuevoTipDocUsuario"}
                                    nombreSelect={"nuevoTipDocUsuario"}
                                    esJson={true}
                                    contenido={Documentos}
                                    nombreValor={"cod"}
                                    nombreMostrar={"nombre"}
                                    valorDefecto={this.props.tipDocCliente}
                                    funcionControl={this.props.handleChangeSelectComponent}
                                    unaLinea={true}
                                />
                            </div>

                            <div className="form-row mt-2">
                                <InputComponent
                                    tipoInput={"number"}
                                    bloques={"col-8"}
                                    labelBloques={"col-4 text-danger"}
                                    etiqueta={"Número Documento"}
                                    idInput={"nuevoNumDocUsuario"}
                                    nombreInput={"nuevoNumDocUsuario"}
                                    readOnly={false}
                                    funcionControl={this.props.handleChangeInputComponent}
                                    unaLinea={true}
                                    valorDefecto={this.props.numDocCliente}
                                />
                            </div>

                            <div className="form-row mt-2">
                                <InputComponent
                                    bloques={"col-8"}
                                    labelBloques={"col-4 text-danger"}
                                    etiqueta={"Razón Social"}
                                    idInput={"nuevoRazSocial"}
                                    nombreInput={"nuevoRazSocial"}
                                    readOnly={false}
                                    funcionControl={this.props.handleChangeInputComponent}
                                    unaLinea={true}
                                    valorDefecto={this.props.razSocialCliente}
                                />
                            </div>

                            <div className="form-row mt-2">
                                <InputComponent
                                    bloques={"col-8"}
                                    labelBloques={"col-4"}
                                    etiqueta={"Dirección"}
                                    idInput={"nuevoDesDireccionCliente"}
                                    nombreInput={"nuevoDesDireccionCliente"}
                                    readOnly={false}
                                    funcionControl={this.props.handleChangeInputComponent}
                                    unaLinea={true}
                                    valorDefecto={this.props.direccionCliente}
                                />
                            </div>

                            <div className="form-row mt-2">
                                <InputComponent
                                    tipoInput={"number"}
                                    bloques={"col-8"}
                                    labelBloques={"col-4"}
                                    etiqueta={"Teléfono"}
                                    idInput={"nuevoTelefonoCliente"}
                                    nombreInput={"nuevoTelefonoCliente"}
                                    readOnly={false}
                                    funcionControl={this.props.handleChangeInputComponent}
                                    unaLinea={true}
                                    valorDefecto={this.props.telefonoCliente}
                                />
                            </div>

                            <div className="form-row mt-2">
                                <InputComponent
                                    tipoInput={"email"}
                                    bloques={"col-8"}
                                    labelBloques={"col-4"}
                                    etiqueta={"Correo electrónico"}
                                    idInput={"nuevoCorreoCliente"}
                                    nombreInput={"nuevoCorreoCliente"}
                                    readOnly={false}
                                    funcionControl={this.props.handleChangeInputComponent}
                                    unaLinea={true}
                                    valorDefecto={this.props.correoCliente}
                                />
                            </div>

                            <div className="form-row mt-2">
                                <InputComponent
                                    tipoInput={"number"}
                                    bloques={"col-8"}
                                    labelBloques={"col-4"}
                                    etiqueta={"Código país"}
                                    idInput={"nuevoCodPaisCliente"}
                                    nombreInput={"nuevoCodPaisCliente"}
                                    readOnly={false}
                                    funcionControl={this.props.handleChangeInputComponent}
                                    unaLinea={true}
                                    valorDefecto={this.props.codPaisCliente}
                                    maximoCaracteres={2}
                                />
                            </div>

                            <div className="form-row mt-2">
                                <InputComponent
                                    bloques={"col-8"}
                                    labelBloques={"col-4"}
                                    etiqueta={"Código ubigeo"}
                                    idInput={"nuevoCodUbigeoCliente"}
                                    nombreInput={"nuevoCodUbigeoCliente"}
                                    readOnly={false}
                                    funcionControl={this.props.handleChangeInputComponent}
                                    unaLinea={true}
                                    valorDefecto={this.props.codUbigeoCliente}
                                />
                            </div>
                        </div>
                        <p className="form-text text-muted text-center custom-footer-text">
                            Agregue un nuevo elemento y haga click en Registrar.
                        </p>
                        <div className="modal-footer">
                            <button type="button"
                                    className="btn btn-secondary"
                                    onClick={this.props.borrarDatosSobreCliente}
                                    data-dismiss="modal">
                                Cancelar
                            </button>
                            <div className="mt-2">
                                <button type="button"
                                        className="btn btn-primary mb-2"
                                        onClick={this.props.crearNuevoelemento.bind(this, "cliente")}
                                        data-dismiss="modal"
                                        disabled={(this.props.tipDocCliente === '-1') || (this.props.numDocCliente === "") || (this.props.razSocialCliente === "")}
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

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-12">
                    <div className="form-row align-items-end">
                        <InputComponent
                            tipoInput={"number"}
                            bloques={"col-12 col-sm-4"}
                            etiqueta={"RUC"}
                            idInput={"ruc"}
                            nombreInput={"ruc"}
                            readOnly={false}
                            valorDefecto={this.props.numDocCliente}
                            funcionControl={this.props.handleChangeInputComponent}
                            blurFuncionControl={this.props.handleOnBlur}
                        >
                            <button
                                className="btn btn-sm btn-outline-success ml-3"
                                name="btnItems"
                                data-toggle="modal"
                                data-target="#modalAdminCliente"
                                style={{fontSize: '10px'}}
                                onClick={this.props.borrarDatosSobreCliente.bind(this, true)}
                            >
                                Crear
                                <i className=" ml-2 fas fa-plus-circle"/>
                            </button>

                            <button
                                className="btn btn-sm btn-outline-danger ml-2"
                                onClick={this.props.borrarDatosSobreCliente}
                                style={{fontSize: '10px'}}
                            >
                                <i className="fas fa-trash-alt"/>
                            </button>
                        </InputComponent>
                        
                        <InputComponent
                            bloques={"col-12 col-sm-8"}
                            etiqueta={"Razón Social"}
                            idInput={"razonsocial"}
                            nombreInput={"razonsocial"}
                            valorDefecto={this.props.razSocialCliente}
                            readOnly={false}
                            funcionControl={this.props.handleChangeInputComponent}
                        />
                    </div>
                </div>

                {this.renderModal()}
            </div>
        );
    }
}

const Documentos = [
    { cod: "-1", nombre: "SELECCIONE TIPO DOCUMENTO" },
    { cod: "0", nombre: "OTROS TIPOS DE DOCUMENTOS" },
    { cod: "1", nombre: "DOCUMENTO NACIONAL DE IDENTIDAD (DNI)" },
    { cod: "4", nombre: "CARNET DE EXTRANJERIA" },
    { cod: "6", nombre: "REGISTRO ÚNICO DE CONTRIBUYENTES (RUC)" },
    { cod: "7", nombre: "PASAPORTE" },
    { cod: "A", nombre: "CÉDULA DIPLOMÁTICA DE IDENTIDAD" }];

export default DatosCliente;