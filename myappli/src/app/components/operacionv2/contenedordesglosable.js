import React, {Component} from 'react';
import Desglosables from "./desglosables";
import DatosGenerales from "./datosgenerales";
import DatosCliente from "./datoscliente";
import DetallesVenta from "./detallesventa";
import Otros from "./otros";

class ContenedorDesglosable extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="accordion" id="accordionExample">

                <Desglosables
                    id={"datosgenerales"}
                    titulo={"DATOS GENERALES"}
                    comentario={"(desglosar)"}
                    abierto={true}
                >
                    <DatosGenerales
                        tipoMovimientoSeleccionado={this.props.tipoMovimientoSeleccionadoG}

                        listaSucursales={this.props.listaSucursalesG}
                        sucursalSeleccionado={this.props.sucursalSeleccionadoG}
                        handleChangeSelectComponent={this.props.handleChangeSelectComponentG}
                        handleChangeInputComponent={this.props.handleChangeInputComponentG}

                        listaFuentes={this.props.listaFuentesG}
                        fuenteSeleccionada={this.props.fuenteSeleccionadaG}

                        tipoComprobanteSeleccionado={this.props.tipoComprobanteSeleccionadoG}

                        fechaActual={this.props.fechaActualG}


                        numSerieComprobante={this.props.numSerieComprobanteG}
                        numComprobante={this.props.numComprobanteG}
                    />

                </Desglosables>

                <Desglosables
                    id={"datoscliente"}
                    titulo={"DATOS DEL CLIENTE"}
                    comentario={"(desglosar)"}
                >
                    <DatosCliente
                        handleChangeSelectComponent={this.props.handleChangeSelectComponentG}
                        handleChangeInputComponent={this.props.handleChangeInputComponentG}

                        rucCliente={this.props.rucClienteG}
                        handleOnBlur={this.props.handleOnBlurG}
                        idCliente={this.props.idClienteG}
                        numDocCliente={this.props.numDocClienteG}
                        tipDocCliente={this.props.tipDocClienteG}
                        razSocialCliente={this.props.razSocialClienteG}
                        direccionCliente={this.props.direccionClienteG}
                        telefonoCliente={this.props.telefonoClienteG}
                        correoCliente={this.props.correoClienteG}
                        codPaisCliente={this.props.codPaisClienteG}
                        codUbigeoCliente={this.props.codUbigeoClienteG}

                        crearNuevoelemento={this.props.crearNuevoelementoG}
                        borrarDatosSobreCliente={this.props.borrarDatosSobreClienteG}
                    />
                </Desglosables>

                <Desglosables
                    id={"detallesventa"}
                    titulo={"DETALLES DE VENTA"}
                    comentario={"(desglosar)"}
                    abierto={true}
                >
                    <DetallesVenta
                        tipoComprobanteSeleccionado={this.props.tipoComprobanteSeleccionadoG}
                        handleOnClickButton={this.props.handleOnClickButtonG}

                        listaItemsVenta={this.props.listaItemsVentaG}


                        // ----------------------------------------------------------------------------
                        // ----------------------------------------------------------------------------
                        // MODAL ITEMS

                        selectShowAddItem={this.props.selectShowAddItemG}
                        sumPrecioVenta={this.props.sumPrecioVentaG}
                        handleInputChange={this.props.handleInputChangeG}
                        handleSelectChange={this.props.handleSelectChangeG}
                        loadMultipleSelectValues={this.props.loadMultipleSelectValuesG}
                        setAdminOption={this.props.setAdminOptionG}
                        CloseItemModal={this.props.CloseItemModalG}
                        searchProducto={this.props.searchProductoG}
                        getFilaProducto={this.props.getFilaProductoG}
                        removeItem={this.props.removeItemG}
                        flagItem={this.props.flagItemG}
                        tipoComprobante={this.props.tipoComprobanteG}
                        style_servicio={this.props.style_servicioG}
                        style_item={this.props.style_itemG}
                        showAddItem={this.props.showAddItemG}
                        detalleGeneral={this.props.detalleGeneralG}
                        cabeceras_modal_select={this.props.cabeceras_modal_selectG}
                        contenido_modal_select={this.props.contenido_modal_selectG}
                        modalArray={this.props.modalArrayG}
                        modal_buscar={this.props.modal_buscarG}
                        sucursales={this.props.sucursalesG}

                        borrarDatosModalProduto={this.borrarDatosModalProdutoG}

                        sumTotTributos={this.props.sumTotTributosG} //
                        sumTotValVenta={this.props.sumTotValVentaG} //

                        handleChangeInputComponent={this.props.handleChangeInputComponentG}
                        handleChangeSelectComponent={this.props.handleChangeSelectComponentG}

                        aCuenta={this.props.aCuentaG}


                        ref_buscar_item={this.props.ref_buscar_itemG}
                        ref_precio_item={this.props.ref_precio_itemG}
                        ref_cantidad_item={this.props.ref_cantidad_itemG}
                        ref_medida_item={this.props.ref_medida_itemG}
                        ref_afecto_item={this.props.ref_afecto_itemG}

                        listaPartidas={this.props.listaPartidasG}
                        buscarIdPartida={this.props.buscarIdPartidaG}
                        nombrePartida={this.props.nombrePartidaG}

                        // ----------------------------------------------------------------------------
                        // ----------------------------------------------------------------------------
                        // ----------------------------------------------------------------------------


                    />
                </Desglosables>

                <Desglosables
                    id={"otros"}
                    titulo={"OTROS"}
                    comentario={"(desglosar)"}
                >
                    <Otros
                        sumPrecioVenta_temp={this.props.sumPrecioVenta_tempG}
                        sumDescTotal={this.props.sumDescTotalG}
                        sumOtrosCargos={this.props.sumOtrosCargosG}
                        costVenta={this.props.costVentaG}
                        costServicio={this.props.costServicioG}
                        fecVencimiento={this.props.fecVencimientoG}
                        handleChangeInputComponent={this.props.handleChangeInputComponentG} //
                        handleChangeSelectComponent={this.props.handleChangeSelectComponentG}
                        tipMoneda={this.props.tipMonedaG}
                        tipoCambio={this.props.tipoCambioG}
                        sumOtrosCargos={this.props.sumOtrosCargosG}
                        aCreditoDias={this.props.aCreditoDiasG}
                        codOperacionRelacionado={this.props.codOperacionRelacionadoG}


                    />
                </Desglosables>


            </div>
        );
    }
}

export default ContenedorDesglosable;