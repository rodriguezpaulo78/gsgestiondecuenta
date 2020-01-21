import React, {Component} from 'react';
import {toast, ToastContainer} from "react-toastify";
import Editardatosusuario from "./editardatosusuario";
import InputComponent from "../common2/inputcomponent";
import SelectComponent from "../common2/selectcomponent";

class AdministrarUsuarios extends Component {

    
    //Constructor 
    constructor(props){
        super(props);
        this.state = {
            opcionElegida: 0,       //Al comienzo no se elije nada y se muestra el texto 0

            listaUsuarios: [],
            listaPerfiles: [],
            opciones_grupos: [],

            idUsuarioEditar: '',
            nuevoNombre: '', 
            nuevoRUC: '',
            nuevoClave: '',
            nuevoTipoPerfil: '',

            // DATOS DE LA EMPRESA
            nuevoRuc: null,
            nuevaRazonSocial: null,
            nuevoNombres: null,
            nuevoApellidoPaterno: null,
            nuevoApellidoMaterno: null,
            nuevoNombreComercial: null,
            nuevoUsuarioSol: null,
            nuevaClaveSol: null,
            nuevaDireccion: null,
            nuevoUbigeo: null,
            nuevaUrbanizacion: null,
            nuevoDistritoE: null, // ya declarado en sucursal
            nuevaProvincia: null,
            nuevoDepartamentoE: null, // ya declarado en sucursal
            nuevoRubro: null,
            nuevoNumeroDeContacto: null,
            nuevaImagenEmpresa: null,

            nuevoGrupo: '',
        };

        // HANDLE SECTION
        this.handleClickButtonMenu = this.handleClickButtonMenu.bind(this);   

        // FETCH SECTION
        this.fetchUsuarios = this.fetchUsuarios.bind(this);
        this.fetchDeshabilitarUsuario = this.fetchDeshabilitarUsuario.bind(this);
        this.fetchPerfilesRegistrados = this.fetchPerfilesRegistrados.bind(this);

        //Crear Usuarios
        this.renderCrearUsuario = this.renderCrearUsuario.bind(this);
        this.crearUsuario = this.crearUsuario.bind(this);

        //Crear Perfil
        this.renderCrearPerfil = this.renderCrearPerfil.bind(this);

        //Listar Usuarios
        this.renderListarUsuarios = this.renderListarUsuarios.bind(this);     
        this.obtenerNombrePerfil = this.obtenerNombrePerfil.bind(this);
        this.editarDatos = this.editarDatos.bind(this);

        // FUNCTIONS
        this.borrarTodo = this.borrarTodo.bind(this);

    }

     /*
        Función que recibe un evento 'name' a través de una acción(button) y actualiza el valor de 'opcionElegida' según tal
    */
    handleClickButtonMenu(evt){
        console.log(evt.target.name);

        switch(evt.target.name) {
            case "btnListarUsuarios":
                console.log("Listando usuarios registrados");
                this.setState({
                    opcionElegida: 1,
                })
                break;
            case "btnCrearUsuario":
                console.log("Llamando a formulario para crear usuario");
                this.setState({
                    opcionElegida: 2,
                })
                break;
            case "btnCrearPerfil":
                console.log("Llamando a formulario para crear perfil");
                this.setState({
                    opcionElegida: 3,
                })
                break;
            default:
                console.log("Ninguna opcion elegida");
          }
       
    }

    fetchPerfilesRegistrados(){
        fetch(
            '/perfiles/perfiles'
            //'/myappli/perfiles/perfiles'
        )
            .then(res => res.json())
            .then(dataListaPerfiles => {
                console.log("FETCH PERFILES:", dataListaPerfiles);
                this.setState({
                    listaPerfiles: dataListaPerfiles,
                });
            })
            .catch(err => console.log("Error FETCH LISTA PERFILES REGISTRADOS", err));
    }

