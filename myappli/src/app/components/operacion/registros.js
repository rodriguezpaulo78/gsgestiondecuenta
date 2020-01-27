import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import SingleInput from '../common/singleInput';
import matchSorter from 'match-sorter';
import FileSaver from 'file-saver';

import './tablaEstilo.css';

class Registros extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: -1, // FILA SELECCIONADA

      movimiento: "2",
      registroEditable: 0, //cambiar 
      registros: [],
      pagos: [],
      contenido_array_ver: [],
      contenido_modal_select: [],
      modalArray: [],
      fechaInicio: new Date().getFullYear() + "-" + (new Date().getMonth() + 1 < 10? '0' + (new Date().getMonth() + 1): new Date().getMonth() + 1) + "-" + (new Date().getDate() < 10? '0' + new Date().getDate(): new Date().getDate()),
      fechaFin: new Date().getFullYear() + "-" + (new Date().getMonth() + 1 < 10? '0' + (new Date().getMonth() + 1): new Date().getMonth() + 1) + "-" + (new Date().getDate() < 10? '0' + new Date().getDate(): new Date().getDate()),
      adminOption: '',
      eliminarOption: '',
      idOption: '',
      opciones_tipo_afecto: [
        { tipoAfecto: 0, nombre: 'Gravado' },
        { tipoAfecto: 1, nombre: 'Exonerado' },
        { tipoAfecto: 2, nombre: 'Inafecto' },
        { tipoAfecto: 3, nombre: 'Exportación' }
      ],
      opciones_tipo_medida: [
        { codUnidadMedida: "NIU", nombre: 'Unidad (Bienes)' },
        { codUnidadMedida: "4A", nombre: 'Bobinas' }, { codUnidadMedida: "BJ", nombre: 'Balde' },
        { codUnidadMedida: "BLL", nombre: 'Barriles' }, { codUnidadMedida: "BG", nombre: 'Bolsa' },
        { codUnidadMedida: "BO", nombre: 'Botellas' }, { codUnidadMedida: "BX", nombre: 'Caja' },
        { codUnidadMedida: "CT", nombre: 'Cartones' }, { codUnidadMedida: "CMK", nombre: 'Centimetro Cuadrado' },
        { codUnidadMedida: "CMQ", nombre: 'Centimetro Cubico' }, { codUnidadMedida: "CMT", nombre: 'Centimetro Lineal' },
        { codUnidadMedida: "CEN", nombre: 'Ciento de Unidades' }, { codUnidadMedida: "CY", nombre: 'Cilindro' },
        { codUnidadMedida: "CJ", nombre: 'Conos' }, { codUnidadMedida: "DZN", nombre: 'Docena' },
        { codUnidadMedida: "DZP", nombre: 'Docena por 10**6' }, { codUnidadMedida: "BE", nombre: 'Fardo' },
        { codUnidadMedida: "GLI", nombre: 'Galon Inglés (4,545956L)' }, { codUnidadMedida: "GRM", nombre: 'Gramo' },
        { codUnidadMedida: "GRO", nombre: 'Gruesa' }, { codUnidadMedida: "HLT", nombre: 'Hectolitro' },
        { codUnidadMedida: "LEF", nombre: 'Hoja' }, { codUnidadMedida: "SET", nombre: 'Juego' },
        { codUnidadMedida: "KGM", nombre: 'Kilogramo' }, { codUnidadMedida: "KTM", nombre: 'Kilometro' },
        { codUnidadMedida: "KWH", nombre: 'Kilovatio Hora' }, { codUnidadMedida: "KT", nombre: 'Kit' },
        { codUnidadMedida: "CA", nombre: 'Latas' }, { codUnidadMedida: "LBR", nombre: 'Libras' },
        { codUnidadMedida: "LTR", nombre: 'Litro' }, { codUnidadMedida: "MWH", nombre: 'Megawatt Hora' },
        { codUnidadMedida: "MTR", nombre: 'Metro' }, { codUnidadMedida: "MTK", nombre: 'Metro Cuadrado' },
        { codUnidadMedida: "MTQ", nombre: 'Metro Cúbico' }, { codUnidadMedida: "MGM", nombre: 'Miligramos' },
        { codUnidadMedida: "MLT", nombre: 'Mililitro' }, { codUnidadMedida: "MMT", nombre: 'Milimetro' },
        { codUnidadMedida: "MMK", nombre: 'Milimetro Cuadrado' }, { codUnidadMedida: "MMQ", nombre: 'Milimetro Cúbico' },
        { codUnidadMedida: "MLL", nombre: 'Millares' }, { codUnidadMedida: "UM", nombre: 'Millón de Unidades' },
        { codUnidadMedida: "ONZ", nombre: 'Onzas' }, { codUnidadMedida: "PF", nombre: 'Paletas' },
        { codUnidadMedida: "PK", nombre: 'Paquete' }, { codUnidadMedida: "PR", nombre: 'Par' },
        { codUnidadMedida: "FOT", nombre: 'Pies' }, { codUnidadMedida: "FTK", nombre: 'Pies Cuadrados' },
        { codUnidadMedida: "FTQ", nombre: 'Pies Cúbicos' }, { codUnidadMedida: "C62", nombre: 'Piezas' },
        { codUnidadMedida: "PG", nombre: 'Placas' }, { codUnidadMedida: "ST", nombre: 'Pliego' },
        { codUnidadMedida: "INH", nombre: 'Pulgadas' }, { codUnidadMedida: "RM", nombre: 'Resma' },
        { codUnidadMedida: "DR", nombre: 'Tambor' }, { codUnidadMedida: "STN", nombre: 'Tonelada Corta' },
        { codUnidadMedida: "LTN", nombre: 'Tonelada Larga' }, { codUnidadMedida: "TNE", nombre: 'Toneladas' },
        { codUnidadMedida: "TU", nombre: 'Tubos' },
        { codUnidadMedida: "ZZ", nombre: 'Unidad (Servicios)' }, { codUnidadMedida: "GLL", nombre: 'US Galón (3.7843 L)' },
        { codUnidadMedida: "YRD", nombre: 'Yarda' }, { codUnidadMedida: "YDK", nombre: 'Yarda Cuadrada' },
      ],
      modal_buscar_modificar: '',
      tipEstado: {
        "0": "Anulado",
        "1": "Vigente",
      },
      estadoOption: null,
      sumPrecioVenta_mostrar: 0,
      sumPrecioMostrar: 0,

      ReferenciacostVenta: 0,
      costVentaModificado: false,
    };
    this.refresh = this.refresh.bind(this);
    this.searchFecha = this.searchFecha.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.setAdminOption = this.setAdminOption.bind(this);
    this.setEliminarOption = this.setEliminarOption.bind(this);
    this.anularComprobante = this.anularComprobante.bind(this);
    this.eliminarIngreso = this.eliminarIngreso.bind(this);

    this.calcularValores = this.calcularValores.bind(this);
    this.getFilaProducto = this.getFilaProducto.bind(this);
    this.searchProducto = this.searchProducto.bind(this);

    this.removeItem = this.removeItem.bind(this);
    this.saveItems = this.saveItems.bind(this);

    this.setPagos = this.setPagos.bind(this);
    this.eraseCeros = this.eraseCeros.bind(this);

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.modificarCostVenta = this.modificarCostVenta.bind(this);

    this.isNumber = this.isNumber.bind(this);
    this.isFloatNumber = this.isFloatNumber.bind(this);
    this.isIntNumber = this.isIntNumber.bind(this);

    this.updateTotals = this.updateTotals.bind(this);

    this.manualFilter = this.manualFilter.bind(this);
    this.isNumeric = this.isNumeric.bind(this);

    this.handleModificado = this.handleModificado.bind(this);

  }
  clearTotalesEditarItems() {
    this.setState({
      sumPrecioVenta_mostrar: 0,
      sumPrecioMostrar: 0
    })
  }
  modificarCostVenta(fila, idIngreso, idDetalle, val_id) {
    var val = document.getElementById(fila).value;
    if (val == '' || (this.isNumber(val) == false)) { alert('Ingrese un costo de venta válido'); return; }
    else {
      fetch('/api/inventarios/inventarios/' + idDetalle + '/' + idIngreso + '/' + val, {
        method: 'PUT',
        body: JSON.stringify({
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          // toast.success('Actualizado', { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
          alert('Actualizado');
          this.refresh();
          console.log(val_id)
          //refresh current modal
          var id = '/api/detalles/detalles/' + val_id;
          fetch(id)
            .then(res => res.json())
            .then(
              data => {
                this.setState({ contenido_array_ver: data });
                document.getElementById(fila).value = ''
              });
        })
        .catch(err => console.log(err));
    }
    console.log(val);
  }
  handleSelectChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(event.target.name, event.target.value);
  }

  refresh() { // 1 ingresos 0 egresos
    console.log('refreshing');
    console.log('/api/ingresos/ingresos/' + this.state.fechaInicio + '/' + this.state.fechaFin + '/' + this.state.movimiento);
    fetch('/api/ingresos/ingresos/' + this.state.fechaInicio + '/' + this.state.fechaFin + '/' + this.state.movimiento)
      .then(res => res.json())
      .then(
        data => {
          console.log("INGRESOS/INGRESOS");
          console.log(data);
          if (data.length == 0) {
            //toast.error('No hay registros en ese rango de fechas', { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            alert('No hay registros en ese rango de fechas');
          }
          else {
            this.setState({ registros: data.map(e => {
                e.fecEmision = 
                (new Date(e.fecEmision).getDate() < 10? "0" + new Date(e.fecEmision).getDate():new Date(e.fecEmision).getDate()) + "/" + 
                (new Date(e.fecEmision).getMonth() +1 < 10? "0" + (new Date(e.fecEmision).getMonth()+1):new Date(e.fecEmision).getMonth()+1) + "/" 
                + new Date(e.fecEmision).getFullYear();
                return e;
              }) });
              //Error solucionado, este debe ser el formato para mostrar una fecha en el sistema , antes solo mostraba 00 en vez de 01
          }
          console.log('Done');
        })
      .catch(err => console.log(err));
  }
  componentDidMount() {
    //this.refresh();
  }
  setEliminarOption(val_id, opcion) {
    this.setState({
      eliminarOption: opcion,
      idOption: val_id
    });
  }
  anularComprobante(id) {
    fetch('/api/ingresos/ingresos/' + id + '/' + 'estado/0', {
      method: 'PUT',
      body: JSON.stringify({
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data); //id que retorno
        //toast.success('Anulado', { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
        alert('Anulado');
        this.refresh();
      })
      .catch(err => console.log(err));
  }
  eliminarIngreso(id) {
    fetch('/api/ingresos/ingresos/' + id, {
      method: 'DELETE',
      body: JSON.stringify({
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data); //id que retorno
        // toast.success('Eliminado', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
        alert('Eliminado');
        this.refresh();
      })
      .catch(err => console.log(err));
  }
  setAdminOption(val_id, opcion, precio_venta, estado) {
    this.setState({
      adminOption: opcion,
      idOption: val_id,
      sumPrecioVenta_mostrar: precio_venta,
      estadoOption: estado
    });

    if (opcion == 'Ver') {
      var id = '/api/detalles/detalles/' + val_id;
      fetch(id)
        .then(res => res.json())
        .then(
          data => {
            this.setState({ contenido_array_ver: data });
            console.log('array ver', this.state.contenido_array_ver)
          })
        .catch(err => console.log(err));

    }
    if (opcion == 'Modificar') {
      var id = '/api/detalles/detalles/referencia/' + val_id;
      fetch(id)
          .then(res => res.json())
          .then(
              data => {
                console.log("Datos devueltos");
                this.setState({modalArray: [], ReferenciacostVenta: data[0].costVenta,costVentaModificado:false});
                console.log(this.state.ReferenciacostVenta);
                })
          .catch(err => console.log(err));
    }

    /*
    if (opcion == 'Modificar') {
      var id = '/api/detalles/detalles/' + val_id;
      fetch(id)
        .then(res => res.json())
        .then(
          data => {
            this.setState({ modalArray: data });
          })
        .catch(err => console.log(err));

    }
     */
  }

  handleModificado(e){
    console.log("Modificando el contenido de costo de venta");
    this.setState({
      costVentaModificado: true,
      ReferenciacostVenta: e.target.value
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    console.log(name, value);
  }

  searchFecha() {
    if (this.state.fechaFin == '' && this.state.fechaInicio == '') {
      //  toast.error('Igrese un rango válido', { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
      alert('Ingrese un rango válido');
      return;
    }
    else {
      /* if (this.state.movimiento == '') {
       alert('Mostrando registros de ingresos y egresos') //mas condiciones
     }*/
      //alert('ok');
      console.log(this.state.fechaInicio, this.state.fechaFin);
      this.refresh();
      /*this.setState({
        fechaInicio: '',
        fechaFin: ''
      });*/
    }
  }
  searchProducto() {
    var val = this.state.modal_buscar_modificar; //.replace(/^\s*/, '').replace(/\s*$/, '');
    if (val == undefined) {
      return;
    }
    else {
      if (val == '' || this.state.modal_buscar_modificar == null) {
        // toast.warning('Ingrese un texto a buscar válido o escriba un * para mostrar todos', { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
        alert('Ingrese un texto a buscar válido o escriba un * para mostrar todos');
        this.setState({
          modal_buscar_modificar: ''
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
      if (val != '*' && val.length < 3) {
        //toast.warning('Ingrese al menos tres letras del producto a buscar', { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
        alert('Ingrese al menos tres letras del producto a buscar');
        return;
      }
      if (val.length >= 3) {
        // var userText = this.state.modal_buscar_modificar.replace(/\s/g, ''); //erase spaces
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
  updateTotals() {
    var val_precio_total = 0

    this.state.modalArray.map((value, i) => {
      val_precio_total = Number(val_precio_total) +
        //value.mtoVentaTotal 
        Number(this[`ref_precio_total_item_modificar_${i}`].value)
      console.log('val mto', Number(this[`ref_precio_total_item_modificar_${i}`].value))

      // (Number(this[`ref_precio_total_item_modificar_${i}`].value) == '' ||
      //  Number(this[`ref_precio_total_item_modificar_${i}`].value) == undefined) ?
      // value.mtoVentaTotal :
      // Number(this[`ref_precio_total_item_modificar_${i}`].value)
    })
    this.setState({
      sumPrecioMostrar: Number(val_precio_total).toFixed(2)
    })
  }
  calcularValores(i) {
    this.setState({ sumPrecioMostrar: 0 });
    console.log('Calculando ', i);
    var val_precio = this[`ref_precio_item_modificar_${i}`].value;
    var val_cantidad = this[`ref_cantidad_item_modificar_${i}`].value;
    var val_afecto = document.getElementById('fila_afecto_' + i).value;

    if (this[`ref_valor_unitario_item_modificar_${i}`].value == '' ||
      this[`ref_valor_unitario_item_modificar_${i}`].value == null ||
      this[`ref_valor_unitario_item_modificar_${i}`].value == undefined) {
      alert('Debe ingresar un nuevo valor unitario.'); return;
    }
    var val_unitario = this[`ref_valor_unitario_item_modificar_${i}`].value;

    var val_costo_venta = this[`ref_costo_venta_item_modificar_${i}`].value;
    //var val_descuento = this[`ref_descuento_item_modificar_${i}`].value;

    //var val_costo_venta = 0; 
    var val_descuento = 0;

    if (this[`ref_valor_venta_item_modificar_${i}`].value != '') { this[`ref_valor_venta_item_modificar_${i}`].value = ''; }
    if (this[`ref_igv_item_modificar_${i}`].value != '') { this[`ref_igv_item_modificar_${i}`].value = ''; }
    if (this[`ref_isc_item_modificar_${i}`].value != '') { this[`ref_isc_item_modificar_${i}`].value = ''; }
    if (this[`ref_sum_tributos_item_modificar_${i}`].value != '') { this[`ref_sum_tributos_item_modificar_${i}`].value = ''; }
    if (this[`ref_precio_total_item_modificar_${i}`].value != '') { this[`ref_precio_total_item_modificar_${i}`].value = ''; }

    console.log(val_precio); console.log(val_cantidad); console.log(val_afecto);

    //
    var val_igv;
    var val_isc;
    var val_sum_tributos;
    var val_precio_total;
    var val_venta;

    if (val_afecto == 0) {
      val_igv = Math.round(val_unitario * 0.18 * 100) / 100;
      val_isc = 0;
    }
    if (val_afecto == 1) { val_igv = 0; val_isc = 0; }
    if (val_afecto == 2) { val_igv = 0; val_isc = 0; }
    if (val_afecto == 3) { val_igv = 0; val_isc = 0; }
    /* item x cantidad */
    val_igv = val_igv * val_cantidad;
    val_isc = val_isc * val_cantidad;
    //
    val_sum_tributos = val_igv + val_isc;
    val_venta = val_unitario * val_cantidad;
    val_venta = Math.round(val_venta * 100) / 100;
    val_precio_total = val_unitario * val_cantidad + val_sum_tributos;
    val_precio_total = Math.round(val_precio_total * 100) / 100;

    val_precio_total = val_precio_total - val_descuento;

    console.log('sum trib ', val_sum_tributos); console.log('venta ', val_venta);
    console.log('precio tot ', val_precio_total); console.log('igv ', val_igv); console.log('isc ', val_isc);
    //

    this[`ref_valor_venta_item_modificar_${i}`].value = val_venta;
    this[`ref_igv_item_modificar_${i}`].value = val_igv;
    this[`ref_isc_item_modificar_${i}`].value = val_isc;
    this[`ref_sum_tributos_item_modificar_${i}`].value = val_sum_tributos;
    this[`ref_precio_total_item_modificar_${i}`].value = val_precio_total;

    this.updateTotals()
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
  getFilaProducto(cod, nombre, precio, cantidad, afecto, medida, costo_venta) {
    var val_precio = document.getElementById(precio).value;
    var val_cantidad = document.getElementById(cantidad).value;
    var val_afecto = document.getElementById(afecto).value;
    var val_medida = document.getElementById(medida).value;

    console.log('cos: ', costo_venta);
    var val_costo_venta = costo_venta;
    //
    if (this.isIntNumber(val_precio == false) || this.isFloatNumber(val_precio == false)) {
      // toast.error('Ingrese cantidades válidas', { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
      alert('Ingrese cantidades válidas');
      return;
    }
    if (val_cantidad < 0 || this.isIntNumber(val_cantidad) == false) {
      // toast.error('Ingrese una cantidad válida', { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
      alert('Ingrese una cantidad válida');
      return;
    }
    if (val_precio == '' || val_cantidad == '' || val_afecto == '' || val_medida == '') {
      // toast.error('Llene todos los campos del producto a agregar', { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
      alert('Llene todos los campos del producto a agregar');
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
        ctdUnidadItem: val_cantidad,
        codUnidadMedida: val_medida,
        idProducto: cod,
        desItem: nombre,
        tipoAfecto: val_afecto,
        mtoPrecioUnitario: Number(val_precio).toFixed(2),
        mtoValorUnitario: Number(val_unitario).toFixed(2),
        costVenta: Number(val_costo_venta) * Number(val_cantidad),
        mtoValorVenta: Number(val_venta).toFixed(2),
        igv: Number(val_igv).toFixed(2),
        isc: Number(val_isc).toFixed(2),
        mtoSumTributos: Number(val_sum_tributos).toFixed(2),
        mtoVentaTotal: Number(val_precio_total).toFixed(2),
        mtoDsctoItem: 0
      }
      console.log('newItemModalArray', newItemModalArray);
      this.setState({
        modalArray: [...this.state.modalArray, newItemModalArray],
        sumTotTributos: Number(Number(this.state.sumTotTributos) + Number(val_sum_tributos)).toFixed(2),
        // sumTotValVenta: Number(Number(this.state.sumTotValVenta) + Number(val_venta)).toFixed(2),
        sumPrecioMostrar: Number(Number(this.state.sumPrecioMostrar) + Number(val_precio_total)).toFixed(2),
        costVenta: Number(Number(this.state.costVenta) + Number(val_costo_venta * val_cantidad)).toFixed(2)

      },
        this.CloseItemModal
      );
      console.log("---------------------------------");
      console.log("Actualizando SumPrecioVenta:", this.state.sumPrecioMostrar);
      this.refs.ref_buscar_item_modificar.value = '';
      //toast.success('Producto agregado', { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
      alert('Producto agregado');
      console.log(this.state.modalArray);
    }
  }
  CloseItemModal() {
    /* restore data to  0 */
    this.refs.ref_buscar_item_modificar.value = '';
    this.refs.ref_cantidad_item_modificar.value = '';
    this.refs.ref_precio_item_modificar.value = '';
    this.refs.ref_afecto_item_modificar.value = '';
    this.refs.ref_medida_item_modificar.value = '';


    this.setState({
      contenido_modal_select: []
    });
  }
  removeItem(delete_index) {
    console.log('restando: ', Number(this.state.modalArray[delete_index].mtoVentaTotal));
    var restarPrecio = Number(this.state.sumPrecioMostrar - this.state.modalArray[delete_index].mtoVentaTotal);
    console.log('deleting i: ', delete_index);
    this.setState({
      sumPrecioMostrar: restarPrecio,
      modalArray: [...this.state.modalArray.filter((item, index) => index !== delete_index)]
    })
  }
  saveItems(id) {
    if (this.state.costVentaModificado){
      fetch('/api/detalles/detalles/referencia', {
        method: 'POST',
        body: JSON.stringify({
          idReferencia: id,
          nuevoCostVenta: this.state.ReferenciacostVenta,
        })
        ,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }})
          .then(res => res.json())
          .then(
              data => {
                console.log("Hecho");
                console.log(data);
                alert("Se actualizo el Costo de Venta, ya puede cerrar la ventana");
              }
          )
          .catch(err => console.log(err));
    }else{
      if ((this.state.sumPrecioVenta_mostrar.toFixed(2) !== this.state.sumPrecioMostrar)) {
        //const answer = window.confirm("El nuevo precio de venta no coincide con el precio guardado, ¿desea guardar de todas formas?");
        //if (answer == false) {
        //  this.clearTotalesEditarItems()
        //return;
        //}
        alert("El nuevo precio de venta no coincide con el precio guardado: " + this.state.sumPrecioVenta_mostrar + " - " + this.state.sumPrecioMostrar);
        return;
      }
      else {
        if (this.state.modalArray.length == 0) {
          alert("No ha agregado ningún item");
        }
        else {
          fetch('/api/detalles/detalles/referencia', {
            method: 'POST',
            body: JSON.stringify({
              idReferencia: id,
              nuevoCostVenta: 0,
            })
            ,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }})
              .then(res => res.json())
              .then(
                  data => {
                    console.log("Hecho");
                    console.log(data);
                  }
              )
              .catch(err => console.log(err));
          var val_venta;
          var val_igv;
          var val_isc;
          var val_sum_tributos;
          var val_precio_total;
          var val_descuento = 0;
          var val_costo_venta;
          var val_unitario;

          console.log('guardando items en ', id);
          this.state.modalArray.map((value, i) => {
            val_venta = this[`ref_valor_venta_item_modificar_${i}`].value != '' ? this[`ref_valor_venta_item_modificar_${i}`].value : value.mtoValorVenta;
            val_igv = this[`ref_igv_item_modificar_${i}`].value != '' ? this[`ref_igv_item_modificar_${i}`].value : value.igv;
            val_isc = this[`ref_isc_item_modificar_${i}`].value != '' ? this[`ref_isc_item_modificar_${i}`].value : value.isc;
            val_sum_tributos = this[`ref_sum_tributos_item_modificar_${i}`].value != '' ? this[`ref_sum_tributos_item_modificar_${i}`].value : value.mtoSumTributos;
            val_precio_total = this[`ref_precio_total_item_modificar_${i}`].value != '' ? this[`ref_precio_total_item_modificar_${i}`].value : value.mtoVentaTotal;
            val_unitario = this[`ref_valor_unitario_item_modificar_${i}`].value != '' ? this[`ref_valor_unitario_item_modificar_${i}`].value : value.mtoValorUnitario;
            val_costo_venta = this[`ref_costo_venta_item_modificar_${i}`].value;
            // val_descuento = this[`ref_descuento_item_modificar_${i}`].value != '' ? this[`ref_descuento_item_modificar_${i}`].value : value.mtoDsctoItem;

            console.log(value);
            fetch('/api/inventarios/inventarios/', {
              method: 'POST',
              body: JSON.stringify({
                idIngreso: id,
                ctdUnidadItem: value.ctdUnidadItem,
                codUnidadMedida: value.codUnidadMedida,
                idProducto: value.idProducto,
                desItem: value.desItem,
                tipoAfecto: value.tipoAfecto,
                mtoPrecioUnitario: value.mtoPrecioUnitario,
                mtoValorUnitario: val_unitario,
                costVenta: val_costo_venta,
                mtoValorVenta: val_venta, //aqui
                igv: val_igv,
                isc: val_isc,
                mtoSumTributos: val_sum_tributos,
                mtoVentaTotal: val_precio_total,
                mtoDsctoItem: val_descuento
              }),
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            })
                .then(res => res.json())
                .then(data => {
                  console.log('id item: ', data) //id que retorno
                  this.clearTotalesEditarItems()
                })
                .catch(err => console.log(err));
          })
          //alter editable
          var url = '/api/ingresos/ingresos/' + id + '/editable/' + 0;
          fetch(url, {
            method: 'PUT',
            body: JSON.stringify({
            }),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }).then(res => {
            console.log(res);
            //toast.warning('Cambios guardados', { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
            alert('Cambios guardados');
            this.clearTotalesEditarItems()
            this.refresh();
          }).catch(err => err);
        }
      }
    }

  }
  setPagos(numero) {
    fetch('/api/ingresos/pagos/' + numero)
      .then(res => res.json())
      .then(
        data => {
          this.setState({ pagos: data });
        })
      .catch(err => console.log(err));

  }
  eraseCeros(val) {
    var n = val.toString().replace('0', '');
    return n;
  }

  isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
  }

  manualFilter(objs, keyName, condicionObj){
    console.log("MANUAL");
    console.log(objs);
    console.log("------------");
    console.log("KeyNAME", keyName);
      let result = [];
      // obteniendo condicion
      let condition = condicionObj.value.replace(/ /g, ""); // eliminado espacios
      let simboloComparacion = "";
      for (let i = 0; i < condition.length; i++){
          if (!this.isNumeric(condition[i]))
              simboloComparacion += condition[i];
      }
      console.log("Simbolo:", simboloComparacion);

      if (simboloComparacion.length > 0){
          condition = condition.slice(simboloComparacion.length);
          console.log("Condición:",condition);

          switch (simboloComparacion) {
              case '>':
                  for (let i = 0; i < objs.length; i++){
                    if (objs[i][keyName] > condition)
                          result.push(objs[i]);
                  }
                  break;

              case '<':
                console.log("MENOR");
                  for (let i = 0; i < objs.length; i++){
                    if (objs[i][keyName] < condition){
                      console.log("Cumple condicion menor");
                      result.push(objs[i]);
                    }
                  }
                  break;

              case '<=':
                console.log("MENOR IGUAL");
                for (let i = 0; i < objs.length; i++){
                  if (objs[i][keyName] <= condition)
                          result.push(objs[i]);
                  }
                  break;

              case '>=':
                console.log("MAYOR IGUAL");
                for (let i = 0; i < objs.length; i++){
                  if (objs[i][keyName] >= condition)
                          result.push(objs[i]);
                  }
                  break;
          }
      }else{
          for (let i = 0; i < objs.length; i++){
              if (objs[i][keyName] === parseInt(condition))
                  result.push(objs[i]);
          }
      }
      console.log(result);
      return result;
  }

  downloadExcel(){
    console.log("Esportando INGRESOS a EXCEL");
    if (this.state.fechaInicio !== "" && this.state.fechaFin !== "" && this.state.movimiento !== ""){
      fetch('/api/ingresos/ingresos/reporte/excel/'+ this.state.fechaInicio + '/' + this.state.fechaFin + '/' + this.state.movimiento)
          .then(res => res.blob())
          .then(
              data => {
                console.log("Recibiendo dato");
                console.log(data);
                FileSaver.saveAs(data, 'Operaciones Registros.xlsx');
              }
          )
          .catch(err => {
            console.log("ERROR AL SOLICITAR RUTA");
            console.log(err);
          });
    }else{
      alert("Seleccione datos de filtro para poder descargar el archivo");
    }
  }

  render() {
    const columnsPagos = [
      {
        Header: "",
        accessor: "movimiento",
        className: "centerText",
        width: 50,
        Cell: row => (
          <div>
            {(row.value == 1 ? // 1 ingreso . egreso 
              <p className="text-success">
                <i className="fas fa-plus"></i>
              </p> :
              <p className="text-danger">
                <i className="fas fa-minus"></i>
              </p>
            )}
          </div>
        ), sortable: false,
        filterable: false,
      },
      {
        Header: "Fecha Emisión",
        accessor: "fecEmision",
        className: "centerText",
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["fecEmision"] }),
        filterAll: true
      },
      {
        Header: "Nombre Partida",
        accessor: "nombrePartida",
        className: "centerText",
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["nombrePartida"] }),
        filterAll: true
      },
      {
        Header: "Fuente",
        accessor: "codFuente",
        className: "centerText",
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["codFuente"] }),
        filterAll: true
      },
      {
        Header: "Sucursal",
        accessor: "nombreSucursal",
        className: "centerText",
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["nombreSucursal"] }),
        filterAll: true
      },
      {
        Header: "Tipo Moneda",
        accessor: "tipMoneda",
        className: "centerText",
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["tipMoneda"] }),
        filterAll: true
      },
      {
        Header: "A cuenta",
        accessor: "aCuenta",
        className: "centerText",
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["aCuenta"] }),
        filterAll: true
      }
    ]
    const columns = [
      { // primera columna de la tabla
        Header: '',
        accessor: 'sub',
        className: "centerText",
        width: 50,
        Cell: row => (
          <div>
            {(row.original.tipoComprobante != 3 &&
              <div data-toggle="tooltip"
                data-placement="bottom"
                title="Ver Pagos">
                <button
                  type="button"
                  className="btn btn-outline-success btn-sm"
                  style={{ border: 'none' }}
                  data-backdrop="static"
                  data-keyboard="false"
                  name="verpagos"
                  data-toggle="modal"
                  data-target="#modalVerPagos"
                  onClick={() => this.setPagos(row.original.numero)}>
                  <i className="fas fa-dollar-sign"></i>
                </button>
              </div>

            )}
            {(row.original.tipoComprobante == 3 && // nota credito
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                style={{ border: 'none' }}
                data-toggle="tooltip"
                data-placement="bottom"
                title="Nota de Crédito"
              >
                <i className="fas fa-sticky-note"></i>
              </button>
            )}

          </div>
        ),
        sortable: false,
        filterable: false,
      },
      {
        Header: "",
        accessor: "movimiento",
        className: "centerText",
        width: 50,
        Cell: row => (
          <div>
            {(row.value == 1 ? // 1 ingreso . egreso 
              <p className="text-success">
                <i className="fas fa-plus"></i>
              </p> :
              <p className="text-danger">
                <i className="fas fa-minus"></i>
              </p>
            )}
          </div>
        ), sortable: false,
        filterable: false,
      },
      {
        Header: "N",
        accessor: "numero",
        className: "centerText",
        width: 50,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["numero"] }),
        filterAll: true
      },
      {
        Header: "Sucursal",
        accessor: "nombreSucursal",
        className: "centerText",
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["nombreSucursal"] }),
        filterAll: true,
        width: 200,
      },
      {
        Header: "Fuente",
        accessor: "codFuente",
        className: "centerText",
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["codFuente"] }),
        filterAll: true,
        width: 180,
      },
      {
        Header: "Nombre Partida",
        accessor: "nombrePartida",
        className: "centerText",
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["nombrePartida"] }),
        filterAll: true
      },
      {
        Header: "Grupo Partida",
        accessor: "nombreGrupo",
        className: "centerText",
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["nombreGrupo"] }),
        filterAll: true
      },
      {
        Header: "Fecha Emisión",
        accessor: "fecEmision",
        className: "centerText",
        width: 150,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["fecEmision"] }),
        filterAll: true
      },
      {
        Header: "Tipo",
        accessor: "tipoComprobante",
        className: "centerText",
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["tipoComprobante"] }),
        filterAll: true,
        Cell: row => (
          <span>
            {
              row.value === 0 ? 'Boleta'
                : row.value === 1 ? 'Factura'
                  : row.value === 2 ? 'Pago'
                    : row.value === 3 ? 'NC'
                      : 'Otro'
            }
          </span>
        )
      },
      {
        Header: "Serie",
        accessor: "numSerieComprobante",
        className: "centerText",
        width: 70,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["numSerieComprobante"] }),
        filterAll: true,
        Cell: row => (
          <span>
            {(row.value == '' || row.value == null) ? '' : this.eraseCeros(row.value)}
          </span>
        )
      },
      {
        Header: "Número",
        accessor: "numComprobante",
        className: "centerText",
        width: 100,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["numComprobante"] }),
        filterAll: true

      },
      {
        Header: "RUC / DNI",
        accessor: "numDocUsuario",
        className: "centerText",
        width: 100,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["numDocUsuario"] }),
        filterAll: true
      },
      {
        Header: "Razón Social",
        accessor: "razSocial",
        className: "centerText",
        width: 280,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["razSocial"] }),
        filterAll: true
      },
      {
        Header: "Tipo Moneda",
        accessor: "tipMoneda",
        className: "centerText",
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["tipMoneda"] }),
        filterAll: true
      },
      {
        Header: "Detalle Ingreso",
        accessor: "detalleIngreso",
        className: "centerText",
        width: 250,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["detalleIngreso"] }),
        filterAll: true
      },
      {
        Header: "Sum Precio Venta",
        accessor: "sumPrecioVenta",
        className: "centerText",
        filterMethod: (filter, rows) => this.manualFilter(rows, 'sumPrecioVenta', filter),
        filterAll: true
      },
      {
        Header: "A cuenta",
        accessor: "aCuenta",
        className: "centerText",
        filterMethod: (filter, rows) => this.manualFilter(rows, 'aCuenta', filter),
        filterAll: true
      },
      {
        Header: "Costo Venta",
        accessor: "costVenta",
        className: "centerText",
        width: 130,
        filterMethod: (filter, rows) => this.manualFilter(rows, 'costVenta', filter),
        filterAll: true
      },
      {
        Header: "Costo Servicio",
        accessor: "costServicio",
        className: "centerText",
        filterMethod: (filter, rows) => this.manualFilter(rows, 'costServicio', filter),
        filterAll: true,
        width: 150,
      },
      {
        Header: "Saldo",
        accessor: "saldo",
        className: "centerText",
        filterMethod: (filter, rows) => this.manualFilter(rows, 'saldo', filter),
        filterAll: true
      },
      {
        getProps: (state, rowInfo) => {
          if (rowInfo && rowInfo.row) {
            return {
              style: {
                background:
                  rowInfo.row.estado === 0 ? "#EF9A9A" : "#A5D6A7"
              }
            };
          } else {
            return {};
          }
        },
        Header: "Estado",
        accessor: "estado",
        className: "centerText",
        Cell: row => (
          <span>
            {
              this.state.tipEstado[row.value]
            }
          </span>
        ),
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["estado"] }),
        filterAll: true
      },
      {
        Header: "",
        accessor: "editable",
        className: "centerText",
        width: 50,
        Cell: row => (
          <div>
            {((row.original.tipoComprobante != 3 && row.original.tipoComprobante != 2)
              && (row.value == 1 && row.original.estado == 1)) ? // 1 vacio(editar) 
              <div data-toggle="tooltip"
                data-placement="bottom"
                title="Editar">
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  data-backdrop="static"
                  data-keyboard="false"
                  name="modificarItems"
                  data-toggle="modal"
                  data-target="#modalAdminIngresos"
                  onClick={() => this.setAdminOption(row.original.numero, 'Modificar', row.original.sumPrecioVenta, row.original.estado)}>
                  <i className="fas fa-pencil-alt"></i>
                </button>
              </div> :
              //0 lleno(ver)
              <div data-toggle="tooltip"
                data-placement="bottom"
                title="Ver">
                <button
                  type="button"
                  className={row.original.tipoComprobante == 2 ? "btn btn-outline-success btn-sm" : "btn btn-primary btn-sm"}
                  data-backdrop="static"
                  data-keyboard="false"
                  name="verItems"
                  data-toggle="modal"
                  data-target="#modalAdminIngresos"
                  onClick={() => this.setAdminOption(row.original.numero, 'Ver', 0, row.original.estado)}>
                  <i className={row.original.tipoComprobante == 2 ? "fas fa-dollar-sign" : "far fa-eye"}></i>
                </button>
              </div>
            }
          </div>
        ), sortable: false,
        filterable: false,
      },
      {
        Header: "",
        accessor: "valido",
        className: "centerText",
        width: 50,
        Cell: row => (
          <div>
            {((row.original.tipoComprobante == 0 && row.original.estado == 1) ||
              (row.original.tipoComprobante == 1 && row.original.estado == 1) ||
              (row.original.tipoComprobante == 4 && row.original.estado == 1))
              ? // es boleta o factura y esta vigente 1(se puede anular) 
              <div data-toggle="tooltip"
                data-placement="bottom"
                title="Anular">
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  data-backdrop="static"
                  data-keyboard="false"
                  name="anularIngreso"
                  data-toggle="modal"
                  data-target="#modalAnularEliminar"
                  onClick={() => this.setEliminarOption(row.original.numero, 'Anular')}>
                  <i className="fas fa-ban"></i>
                </button>
              </div> :
              (row.original.tipoComprobante == 2 && row.original.estado == 1) ?
                //es otro tipo y vigente, se elimina
                <div data-toggle="tooltip"
                  data-placement="bottom"
                  title="Eliminar">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    data-backdrop="static"
                    data-keyboard="false"
                    name="eliminarIngreso"
                    data-toggle="modal"
                    data-target="#modalAnularEliminar"
                    onClick={() => this.setEliminarOption(row.original.numero, 'Eliminar')}>
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div> : null
            }
          </div>
        ), sortable: false,
        filterable: false,
      }
    ]

    return (
      <div className="container-fluid" style={{marginTop: "-20px"}}>
          <div className="row">
            <div className="col-3">
              <SingleInput
                labelClass={'col-2'}
                inputClass={'col'}
                inputType={'date'}
                title={'De: '}
                name={'fechaInicio'}
                controlFunc={this.handleInputChange}
                content={this.state.fechaInicio}
              />
            </div>
            <div className="col-3 ">
              <SingleInput
                labelClass={'col-2'}
                inputClass={'col '}
                inputType={'date'}
                title={'A: '}
                name={'fechaFin'}
                controlFunc={this.handleInputChange}
                content={this.state.fechaFin}
              />
            </div>
            <div className="col">
              <div className="row">
                <div className="col">
                  <h5 className="form-text text-primary">
                    Tipo de movimiento
                </h5>
                </div>
                <div className="col mt-1">
                  <select
                    className="form-control mt-n2 title-select"
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
                    <option value="2">
                      Todos
                   </option>
                  </select>
                </div>
              </div>
            </div>

            <div className="col-2 mt-1">
              <button className="btn btn-outline-primary btn-sm my-2 my-sm-0 mt-1"
                onClick={this.searchFecha.bind(this)}>
                Buscar
              </button>
            </div>
            <div className="col-1 mt-1">
              <button className="btn btn-outline-success btn-sm my-2 my-sm-0 mt-1"
                      onClick={this.downloadExcel.bind(this)}>
                Exportar a Excel
              </button>
            </div>
        </div>

        <div className="modal fade"
          id="modalVerPagos"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="modalVerPagos"
          aria-hidden="true" >
          <div className="modal-dialog modal-xl modal-dialog-scrollable"
            role="document">
            <div className="modal-content" style={{ height: '500px' }}>
              <div className="modal-header">
                <div className="col">
                  <h5 className="modal-title">
                    Pagos relacionados
                  </h5>
                </div>

                <button type="button"
                  className="col-1 close"
                  data-dismiss="modal"
                  aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <ReactTable
                  columns={columnsPagos}
                  data={this.state.pagos}
                  filterable
                  defaultFilterMethod={(filter, row) =>
                    String(row[filter.id]) === filter.value}
                  defaultPageSize={10}
                  className="-striped -highlight">
                </ReactTable>
              </div>
            </div>
          </div>
        </div>

        {/*modal*/}
        <div className="modal fade"
          id="modalAdminIngresos"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="modalAdminIngresos"
          aria-hidden="true" >
          <div className="modal-dialog modal-xl modal-dialog-scrollable"
            role="document">
            <div className="modal-content contenido-modal-items">
              <div className="modal-header">
                <div className="col">
                  <h5 className="modal-title">
                    {this.state.adminOption} Registro N° {this.state.idOption}
                  </h5>
                </div>

                {this.state.adminOption == 'Modificar' &&
                  <div className="row justify-content-end">
                    <button
                      type="button"
                      data-backdrop="static"
                      data-keyboard="false"
                      className="btn btn-outline-success"
                      data-toggle="modal"
                      data-target="#modal_agregar_item_modificar">
                      Agregar nuevo item
                        <i className="ml-2 fas fa-plus-circle"></i>
                    </button>
                  </div>}

                <button type="button"
                  className="col-1 close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.clearTotalesEditarItems.bind(this)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              {this.state.adminOption == 'Ver' &&
                <div>
                  <div className="modal-body verItems">
                    <div>
                      <div className="row">
                        <div className="table-responsive text-center mt-2">
                          <table className="table table-sm table-bordered" id="idTablaItem">
                            <thead>
                              <tr id="rt-thead">
                                <th scope="col">#</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Unidad Medida</th>
                                <th scope="col">Código Item</th>
                                <th scope="col">Descripcion</th>
                                <th scope="col">Afecto</th>
                                <th scope="col">Precio Unitario</th>
                                <th scope="col">Valor Unitario</th>
                                <th scope="col">Valor de Venta</th>
                                <th scope='col'>Costo de Venta</th>
                                <th scope="col">IGV</th>
                                <th scope="col">ISC</th>
                                <th scope="col">Sum Tributos</th>
                                <th scope="col">Precio Descuento</th>
                                <th scope="col">Precio Total Venta</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.contenido_array_ver.map((value, i) => {
                                var fila_costVenta = 'fila_costVenta' + i;
                                return (
                                  <tr key={i} id="rt-body">
                                    <th scope="row">{i + 1}</th>
                                    <td>{value.ctdUnidadItem}</td>
                                    <td>{value.codUnidadMedida}</td>
                                    <td>{value.idProducto}</td>
                                    <td>{value.desItem}</td>
                                    <td>{value.tipoAfecto}</td>
                                    <td>{value.mtoPrecioUnitario}</td>
                                    <td>{value.mtoValorUnitario}</td>

                                    <td>{value.mtoValorVenta}</td>
                                    {this.state.estadoOption == 1 ? <td>
                                      <input type="number"
                                        id={fila_costVenta}
                                        className="form-control form-control-sm"
                                        ref="ref_valorventa"
                                        placeholder={value.costVenta} />
                                    </td> : <td>{value.costVenta}</td>}

                                    <td>{value.igv}</td>
                                    <td>{value.isc}</td>
                                    <td>{value.mtoSumTributos}</td>
                                    <td>{value.mtoDsctoItem}</td>
                                    <td>{value.mtoVentaTotal}</td>
                                    {this.state.estadoOption == 1 ? <td>
                                      <button type="button"
                                        className="btn btn-outline-success btn-sm"
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title="Modificar costo de venta"
                                        onClick={() => this.modificarCostVenta(
                                          fila_costVenta, value.idIngreso, value.idDetalle, this.state.idOption
                                        )}>
                                        <i className="fas fa-check"></i>
                                      </button>

                                    </td> : ''}
                                  </tr>
                                )
                              })}
                            </tbody>
                            {this.state.contenido_array_ver.length > 10 &&
                              <thead>
                                <tr id="rt-thead">
                                  <th scope="col">#</th>
                                  <th scope="col">Cantidad</th>
                                  <th scope="col">Unidad Medida</th>
                                  <th scope="col">Código Item</th>
                                  <th scope="col">Descripcion</th>
                                  <th scope="col">Afecto</th>
                                  <th scope="col">Precio Unitario</th>
                                  <th scope="col">Valor Unitario</th>
                                  <th scope='col'>Costo de Venta</th>
                                  <th scope="col">Valor de Venta</th>
                                  <th scope="col">IGV</th>
                                  <th scope="col">ISC</th>
                                  <th scope="col">Sum Tributos</th>
                                  <th scope="col">Precio Descuento</th>
                                  <th scope="col">Precio Total Venta</th>
                                </tr>
                              </thead>}
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="form-text text-muted text-center custom-footer-text">
                    Desplácese hacia abajo para ver más.
                  </p>
                  <div className="modal-footer">
                    <button type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal">
                      Cerrar
                    </button>

                  </div>
                </div>
              }
              {
                this.state.adminOption == "Modificar" &&
                <div>
                  <div className="modal-body verItems">

                    <div className="col">
                      <div className="row">
                        <div className="table-responsive text-center mt-2">
                          <table className="table table-sm table-bordered"
                            id="idTablaItem"
                            style={{ width: '1750px' }} >
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col" >Descripción</th>
                                <th scope="col" >Cod</th>
                                <th scope="col" >Medida</th>
                                <th scope="col" >Cantidad</th>
                                <th scope="col" >Afecto</th>
                                <th scope="col" >Precio Unitario</th>
                                <th scope="col" >Valor Unitario</th>
                                <th scope="col" >Costo de Venta</th>


                                <th style={{ border: "none", width: '50px' }}>  </th>
                                <th scope="col" >Valor de Venta</th>
                                <th scope="col" >IGV</th>
                                <th scope="col" >ISC</th>
                                <th scope="col" >Sum Tributos</th>
                                <th scope="col" >Precio Total Venta</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.modalArray.map((value, i) => {
                                var fila_afecto_modificar = 'fila_afecto_' + i;
                                return (
                                  <tr key={i}>
                                    <th scope="row">{i + 1}</th>
                                    <td >
                                      <input type="text"
                                        ref={input => { this[`ref_nombre_item_modificar_${i}`] = input }}
                                        value={value.desItem}
                                        className="form-control form-control-sm"
                                        readOnly />
                                    </td>
                                    <td >
                                      <input type="number"
                                        ref={input => { this[`ref_cod_item_modificar_${i}`] = input }}
                                        value={value.idProducto}
                                        className="form-control form-control-sm" readOnly />
                                    </td>
                                    <td >
                                      <input type="text"
                                        ref={input => { this[`ref_medida_item_modificar_${i}`] = input }}
                                        value={value.codUnidadMedida}
                                        className="form-control form-control-sm" readOnly />
                                    </td>

                                    <td >
                                      <input type="number"
                                        ref={input => { this[`ref_cantidad_item_modificar_${i}`] = input }}
                                        value={value.ctdUnidadItem}
                                        className="form-control form-control-sm" readOnly />
                                    </td>
                                    <td >
                                      <input type="text"
                                        placeholder={value.tipoAfecto === '0' ? 'Gravada' :
                                          value.tipoAfecto === '1' ? 'Exonerado' :
                                            value.tipoAfecto === '2' ? 'Inafecto' :
                                              value.tipoAfecto === '3' ? 'Exportación' : ''}
                                        className="form-control form-control-sm" readOnly   />

                                      <input type="text" hidden
                                        id={fila_afecto_modificar}
                                        ref={input => { this[`ref_afecto_item_modificar_${i}`] = input }}
                                        value={value.tipoAfecto}
                                        className="form-control form-control-sm" readOnly />
                                    </td>
                                    <td >
                                      <input type="number"
                                        ref={input => { this[`ref_precio_item_modificar_${i}`] = input }}
                                        value={value.mtoPrecioUnitario}
                                        className="form-control form-control-sm"
                                        readOnly />
                                    </td>
                                    <td >
                                      <input type="number"
                                        ref={input => { this[`ref_valor_unitario_item_modificar_${i}`] = input }}
                                        className="form-control form-control-sm"
                                        placeholder={value.mtoValorUnitario}
                                        min="0" />
                                    </td>

                                    <td >
                                      <input type="number"
                                        ref={input => { this[`ref_costo_venta_item_modificar_${i}`] = input }}
                                        className="form-control form-control-sm"
                                        placeholder={value.costVenta}
                                        min="0" />
                                    </td>
                                    {/*<td >
                                      <input type="number"
                                        ref={input => { this[`ref_descuento_item_modificar_${i}`] = input }}
                                        className="form-control form-control-sm"
                                        placeholder={value.mtoDsctoItem}
                                        min="0" />
                                    </td>*/}
                                    <td style={{ border: "none" }}>
                                      <button
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title="Calcular"
                                        onClick={this.calcularValores.bind(this, i)}>
                                        <i className="fas fa-arrow-right"></i>
                                      </button>
                                    </td>
                                    <td >
                                      <input type="number"
                                        ref={input => { this[`ref_valor_venta_item_modificar_${i}`] = input }}
                                        className="form-control form-control-sm"
                                        placeholder={value.mtoValorVenta}
                                        readOnly />
                                    </td>
                                    <td >
                                      <input type="number"
                                        ref={input => { this[`ref_igv_item_modificar_${i}`] = input }}
                                        className="form-control form-control-sm"
                                        placeholder={value.igv}
                                        readOnly />
                                    </td>
                                    <td >
                                      <input type="number"
                                        ref={input => { this[`ref_isc_item_modificar_${i}`] = input }}
                                        className="form-control form-control-sm"
                                        placeholder={value.isc}
                                        readOnly />
                                    </td>
                                    <td >
                                      <input type="number"
                                        ref={input => { this[`ref_sum_tributos_item_modificar_${i}`] = input }}
                                        className="form-control form-control-sm"
                                        placeholder={value.mtoSumTributos}
                                        readOnly />
                                    </td>

                                    <td >
                                      <input type="number"
                                        ref={input => { this[`ref_precio_total_item_modificar_${i}`] = input }}
                                        className="form-control form-control-sm"
                                        placeholder={value.mtoVentaTotal}
                                        readOnly />
                                    </td>
                                    <td>
                                      <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title="Eliminar"
                                        onClick={this.removeItem.bind(this, i)}>

                                        <i className="fas fa-trash-alt"></i>
                                      </button>
                                    </td>
                                  </tr >
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2 mx-auto">
                    <div className="col">
                    </div>
                    <div className="col">
                      <p> Total Precio de Venta Guardado</p>
                      <input type="number"
                        className="form-control form-control-sm"
                        placeholder={this.state.sumPrecioVenta_mostrar}
                        readOnly />
                    </div>
                    <div className="col">
                      <p> Sumatoria Total Precio Modificado</p>
                      <input type="number"
                        className="form-control form-control-sm"
                        placeholder={this.state.sumPrecioMostrar}
                        readOnly />
                    </div>
                    <div className="col">
                      <p> Costo Venta</p>
                      <input type="number"
                             className="form-control form-control-sm"
                             value={this.state.ReferenciacostVenta}
                             onChange={this.handleModificado}
                      />
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={this.clearTotalesEditarItems.bind(this)}>
                      Cerrar
                    </button>
                    <button type="button"
                      className="btn btn-primary"
                      onClick={this.saveItems.bind(this, this.state.idOption)}
                    >
                      Guardar cambios
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>
        </div >
        {/*modal agregar item*/}
        <div className="modal fade"
          id="modal_agregar_item_modificar"
          tabIndex="-1"
          role="dialog"
          aria-hidden="true" >
          <div className="modal-dialog modal-lg modal-dialog-scrollable"
            role="document">
            <div className="modal-content light-content">
              <div className="modal-header">
                <div className="col-7">
                  <h5 className="modal-title">
                    Agregar Item
                  </h5>
                </div>
                <button type="button"
                  className="close"
                  data-dismiss='modal'
                  onClick={() => this.CloseItemModal()}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body h-75">
                <div className="row text-center">
                  <div className="col">
                    <div className="row mt-1">
                      <div className="col-4">
                        <label>
                          Buscar
                        </label>
                      </div>
                      <div className="col-5">
                        <input
                          className="text-center form-control form-control-sm"
                          type="text"
                          id="inputSearchProductos_modificar"
                          ref="ref_buscar_item_modificar"
                          name="modal_buscar_modificar"
                          onChange={this.handleInputChange}
                        />

                      </div>
                      <div className="col-1">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Buscar"
                          onClick={this.searchProducto.bind(this)}>
                          <i className="fas fa-search"></i>
                        </button>
                      </div>


                    </div>

                  </div>
                </div>


                <div className="row">
                  <div className="table-responsive text-center mt-2">
                    <table className="table table-sm table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Descripción</th>
                          <th scope="col">Stock</th>
                          <th scope="col">Precio</th>
                          <th scope="col">Cantidad</th>
                          <th scope="col">Unidad de Medida</th>
                          <th scope="col">Afecto</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          // TABLA DE AGREGAR ITEM
                          this.state.contenido_modal_select.map((value, i) => {
                            var fila_precio_modificar = 'fila_precio_' + i;
                            var fila_cantidad_modificar = 'fila_cantidad_' + i;
                            var fila_afecto_modificar = 'fila_afecto_' + i;
                            var fila_medida_modificar = 'fila_medida_' + i;

                            return (
                              <tr className="custom-doubleclicked"
                                key={i}>
                                <td onClick={this.getFilaProducto.bind(this, value.idProducto,
                                  value.nombreProducto,
                                  fila_precio_modificar,
                                  fila_cantidad_modificar,
                                  fila_afecto_modificar,
                                  fila_medida_modificar,
                                  value.costVenta)}>

                                  {value.idProducto}
                                </td>
                                <td onClick={this.getFilaProducto.bind(this, value.idProducto,
                                  value.nombreProducto,
                                  fila_precio_modificar,
                                  fila_cantidad_modificar,
                                  fila_afecto_modificar,
                                  fila_medida_modificar,
                                  value.costVenta)}>

                                  {value.nombreProducto}
                                </td>
                                <td onClick={this.getFilaProducto.bind(this, value.idProducto,
                                  value.nombreProducto,
                                  fila_precio_modificar,
                                  fila_cantidad_modificar,
                                  fila_afecto_modificar,
                                  fila_medida_modificar,
                                  value.costVenta)}>

                                  {value.stockProducto}
                                </td>
                                <td>
                                  <input type="number"
                                    id={fila_precio_modificar}
                                    ref="ref_precio_item_modificar"
                                    className="form-control form-control-sm"
                                    placeholder={value.precioProducto}
                                    min="0" />
                                </td>
                                <td>
                                  <input type="number"
                                    ref="ref_cantidad_item_modificar"
                                    id={fila_cantidad_modificar}
                                    className="form-control form-control-sm"
                                    min="0" />
                                </td>
                                <td>
                                  <select className="form-control form-control-sm"
                                    id={fila_medida_modificar}
                                    ref="ref_medida_item_modificar">
                                    <option value="" disabled="disabled">
                                      Unidad de Medida
                                            </option>
                                    {this.state.opciones_tipo_medida.map((val, i) => {
                                      return (
                                        <option key={i} value={val.codUnidadMedida}>
                                          {val.nombre}
                                        </option>
                                      )
                                    })}
                                  </select>
                                </td>
                                <td>
                                  <select className="form-control form-control-sm"
                                    id={fila_afecto_modificar}
                                    ref="ref_afecto_item_modificar">
                                    <option value="" disabled="disabled">
                                      Tipo de Afecto
                                    </option>
                                    {this.state.opciones_tipo_afecto.map((val, i) => {
                                      return (
                                        <option key={i} value={val.tipoAfecto}>
                                          {val.nombre}
                                        </option>
                                      )
                                    })}
                                  </select>
                                </td>
                              </tr>
                            )
                          })}
                      </tbody>
                    </table>
                  </div>
                  {/* --  */}
                </div>
                {/* -- */}
              </div>
              <p className="form-text text-muted text-center custom-footer-text">
                Busque un elemento o parte su nombre, luego haga click sobre él para registrarlo.
                                            </p>

            </div>
          </div>
        </div >

        {/*modal eliminar o anular */}
        <div
          id="modalAnularEliminar"
          className="modal fade"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="confirmar"
          aria-hidden="true">
          <div className="modal-dialog modal-dialog-scrollable modal-lg"
            role="document">
            <div className="modal-content">
              <div className="modal-header">
                <div className="col">
                  <h5 className="modal-title">
                    {this.state.eliminarOption} Registro N° {this.state.idOption}
                  </h5>
                </div>

                <button type="button"
                  className="col-1 close"
                  data-dismiss="modal"
                  aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              {this.state.eliminarOption == 'Anular' &&
                <div>
                  <div className="modal-body small-modal-body text-center">
                    ¿Está seguro de que desea anular este registro?, recuerde que esta acción no se puede deshacer.
                  </div>

                  <div className="modal-footer">
                    <button type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal">
                      Cancelar
                    </button>
                    <button type="button"
                      className="btn btn-primary"
                      data-dismiss="modal"
                      onClick={() => this.anularComprobante(this.state.idOption)}>
                      Confirmar
                    </button>
                  </div>
                </div>

              }
              {this.state.eliminarOption == 'Eliminar' &&
                <div>
                  <div className="modal-body small-modal-body text-center">
                    ¿Está seguro de que desea eliminar este pago?, recuerde que esta acción no se puede deshacer.
                  </div>

                  <div className="modal-footer">
                    <button type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal">
                      Cancelar
                    </button>
                    <button type="button"
                      className="btn btn-primary"
                      data-dismiss="modal"
                      onClick={() => this.eliminarIngreso(this.state.idOption)}>
                      Confirmar
                    </button>
                  </div>
                </div>

              }

            </div>
          </div>
        </div>

        <div className="body-registro-ingresos mt-n2">
          <ReactTable
              columns={columns}
              data={this.state.registros}
              filterable={true}
              defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value}
              pageSizeOptions={[10, 20, 30, 50, 100, 200, 500]}
              defaultPageSize={10}
              className="-striped -highlight"
              previousText={'Pág. Anterior'}
              nextText={'Pág. Siguiente'}
              noDataText={'No hay datos para mostrar'}
              pageText={'Página'}
              ofText={'de'}
              rowsText={'registros'}

              getTrProps={
                (state, rowInfo, column, instance) => {
                  if (typeof rowInfo !== "undefined") {
                    return {
                      onClick: (e, handleOriginal) => {
                        this.setState({
                          selected: rowInfo.index
                        });
                        if (handleOriginal) {
                          handleOriginal()
                        }
                      },
                      style: {
                        background: rowInfo.index === this.state.selected ? '#00afec' : 'white',
                        color: rowInfo.index === this.state.selected ? 'white' : 'black'
                      },
                    }
                  }
                  else {
                    return {
                      onClick: (e, handleOriginal) => {
                        if (handleOriginal) {
                          handleOriginal()
                        }
                      },
                      style: {
                        background: 'white',
                        color: 'black'
                      },
                    }
                  }
                }
              }
          >
          </ReactTable>
        </div>
      </div >

    );
  }
}

export default Registros;
