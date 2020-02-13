import React, {Component} from 'react';
import InputComponent from "../common2/inputcomponent";
import SelectComponent from "../common2/selectcomponent";
import {toast, ToastContainer} from "react-toastify";

//Clase para Editar los datos de un usuario registrado
class Editardatosusuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaPerfiles: [],
            idUsuarioEditar: '',

            // Datos actuales del usuario para mostrar
            idUsuario: '',
            nombreUsuario: '',
            nombreUsuario2: '',
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
            perfilUsuarioN: '',

            habilitadoUsuarioN: '',
        
        };

        this.actualizarUsuario = this.actualizarUsuario.bind(this);
        this.fetchDatosUsuario = this.fetchDatosUsuario.bind(this);
        this.fetchPerfiles = this.fetchPerfiles.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleChangeSelectComponent = this.handleChangeSelectComponent.bind(this);
    }

    //Funcion necesaria para poder cambiar los valores del INPUTCOMPONENT
    handleChangeInput(evt){
        switch(evt.target.name) {
            case "nombreUsuario":
                this.setState({ nombreUsuario: evt.target.value,});
                break;
            case "numDocumentoUsuarioN":
                this.setState({ numDocumentoUsuarioN: evt.target.value,});
                break;
            case "nombresUsuarioN":
                this.setState({ nombresUsuarioN: evt.target.value,});
                break;
                case "apellidosUsuarioN":
                    this.setState({ apellidosUsuarioN: evt.target.value,});
                    break;
            default:
            // code block
            }
    }
    
    //Funcion necesaria para poder elegir entre  los valores del SELECTCOMPONENT
    handleChangeSelectComponent(evt){
        if (evt.target.name === "perfilUsuarioN"){
            this.setState({
                perfilUsuarioN: evt.target.value,
            });
        }
    }

    //Función para obtener los datos del usuario a editar según su ID
    fetchDatosUsuario(idUsuario){
        fetch(
            '/usuarios/usuarios/' + idUsuario
        )
            .then(res => res.json())
            .then(usuario => {
                if (usuario.status === "ok"){
                    console.log(usuario);
                    this.setState({
                        idUsuario: usuario.data[0].idUsuarioMaster,
                        nombreUsuario: usuario.data[0].nombreUM,
                        nombreUsuario2: usuario.data[0].nombreUM,
                        numDocumentoUsuario: usuario.data[0].rucUM,
                        nombresUsuario: usuario.data[0].nombresUM,
                        apellidosUsuario: usuario.data[0].apellidosUM,
                        tipoPerfilUsuario: usuario.data[0].tipoPerfilUM,
                        nombrePerfil: usuario.data[0].nombrePerfil,
                        habilitadoUsuario: usuario.data[0].habilitadoUM,
                        fechaCreacionUsuario: (new Date(usuario.data[0].fechaCreacionUM).getDate() < 10? '0' + 
                        new Date(usuario.data[0].fechaCreacionUM).getDate():new Date(usuario.data[0].fechaCreacionUM).getDate()) + "/" + 
                        (new Date(usuario.data[0].fechaCreacionUM).getMonth() + 1 < 10? '0' + 
                        (new Date(usuario.data[0].fechaCreacionUM).getMonth()+1):new Date(usuario.data[0].fechaCreacionUM).getMonth()+1) + "/" + 
                        new Date(usuario.data[0].fechaCreacionUM).getFullYear(),
                    });
                }else{
                    alert(usuario.msg);
                }
            })
            .catch(err => console.log("Error al obtener datos de un usuario:", err));
    }

    //Función para obtener los perfiles que se pueden manejar
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

    //Función BackEnd para actualizar los datos de un usuario
    actualizarUsuario(){
        //Comprobar si los campos están vacios
        if (this.state.nombreUsuario == '' || this.state.numDocumentoUsuarioN ==='' || this.state.nombresUsuarioN === '' || this.state.apellidosUsuarioN==='') {
            toast.error('Por favor llene todos los campos', { 
                position: "bottom-right", autoClose: 2000, hideProgressBar: false, 
                closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            return;
        }
        //falta añadir mas comprobaciones
        else {
            //Añadiendo a la BD - Mandar estos parametros a través de esta ruta.
            fetch('/usuarios/actualizar', {
                method: 'POST',
                body: JSON.stringify({
                    idUsuarioMaster: this.props.idUsuario.toString(),
                    //Sesion
                    nombreUM: this.state.nombreUsuario.toString(),
                    rucUM: this.state.numDocumentoUsuarioN.toString(),
                    tipoPerfilUM: this.state.perfilUsuarioN,
                    nombresUM: this.state.nombresUsuarioN.toString(),
                    apellidosUM: this.state.apellidosUsuarioN.toString(),
                   
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === "error"){
                        toast.error('Vuelva a iniciar sesión, hay fallas en su autenticación.', { 
                            position: "bottom-right", autoClose: 2000, hideProgressBar: false, 
                            closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                    }else{
                        console.log(data); //id que retorno
                        if (data != -1) {
                            toast.success('Usuario actualizado', { 
                                position: "bottom-right", autoClose: 2000, hideProgressBar: false, 
                                closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                        }
                    }
                })
                .catch(err => console.log(err));

            //clear
            this.setState({
                numDocumentoUsuarioN: '',
                perfilUsuarioN: '',
                nombresUsuarioN: '',
                apellidosUsuarioN: ''
            });
        }
    }

    //Renderizado
    render() {
        return (
            <div className="col-12">
                {console.log("idusuario entrando" +this.props.idUsuario)}
                <div className="row">
                    <div className="col-12 text-center">
                        <h2>EDITANDO DATOS DE {this.state.nombreUsuario2}</h2>
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
                                funcionControl={this.handleChangeInput}
                            />
                            <InputComponent
                                unaLinea={true}
                                labelBloques={"col-2 text-center"}
                                bloques={"col-3"}
                                etiqueta={"Número Documento"}
                                idInput={"numDocumentoUsuarioN"}
                                nombreInput={"numDocumentoUsuarioN"}
                                readOnly={false}
                                //Valor por defecto tambien se puede utilizar
                                placeholder={this.state.numDocumentoUsuario.toString()}
                                funcionControl={this.handleChangeInput}
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
                                //CUANDO SE ACTIVA EL VALOR POR DEFECTO NO SE PUEDE SELECCIONAR ENTRE LOS TIPOS DE PERFILES
                                //valorDefecto={this.state.tipoPerfilUsuario}
                                funcionControl={this.handleChangeSelectComponent}
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
                                funcionControl={this.handleChangeInput}
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
                                funcionControl={this.handleChangeInput}
                            />
                        </div>

                        <div className="form-row justify-content-center mt-3">
                            <div className="col-5">
                                <button className="btn btn-success btn-block" onClick={this.actualizarUsuario}> ACTUALIZAR DATOS </button>
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