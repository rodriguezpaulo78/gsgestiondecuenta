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

            //Empresa
            rucEmpresa: "",
            razonSocial: "",
            nombresNegocio: "",
            apePatNegocio: "",
            apeMatNegocio: "",
            nombreComNegocio: "",
            usuarioSol: "",
            claveSol: "",
            claveSol2: "",
            direccionNegocio: "",
            ubigeoNegocio: "",
            urbanizacion: "",
            distritoNegocio: "",
            provinciaNegocio: "",
            departamentoNegocio: "",
            rubros: "",
            contactoNegocio: "",
            imagenNegocio: "",
            cadenaConexion: "",
        };

        this.crearUsuario = this.crearUsuario.bind(this);
        this.crearUsuarioCuenta = this.crearUsuarioCuenta.bind(this);
        this.crearUsuarioNegocio = this.crearUsuarioNegocio.bind(this);
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

            //empresa
            rucEmpresa: '',
            razonSocial: '',
            nombresNegocio: '',
            apePatNegocio: '',
            apeMatNegocio: '',
            nombreComNegocio: '',
            usuarioSol: '',
            claveSol: '',
            claveSol2: '',
            direccionNegocio: '',
            ubigeoNegocio: '',
            urbanizacion: '',
            distritoNegocio: '',
            provinciaNegocio: '',
            departamentoNegocio: '',
            rubros: '',
            contactoNegocio: '',
            imagenNegocio: '',
            cadenaConexion: '',
            
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
                this.setState({ correo: evt.target.value,});
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
            case "rucEmpresa":
                this.setState({ rucEmpresa: evt.target.value,});
                break;
            case "razonSocial":
                this.setState({ razonSocial: evt.target.value,});
                break;
            case "nombresNegocio":
                this.setState({ nombresNegocio: evt.target.value,});
                break;
            case "apePatNegocio":
                this.setState({ apePatNegocio: evt.target.value,});
                break;
            case "apeMatNegocio":
                this.setState({ apeMatNegocio: evt.target.value,});
                break;
            case "nombreComNegocio":
                this.setState({ nombreComNegocio: evt.target.value,});
                break;
            case "usuarioSol":
                this.setState({ usuarioSol: evt.target.value,});
                break;
            case "claveSol":
                this.setState({ claveSol: evt.target.value,});
                break;
            case "claveSol2":
                this.setState({ claveSol2: evt.target.value,});
                break;
            case "direccionNegocio":
                this.setState({ direccionNegocio: evt.target.value,});
                break;
            case "ubigeoNegocio":
                this.setState({ ubigeoNegocio: evt.target.value,});
                break;
            case "urbanizacion":
                this.setState({ urbanizacion: evt.target.value,});
                break;
            case "distritoNegocio":
                this.setState({ distritoNegocio: evt.target.value,});
                break;
            case "provinciaNegocio":
                this.setState({ provinciaNegocio: evt.target.value,});
                break;
            case "departamentoNegocio":
                this.setState({ departamentoNegocio: evt.target.value,});
                break;
            case "rubros":
                this.setState({ rubros: evt.target.value,});
                break;
            case "contactoNegocio":
                this.setState({ contactoNegocio: evt.target.value,});
                break;
            case "imagenNegocio":
                this.setState({ imagenNegocio: evt.target.value,});
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
                    //No se puede mandar numeros
                    creadoPorUM: "1",
                    habilitadoUM: "1",
                    idNegocioAsignadoUM: "3",
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

            });
        }
    }

    //Función BackEnd para crear un Usuario Cuenta
    crearUsuarioCuenta(){
        //Comprobar si los campos están vacios
        if (this.state.nombreUsuario == '') {
            toast.error('Por favor llene todos los campos', { 
                position: "bottom-right", autoClose: 2000, hideProgressBar: false, 
                closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            return;
        }
        //falta añadir mas comprobaciones
        else {
            //Añadiendo a la BD - Mandar estos parametros a través de esta ruta.
            fetch('/usuarios/usuariosCuenta', {
                method: 'POST',
                body: JSON.stringify({

                    //Cuenta (ERROR NO SE PUEDE CREAR JUNTO)
                    //idDatosUM: "3",
                    nombresUM: this.state.nombres.toUpperCase(),
                    apellidosUM: this.state.apellidos.toUpperCase(),
                    tipoDocumentoUM: this.state.tipoDocumento,
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
                //cuenta
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

     //Función BackEnd para crear un Usuario Negocio
     crearUsuarioNegocio(){
        this.state.fecCreacionUsuario = this.getCurrentDate(); //dar el valor que retorna la funcion a la variable fecCreacionUsuario

        //Comprobar si los campos están vacios
        if (this.state.rucEmpresa == '') {
            toast.error('Por favor llene todos los campos', { 
                position: "bottom-right", autoClose: 2000, hideProgressBar: false, 
                closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            return;
        }
        //falta añadir mas comprobaciones
        else {
            //Añadiendo a la BD - Mandar estos parametros a través de esta ruta.
            fetch('/usuarios/usuariosNegocio', {
                method: 'POST',
                body: JSON.stringify({

                    //negocio
                    ruc: this.state.rucEmpresa,
                    razonSocial: this.state.razonSocial,
                    nombresN: this.state.nombresNegocio,
                    apellidospN: this.state.apePatNegocio,
                    apellidosmN: this.state.apeMatNegocio,
                    nombreComercialIN: this.state.nombreComNegocio,
                    usuariosolIN: this.state.usuarioSol,
                    clavesolIN: this.state.claveSol,
                    direccionN: this.state.direccionNegocio,
                    ubigeoN: this.state.ubigeoNegocio,
                    urbanizacionN: this.state.urbanizacion,
                    distritoN: this.state.distritoNegocio,
                    provinciaN: this.state.provinciaNegocio,
                    departamentoN: this.state.departamentoNegocio,
                    rubrosN: this.state.rubros,
                    contactoN: this.state.contactoNegocio,
                    imagenEmpresaN: this.state.imagenNegocio,
                    cadenaDeConexion: this.state.cadenaConexion,
                    fechaCreacionN: this.state.fecCreacionUsuario.toUpperCase(),
                    
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
                //negocio
                rucEmpresa: "",
                razonSocial: "",
                nombresNegocio: "",
                apePatNegocio: "",
                apeMatNegocio: "",
                nombreComNegocio: "",
                usuarioSol: "",
                claveSol: "",
                direccionNegocio: "",
                ubigeoNegocio: "",
                urbanizacion: "",
                distritoNegocio: "",
                provinciaNegocio: "",
                departamentoNegocio: "",
                rubros: "",
                contactoNegocio: "",
                imagenNegocio: "",
                cadenaConexion: "",
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
                    <div className="form-row">

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
                            bloques={"col-12"}
                            etiqueta={"Grupos de Perfiles"}
                            idSelect={"perfilUsuario"}    //Id que será llamada a través de handleChangeSelectComponent
                            nombreSelect={"perfilUsuario"}
                            esJson={true}
                            contenido={this.state.listaPerfiles}
                            nombreValor={"tipoPerfilUM"}
                            //Falta poner id - nombre perfil 
                            nombreMostrar={"idPerfil"}  //Aquí se coloca el campo de la BD que se mostrará en el Select (via método Handle)
                            //valorDefecto={this.state.perfilUsuario}
                            funcionControl={this.handleChangeSelectComponent}
                        />          

                    </div>

                    <div className="form-row justify-content-center mt-3">
                        <div className="col-5">
                            <button className="btn btn-success btn-block" onClick={this.crearUsuario}> REGISTRAR USUARIO </button>
                        </div>
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
                            bloques={"col-4"}
                            etiqueta={"Número de Contacto"}
                            idInput={"numeroContacto"}
                            nombreInput={"numeroContacto"}
                            readOnly={false}
                            funcionControl={this.handleChangeInput}
                        />

                        <InputComponent
                            //tipoInput={"number"}
                            bloques={"col-4"}
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
                            <button className="btn btn-success btn-block" onClick={this.crearUsuarioCuenta}> REGISTRAR CUENTA </button>
                        </div>
                    </div>

                    <hr/>
                    <h3>Datos de la Empresa</h3>

                    <div className="form-row">
                        <InputComponent
                            tipoInput={"number"}
                            classInput={this.state.esRucCorrecto === false? "is-invalid": "is-valid"}
                            bloques={"col-4"}
                            etiqueta={"RUC"}
                            idInput={"rucEmpresa"}
                            nombreInput={"rucEmpresa"}
                            mensajeValidacionError={"Verificar RUC"}
                            mensajeValidacionOk={"Formato RUC correcto"}
                            readOnly={false}
                            funcionControl={this.handleChangeInput}
                        />
                        <InputComponent
                            bloques={"col-4"}
                            etiqueta={"Razon Social"}
                            idInput={"razonSocial"}
                            nombreInput={"razonSocial"}
                            readOnly={false}
                            funcionControl={this.handleChangeInput}
                        />
                        <InputComponent
                            bloques={"col-4"}
                            etiqueta={"Nombre Comercial"}
                            idInput={"nombreComNegocio"}
                            nombreInput={"nombreComNegocio"}
                            readOnly={false}
                            funcionControl={this.handleChangeInput}
                        />
                    </div>

                    <div className="form-row mt-3">
                        <InputComponent
                            bloques={"col-4"}
                            etiqueta={"Nombres"}
                            idInput={"nombresNegocio"}
                            nombreInput={"nombresNegocio"}
                            readOnly={false}
                            funcionControl={this.handleChangeInput}
                        />
                        <InputComponent
                            bloques={"col-4"}
                            etiqueta={"Apellido P"}
                            idInput={"apePatNegocio"}
                            nombreInput={"apePatNegocio"}
                            readOnly={false}
                            funcionControl={this.handleChangeInput}
                        />
                        <InputComponent
                            bloques={"col-4"}
                            etiqueta={"Apellido M"}
                            idInput={"apeMatNegocio"}
                            nombreInput={"apeMatNegocio"}
                            readOnly={false}
                            funcionControl={this.handleChangeInput}
                        />
                    </div>
                    
                    <div className="form-row mt-3">
                        <InputComponent
                            bloques={"col-3"}
                            etiqueta={"Usuario"}
                            idInput={"usuarioSol"}
                            nombreInput={"usuarioSol"}
                            readOnly={false}
                            funcionControl={this.handleChangeInput}
                        />
                        <InputComponent
                            tipoInput={"password"}
                            bloques={"col-3"}
                            etiqueta={"Clave Sol"}
                            idInput={"claveSol"}
                            nombreInput={"claveSol"}
                            readOnly={false}
                            funcionControl={this.handleChangeInput}
                        />
                        <InputComponent
                            tipoInput={"password"}
                            bloques={"col-3"}
                            etiqueta={"Clave Sol"}
                            idInput={"claveSol2"}
                            nombreInput={"claveSol2"}
                            readOnly={false}
                            funcionControl={this.handleChangeInput}
                        />
                        <InputComponent
                            bloques={"col-3"}
                            etiqueta={"Direccion"}
                            idInput={"direccionNegocio"}
                            nombreInput={"direccionNegocio"}
                            readOnly={false}
                            funcionControl={this.handleChangeInput}
                        />
                        
                    </div>

                    <div className="form-row mt-3">
                        <InputComponent
                            bloques={"col-3"}
                            etiqueta={"Ubigeo"}
                            idInput={"ubigeoNegocio"}
                            nombreInput={"ubigeoNegocio"}
                            readOnly={false}
                            funcionControl={this.handleChangeInput}
                        />
                        <InputComponent
                            bloques={"col-3"}
                            etiqueta={"Urbanizacion"}
                            idInput={"urbanizacion"}
                            nombreInput={"urbanizacion"}
                            readOnly={false}
                            funcionControl={this.handleChangeInput}
                        />
                        <InputComponent
                            bloques={"col-3"}
                            etiqueta={"Distrito"}
                            idInput={"distritoNegocio"}
                            nombreInput={"distritoNegocio"}
                            readOnly={false}
                            funcionControl={this.handleChangeInput}
                        />
                        <InputComponent
                            bloques={"col-3"}
                            etiqueta={"Provincia"}
                            idInput={"provinciaNegocio"}
                            nombreInput={"provinciaNegocio"}
                            readOnly={false}
                            funcionControl={this.handleChangeInput}
                        />
                        
                        </div>
                        <div className="form-row mt-3">
                        <InputComponent
                            bloques={"col-3"}
                            etiqueta={"Departamento"}
                            idInput={"departamentoNegocio"}
                            nombreInput={"departamentoNegocio"}
                            readOnly={false}
                            funcionControl={this.handleChangeInput}
                        />
                        <InputComponent
                            bloques={"col-4"}
                            etiqueta={"Rubros"}
                            idInput={"rubros"}
                            nombreInput={"rubros"}
                            readOnly={false}
                            funcionControl={this.handleChangeInput}
                        />
                        <InputComponent
                            bloques={"col-4"}
                            etiqueta={"Contacto"}
                            idInput={"contactoNegocio"}
                            nombreInput={"contactoNegocio"}
                            readOnly={false}
                            funcionControl={this.handleChangeInput}
                        />
                        
                    </div>

                    <div className="form-row mt-3">
                    <InputComponent
                            bloques={"col-8"}
                            tipoInput={"file"}
                            etiqueta={"Imagen"}
                            idInput={"imagenNegocio"}
                            nombreInput={"imagenNegocio"}
                            readOnly={false}
                            funcionControl={this.handleChangeInput}
                        />
                    </div>

                    <div className="form-row justify-content-center mt-3">
                        <div className="col-5">
                            <button className="btn btn-success btn-block" onClick={this.crearUsuarioNegocio}> REGISTRAR NEGOCIO </button>
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