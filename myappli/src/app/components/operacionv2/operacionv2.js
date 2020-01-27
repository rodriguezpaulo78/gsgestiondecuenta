import React, {Component} from 'react';
import ContenedorDesglosable from "./contenedordesglosable";
import {ToastContainer, toast} from "react-toastify";
import {tipDocumento} from "../../json/tipos_documento";
import ModalImpresion from "./modales/modalImpresion";
import ModalesOld from "./modalesold";
import ModalAdmin from "./modales/modalAdmin";

class OperacionV2 extends Component {
    constructor(props){
        super(props);
        this.state = {
            tipoMovimientoSeleccionado: "1", // 2 no esta seleccionado || 1 ingresos || 0 egresos

            listaSucursales: [],
            sucursalSeleccionado: "",

            listaFuentes: [],
            fuenteSeleccionada: "1",

            tipoComprobanteSeleccionado: '4',

            numSerieComprobante: '',
            numComprobante: '',

            fechaActual: new Date().getFullYear() + "-" + (new Date().getMonth() + 1 < 10? '0' + (new Date().getMonth() + 1): new Date().getMonth() + 1) + "-" + (new Date().getDate() < 10? '0' + new Date().getDate(): new Date().getDate()),
            fecVencimiento: new Date().getFullYear() + "-" + (new Date().getMonth() + 1 < 10? '0' + (new Date().getMonth() + 1): new Date().getMonth() + 1) + "-" + (new Date().getDate() < 10? '0' + new Date().getDate(): new Date().getDate()),

            horEmision: '',
            timerId: null,

            rucCliente: '',
            idCliente: 0,
            numDocCliente: '',
            tipDocCliente: '6',
            razSocialCliente: '',
            direccionCliente: '',
            telefonoCliente: '',
            correoCliente: '',
            codPaisCliente: '',
            codUbigeoCliente: '',

            flagDetalleVenta: null, // VARIABLE PARA SABER HACE UN CAMBIO DE REFERENCIA O DETALLE

            listaItemsVenta: registros,

            tipMoneda: 'PEN',
            tipoCambio: '',
            aCreditoDias: 0,

            idPartida: 0,
            nombrePartida: "",
            listaPartidas: [],
            grupoPartida: '',       // FALTA OBTENER NOMBRE DEL GRUPO DE PARTIDA

            // codigo de mes
            codMes: new Date().getFullYear() + "" + (new Date().getMonth() + 1 < 10? '0' + (new Date().getMonth() + 1): new Date().getMonth() + 1),

            // -----------------------------------------------
            // -----------------------------------------------
            // DATOS PARA AGREGAR EL MODAL

            flagItem: null,
            detalleGeneral: "",

            sumTotTributos: 0,
            sumTotValVenta: 0,
            sumPrecioVenta: null, // El valor total de la venta
            sumPrecioVenta_temp: null,
            sumDescTotal: 0,
            sumOtrosCargos: 0,
            costVenta: 0,
            costServicio: 0,

            idProducto: '',
            nombreProducto: '',

            modalArray: [],
            cabeceras_modal_select: ['Código', 'Nombre Producto', 'Sucursal', 'Stock', 'Cantidad', 'Precio Producto', 'Unidad Medida', 'Afecto'],
            modal_buscar: '',
            showAddItem: '',
            contenido_modal_select: [],

            //
            style_item: '',
            style_servicio: '',
            //
            lista_sucursales: [],

            modal_cantidad: '',
            modal_medida: '',
            modal_cod_item: '',
            modal_descripcion: '',
            modal_afecto: '',
            modal_precUnitario: '',
            modal_valUnitario: 0,
            modal_valVenta: 0,
            modal_igv: 0,
            modal_isc: 0,
            modal_sumTributos: 0,
            modal_precTotal: 0,

            utilidad: 0,

            // no tiene uso el valor de dua
            dua: null,      // EGRESOS (nota de la versión 1)
            // -----------------------------------------------
            // -----------------------------------------------
            // -----------------------------------------------

            // TOTALES
            // codigo de operacion relacionado --> REFerencia
            codOperacionRelacionado: '',
            aCuenta: 0,

            /// NO ENCONTRE USO PARA ESTAS VARIABLES, NO SE VE ASIGNACIONES
            tipoComprobanteNC: '0',
            descMotivoNC: null,
            codMotivoNC: null,
            numSerieComprobanteNC: null,
            numComprobanteNC: null,

            opcionAdmin: '',
            nuevoNombreProducto: '',
            nuevoPrecioProducto: '',
            nuevoStockProducto: '',
            nuevoCostoVenta: '',
            nuevoSerieProducto: '',
            nuevaUnidadMedidaProducto: 'NIU',
            nuevoSucursalProducto: '1',
            nuevoIdPartida: '',
            nuevaFechaVencimiento: '',

        };

        this.fetchSucursales = this.fetchSucursales.bind(this);
        this.fetchFuentes = this.fetchFuentes.bind(this);
        this.fecthValoresComprobante = this.fecthValoresComprobante.bind(this);
        this.fetchDatosClientes = this.fetchDatosClientes.bind(this);
        this.fetchPartidas = this.fetchPartidas.bind(this);

        this.handleChangeSelectComponent = this.handleChangeSelectComponent.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
        this.handleChangeInputComponent = this.handleChangeInputComponent.bind(this);
        this.handleOnClickButton = this.handleOnClickButton.bind(this);

        this.borrarDatosSobreVenta = this.borrarDatosSobreVenta.bind(this);
        this.crearNuevoelemento = this.crearNuevoelemento.bind(this);
        this.borrarDatosSobreCliente = this.borrarDatosSobreCliente.bind(this);
        this.getFilaProducto = this.getFilaProducto.bind(this);
        this.searchProducto = this.searchProducto.bind(this);
        this.buscarIdPartida = this.buscarIdPartida.bind(this);
        this.imprimirTicket = this.imprimirTicket.bind(this);


        this.handleSubmit = this.handleSubmit.bind(this);
        this.submitItems = this.submitItems.bind(this);

        // -------------------------------------------------
        // MODAL AGREGAR ITEM ------------------------------
        // -------------------------------------------------
        this.isFloatNumber = this.isFloatNumber.bind(this);
        this.isNumber = this.isNumber.bind(this);
        this.isIntNumber = this.isIntNumber.bind(this);
        this.getFilaProducto = this.getFilaProducto.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.searchProducto = this.searchProducto.bind(this);
        this.CloseItemModal = this.CloseItemModal.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.updateTotals = this.updateTotals.bind(this);
        this.clearUpperForm = this.clearUpperForm.bind(this);
        this.clearInfoCliente = this.clearInfoCliente.bind(this);
        this.clearAgregarItemServicio = this.clearAgregarItemServicio.bind(this);
        this.borrarDatosModalProduto = this.borrarDatosModalProduto.bind(this);


        this.renderModales = this.renderModales.bind(this);

        // -------------------------------------------------
        // -------------------------------------------------
    }

    buscarIdPartida(evt) {
        console.log(this.state.listaPartidas);
        this.setState({
            nombrePartida: evt.target.value,
        });
        var listaResultado = this.state.listaPartidas.map(e => {
            if (e.nombrePartida === evt.target.value) {
                return e;
            }
        });
        let resultado = 0;
        for (let i = 0 ; i < listaResultado.length; i++){
            console.log("RESULTADO EN: ", listaResultado[i]);
            if (listaResultado[i] !== undefined){
                resultado = listaResultado[i];
            }
        }

        console.log("-----");
        console.log("RESULTADO EN VARIABLE: ", resultado);

        if (resultado === 0){
            console.log("No hay datos");
            this.setState({
                idPartida: 0,
                grupoPartida: "",
            });
        }else{
            console.log("MAyor de 0");
            console.log("Lista Resultado: ", listaResultado);
            this.setState({
                idPartida: resultado.idPartida,
                grupoPartida: resultado.nombreGrupo,
            });
        }
        console.log("Lista Resultado: ", listaResultado);
    }

    fetchSucursales(){
        fetch('/api/sucursales/sucursales')
            .then(res => res.json())
            .then(
                data => {
                    this.setState({
                        listaSucursales: data,
                        lista_sucursales: data,
                        sucursalSeleccionado: data.length > 1 ? data[1].codSucursal: data[0].codSucursal,
                    });
                }
            )
            .catch( err => console.log(err));
    }

    fetchFuentes(){ // FUNCION PARA OBTENER TODOAS LAS FUENTES DEL NEGOCIO
        fetch('/api/fuentes/fuentes')
            .then(res => res.json())
            .then(
                data => {
                    if (data.length > 1){
                        this.setState({ listaFuentes: data, fuenteSeleccionada: data[1].codFuente });
                    }else{
                        this.setState({ listaFuentes: data, fuenteSeleccionada: data[0].codFuente });
                    }
                })
            .catch(err => console.log(err));
    }

