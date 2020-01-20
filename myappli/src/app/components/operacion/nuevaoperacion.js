import React, { Component } from 'react';
import { tipDocumento } from '../../json/tipos_documento.json';
import DatosCliente from './datoscliente';
import InformacionGeneral from './informaciongeneral';
import AgregarItemsServicio from './agregaritemsservicio';
import Modales from './modales';
import Totales from './totales';
import NotaCredito from './notaCredito';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonPrinter from "../common/buttonPrinter";

/*estado: 1 ingreso, 0 egreso 
  editable:  1 lleno, 0 vacio
  estado: 1 vigente, 0 anulado */
class NuevaOperacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enabledButton: true,
            movimiento: '', //1 ingreso , 0 egreso
            dua: null, //egreso 
            idCliente: null,
            tipOperacion: null,
            nombreOperacion: '',
            codMes: '',
            idPartida: 1,
            grupoPartida: 1,
            nombrePartida: null,
            codOperacionRelacionado: null,
            codSucursal: 1, // null
            nombreSucursal: '',
            tipoComprobante: '0', // 0 boleta, 1 factura, 3 nota credito, 2 pago, 4 otro
            numSerieComprobante: null,
            numComprobante: null,
            fecEmision: null,
            horEmision: '',
            fecVencimiento: null,
            tipDocUsuario: '',
            numDocUsuario: '',
            razSocial: '',
            desDireccionCliente: '',
            telefonoCliente: '',
            correoCliente: '',
            tipMoneda: 'PEN',
            tipoCambio: '', //if usd
            tipoAfectoItem: '', //
            codPaisCliente: '',
            codUbigeoCliente: '',
            flagItem: null,
            detalleGeneral: "",
            aCreditoDias: 0,
            codFuente: 1, //null
            nombreFuente: '',
            sumTotTributos: 0,
            sumTotValVenta: 0,
            sumPrecioVenta: null,
            sumPrecioVenta_temp: null,
            sumDescTotal: 0,
            sumOtrosCargos: 0,
            costVenta: 0,
            costServicio: 0,
            utilidad: 0,
            aCuenta: 0,
            /* Add item */
            afecto_servicio: '',
            modal_buscar: '',
            valores_item: [],
            showAddItem: '',
            data_productos: [],
            idProducto: '',
            nombreProducto: '',
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
            tableContent: '',
            modalArray: [],
            /* modal */
            cabeceras_modal_select: [],
            contenido_modal_select: [],
            /* admin - new data*/
            opcionAdmin: '',
            nuevoNombreSucursal: '',
            nuevoProvincia: '',
            nuevoDepartamento: '',
            nuevodireccionSucursal: '',
            nuevoDistrito: '',
            nuevoNombrePartida: '',
            nuevoGrupoPartida: '',
            nuevoOtroGrupoPartida: '',
            opciones_nuevo_grupo_partida: [],
            nuevoNombreFuente: '',
            nuevoSaldoFuente: 0,

            // DATOS DE PRODUCTOS
            listaPartidas: [],

            nuevoNombreProducto: '',
            nuevoSucursalProducto: '',
            nuevoUnidadMedidaProducto: '',
            nuevoPrecioProducto: '',
            nuevoStockProducto: '',
            nuevoCostoVenta: '',
            nuevoSerieProducto: '',
            nuevoIdPartida: '',
            nuevaFechaVencimiento: '',
            // FIN DATOS PRODUCTOS

            nuevoNumDocUsuario: '',
            nuevoTipDocUsuario: '6',
            nuevoRazSocial: '',
            nuevoDesDireccionCliente: '',
            nuevoTelefonoCliente: '',
            nuevoCorreoCliente: '',
            nuevoCodPaisCliente: '',
            nuevoCodUbigeoCliente: '',
            //nota credito
            tipoComprobanteNC: '0',
            descMotivoNC: null,
            codMotivoNC: null,
            otrotipoComprobanteNC: null,
            numSerieComprobanteNC: null,
            numComprobanteNC: null,
            //
            style_item: '',
            style_servicio: '',
            //
            lista_sucursales: [],

            sucursalSeleccionado: false,
            fuenteSeleccionada: false,
            codigoPartidaSeleccionado: false,
            botonSubmitActivado: false,

        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);

        this.verificarCampos = this.verificarCampos.bind(this);
        this.verificarCamposNotaCredito = this.verificarCamposNotaCredito.bind(this);
        this.verificarCamposPago = this.verificarCamposPago.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.updateTotals = this.updateTotals.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.submitItems = this.submitItems.bind(this);

        this.loadMultipleSelectValues = this.loadMultipleSelectValues.bind(this);
        this.searchProducto = this.searchProducto.bind(this);

        this.buscarInfoCliente = this.buscarInfoCliente.bind(this);
        this.clearInfoCliente = this.clearInfoCliente.bind(this);
        this.clearAgregarItemServicio = this.clearAgregarItemServicio.bind(this);

        this.CloseItemModal = this.CloseItemModal.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.calcularPrecioVenta = this.calcularPrecioVenta.bind(this);
        this.clearUpperForm = this.clearUpperForm.bind(this);
        this.selectShowAddItem = this.selectShowAddItem.bind(this);

        this.getFilaSucursal = this.getFilaSucursal.bind(this);
        this.getFilaFuente = this.getFilaFuente.bind(this);
        this.getFilaPartida = this.getFilaPartida.bind(this);
        this.getFilaOperacion = this.getFilaOperacion.bind(this);
        this.getFilaProducto = this.getFilaProducto.bind(this);

        this.buscarPor = this.buscarPor.bind(this);
        this.setAdminOption = this.setAdminOption.bind(this);
        this.saveNuevo = this.saveNuevo.bind(this);
        this.clearNuevo = this.clearNuevo.bind(this);

        this.clearModal = this.clearModal.bind(this);

        this.isNumber = this.isNumber.bind(this);
        this.isFloatNumber = this.isFloatNumber.bind(this);

        this.fecthValoresComprobante = this.fecthValoresComprobante.bind(this);
        this.fetchPartidas = this.fetchPartidas.bind(this);
    }

    // FUNCION PERMITE OBTENER LA HORA Y FECHA PARA LA EMISIÓN DE UNA NUEVA OPERACIÓN
    componentDidMount() {
        /*cod mes */
        var year_ = new Date().getFullYear();
        var month_ = new Date().getMonth() + 1;
        if (month_ < 10) { month_ = '0' + month_.toString(); }
        this.setState({
            codMes: year_.toString() + month_.toString()
        });
        var year = new Date().getFullYear();
        var month = new Date().getMonth() + 1;
        var date = new Date().getDate(); //Current Date
        if (date < 10) { date = '0' + date.toString(); }
        if (month < 10) { month = '0' + month.toString(); }
        this.setState({
            //curTime : new Date().toLocaleString()
            fecEmision: year + '-' + month + '-' + date,
            fecVencimiento: year + '-' + month + '-' + date
        })
        /* hide products */
        setInterval(() => {
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
        }, 1000);

        fetch('/api/sucursales/sucursales')
            .then(res => res.json())
            .then(
                data => {
                    console.log(data);
                    this.setState({
                        lista_sucursales: data,
                        nuevoSucursalProducto: data[1].codSucursal,
                        nuevoUnidadMedidaProducto: opciones_tipo_medida[0].codUnidadMedida
                    });
                }
            )
            .catch( err => console.log(err));

        this.fetchPartidas();
    }
    // ------ FIN ------

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.tipoComprobante !== this.state.tipoComprobante){
            this.fecthValoresComprobante();

        }
    }


    // FUNCION NOS PERMITE REALIZAR LA BUSQUEDA Y MOSTRAR LOS ELEMENTOS EN LAS TABLAS RESPECTIVAS COMO PARA
    // BUSCAR -- SUCURSALES, FUENTES, TIPO DE OPERACIÓN, CÓDIGO DE PARTIDAS Y TABLA DE PRODUCTOS
    // solo oculta las filas que no cumplan con la busqueda y el filtro es en base a los campos que correspondan
    buscarPor(id) {
        var input, filter, table, tr, td, i, txtValue, idSearch, idTable;
        if (id == "buscar_por_sucursal") { idSearch = "inputSearchSucursales"; idTable = "idTablaSucursales"; }
        if (id == "buscar_por_fuente") { idSearch = "inputSearchFuentes"; idTable = "idTablaFuentes"; }
        if (id == "buscar_por_operacion") { idSearch = "inputSearchOperaciones"; idTable = "idTablaOperaciones"; }
        if (id == "buscar_por_partida") { idSearch = "inputSearchPartidas"; idTable = "idTablaPartidas"; }
        if (id == "buscar_por_producto") { idSearch = "inputSearchProductos"; idTable = "idTablaProductos"; }

        input = document.getElementById(idSearch);
        filter = input.value.toUpperCase();
        table = document.getElementById(idTable);
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    if ((id == "buscar_por_sucursal") || (id == "buscar_por_operacion")
                        || (id == "buscar_por_producto") || (id == "buscar_por_fuente")) { td = tr[i].getElementsByTagName("td")[0]; }
                    if (id == "buscar_por_partida") { td = tr[i].getElementsByTagName("td")[2]; }
                    if (td) {
                        txtValue = td.textContent || td.innerText;
                        if (txtValue.toUpperCase().indexOf(filter) > -1) {
                            tr[i].style.display = "";
                        } else {
                            if ((id == "buscar_por_sucursal") || (id == "buscar_por_operacion")
                                || (id == "buscar_por_producto") || (id == "buscar_por_fuente")) { tr[i].style.display = "none"; }
                            if (id == "buscar_por_partida") {
                                td = tr[i].getElementsByTagName("td")[0];
                                if (td) {
                                    txtValue = td.textContent || td.innerText;
                                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                                        tr[i].style.display = "";
                                    } else {
                                        tr[i].style.display = "none";
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    // ------ FIN ---------

    // FUNCIÓN QUE NOS PERMITE BUSCAR POR DNI LOS DATOS DE NUESTROS CLIENTES
    // CONSULTANDO NUESTRA API... Y EDITANDO LOS ESTADOS DE NUESTRA INTERFACE
    buscarInfoCliente(nuevo) {
        if (nuevo == '' || nuevo == null) {
            toast.error('Ingrese un número de documento válido buscar info cliente', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
        }
        else {

            fetch('/api/clientes/clientes/' + nuevo, {
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
                        toast.error('Cliente no encontrado', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                    }
                    else {
                        this.setState({
                            idCliente: data[0].idCliente,
                            numDocUsuario: data[0].numDocUsuario,
                            tipDocUsuario: tipDocumento[data[0].tipDocUsuario],
                            razSocial: data[0].razSocial,
                            desDireccionCliente: data[0].desDireccionCliente,
                            telefonoCliente: data[0].telefonoCliente,
                            correoCliente: data[0].correoCliente,
                            codPaisCliente: data[0].codPaisCliente,
                            codUbigeoCliente: data[0].codUbigeoCliente,
                        });
                    }
                })
                .catch(err => console.log(err));

        }
    }

    // FUNCIÓN QUE PERMITE BORRAR UN ITEM DE LA LISTA
    clearAgregarItemServicio() {
        this.setState({
            flagItem: null,
            detalleGeneral: '',
            tipoAfecto: '',
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
    // --- FIN ----

    // FUNCIÓN QUE BORRA LOS DATOS DEL CLIENTE
    clearInfoCliente() {
        if (this.state.numDocUsuario = '') { return }
        else {
            this.setState({
                idCliente: null,
                tipDocUsuario: '',
                razSocial: '',
                desDireccionCliente: '',
                telefonoCliente: '',
                correoCliente: '',
                codPaisCliente: '',
                codUbigeoCliente: '',
            });
        }
    }
    // ---- FIN -----

    // FUNCIONES QUE NOS PERMITEN OBTENER LOS DATOS DE LA FILA SELECCIONADA DE LAS TABLAS DE BUSQUEDA
    getFilaSucursal(cod, nombre) {
        this.setState({
            codSucursal: cod,
            nombreSucursal: nombre,
            contenido_modal_select: [],
            sucursalSeleccionado: true,
            botonSubmitActivado: this.state.codigoPartidaSeleccionado && this.state.fuenteSeleccionada && this.state.sucursalSeleccionado,
        });
    }
    getFilaFuente(cod, nombre) {
        this.setState({
            codFuente: cod,
            nombreFuente: nombre,
            contenido_modal_select: [],
            fuenteSeleccionada: true,
            botonSubmitActivado: this.state.codigoPartidaSeleccionado && this.state.fuenteSeleccionada && this.state.sucursalSeleccionado,
        });
    }
    getFilaOperacion(cod, nombre) {
        if (cod == '' && nombre == '') {
            cod = null;
        }
        this.setState({
            tipOperacion: cod,
            nombreOperacion: nombre,
            contenido_modal_select: []
        });
    }
    getFilaPartida(cod, nombre, grupo) {
        console.log("SELECCIONANDO EL GRUPO DE PARTIDA");
        console.log(grupo);
        this.setState({
            idPartida: cod,
            nombrePartida: nombre,
            grupoPartida: grupo,
            contenido_modal_select: [],
            codigoPartidaSeleccionado: true,
            botonSubmitActivado: this.state.codigoPartidaSeleccionado && this.state.fuenteSeleccionada && this.state.sucursalSeleccionado,
        });
    }
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
            console.log('newItemModalArray', newItemModalArray);
            this.setState({
                modalArray: [...this.state.modalArray, newItemModalArray],
                sumTotTributos: Number(Number(this.state.sumTotTributos) + Number(val_sum_tributos)).toFixed(2),
                sumTotValVenta: Number(Number(this.state.sumTotValVenta) + Number(val_venta)).toFixed(2),
                sumPrecioVenta: Number(Number(this.state.sumPrecioVenta) + Number(val_precio_total)).toFixed(2),
                sumPrecioVenta_temp: Number(Number(this.state.sumPrecioVenta_temp) + Number(val_precio_total)).toFixed(2),

                costVenta: Number(Number(this.state.costVenta) + Number(val_costo_venta * val_cantidad)).toFixed(2)
            },
                this.CloseItemModal
            );
            toast.success('Producto agregado', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            console.log(this.state.modalArray);
            if (this.refs.ref_buscar_item != undefined) { this.refs.ref_buscar_item.value = '' };
            this.setState({ modal_buscar: '' });
        }
    }
    // FIN
    // FUNCIONES QUE NOS PERMITEN OBTENER LOS DATOS DE LA FILA SELECCIONADA DE LAS TABLAS DE BUSQUEDA

    // FUNCION QUE NOS PERMITE ACTUALIZAR LOS DATOS DE SALDO AL MOMENTO DE AGREGAR LOS ITEMS
    updateTotals(i) {
        this.setState({
            sumTotTributos: Number(this.state.sumTotTributos - this.state.modalArray[i].modal_sumTributos).toFixed(2),
            sumTotValVenta: Number(this.state.sumTotValVenta - this.state.modalArray[i].modal_valVenta).toFixed(2),
            sumPrecioVenta: Number(this.state.sumPrecioVenta - this.state.modalArray[i].modal_precTotal).toFixed(2),
            sumPrecioVenta_temp: Number(this.state.sumPrecioVenta_temp - this.state.modalArray[i].modal_precTotal).toFixed(2),
            costVenta: Number(this.state.costVenta - this.state.modalArray[i].modal_costVenta).toFixed(2)
        })
    }
    // ------ FIN ---------

    removeItem(delete_index) {
        this.updateTotals(delete_index);
        this.setState({
            modalArray: [...this.state.modalArray.filter((item, index) => index !== delete_index)]
        }

        );
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

    // EN EL CASO QUE SELECCIONEMOS PARA AGREGAR UNA REFERENCIA, TENIENDO ITEMS AGERGADOS, NOS ADVERTIRA QUE SE BORRARÍAN LOS ITEMS YA SELECCIONADOS
    // EN CASO CONTRARIO... SI SE TIENE UNA REFERENCIA AGREGADA, SERA BORRADA PARA PODER AGREGAR ITEMS
    selectShowAddItem(opcion) {
        this.setState({
            botonSubmitActivado: this.state.codigoPartidaSeleccionado && this.state.fuenteSeleccionada && this.state.sucursalSeleccionado,
        });
        if (opcion == "agregar_servicio") {
            if (this.state.modalArray.length > 0) {
                const answer = window.confirm("Al seleccionar Referencia se borrarán los items agregados, ¿continuar?");
                if (answer == true) {
                    this.setState({
                        flagItem: 0,
                        showAddItem: opcion,
                        style_servicio: '#6c5ce7',
                        style_item: '#007bff',
                        modalArray: [],
                        //clear total
                        sumTotValVenta: 0,
                        sumTotTributos: 0,
                        sumDescTotal: 0,
                        sumOtrosCargos: 0,
                        sumPrecioVenta: 0,
                        sumPrecioVenta_temp: 0,
                        aCuenta: 0
                    });
                }
                else {
                    return;
                }
            }
            else {
                this.setState({
                    flagItem: 0,
                    showAddItem: opcion,
                    style_servicio: '#6c5ce7',
                    style_item: '#007bff',
                    modalArray: [],
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
        if (opcion == "agregar_item") {
            if (this.state.sumPrecioVenta != '' && this.state.sumPrecioVenta != 0 && this.state.sumPrecioVenta != null) {
                const answer = window.confirm("Al seleccionar Agregar Item se borrarán los datos ya llenados, ¿continuar?");
                if (answer == true) {
                    this.setState({
                        flagItem: 1,
                        showAddItem: opcion,
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
                }
                else {
                    return;
                }
            }
            else {
                this.setState({
                    flagItem: 1,
                    showAddItem: opcion,
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
            }
        }
    }
    // ---- FIN ---

    // ---------- Función Buscar Producto ------------
    // Función que permite hacer la busqueda de productos para agregar en una nueva operación
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
    // ------- FIN Función Buscar Producto --------

    // FUNCIÓN QUE NOS PERMITE MODIFICAR LAS CABECERAS DE LOS MODALES DONDE SE MUESTRAN LAS FILAS(OBEJTOS) TRAIDOS DESDE LA API
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
            this.setState({
                cabeceras_modal_select: ['Código', 'Nombre Producto', 'Sucursal', 'Stock', 'Cantidad', 'Precio Producto', 'Unidad Medida', 'Afecto'],
            });
        }
    }
    // ------- FIN --------

    fetchPartidas(){ // FUNCION PARA OBTENER TODOAS LAS PARTIDAS DEL NEGOCIO
        fetch('/api/partidas/partidas')
            .then(res => res.json())
            .then(
                data => {
                    console.log("Obteniendo Partidas: ");
                    console.log(data);
                    this.setState({ listaPartidas: data });
                })
            .catch(err => console.log(err));
    }

    fecthValoresComprobante(){
        console.log("Valor en el estado TIPOCOMPROBANTE:", this.state.tipoComprobante, "BUSCANDO DATOS DE:", this.state.tipoComprobante === "0"? "boleta": this.state.tipoComprobante === "1"? "factura": "nada");
        fetch(
            '/api/comprobante/valores/' + this.state.tipoComprobante.toString()
        )
            .then(res => res.json())
            .then(
                data => {
                    console.log("Datos:", data);
                    this.setState({
                        numSerieComprobante: data[0].valor1,
                        numComprobante: data[0].valor2,
                    });
                }
            )
            .catch(err => console.log(err));
    }

    // MANEJA LA PARTE DE CAMBIO DE MONEDA Y AFECTO(opción que va al momento de agregar un item)
    handleSelectChange(event) {

        this.setState({
            [event.target.name]: event.target.value,
            botonSubmitActivado: this.state.codigoPartidaSeleccionado && this.state.fuenteSeleccionada && this.state.sucursalSeleccionado,
        });

        if(event.target.name === "tipoComprobante"){
            // this.fecthValoresComprobante();

            this.setState({
                tipoComprobante: event.target.value,
            });

            console.log("En HANDLECHANGE: ", this.state.tipoComprobante);
            fetch(
                '/api/comprobante/valores/' + this.state.tipoComprobante.toString()
            )
                .then(res => res.json())
                .then(
                    data => {
                        console.log("Datos:", data);
                        this.setState({
                            numSerieComprobante: data[0].valor1,
                            numComprobante: data[0].valor2,
                        });
                    }
                )
                .catch(err => console.log(err));
        }

        console.log("->", event.target.name, event.target.value);



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
        if (event.target.name == 'tipMoneda') {
            if (event.target.value == 'PEN') {
                this.setState({
                    tipoCambio: ''
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
    // ---- FIN -----

    // MANEJA LOS INPUT TIPO SELECT
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
    // ----------- FIN -----------

    calcularPrecioVenta() {
        if (this.state.sumPrecioVenta == '' || this.state.sumPrecioVenta == 0 || this.state.sumPrecioVenta == null) {
            toast.error('Debe agregar items o una referencia primero', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            return;
        }
        var oldPrecioVenta, nuevoPrecioVenta;

        if (this.state.flagItem == 0) { oldPrecioVenta = this.state.sumPrecioVenta; }
        if (this.state.flagItem == 1) { oldPrecioVenta = this.state.sumPrecioVenta_temp; }

        var descuento = this.state.sumDescTotal;
        var sumaCargos = this.state.sumOtrosCargos;

        console.log('oldprecio  ', oldPrecioVenta);

        if (descuento < 0) {
            toast.error('Ingrese un número positivo para el descuento', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
        }
        if ((descuento == '' && sumaCargos == '') || (descuento == 0 && sumaCargos == 0)) {
            this.setState({
                sumPrecioVenta: this.state.sumPrecioVenta_temp
            });
            return;
        }
        if (descuento != 0 && descuento > 0 && descuento != '' && descuento != null) {
            if (descuento < oldPrecioVenta) {
                nuevoPrecioVenta = oldPrecioVenta - descuento;

                console.log('nuevo precio venta ', oldPrecioVenta);
                console.log('descuento ', descuento)
            }
            else {
                this.setState({
                    sumPrecioVenta: this.state.sumPrecioVenta_temp
                });
                return;
            }
        }
        if (sumaCargos != 0 && sumaCargos > 0 && sumaCargos != '' && sumaCargos != null) {
            nuevoPrecioVenta = oldPrecioVenta + sumaCargos;
        }
        this.setState({
            sumPrecioVenta: nuevoPrecioVenta
        });
        console.log('descuento  ', descuento);
        console.log('cargos  ', sumaCargos)
        console.log('aplicando cambios  ', nuevoPrecioVenta)

    }

    // FUNCIÓN ASOCIADA A BORRAR TODA LA PÁGINA
    clearForm() {
        this.setState({
            movimiento: '', //1 ingreso , 0 egreso
            dua: null, idCliente: null, tipOperacion: null, nombreOperacion: '',
            codMes: '', idPartida: 1, grupoPartida: 1, nombrePartida: null, codOperacionRelacionado: '',
            codSucursal: 1, nombreSucursal: '', tipoComprobante: '0', // 0 boleta, 1 factura, 3 nota credito, 2 pago, 4 otro
            numSerieComprobante: '', numComprobante: '', fecEmision: null, horEmision: '', fecVencimiento: null,
            tipDocUsuario: '', numDocUsuario: '', razSocial: '', desDireccionCliente: '',
            telefonoCliente: '', correoCliente: '', tipMoneda: 'PEN', tipoCambio: '', tipoAfectoItem: '', codPaisCliente: '', codUbigeoCliente: '', flagItem: null,
            detalleGeneral: "", aCreditoDias: 0, codFuente: 1, nombreFuente: '', sumTotTributos: 0,
            sumTotValVenta: 0, sumPrecioVenta: null, sumPrecioVenta_temp: null,
            sumDescTotal: 0, sumOtrosCargos: 0, costVenta: 0, costServicio: 0, utilidad: 0, aCuenta: 0, afecto_servicio: '', modal_buscar: '', valores_item: [], showAddItem: '', data_productos: [], idProducto: '', nombreProducto: '', modal_cantidad: '', modal_medida: '', modal_cod_item: '', modal_descripcion: '',
            modal_afecto: '', modal_precUnitario: '', modal_valUnitario: 0, modal_valVenta: 0,
            modal_igv: 0, modal_isc: 0, modal_sumTributos: 0, modal_precTotal: 0,
            tableContent: '', modalArray: [], cabeceras_modal_select: [],
            contenido_modal_select: [], opcionAdmin: '', nuevoNombreSucursal: '', nuevoProvincia: '', nuevoDepartamento: '', nuevodireccionSucursal: '',
            nuevoDistrito: '', nuevoNombrePartida: '', nuevoGrupoPartida: '', nuevoOtroGrupoPartida: '',
            opciones_nuevo_grupo_partida: [], nuevoNombreFuente: '', nuevoSaldoFuente: 0, nuevoPrecioProducto: '', nuevoStockProducto: '',
            nuevoCostoVenta: '', nuevoNombreProducto: '', nuevoNumDocUsuario: '', nuevoTipDocUsuario: '6',
            nuevoRazSocial: '', nuevoDesDireccionCliente: '', nuevoTelefonoCliente: '',
            nuevoCorreoCliente: '', nuevoCodPaisCliente: '', nuevoCodUbigeoCliente: '', tipoComprobanteNC: '0',
            descMotivoNC: null, codMotivoNC: null, otrotipoComprobanteNC: null, numSerieComprobanteNC: null,
            numComprobanteNC: null, style_item: '', style_servicio: '',
        });
        window.scrollTo(0, 0);
    }
    // ---------- FIN ---------------


    clearUpperForm() {
        this.setState({
            codOperacionRelacionado: '', tipoComprobante: '0', numSerieComprobante: '', numComprobante: '', tipMoneda: 'PEN', aCreditoDias: 0, sumTotTributos: 0, sumTotValVenta: 0,
            sumPrecioVenta: 0, sumPrecioVenta_temp: 0, sumDescTotal: 0, sumOtrosCargos: 0, costVenta: 0, aCuenta: 0,
            modal_buscar: '', idProducto: '', nombreProducto: '', modal_cantidad: '', modal_medida: '', modal_cod_item: '', modal_descripcion: '', modal_afecto: '', modal_precUnitario: '',
            modal_valUnitario: '', modal_valVenta: '', modal_igv: '', modal_isc: '', modal_sumTributos: '', modal_precTotal: '', tableContent: '',
            modalArray: [], cabeceras_modal_select: [], contenido_modal_select: [], tipoAfectoItem: '',
            detalleGeneral: "", flagItem: null, codMotivoNC: null, descMotivoNC: null, tipoComprobanteNC: '0', numSerieComprobanteNC: null, numComprobanteNC: null

        }, this.clearInfoCliente(), this.clearAgregarItemServicio(), window.scrollTo(0, 0));
    }

    /*modal admin*/
    setAdminOption(opcion) {
        this.setState({
            opcionAdmin: opcion
        });
        if (opcion === "Partida") {
            fetch('/api/partidas/grupos')
                .then(res => res.json())
                .then(
                    data => {
                        this.setState({ opciones_nuevo_grupo_partida: data });
                    })
                .catch(err => console.log(err));

        }
    }
    clearModal(option) {
        if (option == 'Sucursal') { this.ref_sucursal.value = ''; }
        if (option == 'Fuente') { this.ref_fuente.value = ''; }
        if (option == 'Partida') { this.ref_partida.value = ''; }
        if (option == 'Operacion') { this.ref_operacion.value = ''; }
        this.setState({ contenido_modal_select: [] });
    }

    clearNuevo(option) {
        if (option == 'Sucursal') {
            this.setState({
                nuevoNombreSucursal: '',
                nuevodireccionSucursal: '',
                nuevoDistrito: '',
                nuevoProvincia: '',
                nuevoDepartamento: ''
            });
            fetch('/api/sucursales/sucursales')
                .then(res => res.json())
                .then(
                    data => {
                        this.setState({ contenido_modal_select: data });
                    })
                .catch(err => console.log(err));

        }
        if (option == 'Partida') {
            this.setState({
                nuevoNombrePartida: '',
                nuevoGrupoPartida: '',
                nuevoOtroGrupoPartida: ''
            });
            fetch('/api/partidas/partidas')
                .then(res => res.json())
                .then(
                    data => {
                        this.setState({ contenido_modal_select: data });
                    })
                .catch(err => console.log(err));

        }
        if (option == 'Fuente') {
            this.setState({
                nuevoNombreFuente: '',
                nuevoSaldoFuente: 0
            });
            fetch('/api/fuentes/fuentes')
                .then(res => res.json())
                .then(
                    data => {
                        this.setState({ contenido_modal_select: data });
                    })
                .catch(err => console.log(err));

        }
        if (option == 'Cliente') {
            this.setState({
                nuevoNumDocUsuario: '',
                nuevoTipDocUsuario: '6',
                nuevoRazSocial: '',
                nuevoDesDireccionCliente: '',
                nuevoTelefonoCliente: '',
                nuevoCorreoCliente: '',
                nuevoCodPaisCliente: '',
                nuevoCodUbigeoCliente: ''
            });
        }
    }

    saveNuevo(option) {
        if (option == 'Sucursal') {
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
                        nombreSucursal: this.state.nuevoNombreSucursal,
                        provincia: this.state.nuevoProvincia,
                        distrito: this.state.nuevoDistrito,
                        departamento: this.state.nuevoDepartamento,
                        direccionSucursal: this.state.nuevodireccionSucursal,
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data) //id que retorno
                        if (data != -1) {
                            toast.success('Nueva sucursal agregada', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                        }
                        if (data == -1) {
                            toast.error('Sucursal actualizada', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                        }
                    })
                    .catch(err => console.log(err));

                //set
                this.ref_sucursal.value = this.state.nuevoNombreSucursal;
                this.buscarPor('buscar_por_sucursal');
                this.loadMultipleSelectValues('agregar_sucursal');
                //clear
                this.setState({
                    nuevoNombreSucursal: '',
                    nuevoProvincia: '',
                    nuevoDepartamento: '',
                    nuevoDistrito: '',
                    nuevodireccionSucursal: '',
                });
            }
        }
        if (option == 'Partida') {
            if (this.state.nuevoNombrePartida === '' || this.state.nuevoGrupoPartida === '') {
                toast.error('Por favor llene todos los campos', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });

            }
            else {
                if (this.state.nuevoGrupoPartida == 'OTRO') {
                    if (this.state.nuevoOtroGrupoPartida == '') {
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
                        console.log(data); //id que retorno
                        toast.success('Nueva partida agregada', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                    })
                    .catch(err => console.log(err));

                //set
                this.ref_partida.value = this.state.nuevoNombrePartida;
                this.buscarPor('buscar_por_partida');
                this.loadMultipleSelectValues('agregar_partida');


                this.setState({
                    nuevoNombrePartida: '',
                    nuevoGrupoPartida: '',
                    nuevoOtroGrupoPartida: ''
                });
            }
        }
        if (option == 'Fuente') {
            if (this.state.nuevoNombreFuente == '' || this.state.nuevoSaldoFuente == '' || this.state.nuevoSaldoFuente == null) {
                toast.error('Por favor llene todos los campos', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                return;
            }
            else {
                //add to bd
                fetch('/api/fuentes/fuentes', {
                    method: 'POST',
                    body: JSON.stringify({
                        fuente: this.state.nuevoNombreFuente,
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

                        if (data != -1) {
                            toast.success('Nueva fuente agregada', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                        }
                        if (data == -1) {
                            toast.success('Fuente actualizada', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                        }
                    })
                    .catch(err => console.log(err));

                //set
                this.ref_fuente.value = this.state.nuevoNombreFuente;
                this.buscarPor('buscar_por_fuente');
                this.loadMultipleSelectValues('agregar_fuente');


                //clear
                this.setState({
                    nuevoNombreFuente: '',
                    nuevoSaldoFuente: 0
                });
            }
        }
        if (option == 'Producto') {
            console.log({
                precio: this.state.nuevoPrecioProducto,
                nombre: this.state.nuevoNombreProducto,
                sucursal: this.state.nuevoSucursalProducto,
                medida: this.state.nuevoUnidadMedidaProducto,
                stock: this.state.nuevoStockProducto,
                costoVenta: this.state.nuevoCostoVenta,
            });

            if (this.state.nuevoPrecioProducto == '' || this.state.nuevoNombreProducto == '' || this.state.nuevoSucursalProducto == '' || this.state.nuevoUnidadMedidaProducto == ''
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
        if (option == 'Cliente') {
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

                        if (data != -1) {
                            toast.success('Nuevo cliente agregado', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                        }
                        if (data == -1) {
                            toast.success('Cliente actualizado', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                        }
                        this.buscarInfoCliente(nuevo);

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
        this.clearNuevo(option);
    }

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
    isIntNumber(n) {
        return /^\d*$/.test(n);
    }
    isFloatNumber(n) {
        return /^[+-]?(?=.)(?:\d+,)*\d*(?:\.\d+)?$/.test(n);
    }
    isNumber(n) {
        console.log('isnumber: ', !isNaN(parseFloat(n)) && isFinite(n));
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    verificarCampos() {
        if (this.state.tipoComprobante == 4 &&
            (this.state.numSerieComprobante == '' ||
                this.state.numComprobante == '' || this.isIntNumber(this.state.numComprobante) == false)) {
            this.setState({ numComprobante: null, numSerieComprobante: null });
        }
        if (this.state.codOperacionRelacionado === '') {
            this.setState({ codOperacionRelacionado: null });
        }
        if (this.state.tipoComprobante != 4 && (this.state.numSerieComprobante == null || this.state.numSerieComprobante == '')) {
            toast.error('Por favor ingrese el número de serie de comprobante', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            window.scrollTo(0, 0); return false;
        }
        //campos obligatorios para boleta y factura
        if (this.state.codSucursal == 1) {
            toast.error('Por favor agregue una sucursal', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });

            window.scrollTo(0, 0); return false;
        }
        if (this.state.codMes == '' || this.state.codMes == 0) {
            toast.error('Por favor ingrese un código de mes válido', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            window.scrollTo(0, 0); return false;
        }
        if (this.state.nombreFuente == '') {
            toast.error('Por favor agregue una fuente', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            window.scrollTo(0, 0); return false;
        }
        if (this.state.nombrePartida == '') {
            toast.error('Por favor agregue una partida', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            window.scrollTo(0, 0); return false;
        }
        if (this.state.tipoComprobante != 4 && (this.state.numComprobante == null || this.state.numComprobante == '' || this.isIntNumber(this.state.numComprobante) == false)) {
            toast.error('Por favor ingrese el número de comprobante', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            window.scrollTo(0, 0); return false;
        }
        if (this.state.fecEmision == null) {
            toast.error('Por favor ingrese una fecha de emisión válida', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            window.scrollTo(0, 0); return false;
        }

        //verificar si agrego servicio o items (obligatorio si es boleta o factura)
        if (this.state.flagItem == null) {
            toast.error('Por favor seleccione referencia, agregue ítems o agréguelos nuevamente', { position: "bottom-right", autoClose: 4000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            return false;
        }
        //1 item, 0 servicio
        if (this.state.flagItem == 0) {
            if (this.state.detalleGeneral == null || this.state.detalleGeneral === "") {
                toast.error('Por favor agregue el detalle general', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                return false;
            }
        }
        //verificar totales
        if (this.state.sumDescTotal != null) {
            if (this.isNumber(this.state.sumDescTotal) == false) {
                toast.error('Por favor ingrese un monto válido para el total de descuento', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                return false;
            }
        }
        if (this.state.sumOtrosCargos != null) {
            if (this.isNumber(this.state.sumOtrosCargos) == false) {
                toast.error('Por favor ingrese un monto válido de sumatoria de otros cargos', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                return false;
            }
        }
        if (this.state.aCuenta != null) {
            if (this.isNumber(this.state.aCuenta) == false) {
                toast.error('Por favor ingrese un monto a cuenta válido', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                return false;
            }
        }
        // if (this.state.aCuenta > this.state.sumPrecioVenta) { alert('El total a cuenta no puede ser mayor que el precio total'); return; }
    }
    verificarCamposNotaCredito() {
        if (this.state.numSerieComprobante == '' ||
            this.state.numComprobante == '' || this.isIntNumber(this.state.numComprobante) == false) {
            this.setState({ numComprobante: null, numSerieComprobante: null });
        }
        if (this.state.codOperacionRelacionado === '') {
            this.setState({ codOperacionRelacionado: null });
        }
        //campos obligatorios
        if (this.state.codMotivoNC == null) {
            toast.error('Por favor ingrese el código de motivo', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            return false;
        }
        if (this.state.descMotivoNC == null) {
            toast.error('Por favor ingrese la descripción de motivo', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            return false;
        }
        if (this.state.tipoComprobanteNC == null || this.state.tipoComprobanteNC == '') {
            toast.error('Por favor ingrese el tipo de comprobante relacionado a la nota de crédito', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            return false;
        }
        if (this.state.tipoComprobanteNC == 2 || this.state.tipoComprobanteNC == 'Otro') {
            if (this.state.otrotipoComprobanteNC == '' || this.state.otrotipoComprobanteNC == null) {
                toast.error('Por favor ingrese el detalle del tipo de comprobante relacionado a la nota de crédito', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                return false;
            }
        }
        if (this.state.numSerieComprobanteNC == null) {
            toast.error('Por favor ingrese el número de serie del comprobante relacionado', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            return false;
        }
        if (this.state.numComprobanteNC == null || this.state.numComprobanteNC == '' || this.isIntNumber(this.state.numComprobanteNC) == false) {
            toast.error('Por favor ingrese el número del comprobante relacionado', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            return false;
        }

        //total
        if (this.state.sumDescTotal != '') {
            if (this.isNumber(this.state.sumDescTotal) == false) {
                toast.error('Por favor ingrese un monto válido para el total de descuento', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                return false;
            }
        }
        if (this.state.sumOtrosCargos != '') {
            if (this.isNumber(this.state.sumOtrosCargos) == false) {
                toast.error('Por favor ingrese un monto válido para la sumatoria de otros cargos', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                return false;
            }
        }
        if (this.state.aCuenta != '') {
            if (this.isNumber(this.state.aCuenta) == false) {
                toast.error('Por favor ingrese un monto a cuenta válido', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                return false;
            }
        }


    }
    verificarCamposPago() {
        if (this.state.numSerieComprobante == '' || this.state.numComprobante == '' || this.isIntNumber(this.state.numComprobante) == false) {
            this.setState({ numComprobante: null, numSerieComprobante: null });
        }
        //obligatorio
        if (this.state.codOperacionRelacionado === '' || this.state.codOperacionRelacionado == null) {
            toast.error('Por favor ingrese un código de operación relacionado', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            window.scrollTo(0, 0);
            return false;
        }
        if (this.state.detalleGeneral === null || this.state.detalleGeneral === "") {
            toast.error('Por favor ingrese un detalle general', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            return false;
        }
        if (this.state.sumDescTotal != null) {
            if (this.isNumber(this.state.sumDescTotal) == false) {
                toast.error('Por favor ingrese un monto válido de total de descuento', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                return false;
            }
        }
        if (this.state.sumOtrosCargos != '') {
            if (this.isNumber(this.state.sumOtrosCargos) == false) {
                toast.error('Por favor ingrese un monto válido de sumatoria de otros cargos', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                return false;
            }
        }
        if (this.state.aCuenta != '') {
            if (this.isNumber(this.state.aCuenta) == false) {
                toast.error('Por favor ingrese un monto a cuenta válido', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                return false;
            }
        }
    }
    handleSubmit() {
        var sumDescTotal, sumOtrosCargos, sumPrecioVenta, isEditable, detalle, cambio, aCuenta = this.state.aCuenta;
        sumDescTotal = this.state.sumDescTotal;
        sumOtrosCargos = this.state.sumOtrosCargos;
        if (this.state.codOperacionRelacionado === '') {
            this.setState({ codOperacionRelacionado: null });
        }
        if (this.state.tipoComprobante == '' || this.state.tipoComprobante == null) {
            toast.error('Por favor seleccione el tipo de comprobante', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            window.scrollTo(0, 0); return;
        }

        if (this.state.tipoComprobante == 0 || this.state.tipoComprobante == 1 || this.state.tipoComprobante == 4) {
            if (this.verificarCampos() == false) { return; }
            else {
                if (this.state.modalArray.length == 0) { isEditable = 1; } //vacio
                if (this.state.modalArray.length > 0) { isEditable = 0; } //lleno 
                detalle = this.state.detalleGeneral;
            }
        }
        //nota de credito
        if (this.state.tipoComprobante == 3) {
            if (this.verificarCamposNotaCredito() == false) { return; }
            else { isEditable = 0; detalle = null; }
        }
        //pago
        if (this.state.tipoComprobante == 2) {
            if (this.verificarCamposPago() == false) { return; }
            else {
                isEditable = 0;
            }
        }
        if (this.state.tipMoneda == 'USD') {
            if (this.state.tipoCambio == '' || this.state.tipoCambio == 0 || this.isNumber(this.state.tipoCambio) == false) {
                toast.error('Por favor ingrese un tipo de cambio válido', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
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
        sumPrecioVenta = Number(this.state.sumPrecioVenta) - Number(sumDescTotal) + Number(sumOtrosCargos);
        this.setState({ enabledButton: false })
        // condicion con respecto al nombre de partida
        // ---------------------------------------------
        fetch('/api/ingresos/ingresos', {
            method: 'POST',
            body: JSON.stringify({
                ingreso: true,
                movimiento: this.state.movimiento,
                editable: isEditable,
                estado: 1, //vigente por defecto
                codMes: this.state.codMes,
                codSucursal: this.state.codSucursal,
                tipOperacion: this.state.tipOperacion,
                codFuente: this.state.codFuente,
                idPartida: this.state.idPartida,
                horEmision: this.state.horEmision,
                fecEmision: this.state.fecEmision,
                codOperacion: this.state.codOperacionRelacionado === '' ? null : this.state.codOperacionRelacionado,
                fecVencimiento: this.state.fecVencimiento, //cambiar
                tipoComprobante: this.state.tipoComprobante,
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
                    this.clearUpperForm();
                }
                else {
                    toast.error('Porfavor ingrese un número de comprobante diferente', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                }
            })
            .then(data => { this.setState({ enabledButton: true }) })
            .catch(err => console.log(err));
        event.preventDefault();
    }
    /* render functions */
    renderInformacionGeneral() {
        return (
            <InformacionGeneral
                movimiento={this.movimiento}
                loadMultipleSelectValues={this.loadMultipleSelectValues}
                handleInputChange={this.handleInputChange}
                handleSelectChange={this.handleSelectChange}

                codSucursal={this.state.codSucursal}
                nombreSucursal={this.state.nombreSucursal}
                tipOperacion={this.state.tipOperacion}
                nombreOperacion={this.state.nombreOperacion}
                codMes={this.state.codMes}
                nombreFuente={this.state.nombreFuente}
                idPartida={this.state.idPartida}
                grupoPartida={this.state.grupoPartida}
                nombrePartida={this.state.nombrePartida}
                codOperacionRelacionado={this.state.codOperacionRelacionado}
                tipoComprobante={this.state.tipoComprobante}
                numSerieComprobante={this.state.numSerieComprobante}
                numComprobante={this.state.numComprobante}
                fecEmision={this.state.fecEmision}
                horEmision={this.state.horEmision}

            />
        )
    }
    renderDatosCliente() {
        return (
            <DatosCliente
                handleInputChange={this.handleInputChange}
                handleSelectChange={this.handleSelectChange}
                buscarInfoCliente={this.buscarInfoCliente}
                clearInfoCliente={this.clearInfoCliente}
                setAdminOption={this.setAdminOption}

                movimiento={this.state.movimiento}
                tipoComprobante={this.state.tipoComprobante}
                numDocUsuario={this.state.numDocUsuario}
                tipDocUsuario={this.state.tipDocUsuario}
                razSocial={this.state.razSocial}
                desDireccionCliente={this.state.desDireccionCliente}
                correoCliente={this.state.correoCliente}
                telefonoCliente={this.state.telefonoCliente}
                codPaisCliente={this.state.codPaisCliente}
                codUbigeoCliente={this.state.codUbigeoCliente}

                movimiento={this.state.movimiento}
                dua={this.state.dua}
                aCreditoDias={this.state.aCreditoDias}
                fecVencimiento={this.state.fecVencimiento}
                tipMoneda={this.state.tipMoneda}
                tipoCambio={this.state.tipoCambio}
            />
        )
    }
    renderNotaCredito() {
        return (
            <NotaCredito
                handleInputChange={this.handleInputChange}
                handleSelectChange={this.handleSelectChange}

                tipoComprobante={this.state.tipoComprobante}
                tipoComprobanteNC={this.state.tipoComprobanteNC}
                codMotivoNC={this.state.codMotivoNC}
                descMotivoNC={this.state.descMotivoNC}
                otrotipoComprobanteNC={this.state.otrotipoComprobanteNC}
            />
        )
    }
    renderAgregarItemsServicio() {
        return (
            <AgregarItemsServicio
                selectShowAddItem={this.selectShowAddItem}
                handleInputChange={this.handleInputChange}
                handleSelectChange={this.handleSelectChange}
                loadMultipleSelectValues={this.loadMultipleSelectValues}
                setAdminOption={this.setAdminOption}
                CloseItemModal={this.CloseItemModal}
                searchProducto={this.searchProducto}
                getFilaProducto={this.getFilaProducto}
                removeItem={this.removeItem}


                flagItem={this.state.flagItem}
                tipoComprobante={this.state.tipoComprobante}
                style_servicio={this.state.style_servicio}
                style_item={this.state.style_item}
                showAddItem={this.state.showAddItem}
                detalleGeneral={this.state.detalleGeneral}
                cabeceras_modal_select={this.state.cabeceras_modal_select}
                contenido_modal_select={this.state.contenido_modal_select}
                modalArray={this.state.modalArray}
                modal_buscar={this.state.modal_buscar}
                sumPrecioVenta={this.state.sumPrecioVenta}

                sucursales={this.state.lista_sucursales}

                ref_buscar_item={node => this.ref_buscar_item = node}
                ref_precio_item={node => this.ref_precio_item = node}
                ref_cantidad_item={node => this.ref_cantidad_item = node}
                ref_medida_item={node => this.ref_medida_item = node}
                ref_afecto_item={node => this.ref_afecto_item = node}
            />
        )
    }
    renderTotales() {
        return (
            <Totales
                handleInputChange={this.handleInputChange}
                calcularPrecioVenta={this.calcularPrecioVenta}

                tipMoneda={this.state.tipMoneda}
                tipoComprobante={this.state.tipoComprobante}
                flagItem={this.state.flagItem}
                sumTotTributos={this.state.sumTotTributos}
                sumTotValVenta={this.state.sumTotValVenta}
                sumPrecioVenta={this.state.sumPrecioVenta}
                sumDescTotal={this.state.sumDescTotal}
                sumOtrosCargos={this.state.sumOtrosCargos}
                costVenta={this.state.costVenta}
                costServicio={this.state.costServicio}
                utilidad={this.state.utilidad}
                aCuenta={this.state.aCuenta}
            />
        )
    }
    renderTipoMovimiento() {
        return (
            <div id="tipoMovimiento">
                <div className="row text-right mt-n1">
                    <div className="col-7 ml-4">
                        <h4 className="form-text text-primary">
                            Tipo de Movimiento
                        </h4>
                    </div>
                    <div className="col-4 ml-2">
                        <select
                            className="form-control form-control-lg mt-n2 title-select"
                            name="movimiento"
                            onChange={this.handleSelectChange}
                            value={this.state.movimiento}>
                            <option value="" disabled="disabled">
                                Tipo de movimiento
                            </option>
                            <option value="1">
                                Ingreso
                            </option>
                            <option value="0">
                                Egreso
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div className="container-fluid bg-white">
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
                <div className="body-nuevo-ingreso">
                    {this.renderTipoMovimiento()}
                    {this.state.movimiento !== '' && <div>
                        {this.renderInformacionGeneral()}
                        <hr />
                        {this.renderDatosCliente()}
                        <hr />
                        {this.renderAgregarItemsServicio()}
                        {this.renderNotaCredito()}
                        <hr />
                        {this.renderTotales()}
                        <br />
                        <div className="text-center mb-5">
                            <button
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="Limpiar formulario"
                                type="button"
                                className="btn btn-outline-danger btn-lg mr-2"
                                onClick={this.clearForm.bind(this)}>
                                <i className="fas fa-trash-alt"></i>
                            </button>
                            {(this.state.enabledButton && this.state.movimiento === "1") &&
                                <button type="button"
                                    className="btn btn-primary btn-lg ml-2"
                                    data-backdrop="static"
                                    data-keyboard="false"
                                    data-toggle="modal"
                                    data-target="#modal_ver_ticket"
                                    disabled={!this.state.botonSubmitActivado}
                                    onClick={this.handleSubmit.bind(this)}>
                                    Guardar
                            </button>
                            }

                            {(this.state.enabledButton && this.state.movimiento === "0") && (
                                <button type="button"
                                        className="btn btn-primary btn-lg ml-2"
                                        onClick={this.handleSubmit.bind(this)}>
                                    Guardar
                                </button>
                            )}
                        </div>
                        {this.renderModales()}
                    </div>}
                </div>
            </div>
        )
    }
    renderModales() {
        return (
            <Modales
                buscarPor={this.buscarPor}
                setAdminOption={this.setAdminOption}
                clearModal={this.clearModal}
                getFilaSucursal={this.getFilaSucursal}
                getFilaFuente={this.getFilaFuente}
                getFilaOperacion={this.getFilaOperacion}
                getFilaPartida={this.getFilaPartida}
                clearNuevo={this.clearNuevo}
                saveNuevo={this.saveNuevo}
                handleInputChange={this.handleInputChange}
                handleSelectChange={this.handleSelectChange}

                opcionAdmin={this.state.opcionAdmin}
                cabeceras_modal_select={this.state.cabeceras_modal_select}
                contenido_modal_select={this.state.contenido_modal_select}
                nuevoNombreSucursal={this.state.nuevoNombreSucursal}
                nuevodireccionSucursal={this.state.nuevodireccionSucursal}
                nuevoDistrito={this.state.nuevoDistrito}
                nuevoProvincia={this.state.nuevoProvincia}
                nuevoDepartamento={this.state.nuevoDepartamento}

                nuevoNombrePartida={this.state.nuevoNombrePartida}
                nuevoGrupoPartida={this.state.nuevoGrupoPartida}
                nuevoOtroGrupoPartida={this.state.nuevoOtroGrupoPartida}
                opciones_nuevo_grupo_partida={this.state.opciones_nuevo_grupo_partida}

                nuevoNombreFuente={this.state.nuevoNombreFuente}
                nuevoSaldoFuente={this.state.nuevoSaldoFuente}

                nuevoNombreProducto={this.state.nuevoNombreProducto}
                nuevoPrecioProducto={this.state.nuevoPrecioProducto}
                nuevoStockProducto={this.state.nuevoStockProducto}
                nuevoCostoVenta={this.state.nuevoCostoVenta}
                sucursales={this.state.lista_sucursales}
                nuevoSerieProducto={this.state.nuevoSerieProducto}
                nuevoIdPartida={this.state.nuevoIdPartida}
                nuevaFechaVencimiento={this.state.nuevaFechaVencimiento}
                listaPartidas={this.state.listaPartidas}

                nuevoTipDocUsuario={this.state.nuevoTipDocUsuario}
                nuevoNumDocUsuario={this.state.nuevoNumDocUsuario}
                nuevoRazSocial={this.state.nuevoRazSocial}
                nuevoDesDireccionCliente={this.state.nuevoDesDireccionCliente}
                nuevoTelefonoCliente={this.state.nuevoTelefonoCliente}
                nuevoCorreoCliente={this.state.nuevoCorreoCliente}
                nuevoCodPaisCliente={this.state.nuevoCodPaisCliente}
                nuevoCodUbigeoCliente={this.state.nuevoCodUbigeoCliente}

                ref_sucursal={node => this.ref_sucursal = node}
                ref_fuente={node => this.ref_fuente = node}
                ref_operacion={node => this.ref_operacion = node}
                ref_partida={node => this.ref_partida = node}

                nuevoSucursalProductoPadre={this.state.nuevoSucursalProducto}
                nuevoUnidadMedidaProductoPadre={opciones_tipo_medida[0].codUnidadMedida}
                opcMedida={opciones_tipo_medida}

                listaItems={this.state.modalArray}
                totalValorComVent={this.state.sumTotValVenta}
                totalSumTributos={this.state.sumTotTributos}
                totalDescuentos={this.state.sumDescTotal}
                totalOtrosCargos={this.state.sumOtrosCargos}
                totalVenta={this.state.sumPrecioVenta}
                detalleGeneral={this.state.detalleGeneral}
                numDocumentoCliente={this.state.numDocUsuario}
                razonSocialCliente={this.state.razSocial}
                direccionCliente={this.state.desDireccionCliente}

            />
        )
    }
}

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

export default NuevaOperacion;
