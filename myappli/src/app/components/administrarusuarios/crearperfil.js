import React, {Component} from 'react';
import InputComponent from "../common2/inputcomponent";
import {toast, ToastContainer} from "react-toastify";
import Checkbox from "./Checkbox"

//Clase para crear un nuevo Perfil con los permisos correspondientes
class CrearPerfil extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            nombrePerfil: '',
            fecCreacionPerfil: '',
            controlPerfilDuplicado: 0,

            //Permisos
            //opciones_grupos: [],    //5 grupos de permisos
            opciones_permisos: [],  //13 permisos especificos 

            checkedItems: [],
        };
        
        // HANDLE FUNCTIONS
        this.handleChangeInputComponent = this.handleChangeInputComponent.bind(this);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);

        // FETCH FUNCTIONS
        //this.fetchPerfilesGrupo = this.fetchPerfilesGrupo.bind(this);
        this.fetchPerfilesPermisos = this.fetchPerfilesPermisos.bind(this);

        // ONBLUR FUNCTIONS
        this.onBlurInput = this.onBlurInput.bind(this);

        // OTHER FUNCTIONS
        this.verificarMarcado = this.verificarMarcado.bind(this);
        this.borrarTodo = this.borrarTodo.bind(this);
        this.crearPerfil = this.crearPerfil.bind(this);

    }

    //Función para limpiar todos los campos
    borrarTodo(){
        console.log("BORRANDO TODO");
        this.setState({
            nombrePerfil: '',
            fecCreacionPerfil: '',
            controlPerfilDuplicado: 0,
            //opciones_grupos: [],    //5 grupos de permisos
            opciones_permisos: [],  //13 permisos especificos
            checkedItems: [],

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

    /*
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
    */

    //Funcion que obtiene todos los PERMISOS y los inserta en el arreglo opciones_permisos
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

    //Función que muestra los datos en la interfaz(METODO REACT) llama a los demás funciones
    componentDidMount() {
        //this.fetchPerfilesGrupo();
        this.fetchPerfilesPermisos();
    }

    //Función que maneja los campos seleccionados en el checbox y los inserta en el arreglo checkedItems[]
    //Si uno es deseleccionado asimismo elimina tal id del arreglo y vuelve a llenar el arreglo para no afectar los demas valores
    handleChangeCheckbox(evt) {
        const idPermisoSeleccionado = parseInt(evt.target.id);
        const idxPermiso = this.state.checkedItems.indexOf(idPermisoSeleccionado);
        if (idxPermiso < 0){
            let nuevaCheckedItem = this.state.checkedItems;
            nuevaCheckedItem.push(parseInt(evt.target.id));
            this.setState({
                checkedItems: nuevaCheckedItem,
            });
        }else{
            let nuevaListaCheckItems = [];
            for (let i = 0; i < this.state.checkedItems.length; i++){
                if (i !== idxPermiso)
                    nuevaListaCheckItems.push(this.state.checkedItems[i]);
            }
            this.setState({
                checkedItems: nuevaListaCheckItems,
            });
        }
        /*const item = e.target.name;
        const isChecked = e.target.checked;
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));*/
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

    //Función para verificar marcado
    verificarMarcado(idPermiso){
        return this.state.checkedItems.indexOf(idPermiso) >= 0;
    }

    //Función Back End para crear un nuevo Perfil
    crearPerfil(){
        this.state.fecCreacionPerfil = this.getCurrentDate(); //dar el valor que retorna la funcion a la variable fecCreacionPerfil
        if (this.state.nombrePerfil  == '' || this.state.checkedItems.length == 0) {
            toast.error('Por favor ingrese el nombre de perfil o los permisos', { 
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
                    fechaCreacionPerfil: this.state.fecCreacionPerfil.toUpperCase(),
                    idPermisoAPerfil: this.state.checkedItems,
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

            //LimiparDatos
            this.setState({
                nombrePerfil: '',
                        
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
                <div className="form-row justify-content-center mt-3">
                    <div className="col-6">
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
                </div>  
            
                <hr/>
                <h3>Permisos a otorgar</h3> 

                <div className="form-row justify-content-center mt-3">
                    <div className="col-6">
                        <table className="table table-sm table-bordered">
                            <tbody>
                            {
                                //Obtiene y mustra los datos obtenidos de la BD idPermiso y nombrePermiso a través de item
                                this.state.opciones_permisos.map((item, idx) => (
                                    <tr className="mt-0" key={idx}>
                                        <td><label key={item.idPermiso} htmlFor={item.nombrePermiso}>{item.nombrePermiso}</label></td>
                                        <td><Checkbox id={item.idPermiso}  name={item.nombrePermiso} checked={this.verificarMarcado(parseInt(item.idPermiso))} onChange={this.handleChangeCheckbox} /></td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                    
                {   //console.log(this.state.checkedItems.size)
                }
                {   console.log(this.state.checkedItems)}
                    
                <div className="form-row justify-content-center mt-3">
                    <div className="col-6">
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