    fetchUsuarios(){
        fetch(
            '/usuarios/usuarios'
            //'/myappli/usuarios/usuarios'
        )
            .then(res => res.json())
            .then(recibido => {
              if (recibido.status === "ok"){
                  console.log(recibido);
                  this.setState({
                      listaUsuarios: recibido.data,
                  });
              }else{
                  alert(recibido.msg);
              }
            })
            .catch(err => console.log("Error FETCH USUARIOS:", err));
    }

    fetchDeshabilitarUsuario(idUsr){
        console.log("USR", idUsr);
        fetch(
            '/usuarios/usuarios/' + idUsr,{
                method: 'PUT',
                body: JSON.stringify({
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok'){
                    alert(data.msg);
                }else{
                    alert(data.msg);
                }
            })
            .catch(err => console.log("Error FetchDehabilitarUsuario", err));
    }

    //Función que muestra los datos en la interfaz(METODO REACT)
    componentDidMount() {
        this.fetchUsuarios();
        this.fetchPerfilesRegistrados();
        console.log("DATA PERFILES:", this.state.listaPerfiles);

    }

    //Función para limpiar todos los campos
    borrarTodo(){
        console.log("BORRANDO TODO");
        this.setState({
            nuevoNombre: '', 
            nuevoRUC: '',
            nuevoClave: '',
            nuevoTipoPerfil: '',
            mostrarInput: false,

        });
    }

    /*
        Renderizar la lista de usuarios registrados
    */
    renderListarUsuarios(){
        return (
            <div className="col-12">
                <table className="table">
                    <thead>
                    <tr>
                        <td>NOMBRE USUARIO</td>
                        <td>TIPO DE PERFIL</td>
                        <td>NOMBRES</td>
                        <td>APELLIDOS</td>
                        <td>FECHA DE CREACIÓN</td>
                        <td></td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.listaUsuarios.map((ele, ind) => {
                            let fecha = (new Date(ele.fechaCreacionUM).getDate() < 10? '0' + new Date(ele.fechaCreacionUM).getDate():new Date(ele.fechaCreacionUM).getDate()) + "/" + (new Date(ele.fechaCreacionUM).getMonth() < 10? '0' + new Date(ele.fechaCreacionUM).getMonth():new Date(ele.fechaCreacionUM).getMonth()) + "/" + new Date(ele.fechaCreacionUM).getFullYear();
                            return (
                                <tr key={ind}>
                                    <td>{ele.nombreUM}</td>
                                    <td>{this.obtenerNombrePerfil.bind(this, ele.tipoPerfilUM)}</td>
                                    <td>{ele.nombresUM}</td>
                                    <td>{ele.apellidosUM}</td>
                                    <td>{fecha}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={this.fetchDeshabilitarUsuario.bind(this, ele.idUsuario)}>
                                            <i className="fa fa-ban"></i>
                                        </button>
                                        <button className="btn btn-success ml-1" name="btnEditarUsuario" onClick={this.editarDatos.bind(this, ele.idUsuario)}>
                                            <i className="fa fa-pen"></i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }   

    //Función para obtener el Perfil del usuario y que sea mostrado en la Lista de Usuarios
    obtenerNombrePerfil(idPerfil){
        for (let i = 0; i < this.state.listaPerfiles.length; i++){
            if (this.state.listaPerfiles.idPerfil === parseInt(idPerfil)){
                return this.state.listaPerfiles.nombrePerfil.toString();
            }
        }
        return "sin definir".toString();
    }



    //Función que recoge el idUsuario del usuario a Editar para obtener sus datos en el siguiente formulario
    editarDatos(idUsuario){
        this.setState({
            idUsuarioEditar: idUsuario,
            opcionElegida: 4,
        });
    }

     /*
        Renderizar el formulario para crear un usuario
    */
    renderCrearUsuario(){
        return(       
        <React.Fragment>
            <div className="row justify-content-center mb-2">
                <div className="col-6">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h3>Crear Usuario</h3>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-row mt-1">
                                <InputComponent
                                        bloques={"col-12"}
                                        etiqueta={" Nombre"}
                                        idInput={"nuevoNombre"}
                                        nombreInput={"nuevoNombre"}
                                        readOnly={false}
                                        valorDefecto={this.state.nuevoNombre}
                                        //funcionControl={this.handleChangeInputComponent}
                                />
                            </div>
                            <div className="form-row mt-1">
                                <InputComponent
                                        bloques={"col-12"}
                                        etiqueta={"RUC"}
                                        idInput={"nuevoRUC"}
                                        nombreInput={"nuevoRUC"}
                                        readOnly={false}
                                        valorDefecto={this.state.nuevoRUC}
                                        //funcionControl={this.handleChangeInputComponent}
                                />
                            </div>
                            <div className="form-row mt-1">
                                <InputComponent
                                        bloques={"col-12"}
                                        etiqueta={"Clave"}
                                        idInput={"nuevoClave"}
                                        nombreInput={"nuevoClave"}
                                        readOnly={false}
                                        valorDefecto={this.state.nuevoClave}
                                        //funcionControl={this.handleChangeInputComponent}
                                />
                            </div>
                            <div className="form-row mt-1">
                                <InputComponent
                                        bloques={"col-12"}
                                        etiqueta={"Perfil"}
                                        idInput={"nuevoTipoPerfil"}
                                        nombreInput={"nuevoTipoPerfil"}
                                        readOnly={false}
                                        valorDefecto={this.state.nuevoTipoPerfil}
                                        //funcionControl={this.handleChangeInputComponent}
                                />
                            </div>
                                
                            <div className="form-row justify-content-center mt-3">
                                <div className="col-6">
                                    <button
                                            className="btn btn-success btn-block"
                                            onClick={this.crearUsuario}
                                    >
                                            REGISTRAR USUARIO 
                                    </button>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
        
        );
    }

    /*
        Función BackEnd para crear un Usuario
    */
    crearUsuario(){

        if (this.state.nuevoNombre == '' || this.state.nuevoRUC == '' || this.state.nuevoClave == '' ||
            this.state.nuevoTipoPerfil == '') {
            toast.error('Por favor llene todos los campos', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            return;
        }
        else {
            //Añadiendo a la BD 
            fetch('/api/usuarios/usuarios', {
                method: 'POST',
                body: JSON.stringify({
                    nombreUM: this.state.nuevoNombre.toUpperCase(),
                    rucUM: this.state.nuevoRUC.toUpperCase(),
                    claveUM: this.state.nuevoClave.toUpperCase(),
                    tipoPerfilUM: this.state.nuevoTipoPerfil.toUpperCase()
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === "error"){
                        toast.error('Vuelva a iniciar sesión, hay fallas en su autenticación.', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                    }else{
                        console.log(data); //id que retorno
                        if (data != -1) {
                            toast.success('Nuevo usuario agregado agregada', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                            this.borrarTodo.bind(this);
                        }
                        if (data == -1) {
                            toast.error('Uusario actualizada', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                        }
                    }
                })
                .catch(err => console.log(err));

            //clear
            this.setState({
                nuevoNombreSucursal: '',
                nuevodireccionSucursal: '',
                nuevoDistrito: '',
                nuevoProvincia: '',
                nuevoDepartamento: '',
            });
        }
    }


    
    /*
        Renderizar el formulario para crear un perfil
    */
    renderCrearPerfil(){
        return(
            <React.Fragment>
                <div className="col-6">
                <div className="row">
                    <div className="col-12 text-center">
                        <h3>Crear Perfil</h3>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12">
                        <div className="form-row mt-1">
                            <h5>ID: <span className="label label-default">{
                                //El ID del perfil que corresponda 
                                this.state.opcionElegida
                            }</span></h5>
                        </div>
                        <div className="form-row mt-1">
                            <InputComponent
                                bloques={"col-12"}
                                etiqueta={"Nombre de Perfil "}
                                idInput={"nuevoTipoPerfil"}
                                nombreInput={"nuevoTipoPerfil"}
                                readOnly={false}
                                valorDefecto={this.state.nuevoTipoPerfil}
                                //funcionControl={this.handleChangeInputComponent}
                            />
                        </div>
                        <div className="form-row mt-">
                            <button className="btn btn-success btn-circle btn-circle-sm m-1">
                                <i className="fa fa-plus">  Añadir permisos</i>
                            </button>
                        </div>
                        
                        <div className="form-row mt-">
                            <h6>Aqui ira el combobox de grupos al apretar añadir permisos</h6>
                            <SelectComponent
                                bloques={"col-12"}
                                etiqueta={"Grupos de Permisos"}
                                idSelect={"nuevoGrupo"}
                                nombreSelect={"nuevoGrupo"}
                                esJson={true}
                                contenido={this.state.opciones_grupos}
                                nombreValor={"idGrupo"}
                                nombreMostrar={"nombreGrupo"}
                                valorDefecto={this.state.nuevoGrupo}
                                //funcionControl={this.handleChangeSelectComponent}
                            />
                        </div>

                        <div className="form-row mt-">
                            <h6>Aqui ira checkbutton para los permisos segun grupo escogido</h6>
                        </div>
                    
                        <div className="form-row mt-1">
                            <button className="btn btn-success btn-block" onClick={this.crearPerfil}>
                                CREAR PERFIL 
                            </button>
                            <button className="btn btn-success btn-block" onClick={this.borrarTodo}>
                                CANCELAR 
                            </button>
                        </div>
                       
                    </div>
                </div>
            </div>
            </React.Fragment>
        );
    }

     /*
        Función BackEnd para crear un Usuario
    */
    crearPerfil(){
    }

    /*
        Función para dibujar la vista a través de los métodos y clases
        - ToastContainer: Sirve para mostrar alertas al usuario
        -   1RA PARTE: al presionar entre las opciones Listar, Crear u, Crear p, llama a la función handleClick()  la cual según el 'name' del 
            button le dará un valor a 'opcion elegida' 
        -   2DA PARTE: Dibuja la interfaz  a través de la obtención del valor de 'opcion elegida'  
    */
    render() {
        return (
            <React.Fragment>
                <div className="row justify-content-center mb-2">
                
                    <ToastContainer
                        position="bottom-right"
                        autoClose={1000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnVisibilityChange
                        draggable
                        pauseOnHover
                    />
                    
                    <div className="col-6 text-center">
                        <button
                            name="btnListarUsuarios"
                            onClick={this.handleClickButtonMenu}
                            className="btn btn-primary mt-2"
                        >
                            Listar Usuarios
                        </button>
                        <button
                            name="btnCrearUsuario"
                            onClick={this.handleClickButtonMenu}
                            className="btn btn-secondary ml-2 mt-2"
                        >
                            Crear Usuario
                        </button>
                        <button
                            name="btnCrearPerfil"
                            onClick={this.handleClickButtonMenu}
                            className="btn btn-success ml-2 mt-2"
                        >
                            Crear Perfil
                        </button>
                    </div>
                </div>

                <div className="row justify-content-center mt-5">
                    {
                        this.state.opcionElegida === 0 && (
                            <div className="col-4 text-center">
                                <h2>Sin opción escogida</h2>
                                <h4>De click en los botones de arriba</h4>
                            </div>
                        )
                    }
                    { this.state.opcionElegida === 1 && this.renderListarUsuarios() }
                    { this.state.opcionElegida === 2 && this.renderCrearUsuario() }
                    { this.state.opcionElegida === 3 && this.renderCrearPerfil() }
                    { this.state.opcionElegida === 4 && <Editardatosusuario idUsuario={this.state.idUsuarioEditar}/> }
                </div>

            </React.Fragment>
        );
    }
}

export default AdministrarUsuarios;