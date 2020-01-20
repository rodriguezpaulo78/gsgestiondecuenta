import React, {Component} from 'react';
import {ToastContainer} from "react-toastify";
import Editardatosusuario from "./editardatosusuario";

import InputComponent from "../common2/inputcomponent";

class AdministrarUsuarios extends Component {

    constructor(props){
        super(props);
        this.state = {
            opcionElegida: 0,

            listaUsuarios: [],
            listaPerfiles: [],

            idUsuarioEditar: '',
            nuevoNombre: '', 
            nuevoRUC: '',
            nuevoClave: '',
            nuevoTipoPerfil: '',

            //
            // DATOS DE LA EMPRESA
            rucE: '',
            razonSocialE: '',
            nombresE: '',
            apellidoPaternoE: '',
            apellidoMaternoE: '',
            nombreComercialE: '',
            usuarioSolE: '',
            claveSolE: '',
            direccionE: '',
            ubigeoE: '',
            urbanizacionE: '',
            distritoE: '',
            provinciaE: '',
            departamentoE: '',
            rubroE: '',
            numeroDeContactoE: '',
            imagenEmpresaE: '',

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
        };

        // RENDER SECTION
        this.renderListarUsuarios = this.renderListarUsuarios.bind(this);
        this.renderCrearUsuario = this.renderCrearUsuario.bind(this);
        this.renderCrearPerfil = this.renderCrearPerfil.bind(this);

        // FETCH SECTION
        this.fetchUsuarios = this.fetchUsuarios.bind(this);
        this.fetchDeshabilitarUsuario = this.fetchDeshabilitarUsuario.bind(this);
        this.fetchPerfilesRegistrados = this.fetchPerfilesRegistrados.bind(this);

        // HANDLE SECTION
        this.handleClickButtonMenu = this.handleClickButtonMenu.bind(this);

        // FUNCTIONS
        this.obtenerNombrePerfil = this.obtenerNombrePerfil.bind(this);

        //USUARIO 
        this.crearUsuario = this.crearUsuario.bind(this);
        this.borrarTodo = this.borrarTodo.bind(this);

    }

    //Maneja el evento según la opción elegida y cambia el valor de esta variable.
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
        // FUNCIÓN PARA DESHABILITAR USUARIO
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

    editarDatos(idUsuario){
        this.setState({
            idUsuarioEditar: idUsuario,
            opcionElegida: 4,
        });
    }

    obtenerNombrePerfil(idPerfil){
        for (let i = 0; i < this.state.listaPerfiles.length; i++){
            if (this.state.listaPerfiles.idPerfil === parseInt(idPerfil)){
                return this.state.listaPerfiles.nombrePerfil.toString();
            }
        }
        return "sin definir".toString();
    }

    componentDidMount() {
        this.fetchUsuarios();
        this.fetchPerfilesRegistrados();
        console.log("DATA PERFILES:", this.state.listaPerfiles);

    }

    //Función para listar usuarios registrados
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

