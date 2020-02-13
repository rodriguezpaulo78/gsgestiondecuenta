import React, {Component} from 'react';
import {toast, ToastContainer} from "react-toastify";
import Editardatosusuario from "./editardatosusuario";
import Crearusuario from "./crearusuario";
import Crearperfil from "./crearperfil";

//Clase encarga de Administrar los usuarios y perfiles del sistema para un negocio especifico
class AdministrarUsuarios extends Component {

    //Constructor 
    constructor(props){
        super(props);
        this.state = {
            opcionElegida: 0,       //Al comienzo no se elije nada y se muestra el texto 0

            listaUsuarios: [],      
            listaPerfiles: [],
            
            idUsuarioEditar: '',    //id de Usuario por si se quiere editar sus datos   
        };

        // HANDLE SECTION
        this.handleClickButtonMenu = this.handleClickButtonMenu.bind(this);   

        // FETCH SECTION
        this.fetchUsuarios = this.fetchUsuarios.bind(this);
        this.fetchDeshabilitarUsuario = this.fetchDeshabilitarUsuario.bind(this);
        this.fetchPerfilesRegistrados = this.fetchPerfilesRegistrados.bind(this);

        //Listar Usuarios FUNCTIONS
        this.renderListarUsuarios = this.renderListarUsuarios.bind(this);     
        this.editarDatos = this.editarDatos.bind(this);
        this.borrarTodo = this.borrarTodo.bind(this);

    }

