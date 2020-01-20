import React, { Component } from 'react';
import ModalAdmin from './modales/modalAdmin';


class ModalesOld extends Component {
    render() {
        return (
            <div id="modales">
                <ModalAdmin
                    clearNuevo={this.props.clearNuevo} // -------------------------
                    saveNuevo={this.props.saveNuevo} // --------------
                    handleInputChange={this.props.handleInputChange} // ---------------
                    handleSelectChange={this.props.handleSelectChange}

                    opcionAdminOld={this.props.opcionAdmin} // --------------

                    sucursales={this.props.sucursales}
                    opcionesTipoMedida={this.props.opcMedida}

                    listaPartidas={this.props.listaPartidas}

                    nuevoNombreProducto={this.props.nuevoNombreProducto}
                    nuevoPrecioProducto={this.props.nuevoPrecioProducto}
                    nuevoStockProducto={this.props.nuevoStockProducto}
                    nuevoCostoVenta={this.props.nuevoCostoVenta}
                    nuevoSerieProducto={this.props.nuevoSerieProducto}
                    nuevoSucursalProducto={this.props.nuevoSucursalProductoPadre}
                    nuevoUnidadMedidaProducto={this.props.nuevoUnidadMedidaProductoPadre}

                    nuevoIdPartida={this.props.nuevoIdPartida}
                    nuevaFechaVencimiento={this.props.nuevaFechaVencimiento}

                />

            </div>
        )
    }
}

export default ModalesOld;
