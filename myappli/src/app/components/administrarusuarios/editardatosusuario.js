import React, {Component} from 'react';
import InputComponent from "../common2/inputcomponent";
import SelectComponent from "../common2/selectcomponent";

class Editardatosusuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaPerfiles: [],

            idUsuarioEditar: '',

            // Datos actuales del usuario para mostrar
            idUsuario: '',
            nombreUsuario: '',
            numDocumentoUsuario: '',
            nombresUsuario: '',
            apellidosUsuario: '',
            tipoPerfilUsuario: '',
            nombrePerfilUsuario: '',
            habilitadoUsuario: '',
            fechaCreacionUsuario: '',

            // Datos nuevos que se estan modificando
            nombreUsuarioN: '',
            numDocumentoUsuarioN: '',
            nombresUsuarioN: '',
            apellidosUsuarioN: '',
            tipoPerfilUsuarioN: '',
            habilitadoUsuarioN: '',
        };

        this.fetchDatosUsuario = this.fetchDatosUsuario.bind(this);
        this.fetchPerfiles = this.fetchPerfiles.bind(this);
    }


    fetchDatosUsuario(idUsuario){
        fetch(
            '/usuarios/usuarios/' + idUsuario
        )
            .then(res => res.json())
            .then(usuario => {
                if (usuario.status === "ok"){
                    console.log(usuario);
                    this.setState({
                        idUsuario: usuario.idUsuario,
                        nombreUsuario: usuario.nombreUsuario,
                        numDocumentoUsuario: usuario.numDocumento,
                        nombresUsuario: usuario.nombres,
                        apellidosUsuario: usuario.apellidos,
                        tipoPerfilUsuario: usuario.tipoPerfil,
                        nombrePerfil: usuario.nombrePerfil,
                        habilitadoUsuario: usuario.habilitado,
                        fechaCreacionUsuario: (new Date(usuario.fechaCreacion).getDay() < 10? '0' 
                        + new Date(usuario.fechaCreacion).getDay():new Date(usuario.fechaCreacion).getDay()) + "/" 
                        + (new Date(usuario.fechaCreacion).getMonth()) + "/" + (new Date(usuario.fechaCreacion).getFullYear()),
                    });
                }else{
                    alert(usuario.msg);
                }
            })
            .catch(err => console.log("Error al obtener datos de un usuario:", err));
    }

    fetchPerfiles(){
        fetch(
            '/perfiles/perfiles'
        )
            .then(res => res.json())
            .then(recibido => {
                if (recibido.status === "ok"){
                    this.setState({
                        listaPerfiles: recibido.data,
                    });
                }else{
                    alert(recibido.msg);
                }
            })
            .catch(err => console.log("Error FETCH USUARIOS:", err));
    }

    componentDidMount() {
        this.fetchDatosUsuario(this.props.idUsuario);
        this.fetchPerfiles();
    }

    render() {
        return (
            <div className="col-12">
                <div className="row">
                    <div className="col-12 text-center">
                        <h2>EDITANDO DATOS DE {this.state.nombreUsuario}</h2>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12">
                        <div className="form-row mb-1">
                            <InputComponent
                                tipoInput={"number"}
                                unaLinea={true}
                                labelBloques={"col-1 text-center"}
                                bloques={"col-1"}
                                etiqueta={"ID"}
                                idInput={"idUsuario"}
                                nombreInput={"idUsuario"}
                                readOnly={true}
                                valorDefecto={this.state.idUsuario.toString()}
                                funcionControl={() => {}}
                            />
                            <InputComponent
                                unaLinea={true}
                                labelBloques={"col-2 text-center"}
                                bloques={"col-3"}
                                etiqueta={"USUARIO"}
                                idInput={"nombreUsuario"}
                                nombreInput={"nombreUsuario"}
                                readOnly={false}
                                placeholder={this.state.nombreUsuario}
                                funcionControl={() => {}}
                            />
                            <InputComponent
                                unaLinea={true}
                                labelBloques={"col-2 text-center"}
                                bloques={"col-3"}
                                etiqueta={"Número Documento"}
                                idInput={"numDocumentoUsuarioN"}
                                nombreInput={"numDocumentoUsuarioN"}
                                readOnly={false}
                                placeholder={this.state.numDocumentoUsuario.toString()}
                                funcionControl={() => {}}
                            />
                        </div>
                        <div className="form-row mb-1">
                            <SelectComponent
                                unaLinea={true}
                                labelBloques={"col-2"}
                                bloques={"col-4"}
                                etiqueta={"Perfil"}
                                idSelect={"perfilUsuarioN"}
                                nombreSelect={"perfilUsuarioN"}
                                esJson={true}
                                nombreValor={"idPerfil"}
                                nombreMostrar={"nombrePerfil"}
                                contenido={this.state.listaPerfiles}
                                valorDefecto={this.state.tipoPerfilUsuario}
                                funcionControl={() => {}}
                            />
                            <InputComponent
                                unaLinea={true}
                                labelBloques={"col-2"}
                                bloques={"col-4"}
                                etiqueta={"Fecha de Creación"}
                                idInput={"fechaCreacionUsuario"}
                                nombreInput={"fechaCreacionUsuario"}
                                readOnly={true}
                                placeholder={this.state.fechaCreacionUsuario}
                                funcionControl={() => {}}
                            />
                        </div>
                        <div className="form-row">
                            <InputComponent
                                unaLinea={true}
                                labelBloques={"col-2"}
                                bloques={"col-4"}
                                etiqueta={"Nombres del Usuario"}
                                idInput={"nombresUsuarioN"}
                                nombreInput={"nombresUsuarioN"}
                                readOnly={false}
                                placeholder={this.state.nombresUsuario}
                                funcionControl={() => {}}
                            />
                            <InputComponent
                                unaLinea={true}
                                labelBloques={"col-2"}
                                bloques={"col-4"}
                                etiqueta={"Apellidos del Usuario"}
                                idInput={"apellidosUsuarioN"}
                                nombreInput={"apellidosUsuarioN"}
                                readOnly={false}
                                placeholder={this.state.apellidosUsuario}
                                funcionControl={() => {}}
                            />
                        </div>

                        <div className="form-row justify-content-center mt-3">
                            <div className="col-5">
                                <button className="btn btn-success btn-block" onClick={this.crearPerfil}> ACTUALIZAR DATOS </button>
                            </div>
                        </div> 

                    </div>
                </div>
                <hr/>
            </div>
        );
    }
}

export default Editardatosusuario;