     /*
        Función Handle que recibe un evento 'name' a través de una acción(button) y actualiza el valor de 'opcionElegida' según tal
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

    //Función que muestra los datos en la interfaz(METODO REACT) llama a los demás funciones
    componentDidMount() {
        this.fetchUsuarios();
        this.fetchPerfilesRegistrados();
        //console.log("DATA PERFILES:", this.state.listaPerfiles);
    }

    //Función para limpiar todos los atributos
    borrarTodo(){
        console.log("BORRANDO TODO");
        this.setState({
            listaUsuarios: '',
            listaPerfiles: '',
        });
    }

    //Función FETCH que obtiene los perfiles registrados para mostrarlos según el usuario que pertenecen
    fetchPerfilesRegistrados(){
        fetch(
            '/perfiles/perfiles'
        )
            .then(res => res.json())
            .then(dataListaPerfiles => {
                console.log("FETCH PERFILES:", dataListaPerfiles);
                this.setState({
                    listaPerfiles: dataListaPerfiles.data,
                });
            })
            .catch(err => console.log("Error FETCH LISTA PERFILES REGISTRADOS", err));
    }

    //Función FETCH que obtiene los usuarios registrados para mostrarlos en la tabla
    fetchUsuarios(){
        fetch(
            '/usuarios/usuarios'
        )
            .then(res => res.json())
            .then(dataListaUsuarios => {
              if (dataListaUsuarios.status === "ok"){
                  console.log(dataListaUsuarios);
                  this.setState({
                      listaUsuarios: dataListaUsuarios.data,
                  });
              }else{
                  alert(dataListaUsuarios.msg);
              }
            })
            .catch(err => console.log("Error FETCH USUARIOS:", err));
    }

    //Función para deshabilitar un usuario, se le manda como parametro el ID del usuario a deshabilitar
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
            .then(res => {
                console.log(res.status);
                console.log(res.body);
                return res.json();
            })
            .then(data => {
                if (data.status === 'ok'){
                    alert(data.msg);
                }else{
                    alert(data.msg);
                }
            })
            .catch(err => console.log("Error FetchDehabilitarUsuario", err));
    }

    //Función que recoge el idUsuario del usuario a Editar para obtener sus datos en el siguiente formulario 
    editarDatos(idUsuario){
        this.setState({
            idUsuarioEditar: idUsuario,
            opcionElegida: 4,
        });
    }

    //Renderizar la lista de usuarios registrados
    renderListarUsuarios(){
        return (
            <div className="col-12"> 
                 <div className="row">
                    <div className="col-12 text-center">
                        <h3>Lista de Usuarios Registrados</h3>
                    </div>
                </div>
                   
                <table className="table table-bordered">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col" className="text-center">USUARIO</th>
                        <th scope="col" className="text-center">TIPO DE PERFIL</th>
                        <th scope="col" className="text-center">NOMBRES</th>
                        <th scope="col" className="text-center">APELLIDOS</th>
                        <th scope="col" className="text-center">FECHA DE CREACIÓN</th>
                        <th scope="col" className="text-center">ACCIÓN</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.listaUsuarios.map((ele, ind) => {
                            let fecha = (   new Date(ele.fechaCreacionUM).getDate() < 10? '0' + 
                                            new Date(ele.fechaCreacionUM).getDate():new Date(ele.fechaCreacionUM).getDate()) + "/" + 
                                            (new Date(ele.fechaCreacionUM).getMonth() + 1 < 10? '0' + 
                                            (new Date(ele.fechaCreacionUM).getMonth()+1):new Date(ele.fechaCreacionUM).getMonth()+1) + "/" + 
                                            new Date(ele.fechaCreacionUM).getFullYear();
                            return (
                                <tr key={ind}>
                                    <td className="text-center">{ele.nombreUM}</td>
                                    <td className="text-center">{
                                    this.state.listaPerfiles.map((obj) => {
                                        if (ele.tipoPerfilUM === obj.idPerfil){
                                            return obj.nombrePerfil;
                                        }
                                        })
                                    }</td>
                                    <td className="text-center">{ele.nombresUM}</td>
                                    <td className="text-center">{ele.apellidosUM}</td>
                                    <td className="text-center">{fecha}</td>
                                    <td className="text-center">
                                        
                                        <button className="btn btn-danger" onClick={this.fetchDeshabilitarUsuario.bind(this, ele.idUsuarioMaster)}>
                                            <i className="fa fa-ban"></i>
                                        </button>
                                        <button className="btn btn-success" name="btnEditarUsuario" onClick={this.editarDatos.bind(this, ele.idUsuarioMaster)}>
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

    /*
        Función para dibujar la vista a través de los métodos y clases
        - ToastContainer: Sirve para mostrar alertas al usuario
        -   1RA PARTE: al presionar entre las opciones Listar, Crear u, Crear p, llama a la función handleClick() la cual llamará a la clase
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
                    
                    <div className="col-8 text-center">
                        <button
                            name="btnListarUsuarios"
                            onClick={this.handleClickButtonMenu}
                            className="btn btn-primary mt-2"
                        >Listar Usuarios
                        </button>
                        <button
                            name="btnCrearUsuario"
                            onClick={this.handleClickButtonMenu}
                            className="btn btn-secondary ml-2 mt-2"
                        >Crear Usuario
                        </button>
                        <button
                            name="btnCrearPerfil"
                            onClick={this.handleClickButtonMenu}
                            className="btn btn-success ml-2 mt-2"
                        >Crear Perfil
                        </button>
                    </div>
                </div>

                <div className="row justify-content-center mt-5">
                    {
                        //Mensaje de Bienvenida al módulo de Administrador de Usuarios
                        this.state.opcionElegida === 0 && (
                            <div className="col-8 text-center">
                                <h2>Bienvenido al Administrador de Usuario de Gestion de Cuentas</h2>
                                <h4>Seleccione una opción para continuar</h4>
                            </div>
                        )
                    }
                    { this.state.opcionElegida === 1 && this.renderListarUsuarios() }
                    { this.state.opcionElegida === 2 && <Crearusuario/> }
                    { this.state.opcionElegida === 3 && <Crearperfil/> }
                    { this.state.opcionElegida === 4 && <Editardatosusuario idUsuario={this.state.idUsuarioEditar}/> }
                </div>

            </React.Fragment>
        );
    }
}

export default AdministrarUsuarios;