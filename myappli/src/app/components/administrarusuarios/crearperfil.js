import React, {Component} from 'react';
import InputComponent from "../common2/inputcomponent";
import SelectComponent from "../common2/selectcomponent";
import {toast, ToastContainer} from "react-toastify";
import CheckBox from "./Checkbox"

class CrearPerfil extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
                
            nombrePerfil: '',
            fecCreacionPerfil: '',
            
            controlPerfilDuplicado: 0,

            //Permisos
            opciones_grupos: [],    //5 grupos de permisos
            opciones_permisos: [],  //13 permisos especificos
            grupoPermisos: '',       

            lista_permisos: [], //lista permisos a registrar

            modoPermisos: false,
            

        };
        
        this.crearPerfil = this.crearPerfil.bind(this);
        // HANDLE FUNCTIONS
        this.handleChangeInputComponent = this.handleChangeInputComponent.bind(this);
        this.handleChangeSelectComponent = this.handleChangeSelectComponent.bind(this);
        this.handleButtonOnClick = this.handleButtonOnClick.bind(this);

        // FETCH FUNCTIONS
        this.fetchPerfilesGrupo = this.fetchPerfilesGrupo.bind(this);
        this.fetchPerfilesPermisos = this.fetchPerfilesPermisos.bind(this);
        this.fetchPermisosAPerfil = this.fetchPermisosAPerfil.bind(this);

        // ONBLUR FUNCTIONS
        this.onBlurInput = this.onBlurInput.bind(this);
        
    }

    //Función para limpiar todos los campos
    borrarTodo(){
        console.log("BORRANDO TODO");
        this.setState({
            nombrePerfil: '',
        });
    }

    //Función para obtener la fecha actual y darle el formato que tiene en la BD
    getCurrentDate(separator='-'){
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }

    //Esta función sirve para validar si el perfil ingresado existe o no
    onBlurInput(evt){
        if (evt.target.name === "nombrePerfil"){
            fetch(
                '/perfiles/validarperfil',{
                    method: 'POST',
                    body: JSON.stringify({
                        nombrePerfil: this.state.nombrePerfil,
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then(res => res.json())
                .then(datoPerfil => {
                    console.log("onblur:", datoPerfil);
                    if (datoPerfil.status === "error"){
                        alert(datoPerfil.msg);
                    }else{
                        if (datoPerfil.data.length > 0){
                            this.setState({
                                controlPerfilDuplicado: 1,
                            });
                        }else{
                            this.setState({
                                controlPerfilDuplicado: 2,
                            });
                        }
                    }
                })
                .catch(err => console.warn("Error ONBLUR VALIDAR NOMBRE USUARIO:", err));
        }
    }

    //Funcion que obtiene los nombres de los Grupos y los inserta en el arreglo opciones_grupos
    fetchPerfilesGrupo() {
        fetch('/perfiles/grupos')
            .then(res => res.json())
            .then(
                data => {
                    if (data.status === "error"){
                        toast.error('Vuelva a iniciar sesión, hay fallas en su autenticación.', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                    }else{
                        this.setState({ opciones_grupos: [...data] });
                    }
                })
            .catch(err => console.log(err));
    }

    //Funcion que obtiene los PERMISOS y los inser en el arreglo opciones_permisos
    fetchPerfilesPermisos() {
        fetch('/perfiles/permisos')
            .then(res => res.json())
            .then(
                data => {
                    if (data.status === "error"){
                        toast.error('Vuelva a iniciar sesión, hay fallas en su autenticación.', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                    }else{
                        this.setState({ opciones_permisos: [...data] });
                    }
                })
            .catch(err => console.log(err));
    }

    //Funcion que obtiene los PERMISOS y los inser en el arreglo opciones_permisos
    fetchPermisosAPerfil() {
        fetch('/perfiles/registrados')
            .then(res => res.json())
            .then(
                data => {
                    if (data.status === "error"){
                        toast.error('Vuelva a iniciar sesión, hay fallas en su autenticación.', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                    }else{
                        this.setState({ opciones_permisos: [...data] });
                    }
                })
            .catch(err => console.log(err));
    }

    
    //Función que muestra los datos en la interfaz(METODO REACT) llama a los demás funciones
    componentDidMount() {
        this.fetchPerfilesGrupo();
        this.fetchPerfilesPermisos();
        this.fetchPermisosAPerfil();
        
    }

    //Función necesaria para controlar los eventos de los Botones
    handleButtonOnClick(evt){
        /*
        if (evt.target.name === "btnCrearPermisos"){
            this.setState({
                modoPermisos: true,
            });
        }
        */
    }

    //Funcion necesaria para poder cambiar los valores del INPUTCOMPONENT
    handleChangeInputComponent(evt){
        if (evt.target.name === "nombrePerfil"){
            this.setState({
                nombrePerfil: evt.target.value,
            });
            return 1;
        }
    }

    //Funcion necesaria para poder elegir entre  los valores del SELECTCOMPONENT
    handleChangeSelectComponent(evt){
        if (evt.target.name === "grupoPermisos"){
            this.setState({
                grupoPermisos: evt.target.value,
            });
        }
    }

    //Función Back End para crear un Perfil
    crearPerfil(){
        this.state.fecCreacionPerfil = this.getCurrentDate(); //dar el valor que retorna la funcion a la variable fecCreacionPerfil
        if (this.state.nombrePerfil  == '' || this.state.grupoPermisos == '') {
            toast.error('Por favor llene todos los campos', { 
            position: "bottom-right", 
            autoClose: 2000, 
            hideProgressBar: false,
            closeOnClick: true, 
            pauseOnHover: true, 
            draggable: true, 
            transition: "slide" });
            return;
        }else {
            fetch('/perfiles/perfiles', {
                method: 'POST',
                body: JSON.stringify({
                    nombrePerfil: this.state.nombrePerfil.toUpperCase(),
                    fechaCreacion: this.state.fecCreacionPerfil.toUpperCase(),
                    idGrupo: this.state.grupoPermisos,
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
                        toast.success('Nueva perfil agregada', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                        this.borrarTodo.bind(this);
                    }
                    if (data == -1) {
                        toast.error('Perfil actualizada', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                    }
                }
            })
            .catch(err => console.log(err));

            //clear
            this.setState({
                nombrePerfil: '',
                grupoPermisos: '',
                
            });
            borrarTodo();
        }    
    }

    //Renderizar el formulario para ingresar un nuevo PeriflS
    renderDatosPerfil(){
        return (
            <div className="row">
            <hr/>
            <div className="col-12 text-center">
                <h3>Datos del Perfil</h3>
                
                <hr/>
                <div className="form-row ">
                    <InputComponent
                        bloques={"col-12 text-center"}
                        classInput={
                            this.state.controlPerfilDuplicado === 1? "is-invalid": 
                            this.state.controlPerfilDuplicado === 2? "is-valid":""}
                        etiqueta={"Nombre de Perfil"}
                        idInput={"nombrePerfil"}
                        nombreInput={"nombrePerfil"}
                        mensajeValidacionError={"Perfil ya existe"}
                        mensajeValidacionOk={"Perfil disponible"}
                        readOnly={false}
                        funcionControl={this.handleChangeInputComponent}
                        blurFuncionControl={this.onBlurInput}
                    />
                </div>  
            
                <hr/>
                <h3>Permisos a otorgar</h3> 
                
                {
                    this.state.opciones_permisos.map((ele,idx)=>{
                        return(
                            <React.Fragment>
                            <div className="form-row justify-content-center mt-0">
                            <div className="form-row">
                                <td><CheckBox
                                        checked={true}
                                        disabled={false}
                                        id={"1"}
                                        /></td>
                                <tr>{JSON.stringify(ele).split(/"/)[3] }</tr>
                            </div>
                            </div>
                            </React.Fragment>
                        );
                    }) 
                }
                    
                <div className="form-row justify-content-center mt-3">
                    <div className="col-12">
                        <button className="btn btn-success btn-block" onClick={this.crearPerfil}> REGISTRAR PERFIL </button>
                    </div>
                </div> 
        
            </div>
            </div>
        );
    }

    //Render general
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
                </div>
                
                <div className="col-12">
                    {this.renderDatosPerfil()}
                </div>
            </React.Fragment>
        );
    }
}

export default CrearPerfil;