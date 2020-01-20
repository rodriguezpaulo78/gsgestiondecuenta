import React, { Component} from 'react';

import ModalImportarCsv from './modales/modalImportarCsv';
import ModalActualizarCsv from "./modales/modalActualizarCsv";

class ModalesInventario extends Component{
    constructor(props){
        super(props);
    }

    render() {
        console.log("Render Componente Modal");
        console.log(this.props.listaSucursalesImportar);
        console.log("--------------------");
        return (
            <div id="modalesInventario">
                <ModalImportarCsv
                    listaSucursales={this.props.listaSucursalesImportar}
                />

                <ModalActualizarCsv />
            </div>
        );
    }
}

export default ModalesInventario;