    crearUsuario(){

            if (this.state.nuevoNombre == '' || this.state.nuevoRUC == '' || this.state.nuevoClave == '' ||
                this.state.nuevoTipoPerfil == '') {
                toast.error('Por favor llene todos los campos', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                return;
            }
            else {
                //add to bd
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

    //Función para mostrar formulario para crear usuario
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
            <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h3>Cambiar Datos Empresa</h3>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-4">
                            <div className="form-row mt-2">
                                <InputComponent
                                    tipoInput={"number"}
                                    unaLinea={true}
                                    labelBloques={"col-4"}
                                    bloques={"col-8"}
                                    etiqueta={"RUC"}
                                    idInput={"nuevoRuc"}
                                    nombreInput={"nuevoRuc"}
                                    readOnly={false}
                                    valorDefecto={this.state.nuevoRuc}
                                    placeholder={this.state.rucE}
                                    funcionControl={this.handleChangeInputComponent}
                                />
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="form-row mt-2">
                                <InputComponent
                                    unaLinea={true}
                                    labelBloques={"col-2"}
                                    bloques={"col-10"}
                                    etiqueta={"Razón Social"}
                                    idInput={"nuevaRazonSocial"}
                                    nombreInput={"nuevaRazonSocial"}
                                    readOnly={false}
                                    valorDefecto={this.state.nuevaRazonSocial}
                                    placeholder={this.state.razonSocialE}
                                    funcionControl={this.handleChangeInputComponent}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <div className="form-row mt-2">
                                <InputComponent
                                    unaLinea={true}
                                    labelBloques={"col-4"}
                                    bloques={"col-8"}
                                    etiqueta={"Nombres"}
                                    idInput={"nuevoNombres"}
                                    nombreInput={"nuevoNombres"}
                                    readOnly={false}
                                    valorDefecto={this.state.nuevoNombres}
                                    placeholder={this.state.nombresE}
                                    funcionControl={this.handleChangeInputComponent}
                                />
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-row mt-2">
                                <InputComponent
                                    unaLinea={true}
                                    labelBloques={"col-4"}
                                    bloques={"col-8"}
                                    etiqueta={"Apellidos Paternos"}
                                    idInput={"nuevoApellidoPaterno"}
                                    nombreInput={"nuevoApellidoPaterno"}
                                    readOnly={false}
                                    valorDefecto={this.state.nuevoApellidoPaterno}
                                    placeholder={this.state.apellidoPaternoE}
                                    funcionControl={this.handleChangeInputComponent}
                                />
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-row mt-2">
                                <InputComponent
                                    unaLinea={true}
                                    labelBloques={"col-4"}
                                    bloques={"col-8"}
                                    etiqueta={"Apellido Materno"}
                                    idInput={"nuevoApellidoMaterno"}
                                    nombreInput={"nuevoApellidoMaterno"}
                                    readOnly={false}
                                    valorDefecto={this.state.nuevoApellidoMaterno}
                                    placeholder={this.state.apellidoMaternoE}
                                    funcionControl={this.handleChangeInputComponent}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-row mt-2">
                                <InputComponent
                                    unaLinea={true}
                                    labelBloques={"col-2"}
                                    bloques={"col-10"}
                                    etiqueta={"Nombre Comercial"}
                                    idInput={"nuevoNombreComercial"}
                                    nombreInput={"nuevoNombreComercial"}
                                    readOnly={false}
                                    valorDefecto={this.state.nuevoNombreComercial}
                                    placeholder={this.state.nombreComercialE}
                                    funcionControl={this.handleChangeInputComponent}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-row mt-2">
                                <InputComponent
                                    unaLinea={true}
                                    labelBloques={"col-4"}
                                    bloques={"col-8"}
                                    etiqueta={"Usuario Sol"}
                                    idInput={"nuevoUsuarioSol"}
                                    nombreInput={"nuevoUsuarioSol"}
                                    readOnly={false}
                                    valorDefecto={this.state.nuevoUsuarioSol}
                                    placeholder={this.state.usuarioSolE}
                                    funcionControl={this.handleChangeInputComponent}
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-row mt-2">
                                <InputComponent
                                    tipoInput={"password"}
                                    unaLinea={true}
                                    labelBloques={"col-4"}
                                    bloques={"col-8"}
                                    etiqueta={"Clave Sol"}
                                    idInput={"nuevaClaveSol"}
                                    nombreInput={"nuevaClaveSol"}
                                    readOnly={false}
                                    valorDefecto={this.state.nuevaClaveSol}
                                    funcionControl={this.handleChangeInputComponent}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-row mt-2">
                                <InputComponent
                                    unaLinea={true}
                                    labelBloques={"col-2"}
                                    bloques={"col-10"}
                                    etiqueta={"Dirección"}
                                    idInput={"nuevaDireccion"}
                                    nombreInput={"nuevaDireccion"}
                                    readOnly={false}
                                    valorDefecto={this.state.nuevaDireccion}
                                    placeholder={this.state.direccionE}
                                    funcionControl={this.handleChangeInputComponent}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-row mt-2">
                                <InputComponent
                                    unaLinea={true}
                                    labelBloques={"col-4"}
                                    bloques={"col-8"}
                                    etiqueta={"Urbanizacion"}
                                    idInput={"nuevaUrbanizacion"}
                                    nombreInput={"nuevaUrbanizacion"}
                                    readOnly={false}
                                    valorDefecto={this.state.nuevaUrbanizacion}
                                    placeholder={this.state.urbanizacionE}
                                    funcionControl={this.handleChangeInputComponent}
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-row mt-2">
                                <InputComponent
                                    unaLinea={true}
                                    labelBloques={"col-4"}
                                    bloques={"col-8"}
                                    etiqueta={"Distrito"}
                                    idInput={"nuevoDistritoE"}
                                    nombreInput={"nuevoDistritoE"}
                                    readOnly={false}
                                    valorDefecto={this.state.nuevoDistritoE}
                                    placeholder={this.state.distritoE}
                                    funcionControl={this.handleChangeInputComponent}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-row mt-2">
                                <InputComponent
                                    unaLinea={true}
                                    labelBloques={"col-4"}
                                    bloques={"col-8"}
                                    etiqueta={"Provincia"}
                                    idInput={"nuevaProvincia"}
                                    nombreInput={"nuevaProvincia"}
                                    readOnly={false}
                                    valorDefecto={this.state.nuevaProvincia}
                                    placeholder={this.state.provinciaE}
                                    funcionControl={this.handleChangeInputComponent}
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-row mt-2">
                                <InputComponent
                                    unaLinea={true}
                                    labelBloques={"col-4"}
                                    bloques={"col-8"}
                                    etiqueta={"Departamento"}
                                    idInput={"nuevoDepartamentoE"}
                                    nombreInput={"nuevoDepartamentoE"}
                                    readOnly={false}
                                    valorDefecto={this.state.nuevoDepartamentoE}
                                    placeholder={this.state.departamentoE}
                                    funcionControl={this.handleChangeInputComponent}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-row mt-2">
                                <InputComponent
                                    unaLinea={true}
                                    labelBloques={"col-4"}
                                    bloques={"col-8"}
                                    etiqueta={"Ubigeo"}
                                    idInput={"nuevoUbigeo"}
                                    nombreInput={"nuevoUbigeo"}
                                    readOnly={false}
                                    valorDefecto={this.state.nuevoUbigeo}
                                    placeholder={this.state.ubigeoE}
                                    funcionControl={this.handleChangeInputComponent}
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-row mt-2">
                                <InputComponent
                                    tipoInput={"number"}
                                    unaLinea={true}
                                    labelBloques={"col-4"}
                                    bloques={"col-8"}
                                    etiqueta={"Número de Contacto"}
                                    idInput={"nuevoNumeroDeContacto"}
                                    nombreInput={"nuevoNumeroDeContacto"}
                                    readOnly={false}
                                    valorDefecto={this.state.nuevoNumeroDeContacto}
                                    placeholder={this.state.numeroDeContactoE}
                                    funcionControl={this.handleChangeInputComponent}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-row mt-2">
                                <InputComponent
                                    unaLinea={true}
                                    labelBloques={"col-2"}
                                    bloques={"col-10"}
                                    etiqueta={"Rubros"}
                                    idInput={"nuevoRubro"}
                                    nombreInput={"nuevoRubro"}
                                    readOnly={false}
                                    valorDefecto={this.state.nuevoRubro}
                                    placeholder={this.state.rubroE}
                                    funcionControl={this.handleChangeInputComponent}
                                />
                            </div>

                            <div className="form-row mt-2">
                                <InputComponent
                                    unaLinea={true}
                                    labelBloques={"col-2"}
                                    bloques={"col-10"}
                                    etiqueta={"Imagen de la Empresa(link)"}
                                    idInput={"nuevaImagenEmpresa"}
                                    nombreInput={"nuevaImagenEmpresa"}
                                    readOnly={false}
                                    valorDefecto={this.state.nuevaImagenEmpresa}
                                    placeholder={this.state.imagenEmpresaE}
                                    funcionControl={this.handleChangeInputComponent}
                                />
                            </div>
                            <div className="form-row justify-content-center mt-3">
                                <div className="col-6">
                                    <button
                                        className="btn btn-success btn-block"
                                        onClick={this.crearNuevo}
                                    >
                                        ACTUALIZAR DATOS DE EMPRESA
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </React.Fragment>
        
        );
    }

    //Función para mostrar formulario para crear PERFIL
    renderCrearPerfil(){
        return(
            <div></div>
        );
    }

    //Función para renderizar la vista.
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