import React, {Component} from 'react';
import InputComponent from "../common2/inputcomponent";
import SelectComponent from "../common2/selectcomponent";
import {toast, ToastContainer} from "react-toastify";

class Crearusuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //sesion
            nombreUsuario: "",
            clave1: "",
            clave2: "",
            ruc: "",
            perfilUsuario: '',      //tipo de perfil seleccionado
            listaPerfiles: [],

            controlUsuarioDuplicado: 0,
            esRucCorrecto: false,
            correctoClaveRepetida: true,
            esLargoClave: true,
            controlCorreoValido: false,

            //cuenta
            nombres: "",
            apellidos: "",
            tipoDocumento: "",
            doc: "",
            numeroDocumento: "",
            numeroContacto: "",
            direccion: "",
            correo: "",
            ciudadCuenta: "",
            provinciaCuenta: "",
            departamentoCuenta: "",

        };

        this.crearUsuario = this.crearUsuario.bind(this);

        // HANDLE FUNCTIONS
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleChangeSelectComponent = this.handleChangeSelectComponent.bind(this);

        // FECTH FUNCTIONS
        this.fetchPerfilesUsuario = this.fetchPerfilesUsuario.bind(this);

        // ONBLUR FUNCTIONS
        this.onBlurInput = this.onBlurInput.bind(this);
        this.borrarTodo = this.borrarTodo.bind(this);
        
        
    }

    //Función para limpiar todos los campos
    borrarTodo(){
        console.log("BORRANDO TODO");
        this.setState({
            //sesion
            nombreUsuario: '',
            clave1: '',
            clave2: '',
            ruc: '',

            //cuenta
            nombres: '',
            apellidos: '',
            tipoDocumento: '',
            numeroDocumento: '',
            numeroContacto: '',
            direccion: '',
            correo: '',
            ciudadCuenta: '',
            provinciaCuenta: '',
            departamentoCuenta: '',

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
        if (evt.target.name === "nombreUsuario"){
            fetch(
                '/usuarios/validarusuario',{
                    method: 'POST',
                    body: JSON.stringify({
                        nombreUsuario: this.state.nombreUsuario,
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then(res => res.json())
                .then(datoUsuario => {
                    console.log("onblur:", datoUsuario);
                    if (datoUsuario.status === "error"){
                        alert(datoUsuario.msg);
                    }else{
                        if (datoUsuario.data.length > 0){
                            this.setState({
                                controlUsuarioDuplicado: 1,
                            });
                        }else{
                            this.setState({
                                controlUsuarioDuplicado: 2,
                            });
                        }
                    }
                })
                .catch(err => console.warn("Error ONBLUR VALIDAR NOMBRE USUARIO:", err));
        }
    }

    //Funcion que obtiene los nombres de los Perfiles y los inserta en el arreglo listaPerfiles
    fetchPerfilesUsuario() {
        fetch('/usuarios/obtenerperfiles', { 
                    headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                }})
            .then(res => res.json())
            .then(
                data => {
                    if (data.status === "error"){
                        toast.error('Vuelva a iniciar sesión, hay fallas en su autenticación.', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                    }else{
                        this.setState({ listaPerfiles: [...data] });
                    }
                })
            .catch(err => console.log(err));
    }

    //Función que muestra los datos en la interfaz(METODO REACT) llama a los demás funciones
    componentDidMount() {
        this.fetchPerfilesUsuario();
    }

    //Funcion necesaria para poder cambiar los valores del INPUTCOMPONENT
    handleChangeInput(evt){
        switch(evt.target.name) {
            case "nombreUsuario":
                this.setState({ nombreUsuario: evt.target.value,});
                break;
            case "clave1":
                this.setState({ clave1: evt.target.value,}, () => {
                    if (this.state.clave1.length < 7){
                        this.setState({ esLargoClave: false,});
                    }else{
                        this.setState({ esLargoClave: true,});
                    }
                });
                break;
            case "clave2":
                this.setState({ clave2: evt.target.value,}, () => {
                    if (this.state.clave1 !== this.state.clave2){
                        this.setState({ correctoClaveRepetida: false,});
                    }else{
                        this.setState({ correctoClaveRepetida: true,});
                    }
                });
                break;
            case "ruc":
                this.setState({ ruc: evt.target.value,}, () => {
                    if (this.state.ruc.length < 10){
                        this.setState({ esRucCorrecto: false,});
                    }else{
                        this.setState({ esRucCorrecto: true,});
                    }
                });
                break;
            case "nombres":
                this.setState({ nombres: evt.target.value,});
                break;
            case "apellidos":
                this.setState({ apellidos: evt.target.value,});
                break;
            case "tipoDocumento":
                this.setState({ tipoDocumento: evt.target.value,});
                break;
            case "numeroDocumento":
                this.setState({ numeroDocumento: evt.target.value,});
                break;
            case "direccion":
                this.setState({ direccion: evt.target.value,});
                break;
            case "correo":
                this.setState({ correo: evt.target.value,}, () =>{
                    if(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(this.state.correo)){
                        this.setState({
                            controlCorreoValido: true,
                        });
                    } else {
                        this.setState({
                            controlCorreoValido: false,
                        });
                    }
                });
                break;
            case "ciudadCuenta":
                this.setState({ ciudadCuenta: evt.target.value,});
                break;
            case "provinciaCuenta":
                this.setState({ provinciaCuenta: evt.target.value,});
                break;
            case "departamentoCuenta":
                this.setState({ departamentoCuenta: evt.target.value,});
                break;

            default:
              // code block
            }
    }

    //Funcion necesaria para poder elegir entre  los valores del SELECTCOMPONENT
    handleChangeSelectComponent(evt){
        if (evt.target.name === "perfilUsuario"){
            this.setState({
                perfilUsuario: evt.target.value,
            });
        }
    }

    //Función BackEnd para crear un Usuario Sesion
    crearUsuario(){
        this.state.fecCreacionUsuario = this.getCurrentDate(); //dar el valor que retorna la funcion a la variable fecCreacionUsuario

        //Comprobar si los campos están vacios
        if (this.state.nombreUsuario == '' || this.state.ruc == '' || this.state.clave1 == '' || this.state.perfilUsuario == '') {
            toast.error('Por favor llene todos los campos', { 
                position: "bottom-right", autoClose: 2000, hideProgressBar: false, 
                closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            return;
        }
        //falta añadir mas comprobaciones
        else {
            //Añadiendo a la BD - Mandar estos parametros a través de esta ruta.
            fetch('/usuarios/usuarios', {
                method: 'POST',
                body: JSON.stringify({

                    //Sesion
                    nombreUM: this.state.nombreUsuario,
                    rucUM: this.state.ruc.toUpperCase(),
                    claveUM: this.state.clave1.toUpperCase(),
                    fechaCreacionUM: this.state.fecCreacionUsuario.toUpperCase(),
                    tipoPerfilUM: this.state.perfilUsuario.toUpperCase(),
                    tokenUM: "-",
                    //No se puede mandar numeros
                    creadoPorUM: "1",
                    habilitadoUM: "1",
                    idNegocioAsignadoUM: "3", //id del negocio en el que esta trabajando el sistema


                    //Cuenta (ERROR NO SE PUEDE CREAR JUNTO) MEDIANTE EL ASYNC ESPERAR EL ID DEL ANTERIOR Y AGREGARLO A IDDATOS
                    //idDatosUM: "3",
                    nombresUM: this.state.nombres.toUpperCase(),
                    apellidosUM: this.state.apellidos.toUpperCase(),
                    //no carga el tipo de documento del arreglo Documentos
                    tipoDocumentoUM: "1",
                    numDocumentoUM: this.state.numeroDocumento,
                    telefonosUM: this.state.numeroContacto,
                    direccionUM: this.state.direccion,
                    correosUM: this.state.correo,
                    ciudad: this.state.ciudadCuenta.toUpperCase(),
                    provincia: this.state.provinciaCuenta.toUpperCase(),
                    departamento: this.state.departamentoCuenta.toUpperCase(),
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
                            toast.success('Nuevo usuario agregado', { 
                                position: "bottom-right", autoClose: 2000, hideProgressBar: false, 
                                closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                            this.borrarTodo.bind(this);
                        }
                        if (data == -1) {
                            toast.error('Uusario actualizada', { 
                                position: "bottom-right", autoClose: 2000, hideProgressBar: false, 
                                closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                        }
                    }
                })
                .catch(err => console.log(err));

            //clear
            this.setState({
                //sesion
                nombreUsuario: '',
                ruc: '',
                clave1: '',
                perfilUsuario: '',
                fecCreacionPerfil: '',

                //detalles
                nombres: "",
                apellidos: "",
                tipoDocumento: "",
                numeroDocumento: "",
                numeroContacto: "",
                direccion: "",
                correo: "",
                ciudadCuenta: "",
                provinciaCuenta: "",
                departamentoCuenta: "",

            });
        }
    }

    //Renderizar el formulario para ingresar un nuevo Usuario
    renderDatosUsuario(){
        return (
            <div className="row">
                <hr/>
                <div className="col-12 text-center">
                    <h3>Datos de la Sesión</h3>
                    <div className="form-row justify-content-center">

                        <InputComponent
                            bloques={"col-3"}
                            classInput={this.state.controlUsuarioDuplicado === 1? "is-invalid": this.state.controlUsuarioDuplicado === 2? "is-valid":""}
                            etiqueta={"Nombre de Usuario"}
                            idInput={"nombreUsuario"}
                            nombreInput={"nombreUsuario"}
                            mensajeValidacionError={"Usuario ya existe"}
                            mensajeValidacionOk={"Usuario disponible"}
                            readOnly={false}
                            funcionControl={this.handleChangeInput}
                            blurFuncionControl={this.onBlurInput}
                        />

                        <InputComponent
                            tipoInput={"number"}
                            classInput={this.state.esRucCorrecto === false? "is-invalid": "is-valid"}
                            bloques={"col-3"}
                            etiqueta={"RUC"}
                            idInput={"ruc"}
                            nombreInput={"ruc"}
                            mensajeValidacionError={"Verificar RUC"}
                            mensajeValidacionOk={"Formato RUC correcto"}
                            readOnly={false}
                            funcionControl={this.handleChangeInput}
                        />

                        <InputComponent
                            tipoInput={"password"}
                            bloques={"col-3"}
                            classInput={!this.state.esLargoClave? "is-invalid": ""}
                            mensajeValidacionError={"Longitud de clave corto"}
                            etiqueta={"Contraseña"}
                            idInput={"clave1"}
                            nombreInput={"clave1"}
                            readOnly={false}
                            funcionControl={this.handleChangeInput}
                        />

                        <InputComponent
                            tipoInput={"password"}
                            bloques={"col-3"}
                            classInput={this.state.correctoClaveRepetida === false? "is-invalid": ""}
                            etiqueta={"Repetir Contraseña"}
                            idInput={"clave2"}
                            nombreInput={"clave2"}
                            mensajeValidacionError={"Las claves no son iguales"}
                            readOnly={false}
                            funcionControl={this.handleChangeInput}
                        />

                        <SelectComponent
                            bloques={"col-6 text-center"}
                            etiqueta={"Tipo de Perfil"}
                            idSelect={"perfilUsuario"}    //Id que será llamada a través de handleChangeSelectComponent
                            nombreSelect={"perfilUsuario"}
                            esJson={true}
                            contenido={this.state.listaPerfiles}
                            nombreValor={"tipoPerfilUM"}
                            //Falta poner id - nombre perfil 
                            nombreMostrar={"nombrePerfil"}  //Aquí se coloca el campo de la BD que se mostrará en el Select (via método Handle)
                            //valorDefecto={this.state.perfilUsuario}
                            funcionControl={this.handleChangeSelectComponent}
                        />          

                    </div>

                    <hr/>
                    <h3>Datos de la Cuenta de Usuario </h3>

                    <div className="form-row">
                        <InputComponent
                            bloques={"col-3"}
                            etiqueta={"Nombres"}
                            idInput={"nombres"}
                            nombreInput={"nombres"}
                            readOnly={false}
                            funcionControl={this.handleChangeInput}
                        />
                        <InputComponent
                            bloques={"col-3"}
                            etiqueta={"Apellidos"}
                            idInput={"apellidos"}
                            nombreInput={"apellidos"}
                            readOnly={false}
                            funcionControl={this.handleChangeInput}
                        />
                        <SelectComponent
                            bloques={"col-3"}
                            etiqueta={"Tipo Documento"}
                            idSelect={"tipoDocumento"}
                            nombreSelect={"tipoDocumento"}
                            esJson={true}
                            contenido={Documentos}
                            funcionControl={() => {}}
                            nombreMostrar={"nombre"}
                            nombreValor={"cod"}
                        />
                        <InputComponent
                            tipoInput={"number"}
                            bloques={"col-3"}
                            etiqueta={"Número de Documento"}
                            idInput={"numeroDocumento"}
                            nombreInput={"numeroDocumento"}
                            readOnly={false}
                            funcionControl={this.handleChangeInput}
                        />
                    </div>

                    <div className="form-row mt-3">
                        <InputComponent
                            tipoInput={"number"}
                            bloques={"col-3"}
                            etiqueta={"Número de Contacto"}
                            idInput={"numeroContacto"}
                            nombreInput={"numeroContacto"}
                            readOnly={false}
                            funcionControl={this.handleChangeInput}
                        />

                        <InputComponent
                            //tipoInput={"number"}
                            bloques={"col-5"}
                            etiqueta={"Dirección"}
                            idInput={"direccion"}
                            nombreInput={"direccion"}
                            readOnly={false}
                            funcionControl={this.handleChangeInput}
                        />

                        <InputComponent
                            tipoInput={"mail"}                            
                            bloques={"col-4"}
                            etiqueta={"Correo electrónico"}
                            idInput={"correo"}
                            nombreInput={"correo"}
                            readOnly={false}
                            funcionControl={this.handleChangeInput}
                            
                            classInput={this.state.controlCorreoValido === false? "is-invalid": "is-valid"}
                            mensajeValidacionError={"Ingrese correo valido"}
                            mensajeValidacionOk={"Correo valido"}
                            
                        />
                        
                    </div>
                    
                    <div className="form-row mt-3">
                        <InputComponent
                            bloques={"col-4"}
                            etiqueta={"Ciudad"}
                            idInput={"ciudadCuenta"}
                            nombreInput={"ciudadCuenta"}
                            readOnly={false}
                            funcionControl={this.handleChangeInput}
                        />
                        <InputComponent
                            bloques={"col-4"}
                            etiqueta={"Provincia"}
                            idInput={"provinciaCuenta"}
                            nombreInput={"provinciaCuenta"}
                            readOnly={false}
                            funcionControl={this.handleChangeInput}
                        />
                        <InputComponent
                            bloques={"col-4"}
                            etiqueta={"Departamento"}
                            idInput={"departamentoCuenta"}
                            nombreInput={"departamentoCuenta"}
                            readOnly={false}
                            funcionControl={this.handleChangeInput}
                        />
                    </div>

                    <div className="form-row justify-content-center mt-3">
                        <div className="col-5">
                            <button className="btn btn-success btn-block" onClick={this.crearUsuario}> REGISTRAR USUARIO </button>
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
                    {this.renderDatosUsuario()}
                </div>
            </React.Fragment>
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

export default Crearusuario;