    fetchPartidas(){ // FUNCION PARA OBTENER TODOAS LAS PARTIDAS DEL NEGOCIO
        fetch('/api/partidas/partidas')
            .then(res => res.json())
            .then(
                data => {
                    this.setState({ listaPartidas: data });
                })
            .catch(err => console.log(err));
    }

    fetchDatosClientes(numero){
        fetch('/api/clientes/clientes/' + numero.toString(), {
            method: 'GET',
            //body:JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.length == 0) {
                    console.log("No hay datos");
                }
                else {
                    this.setState({
                        idCliente: data[0].idCliente,
                        numDocCliente: data[0].numDocUsuario,
                        tipDocCliente: tipDocumento[data[0].tipDocUsuario],
                        razSocialCliente: data[0].razSocial,
                        direccionCliente: data[0].desDireccionCliente,
                        telefonoCliente: data[0].telefonoCliente,
                        correoCliente: data[0].correoCliente,
                        codPaisCliente: data[0].codPaisCliente,
                        codUbigeoCliente: data[0].codUbigeoCliente,
                    });
                }
            })
            .catch(err => console.log(err));
    }

    fecthValoresComprobante(){
        fetch(
            '/api/comprobante/valores/' + this.state.tipoComprobanteSeleccionado.toString()
        )
            .then(res => res.json())
            .then(
                data => {
                    if (data[0]){
                        this.setState({
                            numSerieComprobante: data[0].valor1.toString(),
                            numComprobante: data[0].valor2,
                        });
                    }else{
                        this.setState({
                            numSerieComprobante: '',
                            numComprobante: '',
                        });
                    }
                }
            )
            .catch(err => console.log(err));
    }

    handleChangeSelectComponent(evt){
        if (evt.target.name === "sucursal"){
            console.log("Cambiando en Sucursal");
            this.setState({
                sucursalSeleccionado: evt.target.value,
            });
        }

        if (evt.target.name === "tipomovimiento"){
            console.log("Cambiando Tipo Movimiento");
            this.setState({
                tipoMovimientoSeleccionado: evt.target.value,
            });
        }

        if (evt.target.name === "fuente"){
            console.log("Cambiando Tipo Fuente");
            this.setState({
                fuenteSeleccionada: evt.target.value,
            });
        }

        if (evt.target.name === "comprobante"){
            console.log("Cambiando Tipo Comprobante");
            this.setState({
                tipoComprobanteSeleccionado: evt.target.value,
            });
        }

        if(evt.target.name === "fecha"){
            console.log("Cambiando Fecha");
            this.setState({
                fechaActual: evt.target.value,
            });
        }

        if(evt.target.name === "nuevoTipDocUsuario"){
            console.log("Cambiando Nuevo Documento Cliente");
            this.setState({
                tipDocCliente: evt.target.value,
            });
        }
        if(evt.target.name === "solesdolares"){
            this.setState({
                tipMoneda: evt.target.value,
                tipoCambio: '',
            });
        }
        if (evt.target.name === 'afecto_servicio' && this.state.sumPrecioVenta != null) {
            if (evt.target.value === '0') { //gravado
                var nuevoSumaPrecio = (Number(this.state.sumPrecioVenta) / 1.18).toFixed(2);
                var nuevoTributos = (Number(nuevoSumaPrecio) * 0.18).toFixed(2);
                this.setState({
                    sumTotValVenta: nuevoSumaPrecio,
                    sumTotTributos: nuevoTributos
                })
            }
            else {
                this.setState({
                    sumTotValVenta: 0,
                    sumTotTributos: 0
                })
            }
        }
        console.log("Fin de Cambiando SELECT");
    }

    // FUNCION PARA CONTROLAR TODOS LO CAMBIOS DE TEXTO EN LOS INPUTS
    handleChangeInputComponent(evt){
        console.log("Cambiando valores en un INPUT");
        if (evt.target.name === "ruc"){
            this.setState({
                numDocCliente: evt.target.value,
            });
        }

        if (evt.target.name === "razonsocial"){
            this.setState({
                razSocialCliente: evt.target.value.toUpperCase(),
            });
        }

        if (evt.target.name === "nuevoNumDocUsuario"){
            this.setState({
                numDocCliente: evt.target.value,
            });
        }

        if (evt.target.name === "nuevoRazSocial"){
            this.setState({
                razSocialCliente: evt.target.value.toUpperCase(),
            });
        }

        if (evt.target.name === "nuevoDesDireccionCliente"){
            this.setState({
                direccionCliente: evt.target.value.toUpperCase(),
            });
        }

        if (evt.target.name === "nuevoTelefonoCliente"){
            this.setState({
                telefonoCliente: evt.target.value,
            });
        }

        if (evt.target.name === "nuevoCorreoCliente"){
            this.setState({
                correoCliente: evt.target.value,
            });
        }

        if (evt.target.name === "nuevoCodPaisCliente"){
            if (evt.target.value.length < 3){
                this.setState({
                    codPaisCliente: evt.target.value,
                });
            }
        }

        if (evt.target.name === "nuevoCodUbigeoCliente"){
            if (evt.target.value.length < 7){
                this.setState({
                    codUbigeoCliente: evt.target.value,
                });
            }
        }

        if (evt.target.name === "otrosc"){
            this.setState({
                sumOtrosCargos: evt.target.value,
            });
        }

        if (evt.target.name === "dcredito"){
            // MANEJANDO AL MOMENTO DE CAMBIAR EN LA CAJA DE TEXTO "D. CREDITO"
            console.log("Cambian dias de Creditos");
            Date.prototype.addDays = function (days, fecha) {
                var date = new Date(fecha);
                date.setDate(date.getDate() + days);
                return date;
            };

            let nuevaFechaVenc = new Date(this.state.fechaActual);

            nuevaFechaVenc = nuevaFechaVenc.addDays(evt.target.value * 1 + 1, this.state.fechaActual);

            var year = nuevaFechaVenc.getFullYear();
            var month = nuevaFechaVenc.getMonth() + 1;
            var date = nuevaFechaVenc.getDate(); //Current Date
            if (date < 10) { date = '0' + date.toString(); }
            if (month < 10) { month = '0' + month.toString(); }

            this.setState({
                fecVencimiento: year + '-' + month + '-' + date,
                aCreditoDias: evt.target.value,
            });
        }

        if (evt.target.name === "tc"){
            this.setState({
                tipoCambio: evt.target.value,
            });
        }

        if (evt.target.name === "descuento"){
            console.log("Cambiando Descuentos");
            this.setState({
                sumDescTotal: evt.target.value,
            });
        }

        if (evt.target.name === "ref"){
            console.log("Estamos en REFERENCIA");
            this.setState({
                codOperacionRelacionado: evt.target.value,
            });
        }

        if (evt.target.name === "detalle"){
            this.setState({
                detalleGeneral: evt.target.value,
            });
        }

        if (evt.target.name === "fecha"){
            let newDay = new Date(evt.target.value);
            this.setState({
                fechaActual: evt.target.value,
                codMes: newDay.getFullYear() + "" + (newDay.getMonth() +1 < 10? "0" + (newDay.getMonth()+1): newDay.getMonth()+1),
            });
        }

        if (evt.target.name === "acuenta"){
            this.setState({
                aCuenta: evt.target.value,
            });
        }

        if (evt.target.name === "preciot"){
            let TipoAfeccion = document.getElementById('afecto_servicio');
            if (evt.target.value.length < 1 || evt.target.value === 0){
                TipoAfeccion.setAttribute("disabled", "");
                this.setState({
                    sumPrecioVenta: null,
                    aCuenta: 0,
                });
                document.getElementById("totalop").value = "";
            }else{
                if (document.getElementById('afecto_servicio').value === "0"){
                    var nuevoSumaPrecio = (Number(evt.target.value) / 1.18).toFixed(2);
                    var nuevoTributos = (Number(nuevoSumaPrecio) * 0.18).toFixed(2);
                    this.setState({
                        sumTotValVenta: nuevoSumaPrecio,
                        sumTotTributos: nuevoTributos,
                        aCuenta: evt.target.value,
                    })
                }

                TipoAfeccion.removeAttribute("disabled");
                this.setState({
                    sumPrecioVenta: evt.target.value,
                    aCuenta: evt.target.value,
                });
                document.getElementById("totalop").value = evt.target.value;
            }
        }

        if (evt.target.name === "totalop"){
            if (this.state.tipoComprobanteSeleccionado === '2'){ // Es cuando el comprobante es PAGO
                this.setState({
                    sumPrecioVenta: evt.target.value,
                    aCuenta: evt.target.value,
                });
                document.getElementById('acuenta').value = evt.target.value;
            }
        }

        if (evt.target.name === "serie"){
            this.setState({
                numSerieComprobante: evt.target.value,
            });
        }

        if (evt.target.name === "numero"){
            this.setState({
                numComprobante: evt.target.value,
            });
        }

    }

    handleOnBlur(evt){
        // PARA VALIDAR LOS DATOS DEL CLIENTE Y OBTENER DE LA BASE DE DATOS
        if (evt.target.name === "ruc"){
            this.fetchDatosClientes(evt.target.value);
        }
    }

    handleOnClickButton(evt){
        if (evt.target.name === "btnReferencia"){
            if (this.state.flagDetalleVenta !== 0){
                if (this.state.modalArray.length !== 0){
                    const rpta = window.confirm("Al seleccionar REFERENCIA estara borrando el contenido anteriormente registrado en detalle de venta");
                    if (rpta){
                        let bloqueDetalle = document.getElementById('bloqueDetalle');
                        let bloqueAfeccion = document.getElementById('bloqueAfeccion');
                        let bloquePrecio = document.getElementById('bloquePrecio');
                        let bloqueTablaDetalles = document.getElementById('bloqueTablaDetalles');
                        let btnAgregarNuevoItem = document.getElementById('btnAgregarNuevoItem');

                        bloqueDetalle.style.display = 'block';
                        bloquePrecio.style.display = 'block';
                        bloqueAfeccion.style.display = 'block';
                        bloqueTablaDetalles.style.display = 'none';
                        btnAgregarNuevoItem.style.display = 'none';

                        this.setState({
                            flagDetalleVenta: 0,
                        });
                        let TipoAfeccion = document.getElementById('afecto_servicio');
                        TipoAfeccion.setAttribute("disabled", "");
                        this.borrarDatosSobreVenta();
                    }
                }else{
                    let bloqueDetalle = document.getElementById('bloqueDetalle');
                    let bloqueAfeccion = document.getElementById('bloqueAfeccion');
                    let bloquePrecio = document.getElementById('bloquePrecio');
                    let bloqueTablaDetalles = document.getElementById('bloqueTablaDetalles');
                    let btnAgregarNuevoItem = document.getElementById('btnAgregarNuevoItem');

                    bloqueDetalle.style.display = 'block';
                    bloquePrecio.style.display = 'block';
                    bloqueAfeccion.style.display = 'block';
                    bloqueTablaDetalles.style.display = 'none';
                    btnAgregarNuevoItem.style.display = 'none';

                    let TipoAfeccion = document.getElementById('afecto_servicio');
                    TipoAfeccion.setAttribute("disabled", "");
                    this.setState({
                        flagDetalleVenta: 0,
                    });
                }
            }
        }

        if (evt.target.name === "btnItems"){
            if (this.state.flagDetalleVenta !== 1){
                if (this.state.sumPrecioVenta != '' && this.state.sumPrecioVenta != 0 && this.state.sumPrecioVenta != null) {
                    const answer = window.confirm("Al seleccionar Agregar Item se borrarán los datos ya llenados, ¿continuar?");
                    if (answer === true) {
                        let bloqueDetalle = document.getElementById('bloqueDetalle');
                        let bloqueAfeccion = document.getElementById('bloqueAfeccion');
                        let bloquePrecio = document.getElementById('bloquePrecio');
                        let bloqueTablaDetalles = document.getElementById('bloqueTablaDetalles');
                        let btnAgregarNuevoItem = document.getElementById('btnAgregarNuevoItem');

                        bloqueDetalle.style.display = 'block';
                        bloquePrecio.style.display = 'none';
                        bloqueAfeccion.style.display = 'none';
                        bloqueTablaDetalles.style.display = 'block';
                        btnAgregarNuevoItem.style.display = 'block';

                        this.setState({
                            flagDetalleVenta: 1,
                            style_item: '#6c5ce7',
                            style_servicio: '#007bff',
                            sumTotValVenta: 0,
                            sumTotTributos: 0,
                            sumDescTotal: 0,
                            sumOtrosCargos: 0,
                            sumPrecioVenta: 0,
                            sumPrecioVenta_temp: 0,
                            aCuenta: 0
                        });
                    }else{
                        return;
                    }
                }else{
                    let bloqueDetalle = document.getElementById('bloqueDetalle');
                    let bloqueAfeccion = document.getElementById('bloqueAfeccion');
                    let bloquePrecio = document.getElementById('bloquePrecio');
                    let bloqueTablaDetalles = document.getElementById('bloqueTablaDetalles');
                    let btnAgregarNuevoItem = document.getElementById('btnAgregarNuevoItem');

                    bloqueDetalle.style.display = 'block';
                    bloquePrecio.style.display = 'none';
                    bloqueAfeccion.style.display = 'none';
                    bloqueTablaDetalles.style.display = 'block';
                    btnAgregarNuevoItem.style.display = 'block';

                    this.setState({
                        flagDetalleVenta: 1,
                        sumTotValVenta: 0,
                        sumTotTributos: 0,
                        sumDescTotal: 0,
                        sumOtrosCargos: 0,
                        sumPrecioVenta: 0,
                        sumPrecioVenta_temp: 0,
                        aCuenta: 0
                    });
                }
            }
        }
    }

    borrarDatosSobreVenta(){
        this.setState({
            modalArray: [],
            flagDetalleVenta: null,
            style_item: '#6c5ce7',
            style_servicio: '#007bff',
            sumTotValVenta: 0,
            sumTotTributos: 0,
            sumDescTotal: 0,
            sumOtrosCargos: 0,
            sumPrecioVenta: 0,
            sumPrecioVenta_temp: 0,
            aCuenta: 0,
            nombrePartida: "",
            idPartida: 1,
            detalleGeneral: "",
            costVenta: 0,

            // borrando de otros
            codOperacionRelacionado: '',
        });

        let bloqueAfeccion = document.getElementById('bloqueAfeccion');
        let bloquePrecio = document.getElementById('bloquePrecio');
        let bloqueTablaDetalles = document.getElementById('bloqueTablaDetalles');
        let btnAgregarNuevoItem = document.getElementById('btnAgregarNuevoItem');

        bloquePrecio.style.display = 'none';
        bloqueAfeccion.style.display = 'none';
        bloqueTablaDetalles.style.display = 'none';
        btnAgregarNuevoItem.style.display = 'none';
    }

    borrarDatosSobreCliente(modal = false){
        this.setState({
            idCliente: 0,
            numDocCliente: '',
            rucCliente: '',
            direccionCliente: '',
            tipDocCliente: !modal? '-1':'6',
            razSocialCliente: '',
            telefonoCliente: '',
            correoCliente: '',
            codPaisCliente: '',
            codUbigeoCliente: '',
            flagDetalleVenta: null,
        });
    }

    crearNuevoelemento(opcion){
        console.log("LLAMANDO A FUNCION CREAR NUEVO ELEMENTO");
        if (opcion === "cliente"){
            console.log("Creando nuevo cliente");
            let nuevo;
            if (this.state.razSocialCliente === '' || this.state.tipDocCliente === '-1' || this.numDocCliente === '') {
                toast.error("Completen datos básicos por favor.", { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                return;
            }
            else {
                nuevo = this.state.numDocCliente;
                fetch('/api/clientes/clientes', {
                    method: 'POST',
                    body: JSON.stringify({
                        tipDocUsuario: this.state.tipDocCliente.toString(),
                        numDocUsuario: this.state.numDocCliente.toString(),
                        razSocial: this.state.razSocialCliente.toUpperCase(),
                        desDireccionCliente: this.state.direccionCliente.toString(),
                        telefonoCliente: this.state.telefonoCliente.toString(),
                        correoCliente: this.state.correoCliente.toString(),
                        codPaisCliente: this.state.codPaisCliente.toString(),
                        codUbigeoCliente: this.state.codUbigeoCliente.toString(),
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data != -1) {
                            //toast.success('Nuevo cliente agregado', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                            console.log("EXITOSO AL CREAR");
                            toast.success("Nuevo cliente agregado.", { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                            this.fetchDatosClientes(nuevo);
                        }
                        if (data == -1) {
                            //toast.success('Cliente actualizado', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                            toast.error("Ya se encuentra un usario con el mismo número de documento.", { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                            this.borrarDatosSobreCliente();
                        }
                    })
                    .catch(err => console.log(err));
            }

        }

        if (opcion === 'Producto') {
            console.log({
                nombreProducto: this.state.nuevoNombreProducto.toUpperCase(),
                stockProducto: this.state.nuevoStockProducto,
                precioProducto: this.state.nuevoPrecioProducto,
                costVenta: this.state.nuevoCostoVenta,
                sucursal: this.state.nuevoSucursalProducto,
                serie: this.state.nuevoSerieProducto,
                codUnidadMedida: this.state.nuevoUnidadMedidaProducto,
                codPartida: this.state.nuevoIdPartida,
                fechaVencimiento: this.state.nuevaFechaVencimiento,
            });

            if (this.state.nuevoPrecioProducto == '' || this.state.nuevoNombreProducto == '' || this.state.nuevoSucursalProducto == '1' || this.state.nuevaUnidadMedidaProducto == ''
                || this.state.nuevoStockProducto == '' || this.state.nuevoCostoVenta == '' || this.state.nuevoIdPartida == '' || this.state.nuevaFechaVencimiento == '' ) {
                toast.error('Por favor llene todos los campos', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });

                return;
            }
            else {
                //set
                this.ref_buscar_item.value = this.state.nuevoNombreProducto;
                this.setState({
                    modal_buscar: this.state.nuevoNombreProducto
                });
                //add to bd
                fetch('/api/productos/productos', {
                    method: 'POST',
                    body: JSON.stringify({
                        nombreProducto: this.state.nuevoNombreProducto.toUpperCase(),
                        stockProducto: this.state.nuevoStockProducto,
                        precioProducto: this.state.nuevoPrecioProducto,
                        costVenta: this.state.nuevoCostoVenta,
                        sucursal: this.state.nuevoSucursalProducto,
                        serie: this.state.nuevoSerieProducto,
                        codUnidadMedida: this.state.nuevoUnidadMedidaProducto,
                        codPartida: this.state.nuevoIdPartida,
                        fechaVencimiento: this.state.nuevaFechaVencimiento,
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data) //id que retorno
                        toast.success('Nuevo producto agregado', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                        this.searchProducto(this.ref_buscar_item.value);

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
    }

    // ----------------------------------------------------------------------
    // ---------------------- FUNCIONES ITEM MODAL --------------------------
    // ----------------------------------------------------------------------
    getFilaProducto(cod, nombre, precio, cantidad, afecto, medida, costo_venta) {
        var val_precio = document.getElementById(precio).value;
        var val_cantidad = document.getElementById(cantidad).value;
        var val_afecto = document.getElementById(afecto).value;
        var val_medida = document.getElementById(medida).value;

        var val_costo_venta = costo_venta;
        //
        console.log(this.isNumber(val_precio));
        console.log(this.isIntNumber(val_cantidad));

        if (this.isIntNumber(val_precio == false) || this.isFloatNumber(val_precio == false)) {
            toast.error('Ingrese un precio válido', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            return;
        }
        if (this.isIntNumber(val_cantidad) == false) {
            toast.error('Ingrese una cantidad entera', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            return;
        }
        if (val_precio == '' || val_cantidad == '' || val_afecto == '' || val_medida == '') {
            toast.error('Verifique que todos los campos del producto a agregar estén llenos y sean valores válidos', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            return;
        }
        else {
            var val_unitario;
            var val_venta;
            var val_igv;
            var val_isc;
            var val_sum_tributos;
            var val_precio_total;
            /* operaciones con los datos , 1 item*/
            if (val_afecto == 0) {
                val_unitario = val_precio / 1.18;
                val_igv = val_unitario * 0.18;
                val_isc = 0;
            }
            if (val_afecto == 1) { val_unitario = val_precio; val_igv = 0; val_isc = 0; }
            if (val_afecto == 2) { val_unitario = val_precio; val_igv = 0; val_isc = 0; }
            if (val_afecto == 3) { val_unitario = val_precio; val_igv = 0; val_isc = 0; }
            /* item x cantidad */
            val_igv = val_igv * val_cantidad;
            val_isc = val_isc * val_cantidad;
            //
            val_sum_tributos = val_igv + val_isc;
            val_venta = val_unitario * val_cantidad;
            val_precio_total = val_unitario * val_cantidad + val_sum_tributos;
            console.log(val_precio); console.log(val_cantidad); console.log(val_afecto); console.log(val_medida);

            this.setState({
                idProducto: cod,
                nombreProducto: nombre,
            });
            let newItemModalArray = {
                modal_cantidad: val_cantidad,
                modal_medida: val_medida,
                modal_cod_item: cod,
                modal_descripcion: nombre,
                modal_afecto: val_afecto,
                modal_precUnitario: Number(val_precio).toFixed(2),
                modal_valUnitario: Number(val_unitario).toFixed(2),
                modal_valVenta: Number(val_venta).toFixed(2),
                modal_igv: Number(val_igv).toFixed(2),
                modal_isc: Number(val_isc).toFixed(2),
                modal_sumTributos: Number(val_sum_tributos).toFixed(2),
                modal_precTotal: Number(val_precio_total).toFixed(2),
                modal_costVenta: Number(costo_venta).toFixed(2) * Number(val_cantidad).toFixed(2)
            }
            this.setState({
                    modalArray: [...this.state.modalArray, newItemModalArray],
                    sumTotTributos: Number(Number(this.state.sumTotTributos) + Number(val_sum_tributos)).toFixed(2),
                    sumTotValVenta: Number(Number(this.state.sumTotValVenta) + Number(val_venta)).toFixed(2),
                    sumPrecioVenta: Number(Number(this.state.sumPrecioVenta) + Number(val_precio_total)).toFixed(2),
                    sumPrecioVenta_temp: Number(Number(this.state.sumPrecioVenta_temp) + Number(val_precio_total)).toFixed(2),

                    costVenta: Number(Number(this.state.costVenta) + Number(val_costo_venta * val_cantidad)).toFixed(2)
                },
                () => {
                this.CloseItemModal();
                this.setState({
                    aCuenta: this.state.sumPrecioVenta,
                })
            }
            );
            toast.success('Producto agregado', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            if (this.refs.ref_buscar_item != undefined) { this.refs.ref_buscar_item.value = '' };
            console.log("Borrando PRODUCTO BUSCADO");
            this.setState({ modal_buscar: '' });
        }
    }

    searchProducto(product) {
        var val = product;

        if (product == undefined) {
            return;
        }
        else {
            //var val = product.replace(/^\s*/, '').replace(/\s*$/, '');
            if (val == '') {
                toast.warning('Ingrese un texto a buscar válido o escriba un * para mostrar todos', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });

                this.setState({
                    modal_buscar: ''
                });
                return;
            }
            if (val == '*') {
                var id = '/api/productos/productos/';
                fetch(id)
                    .then(res => res.json())
                    .then(
                        data => {
                            this.setState({ contenido_modal_select: data });
                        })
                    .catch(err => console.log(err));

            }
            if (val != '*' && val.length < 1) {
                toast.warning('Ingrese al menos dos letras del producto a buscar', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                return;
            }
            if (val.length >= 2) {
                {
                    //var userText = product.replace(/\s/g, ''); //erase spaces
                    console.log('buscando: ', val);
                    var id = '/api/productos/productos/' + val;
                    fetch(id)
                        .then(res => res.json())
                        .then(
                            data => {
                                this.setState({ contenido_modal_select: data });
                            })
                        .catch(err => console.log(err));

                }
            }
        }
    }

    isFloatNumber(n) {
        return /^[+-]?(?=.)(?:\d+,)*\d*(?:\.\d+)?$/.test(n);
    }

    isNumber(n) {
        console.log('isnumber: ', !isNaN(parseFloat(n)) && isFinite(n));
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    isIntNumber(n) {
        return /^\d*$/.test(n);
    }

    CloseItemModal() {
        /* clear data */
        if (this.ref_buscar_item.value != null && this.ref_buscar_item != undefined) {
            this.ref_buscar_item.value = '';
        }
        this.setState({
            tipoAfectoItem: '',
            contenido_modal_select: []
        });
    }

    // ESTE METODO ES POR PARTE DEL CÓDIGO ANTERIOR VERSION1.0
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        console.log(name + ":", value);
        if (name == 'fecEmision') {

            this.setState({
                fecVencimiento: value,
                aCreditoDias: 0

            })
        }
        if (name == 'sumPrecioVenta') {
            if (value == '' || value == null) {
                this.setState({
                    sumTotValVenta: 0,
                    sumTotTributos: 0
                })
            }
            console.log('sumPrecioVenta', value);
        }

        if (name == 'aCreditoDias') {

            Date.prototype.addDays = function (days, fecha) {
                var date = new Date(fecha);
                date.setDate(date.getDate() + days);
                return date;
            }

            let nuevaFechaVenc = new Date(this.state.fecEmision);
            console.log('nueva fec antes ', nuevaFechaVenc);

            // nuevaFechaVenc.setDate(nuevaFechaVenc.getDate() + value);
            nuevaFechaVenc = nuevaFechaVenc.addDays(value * 1 + 1, this.state.fecEmision);

            var year = nuevaFechaVenc.getFullYear();
            var month = nuevaFechaVenc.getMonth() + 1;
            var date = nuevaFechaVenc.getDate(); //Current Date
            if (date < 10) { date = '0' + date.toString(); }
            if (month < 10) { month = '0' + month.toString(); }

            this.setState({
                fecVencimiento: year + '-' + month + '-' + date

            }, console.log('nueva fec despues ', nuevaFechaVenc))

        }
    }


    loadMultipleSelectValues(opcion) {
        console.log(opcion);
        if (opcion == "agregar_sucursal") {
            this.setState({
                cabeceras_modal_select: ['Código Sucursal', 'Nombre Sucursal']
            });
            fetch('/api/sucursales/sucursales')
                .then(res => res.json())
                .then(
                    data => {
                        this.setState({ contenido_modal_select: data });
                    })
                .catch(err => console.log(err));

        }
        if (opcion == "agregar_fuente") { //
            this.setState({
                cabeceras_modal_select: ['Código Fuente', 'Nombre Fuente']
            });
            fetch('/api/fuentes/fuentes')
                .then(res => res.json())
                .then(
                    data => {
                        this.setState({ contenido_modal_select: data });
                    })
                .catch(err => console.log(err));

        }
        if (opcion == "agregar_cod_partida") {
            this.setState({
                cabeceras_modal_select: ['Código', 'Nombre Partida', 'Nombre Grupo']
            });
            fetch('/api/partidas/partidas')
                .then(res => res.json())
                .then(
                    data => {
                        this.setState({ contenido_modal_select: data });
                    })
                .catch(err => console.log(err));

        }
        if (opcion == "agregar_operacion") { //
            this.setState({
                cabeceras_modal_select: ['Código', 'Nombre Operacion']
            });
        }
        if (opcion == "agregar_productos") {
            console.log("BORRANDO LO ANTERIOR");
            this.setState({
                cabeceras_modal_select: ['Código', 'Nombre Producto', 'Sucursal', 'Stock', 'Cantidad', 'Precio Producto', 'Unidad Medida', 'Afecto'],
                modal_buscar: '', contenido_modal_select: [],
            });
        }
    }

    // FUNCION PARA ELIMINAR DATOS REFERENTE SOBRE LOS ITEMS QUE SE HAN GUARDADO
    // TAMBIEN DESCUENTA LOS PRECIOS QUE REFIEREN AL ITEM ELIMINADO
    removeItem(delete_index) {
        this.updateTotals(delete_index);
        this.setState({
                modalArray: [...this.state.modalArray.filter((item, index) => index !== delete_index)]
            }

        );
    }

    updateTotals(i) {
        this.setState({
            sumTotTributos: Number(this.state.sumTotTributos - this.state.modalArray[i].modal_sumTributos).toFixed(2),
            sumTotValVenta: Number(this.state.sumTotValVenta - this.state.modalArray[i].modal_valVenta).toFixed(2),
            sumPrecioVenta: Number(this.state.sumPrecioVenta - this.state.modalArray[i].modal_precTotal).toFixed(2),
            sumPrecioVenta_temp: Number(this.state.sumPrecioVenta_temp - this.state.modalArray[i].modal_precTotal).toFixed(2),
            costVenta: Number(this.state.costVenta - this.state.modalArray[i].modal_costVenta).toFixed(2)
        })
    }

    clearInfoCliente() {
        if (this.state.numDocCliente === '') { return }
        else {
            this.setState({
                idCliente: 0,
                tipDocCliente: '-1',
                razSocialCliente: '',
                direccionCliente: '',
                telefonoCliente: '',
                correoCliente: '',
                codPaisCliente: '',
                codUbigeoCliente: '',
                numDocCliente: '',
            });
        }
    }

    clearAgregarItemServicio() {
        this.setState({
            flagDetalleVenta: null,
            detalleGeneral: "",
            // tipoAfecto: '', NO USA EN ESTADOS PRINCIPALES
            style_servicio: '#007bff',
            style_item: '#007bff',
            modalArray: [],
            //clear total
            sumTotTributos: 0,
            sumTotValVenta: 0,
            sumPrecioVenta: 0,
            sumPrecioVenta_temp: 0,
            costVenta: 0
        });
    }

    clearUpperForm() {
        console.log("Limpiando Formulario");
        this.setState({
            codOperacionRelacionado: '', tipoComprobanteSeleccionado: '4', numSerieComprobante: '', numComprobante: '', tipMoneda: 'PEN', aCreditoDias: 0, sumTotTributos: 0, sumTotValVenta: 0,
            sumPrecioVenta: 0, sumPrecioVenta_temp: 0, sumDescTotal: 0, sumOtrosCargos: 0, costVenta: 0, aCuenta: 0,
            modal_buscar: '', idProducto: '', nombreProducto: '', modal_cantidad: '', modal_medida: '', modal_cod_item: '', modal_descripcion: '', modal_afecto: '', modal_precUnitario: '',
            modal_valUnitario: '', modal_valVenta: '', modal_igv: '', modal_isc: '', modal_sumTributos: '', modal_precTotal: '', //tableContent: '', no se que es??
            modalArray: [], cabeceras_modal_select: [], contenido_modal_select: [], // tipoAfectoItem: '', no lo uso ¿?¿?
            detalleGeneral: "", flagDetalleVenta: null, codMotivoNC: null, descMotivoNC: null, tipoComprobanteNC: '0', numSerieComprobanteNC: null, numComprobanteNC: null

        }, this.clearInfoCliente(), this.clearAgregarItemServicio(), window.scrollTo(0, 0));
    }

    // ----------------------------------------------------------------------
    // -------------------------- CARGNDO DATOS -----------------------------
    submitItems(id) {
        this.state.modalArray.map((value, i) => {
            let bodyForm = {};
            fetch('/api/inventarios/inventarios/', {
                method: 'POST',
                body: JSON.stringify({
                    esIngreso: this.state.grupoPartida.toUpperCase() === "INGRESOS",
                    idIngreso: id,
                    ctdUnidadItem: value.modal_cantidad,
                    codUnidadMedida: value.modal_medida,
                    idProducto: value.modal_cod_item,
                    desItem: value.modal_descripcion,
                    tipoAfecto: value.modal_afecto,
                    mtoPrecioUnitario: value.modal_precUnitario,
                    mtoValorUnitario: value.modal_valUnitario,
                    mtoValorVenta: value.modal_valVenta,
                    costVenta: value.modal_costVenta,
                    igv: value.modal_igv,
                    isc: value.modal_isc,
                    mtoSumTributos: value.modal_sumTributos,
                    mtoVentaTotal: value.modal_precTotal,
                    mtoDsctoItem: 0
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log('id item: ', data) //id que retorno

                })
                .catch(err => console.log(err));
        })
    }

    handleSubmit() {
        console.log("Ejecutando SUBMIT");
        var sumDescTotal, sumOtrosCargos, sumPrecioVenta, isEditable, detalle, cambio, aCuenta = this.state.aCuenta;
        sumDescTotal = this.state.sumDescTotal;
        sumOtrosCargos = this.state.sumOtrosCargos;
        if (this.state.tipoMovimientoSeleccionado === 2){
            toast.error('Por favor seleccione el tipo de movimiento a realizar', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            return;
        }
        if (this.state.codOperacionRelacionado === '') {
            this.setState({ codOperacionRelacionado: null });
        }
        if (this.state.tipoComprobanteSeleccionado == '' || this.state.tipoComprobanteSeleccionado == null) {
            toast.error('Por favor seleccione el tipo de comprobante', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            window.scrollTo(0, 0); return;
        }

        if (this.state.fuenteSeleccionada === "1" || this.state.fuenteSeleccionada === 1){
            toast.error('Por favor seleccione una fuente', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            return;
        }

        if (this.state.idPartida === "1" || this.state.idPartida === 1){
            toast.error('Por favor seleccione una partida valida', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            return;
        }


        if (this.state.tipoComprobanteSeleccionado === "0" || this.state.tipoComprobanteSeleccionado === "1" || this.state.tipoComprobanteSeleccionado === "4") {
            if (this.verificarCampos() === false) {
                return;
            }else {
                if (this.state.modalArray.length == 0) { isEditable = 1; } //vacio
                if (this.state.modalArray.length > 0) { isEditable = 0; } //lleno
                detalle = this.state.detalleGeneral;
            }
        }


        //nota de credito
        /*
        if (this.state.tipoComprobanteSeleccionado == 3) {
            if (this.verificarCamposNotaCredito() == false) { return; }
            else { isEditable = 0; detalle = null; }
        }
        */
        //pago

        if (this.state.tipoComprobanteSeleccionado === "2") {
            if (this.verificarCamposPago() === false) { return; }
            else {
                isEditable = 0;
            }
        }

        if (this.state.tipMoneda == 'USD') {
            if (this.state.tipoCambio == '' || this.state.tipoCambio == 0 || this.isNumber(this.state.tipoCambio) == false) {
                toast.error('Por favor ingrese un tipo de cambio válido', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                console.log("FALLO EN ESTA PARTE-2");
                return;
            }
            else {
                //cambiar montos a soles
                cambio = this.state.tipoCambio;
                aCuenta = this.state.aCuenta * cambio;
            }
        }
        if (this.state.sumDescTotal == '' || this.state.sumDescTotal == null) {
            this.setState({
                sumDescTotal: 0
            })
        }
        if (this.state.sumOtrosCargos == '' || this.state.sumOtrosCargos == null) {
            this.setState({
                sumOtrosCargos: 0
            })
        }
        if (this.state.idPartida === 0){
            toast.error('Por favor seleccione partida', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            return;
        }

        sumPrecioVenta = Number(this.state.sumPrecioVenta) - Number(sumDescTotal) + Number(sumOtrosCargos);
        //this.setState({ enabledButton: false })
        // condicion con respecto al nombre de partida
        // ---------------------------------------------
        fetch('/api/ingresos/ingresos', {
            method: 'POST',
            body: JSON.stringify({
                ingreso: true,
                movimiento: this.state.tipoMovimientoSeleccionado,
                editable: isEditable,
                estado: 1, //vigente por defecto
                codMes: this.state.codMes,
                codSucursal: this.state.sucursalSeleccionado, // MODIFICADO
                tipOperacion: 'null', // MODIFICADO
                codFuente: this.state.fuenteSeleccionada, // MODIFICADO
                idPartida: this.state.idPartida,
                horEmision: this.state.horEmision,
                fecEmision: this.state.fechaActual, // MODIFICADO
                codOperacion: this.state.codOperacionRelacionado === '' ? null : this.state.codOperacionRelacionado,
                fecVencimiento: this.state.fecVencimiento, //cambiar
                tipoComprobante: this.state.tipoComprobanteSeleccionado,
                numSerieComprobante: this.state.numSerieComprobante === '' ? null : this.state.numSerieComprobante,
                numComprobante: this.state.numComprobante === '' ? null : this.state.numComprobante,
                detalleIngreso: detalle ? detalle.toUpperCase() : detalle,
                tipMoneda: this.state.tipMoneda,
                aCreditoDias: this.state.aCreditoDias,
                idCliente: this.state.idCliente,
                sumTotTributos: this.state.sumTotTributos,
                sumTotValVenta: this.state.sumTotValVenta,
                sumDescTotal: this.state.sumDescTotal,
                sumOtrosCargos: this.state.sumOtrosCargos,
                sumPrecioVenta: sumPrecioVenta,
                costVenta: this.state.grupoPartida.toUpperCase() !== "INGRESOS"? 0:this.state.costVenta,
                costServicio: this.state.costServicio,
                utilidad: this.state.utilidad,
                aCuenta: aCuenta,
                dua_dsi: this.state.dua,
                //nota de credito
                tipoComprobanteNC: this.state.tipoComprobanteNC,
                descMotivoNC: this.state.descMotivoNC,
                codMotivoNC: this.state.codMotivoNC,
                otrotipoComprobanteNC: this.state.otrotipoComprobanteNC,
                numSerieComprobanteNC: this.state.numSerieComprobanteNC,
                numComprobanteNC: this.state.numComprobanteNC
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data != -3) {
                    console.log('id movimiento: ', data); //id que retorno
                    toast.success('Nuevo movimiento agregado', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                    if (isEditable == 0) { this.submitItems(data); }
                    if (this.state.tipoMovimientoSeleccionado === "1"){
                        this.imprimirTicket("comprobanteImpresion");
                    }
                    this.borrarDatosSobreCliente(); this.borrarDatosModalProduto(); this.borrarDatosSobreVenta();
                }
                else {
                    toast.error('Porfavor ingrese un número de comprobante diferente', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                }
            })
            .then(data => { this.setState({ enabledButton: true }) })
            .catch(err => console.log(err));
        event.preventDefault();


    }

    // ================================================================================
    // ================================================================================
    // CONTROLES PARA UNA EMISIÓN CORRECTA DEL TIPO DE DOCUMENTO
    verificarCamposPago() {
        if (this.state.numSerieComprobante === '' || this.state.numComprobante === '' || this.isIntNumber(this.state.numComprobante) === false) {
            this.setState({ numComprobante: null, numSerieComprobante: null });
        }
        //obligatorio
        if (this.state.codOperacionRelacionado === '') {
            toast.error("Por favor ingrese un código de referencia relacionado", { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            return false;
        }
        if (this.state.sumPrecioVenta === null || this.state.sumPrecioVenta === "" || this.state.sumPrecioVenta === 0){
            toast.error('Por favor ingrese el monto de la operación', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            return false;
        }

        if (this.state.detalleGeneral === "") {
            toast.error('Por favor ingrese un detalle general', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            return false;
        }
    }


    verificarCampos() {
        if (this.state.tipoComprobanteSeleccionado === "4" && (this.state.numSerieComprobante === '' || this.state.numComprobante === '')) {
            this.setState({ numComprobante: null, numSerieComprobante: null });
        }
        if (this.state.codOperacionRelacionado === '') {
            this.setState({ codOperacionRelacionado: '' });
        }
        if (this.state.tipoComprobanteSeleccionado !== "4" && (this.state.numSerieComprobante === "" || this.state.numSerieComprobante === "")) {
            toast.error('Por favor ingrese el número de serie de comprobante', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            return false;
        }
        //campos obligatorios para boleta y factura
        if (this.state.sucursalSeleccionado === "1") {
            toast.error('Por favor seleccione una sucursal', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            return false;
        }
        /*if (this.state.nombrePartida == '') {
            toast.error('Por favor agregue una partida', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
        }*/
        if (this.state.tipoComprobanteSeleccionado !== "4" && this.state.numComprobante === '') {
            toast.error('Por favor ingrese el número de comprobante', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            return false;
        }

        if (this.state.flagDetalleVenta === 1 && this.state.modalArray.length < 1){
            toast.error('Debe Ingresar al menos un producto.', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            return false;
        }

        //verificar si agrego servicio o items (obligatorio si es boleta o factura)
        if (this.state.flagDetalleVenta === null) {
            toast.error('Por favor seleccione referencia, agregue ítems o agréguelos nuevamente', { position: "bottom-right", autoClose: 4000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            return false;
        }
        //1 item, 0 servicio
        if (this.state.flagDetalleVenta == 0) {
            if (this.state.detalleGeneral === "") {
                toast.error('Por favor agregue el detalle general', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                return false;
            }
        }
        //verificar totales
        if (this.state.aCuenta > this.state.sumPrecioVenta) {
            toast.warn('El total a cuenta no puede ser mayor que el precio total',{ position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            return false;
        }
    }

    // ----------------------------------------------------------------------
    // ----------------------------------------------------------------------
    // ----------------------------------------------------------------------

    componentDidUpdate(prevProps, prevState, snapshot) {
        // FUNCION PARA TRAER LOS DATOS DE LAS BOLETAS Y FACTURAS
        /*
        if (prevState.tipoComprobanteSeleccionado !== this.state.tipoComprobanteSeleccionado){
            this.fecthValoresComprobante();
        }
        */
    }

    // FUNCIÓN QUE SE EJECUTA DESPUES DE REENDERIZAR
    componentDidMount() {
        // TRAYENDO DATOS DE SUCURSALES DESDE EL SERVIDOR
        this.fetchSucursales();
        // TRAYENDO DATOS DE FUENTES DESDE EL SERVIDOR
        this.fetchFuentes();
        // TRAYENDO DATOS DE LAS PARTIDAS DESDE EL SERVIDOR
        this.fetchPartidas();

        this.setState({
            timerId: setInterval(() => {
                var hours = new Date().getHours(); //Current Hours
                if (hours < 10) { hours = '0' + hours.toString(); }
                var min = new Date().getMinutes(); //Current Minutes
                if (min < 10) { min = '0' + min.toString(); }
                var sec = new Date().getSeconds(); //Current Seconds
                if (sec < 10) { sec = '0' + sec.toString(); }
                this.setState({
                    //curTime : new Date().toLocaleString()
                    horEmision: hours + ':' + min + ':' + sec,
                })
            }, 1000),
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.timerId);
    }

    imprimirTicket(nombreCampo){
        const inicio = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Gestión de Cuentas</title>

    <!--boostrap css-->
    <link rel="stylesheet" href="http://localhost:3000/bootstrap-4.3.1-dist/css/bootstrap.min.css" crossorigin="anonymous">
    <style>
    body{
        font-family: consolas;
        margin-left: 0px;
    }
    
    #colTabla{
    margin-right: 2000px;
    }
</style>
</head>
<body><div class="container">`;

        const fin = `</div>    <!--script-->
        <!-- Font Awesome -->
        <link rel="stylesheet" href="./fontawesome-free-5.8.1-web/css/all.css" crossorigin="anonymous">
        
         <!--boostrap -->
         <script src="./bootstrap-4.3.1-dist/js/jquery-3.4.1.min.js" crossorigin="anonymous"></script>
         <script src="./bootstrap-4.3.1-dist/js/popper.min.js" crossorigin="anonymous"></script>
         <script src="./bootstrap-4.3.1-dist/js/bootstrap.min.js" crossorigin="anonymous"></script>
         <script src="./pdf/jspdf.debug.js"></script>

       <!--boostrap icons-->
       <link rel="stylesheet" href="./fontawesome-free-5.8.1-web/css/all.css" crossorigin="anonymous">

        <script src="bundle.js"></script>

</body>
</html>`;
        var ventana = window.open('', 'PRINT', 'height=800,width=800');
        ventana.document.write(inicio + document.getElementById(nombreCampo).innerHTML + fin);
        ventana.document.close();
        ventana.focus();
        ventana.onload = function() {
            ventana.print();
            //ventana.close();
        };
        return true;
    }

    borrarDatosModalProduto(){
        console.log("Borando datos");
        this.setState({
            opcionAdmin: '',
            nuevoNombreProducto: '',
            nuevoPrecioProducto: '',
            nuevoStockProducto: '',
            nuevoCostoVenta: '',
            nuevoSerieProducto: '',
            nuevoIdPartida: '',
            nuevaFechaVencimiento: '',
        });
    }

    handleSelectChange(event) {

        console.log(event.target.name, " - ", event.target.value);
        this.setState({
            [event.target.name]: event.target.value,
            botonSubmitActivado: this.state.codigoPartidaSeleccionado && this.state.fuenteSeleccionada && this.state.sucursalSeleccionado,
        });


        if (event.target.name == 'afecto_servicio' && this.state.sumPrecioVenta != null) {
            if (event.target.value == '0') { //gravado
                var nuevoSumaPrecio = (Number(this.state.sumPrecioVenta) / 1.18).toFixed(2);
                var nuevoTributos = (Number(nuevoSumaPrecio) * 0.18).toFixed(2);
                this.setState({
                    sumTotValVenta: nuevoSumaPrecio,
                    sumTotTributos: nuevoTributos
                })
            }
            else {
                this.setState({
                    sumTotValVenta: 0,
                    sumTotTributos: 0
                })
            }
        }
        if(event.target.name == 'nuevoUnidadMedidaProducto'){
            console.log("UNIDAD SELECCIONADA:", event.target.value);
            this.setState({
                nuevoUnidadMedidaProducto: event.target.value
            })
        }
    }

    renderModales() {
        return (
            <ModalesOld
                saveNuevo={this.crearNuevoelemento} // ----------
                handleInputChange={this.handleInputChange} // -----------
                handleSelectChange={this.handleSelectChange} // --------------

                opcionAdmin={this.state.opcionAdmin} // --------------

                nuevoNombreProducto={this.state.nuevoNombreProducto} // --------------
                nuevoPrecioProducto={this.state.nuevoPrecioProducto} // --------------
                nuevoStockProducto={this.state.nuevoStockProducto} // --------------
                nuevoCostoVenta={this.state.nuevoCostoVenta} // --------------
                sucursales={this.state.lista_sucursales} // --------------
                nuevoSerieProducto={this.state.nuevoSerieProducto}

                listaPartidas={this.state.listaPartidas}

                nuevoSucursalProductoPadre={this.state.nuevoSucursalProducto}
                nuevoUnidadMedidaProductoPadre={this.state.nuevaUnidadMedidaProducto}
                opcMedida={opciones_tipo_medida} // --------------

                nuevoIdPartida={this.state.nuevoIdPartida}
                nuevaFechaVencimiento={this.state.nuevaFechaVencimiento}

            />
        )
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12">
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
                        <ContenedorDesglosable
                            tipoMovimientoSeleccionadoG={this.state.tipoMovimientoSeleccionado}

                            listaSucursalesG={this.state.listaSucursales}
                            sucursalSeleccionadoG={this.state.sucursalSeleccionado}
                            handleChangeSelectComponentG={this.handleChangeSelectComponent}
                            handleOnBlurG={this.handleOnBlur}

                            listaFuentesG={this.state.listaFuentes}
                            fuenteSeleccionadaG={this.state.fuenteSeleccionada}

                            tipoComprobanteSeleccionadoG={this.state.tipoComprobanteSeleccionado}

                            fechaActualG={this.state.fechaActual}

                            numSerieComprobanteG={this.state.numSerieComprobante}
                            numComprobanteG={this.state.numComprobante}

                            handleChangeInputComponentG={this.handleChangeInputComponent}

                            rucClienteG={this.state.rucCliente}
                            idClienteG={this.state.idCliente}
                            numDocClienteG={this.state.numDocCliente}
                            tipDocClienteG={this.state.tipDocCliente}
                            razSocialClienteG={this.state.razSocialCliente}
                            direccionClienteG={this.state.direccionCliente}
                            telefonoClienteG={this.state.telefonoCliente}
                            correoClienteG={this.state.correoCliente}
                            codPaisClienteG={this.state.codPaisCliente}
                            codUbigeoClienteG={this.state.codUbigeoCliente}

                            handleOnClickButtonG={this.handleOnClickButton}


                            crearNuevoelementoG={this.crearNuevoelemento}
                            borrarDatosSobreClienteG={this.borrarDatosSobreCliente}

                            // ----------------------------------------------------------------------------
                            // ----------------------------------------------------------------------------
                            /* PARA EL AGREGAR ITEMS */
                            // ----------------------------------------------------------------------------
                            // ----------------------------------------------------------------------------
                            listaItemsVentaG={this.state.modalArray}

                            selectShowAddItemG={this.selectShowAddItem}
                            handleInputChangeG={this.handleInputChange}
                            handleSelectChangeG={this.handleSelectChange}
                            loadMultipleSelectValuesG={this.loadMultipleSelectValues}
                            CloseItemModalG={this.CloseItemModal}
                            searchProductoG={this.searchProducto}
                            getFilaProductoG={this.getFilaProducto}
                            removeItemG={this.removeItem}


                            flagItemG={this.state.flagDetalleVenta}
                            tipoComprobanteG={this.state.tipoComprobante}
                            style_servicioG={this.state.style_servicio}
                            style_itemG={this.state.style_item}
                            showAddItemG={this.state.showAddItem}
                            detalleGeneralG={this.state.detalleGeneral}
                            cabeceras_modal_selectG={this.state.cabeceras_modal_select}
                            contenido_modal_selectG={this.state.contenido_modal_select}
                            modalArrayG={this.state.modalArray}
                            modal_buscarG={this.state.modal_buscar}
                            sumPrecioVentaG={this.state.sumPrecioVenta}
                            borrarDatosModalProdutoG={this.borrarDatosModalProduto}

                            sucursalesG={this.state.lista_sucursales}

                            ref_buscar_itemG={node => this.ref_buscar_item = node}
                            ref_precio_itemG={node => this.ref_precio_item = node}
                            ref_cantidad_itemG={node => this.ref_cantidad_item = node}
                            ref_medida_itemG={node => this.ref_medida_item = node}
                            ref_afecto_itemG={node => this.ref_afecto_item = node}


                            // ----------------------------------------------------------------------------
                            // ----------------------------------------------------------------------------
                            // ----------------------------------------------------------------------------


                            // ------------- NOTAS DE CRÉDITOS ------------
                            // IMCOMPLETO AÚN HASTA ESTE PUNTO
                            codMotivoNCG={this.state.codMotivoNC}
                            descMotivoNCG={this.state.descMotivoNC}
                            tipoComprobanteNCG={this.state.tipoComprobanteNC}
                            // --------------------------------------------

                            // --------- DATOS PARA TOTALES QUE SE USARA DESDE MODAL ----------------------
                            // ----------------------------------------------------------------------------

                            sumTotTributosG={this.state.sumTotTributos}
                            sumTotValVentaG={this.state.sumTotValVenta}
                            sumPrecioVentaG={this.state.sumPrecioVenta}
                            sumPrecioVenta_tempG={this.state.sumPrecioVenta_temp}
                            sumDescTotalG={this.state.sumDescTotal}
                            sumOtrosCargosG={this.state.sumOtrosCargos}
                            costVentaG={this.state.costVenta}
                            costServicioG={this.state.costServicio}
                            fecVencimientoG={this.state.fecVencimiento}
                            tipMonedaG={this.state.tipMoneda}
                            tipoCambioG={this.state.tipoCambio}
                            listaPartidasG={this.state.listaPartidas}
                            buscarIdPartidaG={this.buscarIdPartida}
                            sumDescTotalG={this.state.sumDescTotal}
                            aCreditoDiasG={this.state.aCreditoDias}
                            codOperacionRelacionadoG={this.state.codOperacionRelacionado}
                            aCuentaG={this.state.aCuenta}
                            // ----------------------------------------------------------------------------
                            // ----------------------------------------------------------------------------

                            nombrePartidaG={this.state.nombrePartida}
                        />
                    </div>
                </div>
                <div className="row mt-2 justify-content-center">
                    <div className="col-6 mt-2 col-sm-2 text-center">
                        <button
                            className="btn btn-success btn-lg btn-block"
                            onClick={this.handleSubmit}
                        >
                            GRABAR
                        </button>
                    </div>
                    <div className="col-12 mt-2 col-sm-2 text-center">
                        <button className="btn btn-danger btn-lg btn-block" onClick={() => {this.borrarDatosSobreCliente(); this.borrarDatosModalProduto(); this.borrarDatosSobreVenta()}}>LIMPIAR</button>
                    </div>
                </div>

                <div className="row">
                    <ModalImpresion
                        numDocumentoClienteM={this.state.numDocCliente}
                        razonSocialClienteM={this.state.razSocialCliente}
                        direccionClienteM={this.state.direccionCliente}
                        telefonoCliente={this.state.telefonoCliente}
                        correoCliente={this.state.correoCliente}
                        totalValorCompraM={this.state.sumTotValVenta}
                        sumatoriaTributosM={this.state.sumTotTributos}
                        totalDescuentoM={this.state.sumDescTotal}
                        totalPrecioVentaM={this.state.sumPrecioVenta}
                        sumatoriaOtrosCargosM={this.state.sumOtrosCargos}
                        detalleGeneralM={this.state.detalleGeneral}
                        tipoComprobanteM={this.state.tipoComprobanteSeleccionado}
                        items={this.state.modalArray}
                        aCuentaM={this.state.aCuenta}
                        numSerieComprobanteM={this.state.numSerieComprobante}
                        numComprobanteM={this.state.numComprobante}
                    />
                </div>

                <div className="row">
                    {this.renderModales()}
                </div>
            </div>
        );
    }
};

const registros = [
        {cant: 465, unid: 12, descripcion: "Producto 1", vunitario: 122.121, punitario: 34.1, pventa: 3223.2},
{cant: 4, unid: 12, descripcion: "Producto 1", vunitario: 122.121, punitario: 34.1, pventa: 3223.2},
{cant: 4, unid: 12, descripcion: "Producto 1", vunitario: 122.121, punitario: 34.1, pventa: 3223.2},
{cant: 4, unid: 12, descripcion: "Producto 1", vunitario: 122.121, punitario: 34.1, pventa: 3223.2},
{cant: 4, unid: 12, descripcion: "Producto 1", vunitario: 122.121, punitario: 34.1, pventa: 3223.2},
{cant: 4, unid: 12, descripcion: "Producto 1", vunitario: 122.121, punitario: 34.1, pventa: 3223.2},
];

const opciones_tipo_medida = [
    { codUnidadMedida: "NIU", nombre: 'Unidad (Bienes)' },
    { codUnidadMedida: "ZZ", nombre: 'Unidad (Servicios)' },
    { codUnidadMedida: "4A", nombre: 'Bobinas' },
    { codUnidadMedida: "BJ", nombre: 'Balde' },
    { codUnidadMedida: "BLL", nombre: 'Barriles' },
    { codUnidadMedida: "BG", nombre: 'Bolsa' },
    { codUnidadMedida: "BO", nombre: 'Botellas' },
    { codUnidadMedida: "BX", nombre: 'Caja' },
    { codUnidadMedida: "CT", nombre: 'Cartones' },
    { codUnidadMedida: "CMK", nombre: 'Centimetro Cuadrado' },
    { codUnidadMedida: "CMQ", nombre: 'Centimetro Cubico' },
    { codUnidadMedida: "CMT", nombre: 'Centimetro Lineal' },
    { codUnidadMedida: "CEN", nombre: 'Ciento de Unidades' },
    { codUnidadMedida: "CY", nombre: 'Cilindro' },
    { codUnidadMedida: "CJ", nombre: 'Conos' },
    { codUnidadMedida: "DZN", nombre: 'Docena' },
    { codUnidadMedida: "DZP", nombre: 'Docena por 10**6' },
    { codUnidadMedida: "BE", nombre: 'Fardo' },
    { codUnidadMedida: "GLI", nombre: 'Galon Inglés (4,545956L)' },
    { codUnidadMedida: "GRM", nombre: 'Gramo' },
    { codUnidadMedida: "GRO", nombre: 'Gruesa' },
    { codUnidadMedida: "HLT", nombre: 'Hectolitro' },
    { codUnidadMedida: "LEF", nombre: 'Hoja' },
    { codUnidadMedida: "SET", nombre: 'Juego' },
    { codUnidadMedida: "KGM", nombre: 'Kilogramo' },
    { codUnidadMedida: "KTM", nombre: 'Kilometro' },
    { codUnidadMedida: "KWH", nombre: 'Kilovatio Hora' },
    { codUnidadMedida: "KT", nombre: 'Kit' },
    { codUnidadMedida: "CA", nombre: 'Latas' },
    { codUnidadMedida: "LBR", nombre: 'Libras' },
    { codUnidadMedida: "LTR", nombre: 'Litro' },
    { codUnidadMedida: "MWH", nombre: 'Megawatt Hora' },
    { codUnidadMedida: "MTR", nombre: 'Metro' },
    { codUnidadMedida: "MTK", nombre: 'Metro Cuadrado' },
    { codUnidadMedida: "MTQ", nombre: 'Metro Cúbico' },
    { codUnidadMedida: "MGM", nombre: 'Miligramos' },
    { codUnidadMedida: "MLT", nombre: 'Mililitro' },
    { codUnidadMedida: "MMT", nombre: 'Milimetro' },
    { codUnidadMedida: "MMK", nombre: 'Milimetro Cuadrado' },
    { codUnidadMedida: "MMQ", nombre: 'Milimetro Cúbico' },
    { codUnidadMedida: "MLL", nombre: 'Millares' },
    { codUnidadMedida: "UM", nombre: 'Millón de Unidades' },
    { codUnidadMedida: "ONZ", nombre: 'Onzas' },
    { codUnidadMedida: "PF", nombre: 'Paletas' },
    { codUnidadMedida: "PK", nombre: 'Paquete' },
    { codUnidadMedida: "PR", nombre: 'Par' },
    { codUnidadMedida: "FOT", nombre: 'Pies' },
    { codUnidadMedida: "FTK", nombre: 'Pies Cuadrados' },
    { codUnidadMedida: "FTQ", nombre: 'Pies Cúbicos' },
    { codUnidadMedida: "C62", nombre: 'Piezas' },
    { codUnidadMedida: "PG", nombre: 'Placas' },
    { codUnidadMedida: "ST", nombre: 'Pliego' },
    { codUnidadMedida: "INH", nombre: 'Pulgadas' },
    { codUnidadMedida: "RM", nombre: 'Resma' },
    { codUnidadMedida: "DR", nombre: 'Tambor' },
    { codUnidadMedida: "STN", nombre: 'Tonelada Corta' },
    { codUnidadMedida: "LTN", nombre: 'Tonelada Larga' },
    { codUnidadMedida: "TNE", nombre: 'Toneladas' },
    { codUnidadMedida: "TU", nombre: 'Tubos' },
    { codUnidadMedida: "GLL", nombre: 'US Galón (3.7843 L)' },
    { codUnidadMedida: "YRD", nombre: 'Yarda' },
    { codUnidadMedida: "YDK", nombre: 'Yarda Cuadrada' },
];

export default OperacionV2;