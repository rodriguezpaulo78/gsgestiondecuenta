import React, { Component } from 'react';
import NuevaOperacion from './nuevaoperacion';
import Registros from './registros';

class Operacion extends Component {

  render() {
    return (
        <React.Fragment>
            <ul className = "nav nav-tabs fixed-top custom-sub-main-tab custom-h-25" role = "tablist">
                <li className = "nav-item active-tab custom-h-25">
                    <a className = "py-0 nav-link active custom-h-25"
                       id = "nueva-operacion-tab"
                       data-toggle = "tab"
                       href = "#nueva-operacion"
                       role = "tab"
                       aria-controls = "nueva operacion"
                       aria-selected = "true">

                        <p className  = "py-0">Nueva Operación</p>
                    </a>
                </li>
                <li className = "nav-item active_tab custom-h-25">
                    <a className = "py-0 nav-link custom-h-25"
                       id = "registro-operacion-tab"
                       data-toggle = "tab"
                       href = "#registro-operacion"
                       role = "tab"
                       aria-controls = "item"
                       aria-selected = "false">

                       <p className  = "py-0">Registros</p>

                    </a>
                </li>
            </ul>
            <div className = "tab-content custom-sub-tab-content">
                <div className ="tab-pane fade show active"
                     id = "nueva-operacion"
                     role = "tabpanel"
                     aria-labelledby = "tab nueva operacion">

                        <NuevaOperacion />

                </div>
                <div className ="tab-pane fade"
                     id = "registro-operacion"
                     role = "tabpanel"
                     aria-labelledby = "tab registro operacion">

                        <Registros />

                </div>
            </div>
        </React.Fragment>
    )
  }
  
}

export default Operacion;
