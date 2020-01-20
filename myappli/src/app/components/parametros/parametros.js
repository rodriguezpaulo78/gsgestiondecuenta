import React, {Component} from 'react';
import InputComponent from "../common2/inputcomponent";
import {ToastContainer, toast} from "react-toastify";
import SelectComponent from "../common2/selectcomponent";

class Parametros extends Component {
    constructor(props){
        super(props);

        this.state = {
            opcionElegida: 0,

            nuevoNombreSucursal: '',
            nuevodireccionSucursal: '',
            nuevoDistrito: '',
            nuevoProvincia: '',
            nuevoDepartamento: '',

            nuevoNombreFuente: '',
            nuevoSaldoFuente: '',

            opciones_nuevo_grupo_partida: [],

        };

        this.handleClickButtonMenu = this.handleClickButtonMenu.bind(this);
        this.handleChangeInputComponent = this.handleChangeInputComponent.bind(this);
        this.handleChangeSelectComponent = this.handleChangeSelectComponent.bind(this);

        this.borrarTodo = this.borrarTodo.bind(this);
        this.crearNuevo = this.crearNuevo.bind(this);
        this.fetchPartidasGrupo = this.fetchPartidasGrupo.bind(this);

        this.renderCrearSucursal = this.renderCrearSucursal.bind(this);
        this.renderCrearFuente = this.renderCrearFuente.bind(this);
        this.renderCrearPartida = this.renderCrearPartida.bind(this);
    }

    borrarTodo(){
        console.log("BORRANDO TODO");
        this.setState({
            nuevoNombreSucursal: '',
            nuevodireccionSucursal: '',
            nuevoDistrito: '',
            nuevoProvincia: '',
            nuevoDepartamento: '',

            nuevoNombreFuente: '',
            nuevoSaldoFuente: '',

            nuevoNombrePartida: '',
            nuevoGrupoPartida: '1',
            nuevoOtroGrupoPartida: '',
            mostrarInput: false,

        });
    }

    handleClickButtonMenu(evt){
        this.borrarTodo();
        if (evt.target.name === "sucursal"){
            this.setState({
                opcionElegida: 1,
            })
        }
        if (evt.target.name === "fuente"){
            this.setState({
                opcionElegida: 2,
            })
        }
        if (evt.target.name === "partida"){
            this.setState({
                opcionElegida: 3,
            })
        }

    }

    handleChangeInputComponent(evt){
        if (evt.target.value.length < 0){
            this.setState({
                [evt.target.name]: null,
            });
        }else{
            console.log(evt.target.name, ": ", evt.target.value);
            console.log(evt.target.name, ": ", this.state[evt.target.name]);
            this.setState({
                [evt.target.name]: evt.target.value,
            });
        }
    }

    handleChangeSelectComponent(evt){
        if (evt.target.name === "nuevoGrupoPartida"){
            if (evt.target.value === "OTRO"){
                this.setState({
                    mostrarInput: true,
                });
            }else{
                this.setState({
                    mostrarInput: false,
                });
            }
            this.setState({
                nuevoGrupoPartida: evt.target.value,
            });
        }
    }

