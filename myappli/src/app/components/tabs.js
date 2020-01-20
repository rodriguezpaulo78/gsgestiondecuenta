import React, { Component } from 'react';
import Inicio from './inicio/inicio';
import Operacion from './operacion/operacion'; 
import Inventario from './inventario/inventario';
import EstadosFinancieros from './estados/estadosfinancieros'; 

class Tabs extends Component {
    render() { 
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top flex-sm-row custom-nav">
                    <button className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarTabs"
                        aria-controls="navbarTabs"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTabs">

                        <ul className="navbar-nav nav nav-tabs mr-auto mt-2 mt-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active"
                                   id="inicio-tab"
                                   data-toggle="tab"
                                   href="#inicio"
                                   role="tab"
                                   aria-controls="inicio"
                                   aria-selected="true">
                                    Inicio
                                    <span className="sr-only">
                                            (current)
                                    </span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"
                                    id="operacion-tab"
                                    data-toggle="tab"
                                    href="#operacion"
                                    role="tab"
                                    aria-controls="operacion"
                                    aria-selected="false">
                                    Operaciones
                                    </a>
                            </li>
                            
                            <li className="nav-item">
                                <a className="nav-link"
                                    id="inventario-tab"
                                    data-toggle="tab"
                                    href="#inventario"
                                    role="tab"
                                    aria-controls="item"
                                    aria-selected="false">
                                    Inventario
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"
                                    id="estados_financieros-tab"
                                    data-toggle="tab"
                                    href="#estados_financieros"
                                    role="tab"
                                    aria-controls="item"
                                    aria-selected="false">
                                    Estados Financieros
                                </a>
                            </li>
                        </ul>
                    </div>
                    <p className="text-white mt-2" style={{fontSize: '20px'}}>
                    🏧
                    </p>
                </nav>
                <div className="tab-content">
                    <div className="tab-pane fade show active"
                         id="inicio"
                         role="tabpanel"
                         aria-labelledby="tab-inicio">
                        <Inicio/>
                    </div>
                    <div className="tab-pane fade show"
                        id="operacion"
                        role="tabpanel"
                        aria-labelledby="tab-operacion">
                        <Operacion/>
                    </div>
                    
                    <div className="tab-pane fade"
                        id="inventario"
                        role="tabpanel"
                        aria-labelledby="tab-inventario">
                        <Inventario />
                    </div>

                    <div className="tab-pane fade"
                        id="estados_financieros"
                        role="tabpanel"
                        aria-labelledby="tab-estados_financieros">
                        <EstadosFinancieros />
                    </div>

                </div>
            </div>
        )
    }

}

export default Tabs;
