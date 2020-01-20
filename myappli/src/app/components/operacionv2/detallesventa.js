import React, {Component} from 'react';
import InputComponent from "../common2/inputcomponent";
import TablaDetalles from "./tabladetalles";
import SelectComponent from "../common2/selectcomponent";
import DataListComponent from "../common2/datalistcomponent";

class DetallesVenta extends Component {
    constructor(props){
        super(props);

        this.renderModalAgregarItem = this.renderModalAgregarItem.bind(this);
        this.renderModalCrearItem = this.renderModalCrearItem.bind(this);
        this.getNameSucursal = this.getNameSucursal.bind(this);

    }

    getNameSucursal(codSucursal){
        const sucursalesLista = this.props.sucursales;
        for (let i = 0; i < sucursalesLista.length; i++){
            if (codSucursal === sucursalesLista[i].codSucursal)
                return sucursalesLista[i].nombreSucursal;
        }

    }

    renderModalAgregarItem(){
        return (
            <div className="modal fade"
                 id="modal_agregar_item"
                 tabIndex="-1"
                 role="dialog"
                 aria-hidden="true"
            >
                <div className="modal-dialog modal-xl modal-dialog-scrollable"
                     role="document">
                    <div className="modal-content" style={{ height: '800px'}}>
                        <div className="modal-header">
                            <div className="col-3">
                                <h5 className="modal-title">
                                    Agregar Item
                                    <label className="text-primary ml-1 mt-1">
                                        <i className="fas fa-question-circle" data-toggle="tooltip"
                                           data-placement="bottom"
                                           title="Busque todos los productos escribiendo un *" ></i>
                                    </label>
                                </h5>

                            </div>
                            <div className="col">
                                <div className="text-center">
                                    <div className="row mt-1">
                                        <div className="col-2">
                                            <label>
                                                Buscar
                                            </label>
                                        </div>
                                        <div className="col">
                                            <input
                                                className="text-center form-control form-control-sm"
                                                type="text"
                                                id="inputSearchProductos"
                                                ref={this.props.ref_buscar_item}
                                                name="modal_buscar"
                                                onKeyUp={this.props.searchProducto.bind(this, this.props.modal_buscar)}
                                                onChange={this.props.handleInputChange}
                                            />
                                        </div>
                                        <div className="col-2">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={this.props.searchProducto.bind(this, this.props.modal_buscar)}>
                                                <i className="fas fa-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-2 mt-1">
                                <button
                                    type="button"
                                    className="btn btn-success btn-sm ml-3"
                                    data-backdrop="static"
                                    data-keyboard="false"
                                    name="admin_producto"
                                    data-toggle="modal"
                                    data-target="#modalAdmin">
                                    Crear
                                    <i className=" ml-2 fas fa-plus"></i>
                                </button>
                            </div>
                            <button type="button"
                                    className="close"
                                    data-dismiss='modal'
                                    aria-label="Close"
                                    onClick={this.props.borrarDatosModalProdutoG}>
                                <span aria-hidden="true">&times;</span>
                            </button>

                        </div>
                        <div className="modal-body">
                            <div className="row">
                                {/*table productos json data*/}
                                <div className="table-responsive text-center mt-2">
                                    <table className="table table-sm table-bordered" id="idTablaProductos">
                                        <thead>
                                        <tr className="clickable-row">
                                            {this.props.cabeceras_modal_select.map((value, i) => {
                                                return (
                                                    <th key={i}>
                                                        {value}
                                                    </th>
                                                )
                                            })}
                                        </tr>
                                        </thead>
                                        <tbody id="bodyTablaProductos">
                                        {
                                            this.props.contenido_modal_select.map((value, i) => {
                                                var fila_precio = 'fila_precio' + i;
                                                var fila_cantidad = 'fila_cantidad' + i;
                                                var fila_afecto = 'fila_afecto' + i;
                                                var fila_medida = 'fila_medida' + i;
                                                return (
                                                    <tr className="custom-doubleclicked"
                                                        key={i}>
                                                        <td
                                                            onClick={() => this.props.getFilaProducto(value.idProducto,
                                                                value.nombreProducto,
                                                                fila_precio,
                                                                fila_cantidad,
                                                                fila_afecto,
                                                                fila_medida,
                                                                value.costVenta)}>
                                                            {value.idProducto}
                                                        </td>
                                                        <td
                                                            onClick={() => this.props.getFilaProducto(value.idProducto,
                                                                value.nombreProducto,
                                                                fila_precio,
                                                                fila_cantidad,
                                                                fila_afecto,
                                                                fila_medida,
                                                                value.costVenta)}>
                                                            {value.nombreProducto}
                                                        </td>

                                                        <td
                                                            onClick={() => this.props.getFilaProducto(value.idProducto,
                                                                value.nombreProducto,
                                                                fila_precio,
                                                                fila_cantidad,
                                                                fila_afecto,
                                                                fila_medida,
                                                                value.costVenta)}
                                                            style={{fontSize: '11px'}}
                                                        >
                                                            {this.getNameSucursal(value.sucursal)}
                                                        </td>

                                                        <td
                                                            onClick={() => this.props.getFilaProducto(value.idProducto,
                                                                value.nombreProducto,
                                                                fila_precio,
                                                                fila_cantidad,
                                                                fila_afecto,
                                                                fila_medida,
                                                                value.costVenta)}>
                                                            {value.stockProducto}
                                                        </td>
                                                        <td id="td_cantidad">
                                                            <input type="number"
                                                                   ref={this.props.ref_cantidad_item}
                                                                   id={fila_cantidad}
                                                                   className="form-control form-control-sm" />
                                                        </td>
                                                        <td id="td_precio">
                                                            <input type="number"
                                                                   id={fila_precio}
                                                                   ref={this.props.ref_precio_item}
                                                                   className="form-control form-control-sm"
                                                                   placeholder={value.precioProducto} />
                                                        </td>
                                                        <td id="td_medida">
                                                            <select className="form-control form-control-sm"
                                                                    id={fila_medida}
                                                                    ref={this.props.ref_medida_item}>
                                                                {opciones_tipo_medida.map((val, i) => {
                                                                    if (value.codUnidadMedida === val.codUnidadMedida)
                                                                        return (
                                                                            <option key={i} value={val.codUnidadMedida}>
                                                                                {val.nombre}
                                                                            </option>
                                                                        )
                                                                })}
                                                            </select>
                                                        </td>
                                                        <td id="td_afecto">
                                                            <select className="form-control form-control-sm"
                                                                    id={fila_afecto}
                                                                    ref={this.props.ref_afecto_item}>
                                                                <option value="" disabled="disabled">
                                                                    Tipo de Afecto
                                                                </option>
                                                                {opciones_tipo_afecto_item.map((val, i) => {
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
                            </div>
                        </div>
                        <p className="form-text text-muted text-center custom-footer-text">
                            Busque un elemento o parte su nombre, luego haga click sobre él para registrarlo.
                        </p>
                        { /*this.refs.ref_precio_item.value == '' ||
                                this.refs.ref_cantidad_item.value == '' ||
                                    this.refs.ref_afecto_item.value == '' ?
                                <div className="alert alert-danger" role="alert">
                                Debe llenar todos los campos
                                        </div> :
                                <div className="alert alert-success" role="alert">
                                <i className="fas fa-check mr-2"> </i>
                                Haga click en el producto para agregarlo.
                                </div>
                                                */}
                    </div>
                </div>
            </div>
        );
    }

    renderModalCrearItem(){

    }

    render() {
        if (this.props.tipoComprobanteSeleccionado === '0' || this.props.tipoComprobanteSeleccionado === '1' || this.props.tipoComprobanteSeleccionado === '4'){
            return (
                <div className="row justify-content-center">
                    <div className="col-12 mt-1">
                        <div className="form-row align-items-end">
                            <InputComponent
                                idComponent={"bloqueDetalle"}

                                bloques={"col-12 col-sm-6"}
                                etiqueta={"Detalle"}
                                idInput={"detalle"}
                                nombreInput={"detalle"}
                                readOnly={false}
                                funcionControl={this.props.handleChangeInputComponent}
                                marginTopSpace={"12px"}
                                widthLabel={'auto'}
                                valorDefecto={this.props.detalleGeneral}
                            >
                                <button
                                    className="btn btn-sm btn-outline-warning"
                                    name="btnReferencia"
                                    onClick={this.props.handleOnClickButton}
                                    style={{fontSize: '11px'}}
                                >
                                    Agregar Referencia
                                </button>
                                <button
                                    className="btn btn-sm btn-outline-success ml-3"
                                    name="btnItems"
                                    onClick={this.props.handleOnClickButton}
                                    style={{fontSize: '11px'}}
                                >
                                    Agregar Items
                                </button>
                            </InputComponent>

                            <SelectComponent
                                idComponent={"bloqueAfeccion"}

                                bloques={"col-6 col-sm-3"}
                                etiqueta={"Afección"}
                                idSelect={"afecto_servicio"}
                                nombreSelect={"afecto_servicio"}
                                contenido={opciones_tipo_afecto_servicio}
                                nombreMostrar={"nombre"}
                                nombreValor={"tipoAfecto"}
                                funcionControl={this.props.handleChangeSelectComponent}
                                estaOculto={true}
                                esJson={true}
                                desactivado={true}
                            />

                            <InputComponent
                                idComponent={"bloquePrecio"}

                                tipoInput={"number"}
                                bloques={"col-6 col-sm-3"}
                                etiqueta={"Precio T."}
                                idInput={"preciot"}
                                nombreInput={"preciot"}
                                readOnly={false}
                                funcionControl={this.props.handleChangeInputComponent}
                                estaOculto={true}
                                valorDefecto={this.props.sumPrecioVenta}
                            />

                            <button
                                id="btnAgregarNuevoItem"
                                type="button"
                                className="btn btn-outline-success"
                                data-toggle="modal"
                                data-target="#modal_agregar_item"
                                onClick={this.props.loadMultipleSelectValues.bind(this, 'agregar_productos')}
                                style={{display: 'none'}}
                            >
                                <i className="fas fa-plus-circle"></i>
                            </button>
                        </div>

                        <hr/>

                        <div className="form-row justify-content-center">
                            <TablaDetalles
                                idComponent={"bloqueTablaDetalles"}

                                bloques={"col-12"}

                                estaOculto={true}
                                funcionBorrar={this.props.removeItem}
                                registros={this.props.listaItemsVenta}
                            />
                        </div>

                        <hr/>

                        <div className="form-row">
                            <DataListComponent
                                bloques={"col-6 col-sm-6 col-md-2"}
                                etiqueta={"Partida"}
                                idInput={"partida"}
                                nombreInput={"partida"}
                                valorLista={"idPartida"}
                                nombreLista={"nombrePartida"}
                                listaDatos={this.props.listaPartidas}
                                funcionControl={this.props.buscarIdPartida}
                                valorDefecto={this.props.nombrePartida}
                                readOnly={false}
                            />

                            <InputComponent
                                bloques={"col-6 col-sm-6 col-md-2"}
                                etiqueta={"V. Operac"}
                                idInput={"voperac"}
                                nombreInput={"voperac"}
                                readOnly={true}
                                valorDefecto={this.props.sumTotValVenta}
                                funcionControl={() => {}}
                            />

                            <InputComponent
                                bloques={"col-6 col-sm-6 col-md-2"}
                                etiqueta={"IGV"}
                                idInput={"igv"}
                                nombreInput={"igv"}
                                readOnly={true}
                                funcionControl={() => {}}
                                valorDefecto={this.props.sumTotTributos}
                            />

                            <InputComponent
                                tipoInput={"number"}
                                bloques={"col-6 col-sm-6 col-md-2"}
                                etiqueta={"Descuentos"}
                                idInput={"descuento"}
                                nombreInput={"descuento"}
                                readOnly={false}
                                valorDefecto={this.props.sumDescTotal}
                                funcionControl={this.props.handleChangeInputComponent}
                            />

                            <InputComponent
                                bloques={"col-6 col-sm-6 col-md-2"}
                                etiqueta={"Total Op."}
                                idInput={"totalop"}
                                nombreInput={"totalop"}
                                readOnly={true}
                                valorDefecto={this.props.sumPrecioVenta}
                                funcionControl={() => {}}
                            />

                            <InputComponent
                                tipoInput={"number"}
                                bloques={"col-6 col-sm-6 col-md-2"}
                                etiqueta={"A Cta."}
                                idInput={"acuenta"}
                                nombreInput={"acuenta"}
                                readOnly={false}
                                valorDefecto={this.props.aCuenta}
                                funcionControl={this.props.handleChangeInputComponent}
                            />
                        </div>
                    </div>
                    {this.renderModalAgregarItem()}
                </div>
            );
        }

        if (this.props.tipoComprobanteSeleccionado === '2'){ // PAGO
            return (
                <div className="row justify-content-center">
                    <div className="col-12 mt-1">
                        <div className="form-row">
                            <InputComponent
                                bloques={"mt-1 col-sm-4 col-md-3"}
                                labelBloques={"mt-1 col-sm-2 col-md-1"}
                                etiqueta={"Detalle"}
                                idInput={"detalle"}
                                nombreInput={"detalle"}
                                readOnly={false}
                                unaLinea={true}
                                valorDefecto={this.props.detalleGeneral}
                                funcionControl={this.props.handleChangeInputComponent}
                            />

                            <DataListComponent
                                unaLinea={true}
                                bloques={"mt-1 col-sm-4 col-md-2"}
                                labelBloques={"mt-1 col-sm-2 col-md-1"}
                                etiqueta={"Partida"}
                                idInput={"partida"}
                                nombreInput={"partida"}
                                valorLista={"idPartida"}
                                nombreLista={"nombrePartida"}
                                listaDatos={this.props.listaPartidas}
                                funcionControl={this.props.buscarIdPartida}
                                valorDefecto={this.props.nombrePartida}
                                readOnly={false}
                            />

                            <InputComponent
                                tipoInput={"number"}
                                bloques={"mt-1 col-sm-4 col-md-2"}
                                labelBloques={"mt-1 col-sm-2 col-md-1 text-right"}
                                etiqueta={"Total Op."}
                                idInput={"totalop"}
                                nombreInput={"totalop"}
                                readOnly={false}
                                valorDefecto={this.props.sumPrecioVenta}
                                unaLinea={true}
                                funcionControl={this.props.handleChangeInputComponent}
                            />

                            <InputComponent
                                tipoInput={"number"}
                                bloques={"mt-1 col-sm-4 col-md-1"}
                                labelBloques={"mt-1 col-sm-2 col-md-1 text-right"}
                                etiqueta={"A Cta."}
                                idInput={"acuenta"}
                                nombreInput={"acuenta"}
                                readOnly={true}
                                unaLinea={true}
                                valorDefecto={this.props.aCuenta}
                                funcionControl={this.props.handleChangeInputComponent}
                            />
                        </div>
                    </div>
                </div>
            );
        }

        if (this.props.tipoComprobanteSeleccionado === '3'){ // nota de credito
            return (
                <React.Fragment>
                    <div className="row justify-content-center">
                        <div className="col-12 mt-1">
                            <div className="form-row align-items-end">
                                <InputComponent
                                    bloques={"col-6"}
                                    labelBloques={"col-2"}
                                    etiqueta={"Detalle"}
                                    idInput={"detalle"}
                                    nombreInput={"detalle"}
                                    readOnly={false}
                                    unaLinea={true}
                                    funcionControl={() => {}}
                                />
                            </div>
                        </div>
                    </div>
                    <p>Información Nota de Crédito</p>
                    <div className="row justify-content-center">
                        <div className="col-12 mt-1">
                            <div className="form-row align-items-end">
                                <InputComponent
                                    bloques={"col-6"}
                                    labelBloques={"col-2"}
                                    etiqueta={"Código Motivo"}
                                    idInput={"codigomotivo"}
                                    nombreInput={"codigomotivo"}
                                    readOnly={false}
                                    unaLinea={true}
                                    funcionControl={() => {}}
                                />
                            </div>
                        </div>

                        <div className="col-12 mt-1">
                            <div className="form-row align-items-end">
                                <InputComponent
                                    bloques={"col-6"}
                                    labelBloques={"col-2"}
                                    etiqueta={"Descripción Motivo"}
                                    idInput={"descripcionmotivo"}
                                    nombreInput={"descripcionmotivo"}
                                    readOnly={false}
                                    unaLinea={true}
                                    funcionControl={() => {}}
                                />
                            </div>
                        </div>

                        <div className="col-12 mt-1">
                            <div className="form-row align-items-end">
                                <SelectComponent
                                    bloques={"col-6"}
                                    labelBloques={"col-2"}
                                    etiqueta={"Tipo de Comprobante"}
                                    idSelect={"tipodecomprobante"}
                                    nombreSelect={"tipodecomprobante"}
                                    esJson={true}
                                    contenido={
                                        [
                                            {cod: 0, nombre: "Boleta"},
                                            {cod: 1, nombre: "Factura"},
                                            {cod: 2, nombre: "Otros"},
                                        ]
                                    }
                                    nombreValor={"cod"}
                                    nombreMostrar={"nombre"}
                                    funcionControl={() => {}}
                                    unaLinea={true}
                                />
                            </div>
                        </div>

                        <div className="col-12 mt-1">
                            <div className="form-row align-items-end">
                                <InputComponent
                                    bloques={"col-2"}
                                    labelBloques={"col-2"}
                                    etiqueta={"Serie"}
                                    idInput={"serie"}
                                    nombreInput={"serie"}
                                    readOnly={false}
                                    unaLinea={true}
                                    funcionControl={() => {}}
                                />

                                <InputComponent
                                    bloques={"col-2"}
                                    labelBloques={" offset-1 col-1 text-right"}
                                    etiqueta={"Número"}
                                    idInput={"numero"}
                                    nombreInput={"numero"}
                                    readOnly={false}
                                    unaLinea={true}
                                    funcionControl={() => {}}
                                />
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        }

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

let opciones_tipo_medida_lista = [];
opciones_tipo_medida_lista["NIU"] = 'Unidad (Bienes)' ;
opciones_tipo_medida_lista["ZZ"] = 'Unidad (Servicios)' ;
opciones_tipo_medida_lista["4A"] = 'Bobinas' ;
opciones_tipo_medida_lista["BJ"] = 'Balde' ;
opciones_tipo_medida_lista["BLL"] = 'Barriles' ;
opciones_tipo_medida_lista["BG"] = 'Bolsa' ;
opciones_tipo_medida_lista["BO"] = 'Botellas' ;
opciones_tipo_medida_lista["BX"] = 'Caja' ;
opciones_tipo_medida_lista["CT"] = 'Cartones' ;
opciones_tipo_medida_lista["CMK"] = 'Centimetro Cuadrado' ;
opciones_tipo_medida_lista["CMQ"] = 'Centimetro Cubico' ;
opciones_tipo_medida_lista["CMT"] = 'Centimetro Lineal' ;
opciones_tipo_medida_lista["CEN"] = 'Ciento de Unidades' ;
opciones_tipo_medida_lista["CY"] = 'Cilindro' ;
opciones_tipo_medida_lista["CJ"] = 'Conos' ;
opciones_tipo_medida_lista["DZN"] = 'Docena' ;
opciones_tipo_medida_lista["DZP"] = 'Docena por 10**6' ;
opciones_tipo_medida_lista["BE"] = 'Fardo' ;
opciones_tipo_medida_lista["GLI"] = 'Galon Inglés (4,545956L)' ;
opciones_tipo_medida_lista["GRM"] = 'Gramo' ;
opciones_tipo_medida_lista["GRO"] = 'Gruesa' ;
opciones_tipo_medida_lista["HLT"] = 'Hectolitro' ;
opciones_tipo_medida_lista["LEF"] = 'Hoja' ;
opciones_tipo_medida_lista["SET"] = 'Juego' ;
opciones_tipo_medida_lista["KGM"] = 'Kilogramo' ;
opciones_tipo_medida_lista["KTM"] = 'Kilometro' ;
opciones_tipo_medida_lista["KWH"] = 'Kilovatio Hora' ;
opciones_tipo_medida_lista["KT"] = 'Kit' ;
opciones_tipo_medida_lista["CA"] = 'Latas' ;
opciones_tipo_medida_lista["LBR"] = 'Libras' ;
opciones_tipo_medida_lista["LTR"] = 'Litro' ;
opciones_tipo_medida_lista["MWH"] = 'Megawatt Hora' ;
opciones_tipo_medida_lista["MTR"] = 'Metro' ;
opciones_tipo_medida_lista["MTK"] = 'Metro Cuadrado' ;
opciones_tipo_medida_lista["MTQ"] = 'Metro Cúbico' ;
opciones_tipo_medida_lista["MGM"] = 'Miligramos' ;
opciones_tipo_medida_lista["MLT"] = 'Mililitro' ;
opciones_tipo_medida_lista["MMT"] = 'Milimetro' ;
opciones_tipo_medida_lista["MMK"] = 'Milimetro Cuadrado' ;
opciones_tipo_medida_lista["MMQ"] = 'Milimetro Cúbico' ;
opciones_tipo_medida_lista["MLL"] = 'Millares' ;
opciones_tipo_medida_lista["UM"] = 'Millón de Unidades' ;
opciones_tipo_medida_lista["ONZ"] = 'Onzas' ;
opciones_tipo_medida_lista["PF"] = 'Paletas' ;
opciones_tipo_medida_lista["PK"] = 'Paquete' ;
opciones_tipo_medida_lista["PR"] = 'Par' ;
opciones_tipo_medida_lista["FOT"] = 'Pies' ;
opciones_tipo_medida_lista["FTK"] = 'Pies Cuadrados' ;
opciones_tipo_medida_lista["FTQ"] = 'Pies Cúbicos' ;
opciones_tipo_medida_lista["C62"] = 'Piezas' ;
opciones_tipo_medida_lista["PG"] = 'Placas' ;
opciones_tipo_medida_lista["ST"] = 'Pliego' ;
opciones_tipo_medida_lista["INH"] = 'Pulgadas' ;
opciones_tipo_medida_lista["RM"] = 'Resma' ;
opciones_tipo_medida_lista["DR"] = 'Tambor' ;
opciones_tipo_medida_lista["STN"] = 'Tonelada Corta' ;
opciones_tipo_medida_lista["LTN"] = 'Tonelada Larga' ;
opciones_tipo_medida_lista["TNE"] = 'Toneladas' ;
opciones_tipo_medida_lista["TU"] = 'Tubos' ;
opciones_tipo_medida_lista["GLL"] = 'US Galón (3.7843 L)' ;
opciones_tipo_medida_lista["YRD"] = 'Yarda' ;
opciones_tipo_medida_lista["YDK"] = 'Yarda Cuadrada' ;

const opciones_tipo_afecto_item = [
    { tipoAfecto: 0, nombre: 'Gravado' },
    { tipoAfecto: 1, nombre: 'Exonerado' },
    { tipoAfecto: 2, nombre: 'Inafecto' },
    { tipoAfecto: 3, nombre: 'Exportación' }
];
const opciones_tipo_afecto_servicio = [
    { tipoAfecto: 1, nombre: 'Exonerado' },
    { tipoAfecto: 0, nombre: 'Gravado' },
    { tipoAfecto: 2, nombre: 'Inafecto' },
    { tipoAfecto: 3, nombre: 'Exportación' }
];

export default DetallesVenta;