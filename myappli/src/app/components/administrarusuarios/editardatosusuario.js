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
                        idUsuario: usuario.data[0].idUsuario,
                        nombreUsuario: usuario.data[0].nombreUsuario,
                        numDocumentoUsuario: usuario.data[0].numDocumento,
                        nombresUsuario: usuario.data[0].nombres,
                        apellidosUsuario: usuario.data[0].apellidos,
                        tipoPerfilUsuario: usuario.data[0].tipoPerfil,
                        nombrePerfil: usuario.data[0].nombrePerfil,
                        habilitadoUsuario: usuario.data[0].habilitado,
                        fechaCreacionUsuario: (new Date(usuario.data[0].fechaCreacion).getDay() < 10? '0' + new Date(usuario.data[0].fechaCreacion).getDay():new Date(usuario.data[0].fechaCreacion).getDay()) + "/" 
                        + (new Date(usuario.data[0].fechaCreacion).getMonth()) + "/" + (new Date(usuario.data[0].fechaCreacion).getFullYear()),
                    });
                }else{
                    alert(data.msg);
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
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12 text-center">
                        <h3>Permisos-Menu Secundario</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-4">
                                <div className="list-group" id="list-tab" role="tablist">
                                    <a className="list-group-item list-group-item-action active" id="list-home-list"
                                       data-toggle="list" href="#list-home" role="tab" aria-controls="home">Home</a>
                                    <a className="list-group-item list-group-item-action" id="list-profile-list"
                                       data-toggle="list" href="#list-profile" role="tab"
                                       aria-controls="profile">Profile</a>
                                    <a className="list-group-item list-group-item-action" id="list-messages-list"
                                       data-toggle="list" href="#list-messages" role="tab"
                                       aria-controls="messages">Messages</a>
                                    <a className="list-group-item list-group-item-action" id="list-settings-list"
                                       data-toggle="list" href="#list-settings" role="tab"
                                       aria-controls="settings">Settings</a>
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="tab-content" id="nav-tabContent">
                                    <div className="tab-pane fade show active" id="list-home" role="tabpanel"
                                         aria-labelledby="list-home-list">Home
                                    </div>
                                    <div className="tab-pane fade" id="list-profile" role="tabpanel"
                                         aria-labelledby="list-profile-list">Profile
                                    </div>
                                    <div className="tab-pane fade" id="list-messages" role="tabpanel"
                                         aria-labelledby="list-messages-list">Messages 
                                    </div>
                                    <div className="tab-pane fade" id="list-settings" role="tabpanel"
                                         aria-labelledby="list-settings-list">Settings
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Editardatosusuario;