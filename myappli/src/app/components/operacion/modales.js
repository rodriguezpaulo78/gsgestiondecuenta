import React, { Component } from 'react';
import ModalSucursales from './modales/modalSucursales';
import ModalFuentes from './modales/modalFuentes';
import ModalOperaciones from './modales/modalOperaciones';
import ModalPartidas from './modales/modalPartidas';
import ModalAdmin from './modales/modalAdmin';
import ModalAdminEditar from './modales/modalAdminEditar';
import ModalAdminCliente from './modales/modalAdminCliente';
import ModalImpresion from "./modales/modalImpresion";


class Modales extends Component {
    render() {
        return (
            <div id="modales">

                <ModalImpresion
                    items={this.props.listaItems}
                    totalValorCompraM={this.props.totalValorComVent}
                    sumatoriaTributosM={this.props.totalSumTributos}
                    totalDescuentoM={this.props.totalDescuentos}
                    sumatoriaOtrosCargosM={this.props.totalOtrosCargos}
                    totalPrecioVentaM={this.props.totalVenta}
                    detalleGeneralM={this.props.detalleGeneral}
                    numDocumentoClienteM={this.props.numDocumentoCliente}
                    razonSocialClienteM={this.props.razonSocialCliente}
                    direccionClienteM={this.props.direccionCliente}
                />

                <ModalSucursales
                    buscarPor={this.props.buscarPor}
                    setAdminOption={this.props.setAdminOption}
                    clearModal={this.props.clearModal}
                    getFilaSucursal={this.props.getFilaSucursal}

                    cabeceras_modal_select={this.props.cabeceras_modal_select}
                    contenido_modal_select={this.props.contenido_modal_select}
                    ref_sucursal={this.props.ref_sucursal}
                />

                <ModalFuentes
                    buscarPor={this.props.buscarPor}
                    setAdminOption={this.props.setAdminOption}
                    clearModal={this.props.clearModal}
                    getFilaFuente={this.props.getFilaFuente}

                    cabeceras_modal_select={this.props.cabeceras_modal_select}
                    contenido_modal_select={this.props.contenido_modal_select}
                    ref_fuente={this.props.ref_fuente}
                />

                <ModalOperaciones
                    buscarPor={this.props.buscarPor}
                    clearModal={this.props.clearModal}
                    getFilaOperacion={this.props.getFilaOperacion}

                    cabeceras_modal_select={this.props.cabeceras_modal_select}
                    contenido_modal_select={this.props.contenido_modal_select}
                    ref_operacion={this.props.ref_operacion}
                />

                <ModalPartidas
                    buscarPor={this.props.buscarPor}
                    setAdminOption={this.props.setAdminOption}
                    clearModal={this.props.clearModal}
                    getFilaPartida={this.props.getFilaPartida}

                    cabeceras_modal_select={this.props.cabeceras_modal_select}
                    contenido_modal_select={this.props.contenido_modal_select}
                    ref_partida={this.props.ref_partida}
                />

                <ModalAdmin
                    clearNuevo={this.props.clearNuevo}
                    saveNuevo={this.props.saveNuevo}
                    handleInputChange={this.props.handleInputChange}
                    handleSelectChange={this.props.handleSelectChange}

                    opcionAdmin={this.props.opcionAdmin}
                    nuevoNombreSucursal={this.props.nuevoNombreSucursal}
                    nuevodireccionSucursal={this.props.nuevodireccionSucursal}
                    nuevoDistrito={this.props.nuevoDistrito}
                    nuevoProvincia={this.props.nuevoProvincia}
                    nuevoDepartamento={this.props.nuevoDepartamento}

                    sucursales={this.props.sucursales}
                    opcionesTipoMedida={this.props.opcMedida}

                    nuevoNombrePartida={this.props.nuevoNombrePartida}
                    nuevoGrupoPartida={this.props.nuevoGrupoPartida}
                    nuevoOtroGrupoPartida={this.props.nuevoOtroGrupoPartida}
                    opciones_nuevo_grupo_partida={this.props.opciones_nuevo_grupo_partida}

                    nuevoNombreFuente={this.props.nuevoNombreFuente}
                    nuevoSaldoFuente={this.props.nuevoSaldoFuente}


                    nuevoNombreProducto={this.props.nuevoNombreProducto}
                    nuevoPrecioProducto={this.props.nuevoPrecioProducto}
                    nuevoStockProducto={this.props.nuevoStockProducto}
                    nuevoCostoVenta={this.props.nuevoCostoVenta}
                    nuevoSerieProducto={this.props.nuevoSerieProducto}
                    nuevoSucursalProducto={this.props.nuevoSucursalProductoPadre}
                    nuevoUnidadMedidaProducto={this.props.nuevoUnidadMedidaProductoPadre}
                    nuevoIdPartida={this.props.nuevoIdPartida}
                    nuevaFechaVencimiento={this.props.nuevaFechaVencimiento}
                    listaPartidas={this.props.listaPartidas}


                />
                <ModalAdminCliente
                    clearNuevo={this.props.clearNuevo}
                    saveNuevo={this.props.saveNuevo}
                    handleSelectChange={this.props.handleSelectChange}
                    handleInputChange={this.props.handleInputChange}

                    opcionAdmin={this.props.opcionAdmin}
                    nuevoTipDocUsuario={this.props.nuevoTipDocUsuario}
                    nuevoNumDocUsuario={this.props.nuevoNumDocUsuario}
                    nuevoRazSocial={this.props.nuevoRazSocial}
                    nuevoDesDireccionCliente={this.props.nuevoDesDireccionCliente}
                    nuevoTelefonoCliente={this.props.nuevoTelefonoCliente}
                    nuevoCorreoCliente={this.props.nuevoCorreoCliente}
                    nuevoCodPaisCliente={this.props.nuevoCodPaisCliente}
                    nuevoCodUbigeoCliente={this.props.nuevoCodUbigeoCliente}
                />

                <ModalAdminEditar
                    clearNuevo={this.props.clearNuevo}
                    saveNuevo={this.props.saveNuevo}
                    handleSelectChange={this.props.handleSelectChange}
                    handleInputChange={this.props.handleInputChange}

                    opcionAdmin={this.props.opcionAdmin}
                    nuevoTipDocUsuario={this.props.nuevoTipDocUsuario}
                    nuevoNumDocUsuario={this.props.nuevoNumDocUsuario}
                    nuevoRazSocial={this.props.nuevoRazSocial}
                    nuevoDesDireccionCliente={this.props.nuevoDesDireccionCliente}
                    nuevoTelefonoCliente={this.props.nuevoTelefonoCliente}
                    nuevoCorreoCliente={this.props.nuevoCorreoCliente}
                    nuevoCodPaisCliente={this.props.nuevoCodPaisCliente}
                    nuevoCodUbigeoCliente={this.props.nuevoCodUbigeoCliente}
                />

            </div>
        )
    }
}

export default Modales;