    fetchPartidasGrupo() {
        fetch('/api/partidas/grupos')
            .then(res => res.json())
            .then(
                data => {
                    if (data.status === "error"){
                        toast.error('Vuelva a iniciar sesión, hay fallas en su autenticación.', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                    }else{
                        this.setState({ opciones_nuevo_grupo_partida: [...data, {idGrupoPartida: 'OTRO', nombreGrupo: 'OTRO'}] });
                    }
                })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.fetchPartidasGrupo();
    }

    crearNuevo(option) {
        if (option === 'Sucursal') {
            if (this.state.nuevoNombreSucursal == '' || this.state.nuevoProvincia == '' ||
                this.state.nuevodireccionSucursal == '' || this.state.nuevoDepartamento == '' || this.state.nuevoDistrito == '') {
                toast.error('Por favor llene todos los campos', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                return;
            }
            else {
                //add to bd
                fetch('/api/sucursales/sucursales', {
                    method: 'POST',
                    body: JSON.stringify({
                        nombreSucursal: this.state.nuevoNombreSucursal.toUpperCase(),
                        provincia: this.state.nuevoProvincia.toUpperCase(),
                        distrito: this.state.nuevoDistrito.toUpperCase(),
                        departamento: this.state.nuevoDepartamento.toUpperCase(),
                        direccionSucursal: this.state.nuevodireccionSucursal.toUpperCase(),
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
                                toast.success('Nueva sucursal agregada', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                                this.borrarTodo.bind(this);
                            }
                            if (data == -1) {
                                toast.error('Sucursal actualizada', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
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
        if (option === 'Partida') {
            if (this.state.nuevoNombrePartida === '' || this.state.nuevoGrupoPartida === '' || this.state.nuevoGrupoPartida === '1' ) {
                toast.error('Por favor llene todos los campos', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });

            }
            else {
                if (this.state.nuevoGrupoPartida === 'OTRO') {
                    if (this.state.nuevoOtroGrupoPartida === '') {
                        toast.error('Inserte el nombre del nuevo grupo a crear', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                        return;
                    }
                }
                fetch('/api/partidas/partidas', {
                    method: 'POST',
                    body: JSON.stringify({
                        nombrePartida: this.state.nuevoNombrePartida.toUpperCase(),
                        idGrupo: this.state.nuevoGrupoPartida,
                        nombreGrupo: this.state.nuevoOtroGrupoPartida.toUpperCase()
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
                            if (data.status === "error"){
                                toast.error('Vuelva a iniciar sesión, hay fallas en su autenticación.', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                            }else{
                                toast.success('Nueva partida agregada', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                            }
                        }
                    })
                    .catch(err => console.log(err));
                this.setState({
                    nuevoNombrePartida: '',
                    nuevoGrupoPartida: '',
                    nuevoOtroGrupoPartida: ''
                });
            }
        }
        if (option === 'Fuente') {
            if (this.state.nuevoNombreFuente == '' || this.state.nuevoSaldoFuente == '' || this.state.nuevoSaldoFuente == null) {
                toast.error('Por favor llene todos los campos', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                return;
            }
            else {
                //add to bd
                fetch('/api/fuentes/fuentes', {
                    method: 'POST',
                    body: JSON.stringify({
                        fuente: this.state.nuevoNombreFuente.toUpperCase(),
                        saldo: this.state.nuevoSaldoFuente
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('fuente', this.state.nuevoNombreFuente);
                        console.log('saldo ', this.state.nuevoSaldoFuente);
                        if (data.status === "error"){
                            toast.error('Vuelva a iniciar sesión, hay fallas en su autenticación.', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                        }else{
                            if (data != -1) {
                                toast.success('Nueva fuente agregada', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                            }
                            if (data == -1) {
                                toast.success('Fuente actualizada', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                            }
                        }
                    })
                    .catch(err => console.log(err));


                //clear
                this.setState({
                    nuevoNombreFuente: '',
                    nuevoSaldoFuente: ''
                });
            }
        }
        if (option === 'Producto') {
            console.log({
                precio: this.state.nuevoPrecioProducto,
                nombre: this.state.nuevoNombreProducto,
                sucursal: this.state.nuevoSucursalProducto,
                medida: this.state.nuevoUnidadMedidaProducto,
                stock: this.state.nuevoStockProducto,
                costoVenta: this.state.nuevoCostoVenta,
            });

            if (this.state.nuevoPrecioProducto == '' || this.state.nuevoNombreProducto == '' || this.state.nuevoSucursalProducto == '' || this.state.nuevoUnidadMedidaProducto == ''
                || this.state.nuevoStockProducto == '' || this.state.nuevoCostoVenta == '') {
                toast.error('Por favor llene todos los campos', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });

                return;
            }
            else {
                //set
                var nuevoNombreProducto = this.state.nuevoNombreProducto.toUpperCase()
                this.ref_buscar_item.value = this.state.nuevoNombreProducto;
                this.setState({
                    modal_buscar: this.state.nuevoNombreProducto
                });
                //add to bd
                fetch('/api/productos/productos', {
                    method: 'POST',
                    body: JSON.stringify({
                        nombreProducto: this.state.nuevoNombreProducto,
                        stockProducto: this.state.nuevoStockProducto,
                        precioProducto: this.state.nuevoPrecioProducto,
                        costVenta: this.state.nuevoCostoVenta,
                        sucursal: this.state.nuevoSucursalProducto,
                        serie: this.state.nuevoSerieProducto,
                        codUnidadMedida: this.state.nuevoUnidadMedidaProducto,
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
                            console.log(data) //id que retorno
                            toast.success('Nuevo producto agregado', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                            this.searchProducto(this.ref_buscar_item.value);
                        }
                    })
                    .catch(err => console.log(err));


                //clear
                this.setState({
                    nuevoNombreProducto: '',
                    nuevoSerieProducto: '',
                    nuevoSucursalProducto: '1',
                    nuevoUnidadMedidaProducto: 'NIU',
                    nuevoPrecioProducto: '',
                    nuevoStockProducto: '',
                    nuevoCostoVenta: ''
                });
            }
        }
        if (option === 'Cliente') {
            var nuevo;
            if (this.state.nuevoNumDocUsuario == 0 || this.state.nuevoTipDocUsuario == '' ||
                this.state.nuevoRazSocial == '' || this.nuevoDesDireccionCliente == '') {
                toast.error('Por favor llene todos los campos', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                return;
            }
            else {
                nuevo = this.state.nuevoNumDocUsuario;
                //add to bd
                fetch('/api/clientes/clientes', {
                    method: 'POST',
                    body: JSON.stringify({
                        tipDocUsuario: this.state.nuevoTipDocUsuario,
                        numDocUsuario: this.state.nuevoNumDocUsuario,
                        desDireccionCliente: this.state.nuevoDesDireccionCliente,
                        telefonoCliente: this.state.nuevoTelefonoCliente,
                        correoCliente: this.state.nuevoCorreoCliente,
                        codPaisCliente: this.state.nuevoCodPaisCliente,
                        codUbigeoCliente: this.state.nuevoCodUbigeoCliente,
                        razSocial: this.state.nuevoRazSocial
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data) //id que retorno
                        if (data.status === "error"){
                            toast.error('Vuelva a iniciar sesión, hay fallas en su autenticación.', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                        }else{
                            if (data != -1) {
                                toast.success('Nuevo cliente agregado', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                            }
                            if (data == -1) {
                                toast.success('Cliente actualizado', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                            }
                            this.buscarInfoCliente(nuevo);
                        }
                    })
                    .catch(err => console.log(err));

                //clear

                /* this.setState({
                     nuevoNumDocUsuario: '',
                     nuevoTipDocUsuario: '',
                     nuevoRazSocial: '',
                     nuevoDesDireccionCliente: '',
                     nuevoTelefonoCliente: '',
                     nuevoCorreoCliente: '',
                     nuevoCodPaisCliente: '',
                     nuevoCodUbigeoCliente: ''
                 });*/
            }

        }
        if (option === "DatosEmpresa"){
            console.log(this.state);
            const datos = {
                ruc: this.state.nuevoRuc,
                razon_social: this.state.nuevaRazonSocial,
                nombres: this.state.nuevoNombres,
                apellidosp: this.state.nuevoApellidoPaterno,
                apellidosm: this.state.nuevoApellidoMaterno,
                nombre_comercial: this.state.nuevoNombreComercial,
                usuariosol: this.state.nuevoUsuarioSol,
                clavesol: this.state.nuevaClaveSol,
                direccion: this.state.nuevaDireccion,
                ubigeo: this.state.nuevoUbigeo,
                urbanizacion: this.state.nuevaUrbanizacion,
                distrito: this.state.nuevoDistritoE,
                provincia: this.state.nuevaProvincia,
                departamento: this.state.nuevoDepartamentoE,
                rubros: this.state.nuevoRubro,
                contacto: this.state.nuevoNumeroDeContacto,
                imagenEmpresa: this.state.nuevaImagenEmpresa,
            };
            let datosLimpios = {};
            if (datos.ruc !== null){datosLimpios.ruc = datos.ruc;}
            if (datos.razon_social !== null){datosLimpios.razon_social = datos.razon_social.toUpperCase();}
            if (datos.nombres !== null){datosLimpios.nombres = datos.nombres.toUpperCase();}
            if (datos.apellidosp !== null){datosLimpios.apellidosp = datos.apellidosp.toUpperCase();}
            if (datos.apellidosm !== null){datosLimpios.apellidosm = datos.apellidosm.toUpperCase();}
            if (datos.nombre_comercial !== null){datosLimpios.nombre_comercial = datos.nombre_comercial.toUpperCase();}
            if (datos.usuariosol !== null){datosLimpios.usuariosol = datos.usuariosol;}
            if (datos.clavesol !== null){datosLimpios.clavesol = datos.clavesol;}
            if (datos.direccion !== null){datosLimpios.direccion = datos.direccion.toUpperCase();}
            if (datos.ubigeo !== null){datosLimpios.ubigeo = datos.ubigeo.toUpperCase();}
            if (datos.urbanizacion !== null){datosLimpios.urbanizacion = datos.urbanizacion.toUpperCase();}
            if (datos.distrito !== null){datosLimpios.distrito = datos.distrito.toUpperCase();}
            if (datos.provincia !== null){datosLimpios.provincia = datos.provincia.toUpperCase();}
            if (datos.departamento !== null){datosLimpios.departamento = datos.departamento.toUpperCase();}
            if (datos.contacto !== null){datosLimpios.contacto = datos.contacto;}
            if (datos.rubros !== null){datosLimpios.rubros = datos.rubros.toUpperCase();}
            if (datos.imagenEmpresa !== null){datosLimpios.imagenEmpresa = datos.imagenEmpresa;}

            console.log("DATOS LIMPIOS: ", datosLimpios);
            console.log("DATOS ANTIGUOS: ", datos);
            fetch('/api/negocio/actualizardatos', {
                method: 'POST',
                body: JSON.stringify(datosLimpios),
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
                        toast.success('Datos de la empresa Actualizado', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                        this.borrarTodo();
                    }
                })
                .catch(err => console.log(err));
        }
    }

    renderCrearSucursal(){
        return(
            <div className="col-6">
                <div className="row">
                    <div className="col-12 text-center">
                        <h3>Crear Sucursal</h3>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12">
                        <div className="form-row mt-1">
                            <InputComponent
                                bloques={"col-12"}
                                etiqueta={"Nombre Sucursal"}
                                idInput={"nuevoNombreSucursal"}
                                nombreInput={"nuevoNombreSucursal"}
                                readOnly={false}
                                valorDefecto={this.state.nuevoNombreSucursal}
                                funcionControl={this.handleChangeInputComponent}
                            />
                        </div>
                        <div className="form-row mt-1">
                            <InputComponent
                                bloques={"col-12"}
                                etiqueta={"Dirección"}
                                idInput={"nuevodireccionSucursal"}
                                nombreInput={"nuevodireccionSucursal"}
                                readOnly={false}
                                valorDefecto={this.state.nuevodireccionSucursal}
                                funcionControl={this.handleChangeInputComponent}
                            />
                        </div>
                        <div className="form-row mt-1">
                            <InputComponent
                                bloques={"col-12"}
                                etiqueta={"Distrito"}
                                idInput={"nuevoDistrito"}
                                nombreInput={"nuevoDistrito"}
                                readOnly={false}
                                valorDefecto={this.state.nuevoDistrito}
                                funcionControl={this.handleChangeInputComponent}
                            />
                        </div>
                        <div className="form-row mt-1">
                            <InputComponent
                                bloques={"col-12"}
                                etiqueta={"Provincia"}
                                idInput={"nuevoProvincia"}
                                nombreInput={"nuevoProvincia"}
                                readOnly={false}
                                valorDefecto={this.state.nuevoProvincia}
                                funcionControl={this.handleChangeInputComponent}
                            />
                        </div>
                        <div className="form-row mt-1">
                            <InputComponent
                                bloques={"col-12"}
                                etiqueta={"Departamento"}
                                idInput={"nuevoDepartamento"}
                                nombreInput={"nuevoDepartamento"}
                                readOnly={false}
                                valorDefecto={this.state.nuevoDepartamento}
                                funcionControl={this.handleChangeInputComponent}
                            />
                        </div>
                        <div className="form-row justify-content-center mt-3">
                            <div className="col-6">
                                <button
                                    className="btn btn-success btn-block"
                                    onClick={this.crearNuevo.bind(this, 'Sucursal')}
                                >
                                    REGISTRAR SUCURSAL
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderCrearFuente(){
        return (
            <div className="col-6">
                <div className="row">
                    <div className="col-12 text-center">
                        <h3>Crear Fuente</h3>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12">
                        <div className="form-row mt-1">
                            <InputComponent
                                bloques={"col-12"}
                                etiqueta={"Nombre Fuente"}
                                idInput={"nuevoNombreFuente"}
                                nombreInput={"nuevoNombreFuente"}
                                readOnly={false}
                                valorDefecto={this.state.nuevoNombreFuente}
                                funcionControl={this.handleChangeInputComponent}
                            />
                        </div>
                        <div className="form-row mt-1">
                            <InputComponent
                                tipoInput={"number"}
                                bloques={"col-12"}
                                etiqueta={"Saldo Inicial"}
                                idInput={"nuevoSaldoFuente"}
                                nombreInput={"nuevoSaldoFuente"}
                                readOnly={false}
                                valorDefecto={this.state.nuevoSaldoFuente}
                                funcionControl={this.handleChangeInputComponent}
                            />
                        </div>
                        <div className="form-row justify-content-center mt-3">
                            <div className="col-6">
                                <button
                                    className="btn btn-success btn-block"
                                    onClick={this.crearNuevo.bind(this,"Fuente")}
                                >
                                    REGISTRAR FUENTE
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderCrearPartida(){
        return(
            <div className="col-6">
                <div className="row">
                    <div className="col-12 text-center">
                        <h3>Crear Partida</h3>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12">
                        <div className="form-row">
                            <InputComponent
                                bloques={"col-12"}
                                etiqueta={"Nombre Partida"}
                                idInput={"nuevoNombrePartida"}
                                nombreInput={"nuevoNombrePartida"}
                                readOnly={false}
                                funcionControl={this.handleChangeInputComponent}
                                valorDefecto={this.state.nuevoNombrePartida}
                            />
                        </div>
                        <div className="form-row mt-2">
                            <SelectComponent
                                bloques={"col-12"}
                                etiqueta={"Grupo de Partida"}
                                idSelect={"nuevoGrupoPartida"}
                                nombreSelect={"nuevoGrupoPartida"}
                                esJson={true}
                                contenido={this.state.opciones_nuevo_grupo_partida}
                                nombreValor={"idGrupoPartida"}
                                nombreMostrar={"nombreGrupo"}
                                valorDefecto={this.state.nuevoGrupoPartida}
                                funcionControl={this.handleChangeSelectComponent}
                            />
                        </div>
                        <div className="form-row mt-2">
                            <InputComponent
                                bloques={"col-12"}
                                etiqueta={"Nuevo Grupo"}
                                idInput={"nuevoOtroGrupoPartida"}
                                nombreInput={"nuevoOtroGrupoPartida"}
                                readOnly={false}
                                funcionControl={this.handleChangeInputComponent}
                                estaOculto={!this.state.mostrarInput}
                                valorDefecto={this.state.nuevoOtroGrupoPartida}
                            />
                        </div>
                        <div className="form-row justify-content-center mt-3">
                            <div className="col-6">
                                <button
                                    className="btn btn-success btn-block"
                                    onClick={this.crearNuevo.bind(this,"Partida")}
                                >
                                    REGISTRAR PARTIDA
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

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
                            name="sucursal"
                            onClick={this.handleClickButtonMenu}
                            className="btn btn-primary mt-2"
                        >
                            Crear Sucursal
                        </button>
                        <button
                            name="fuente"
                            onClick={this.handleClickButtonMenu}
                            className="btn btn-secondary ml-2 mt-2"
                        >
                            Crear Fuente
                        </button>
                        <button
                            name="partida"
                            onClick={this.handleClickButtonMenu}
                            className="btn btn-success ml-2 mt-2"
                        >
                            Crear Partida
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
                    {
                        this.state.opcionElegida === 1 && this.renderCrearSucursal()
                    }
                    {
                        this.state.opcionElegida === 2 && this.renderCrearFuente()
                    }
                    {
                        this.state.opcionElegida === 3 && this.renderCrearPartida()
                    }

                </div>
            </React.Fragment>
        );
    }
}

export default Parametros;