import React, { Component } from "react";
import Cookies from 'js-cookie';

import './presentacion.style.css';

import ListaProductos from "./listaproductos";
import NuevaOperacion from "../operacion/nuevaoperacion";
import Registros from "../operacion/registros";
import Inventario from "../inventario/inventario";
import MovimientoInterno from "../movimientointerno/movimientointerno";
import ImportarExistencias from "../importarexistencias/importarexistencias";
import ActualizarExistencias from "../actualizarexistencias/actualizarexistencias";
import Estados from "../estados/estados";
import AdministrarUsuarios from "../administrarusuarios/administrarusuarios";
import OperacionV2 from "../operacionv2/operacionv2";
import Parametros from "../parametros/parametros";
import DatosEmpresa from "../parametros/datosempresa";
import ConfiguracionImpresion from "../parametros/configuracionimpresion";
import ImportarBD from "../parametros/importarBD";

class Presentacion extends Component{
    constructor(props){
        super(props);

        /*
        0 => Home

        100 ===> OPERACIONES
        103 => OperacionesV2 => Operaciones
        101 => OperacionesV1 => Otras Operaciones
        102 => Movimientos y Consultar

        200 ===> EXISTENCIAS
        201 => Stock de Existencias
        202 => Movimientos por Ventas
        203 => Movimiento Interno
        204 => Importar Existencias
        205 => Actualizar Existencias

        300 ===> Estados Financieros

        400 ===> Administrador de Usuarios

        500 ===> Parametros
        501 => Crear Elementos
        502 => Datos de la Empresa

        503 => Configuración de Impresión
        504 => Importar BD

        */
        this.state = {
            contenido: "0",
            titulo: "",
            permisos: [],
            enEspera: true,
        };

        setTimeout(() => {
            fetch(
                '/permisos',{
                //'/permisos',{
                    method: 'POST',
                    body: JSON.stringify({
                        token: Cookies.get('sdgUsr'),
                        apiKey: "GdC2019",
                    }),
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                }
            )
                .then(res => res.json())
                .then(data => {
                    console.log("PERMISO");
                    console.log("Permisos obtenidos:", data);
                    this.setState({
                        permisos: data,
                    });
                })
                .catch(err => console.log("Error:",err));

            this.setState({
                enEspera: false,
            });
        }, 1500);

        this.renderSide = this.renderSide.bind(this);
        this.renderPageContent = this.renderPageContent.bind(this);
        this.renderNavbar = this.renderNavbar.bind(this);
        this.handleMenu = this.handleMenu.bind(this);
    }

    handleMenu(evt){
        let opcionMenu = evt.target.name;
        if (opcionMenu === "home"){
            this.setState({
                contenido: '0',
                titulo: "",
            });
        }
        if (opcionMenu === "operaciones"){
            this.setState({
                contenido: '101',
                titulo: "Otras Operaciones",
            });
        }
        if (opcionMenu === "operacionesv2"){
            this.setState({
                contenido: '103',
                titulo: "Operaciones",
            });
        }
        if (opcionMenu === "movimientosconsutas"){
            this.setState({
                contenido: '102',
                titulo: "Movimientos y Consultas",
            });
        }
        if (opcionMenu === "stockexistencias"){
            this.setState({
                contenido: '201',
                titulo: "Stock de Existencias",
            });
        }
        if (opcionMenu === "movimientosventas"){
            this.setState({
                contenido: '202',
                titulo: "Movimientos por Ventas",
            });
        }
        if (opcionMenu === "movimientosinternos"){
            this.setState({
                contenido: '203',
                titulo: "Movimientos Internos",
            });
        }
        if (opcionMenu === "importarexistencias"){
            this.setState({
                contenido: '204',
                titulo: "Importar Existencias",
            });
        }
        if (opcionMenu === "actualizarexistencias"){
            this.setState({
                contenido: '205',
                titulo: "Actualizar Existencias",
            });
        }
        if (opcionMenu === "estadosfinancieros"){
            this.setState({
                contenido: '300',
                titulo: "Estados Financieros",
            });
        }
        if (opcionMenu === "administrarusuarios"){
            this.setState({
                contenido: '400',
                titulo: "Administrar Usuarios",
            });
        }
        if (opcionMenu === "crearelementos"){
            this.setState({
                contenido: '501',
                titulo: "Crear Elementos",
            });
        }
        if (opcionMenu === "datosempresa"){
            this.setState({
                contenido: '502',
                titulo: "Datos Empresa",
            });
        }
        if (opcionMenu === "configuracionimpresion"){
            this.setState({
                contenido: '503',
                titulo: "Configuración de Impresión",
            });
        }
        
        if (opcionMenu === "importarBD"){
            this.setState({
                contenido: '504',
                titulo: "Importar Base de Datos",
            });
        }
        
        //Cerrar Sesion
        
    }

    renderSide(){
        return (
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3 className="text-center">
                        <img src="/img/GestionDeCuentas.png" alt="Logo" width="100%"/>
                    </h3>
                </div>

                <ul className="list-unstyled components">
                    <li className="active">
                        <a href="#" onClick={this.handleMenu} name="home">Home</a>
                    </li>
                    {
                        ((this.state.permisos.indexOf(1) > -1) || (this.state.permisos.indexOf(2) > -1) || (this.state.permisos.indexOf(3)  > -1)) && (
                            <li>
                                <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false"
                                   className="dropdown-toggle">Operaciones</a>
                                <ul className="collapse list-unstyled" id="homeSubmenu">
                                    {
                                        (this.state.permisos.indexOf(1) > -1) && (
                                            <li>
                                                <a href="#" onClick={this.handleMenu} name="operacionesv2">Operaciones</a>
                                            </li>
                                        )
                                    }
                                    {
                                        (this.state.permisos.indexOf(2) > -1) && (
                                            <li>
                                                <a href="#" onClick={this.handleMenu} name="operaciones">Otras Operaciones</a>
                                            </li>
                                        )
                                    }
                                    {
                                        (this.state.permisos.indexOf(3) > -1) && (
                                            <li>
                                                <a href="#" onClick={this.handleMenu} name="movimientosconsutas">Movimientos y Consultar</a>
                                            </li>
                                        )
                                    }
                                </ul>
                            </li>
                        )
                    }
                    {
                        ((this.state.permisos.indexOf(4) > -1) || (this.state.permisos.indexOf(5) > -1) || (this.state.permisos.indexOf(6) > -1) || (this.state.permisos.indexOf(7) > -1) || (this.state.permisos.indexOf(8) > -1)) && (
                            <li>
                                <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false"
                                   className="dropdown-toggle">Existencias</a>
                                <ul className="collapse list-unstyled" id="pageSubmenu">
                                    {
                                        (this.state.permisos.indexOf(4) > -1) && (
                                            <li>
                                                <a href="#" onClick={this.handleMenu} name="stockexistencias">Stock de Existencias</a>
                                            </li>
                                        )

                                    }
                                    {
                                        (this.state.permisos.indexOf(5) > -1) && (
                                            <li>
                                                <a href="#" onClick={this.handleMenu} name="movimientosventas">Movimientos por Ventas</a>
                                            </li>
                                        )
                                    }
                                    {
                                        (this.state.permisos.indexOf(6) > -1) && (
                                            <li>
                                                <a href="#" onClick={this.handleMenu} name="movimientosinternos">Movimiento Interno</a>
                                            </li>
                                        )
                                    }
                                    {
                                        (this.state.permisos.indexOf(7) > -1) && (
                                            <li>
                                                <a href="#"onClick={this.handleMenu} name="importarexistencias">Importar Existencias</a>
                                            </li>
                                        )
                                    }
                                    {
                                        (this.state.permisos.indexOf(8) > -1) && (
                                            <li>
                                                <a href="#" onClick={this.handleMenu} name="actualizarexistencias">Actualizar Existencias</a>
                                            </li>
                                        )
                                    }
                                </ul>
                            </li>
                        )
                    }
                    {
                        (this.state.permisos.indexOf(9) > -1) && (
                            <li>
                                <a href="#" onClick={this.handleMenu} name="estadosfinancieros">Estados Financieros</a>
                            </li>
                        )
                    }
                    {
                        ((this.state.permisos.indexOf(10) > -1) || (this.state.permisos.indexOf(11) > -1) || (this.state.permisos.indexOf(12) > -1)) && (
                            <li>
                                <a href="#parametros" data-toggle="collapse" aria-expanded="false"
                                   className="dropdown-toggle">Parametros</a>
                                <ul className="collapse list-unstyled" id="parametros">
                                    {
                                        (this.state.permisos.indexOf(10) > -1) && (
                                            <li>
                                                <a href="#" onClick={this.handleMenu} name="crearelementos">Crear Elementos</a>
                                            </li>
                                        )
                                    }
                                    {
                                        (this.state.permisos.indexOf(11) > -1) && (
                                            <li>
                                                <a href="#" onClick={this.handleMenu} name="datosempresa">Datos de Empresa</a>
                                            </li>
                                        )
                                    }
                                    {
                                        (this.state.permisos.indexOf(12) > -1) && (
                                            <li>
                                                <a href="#" onClick={this.handleMenu} name="configuracionimpresion">Configuración de Impresión</a>
                                            </li>
                                        )
                                    }
                                    {
                                        (this.state.permisos.indexOf(13) > -1) && (
                                            <li>
                                                <a href="#" onClick={this.handleMenu} name="importarBD">Importar Base de Datos</a>
                                            </li>
                                        )
                                    }
                                    
                                </ul>
                            </li>
                        )
                    }
                    {
                        (this.state.permisos.indexOf(13) > -1) && (
                            <li>
                                <a href="#" onClick={this.handleMenu} name="administrarusuarios">Administrador de Usuarios</a>
                            </li>
                        )
                    }
                    
                    {
                        //Boton cerrar sesion
                            <li>
                                <a className="bg-dark text-white" href="/usuarios/cerrarsesion" onClick={this.handleMenu} name="cerrarsesion">Cerrar Sesion</a>
                            </li>
                        
                    }
                        
                    
                </ul>

                <ul className="list-unstyled CTAs">
                    <li>
                        <a href="#" className="download d-none" onClick={this.handleMenu} name="otrasopciones">Más Opciones</a>
                    </li>
                </ul>
            </nav>
        );
    }

    renderNavbar(){
        return (
            <React.Fragment>
                <button type="button" id="sidebarCollapse" className="navbar-btn" style={{float: "left", marginTop: '-10px', marginLeft: '-10px'}}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <nav className="navbar sticky-top navbar-expand-sm navbar-light pull-right" style={{background: this.state.contenido === '0'? "transparent": '#21409b', marginTop: "-20px" , marginLeft: "40%", height: "40px",  borderRadius: "0px 0px 15px 15px"}}>
                    <div className="container-fluid">
                        <h4 className="ml-2 push-left text-white">{this.state.titulo}</h4>
                    </div>
                </nav>
            </React.Fragment>
        );
    }

    renderPageContent(){
        return (
            <div className="container" style={{color: "white"}}>
                <div className="row marco mt-5">
                    <div className="col-12 mt-3 display-4 title">
                        <strong>Home.</strong>
                    </div>
                    <div className="col-12 mt-5 menu">
                        <div className="row">
                            <div className="col-4">
                                <a onClick={() => this.setState({contenido: "400"})}><strong>Administrador de Usuarios</strong></a>
                            </div>
                            <div className="col-8">
                                <strong>Operaciones</strong>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="offset-4 col-8">
                                <a onClick={() => this.setState({contenido: "103",titulo: "Operaciones",})}>Operaciones</a> | <a onClick={() => this.setState({contenido: "102",titulo: "Movimientos y Consultas",})}>Movimientos Y Consultas</a>
                            </div>
                        </div>

                        <div className="row mt-5">
                            <div className="col-4">
                                <a onClick={() => this.setState({contenido: "300", titulo: "Estados Financieros",})}><strong>Estados Financieros</strong></a>
                            </div>
                            <div className="col-8">
                                <strong>Existencias</strong>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="offset-4 col-8 mb-5">
                                <a onClick={() => this.setState({contenido: "201", titulo: "Stock de Existencias",})}>Stock de Existencias</a> | <a onClick={() => this.setState({contenido: "202", titulo: "Movimientos por Ventas",})}>Movimiento por Ventas</a> | <a onClick={() => this.setState({contenido: "203", titulo: "Movimientos Internos",})}>Movimientos Internos</a> | <a onClick={() => this.setState({contenido: "204", titulo: "Importar Existencias",})}>Importar Existencias</a> | <a onClick={() => this.setState({contenido: "205", titulo: "Actualizar Existencias",})}>Actualizar Existencias</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="wrapper">

                {!this.state.enEspera && this.renderSide()}

                <div id="content" style={{backgroundImage: this.state.contenido === "0"? 'url("/img/MP2.jpg")': "", backgroundSize: this.state.contenido === "0"? "cover":"", height: "80%", width: "100%", backgroundRepeat: "no-repeat"}}>
                    {this.renderNavbar()}

                    {this.state.contenido === "0" && this.renderPageContent()}

                    {this.state.contenido === "101" && <NuevaOperacion/>}

                    {this.state.contenido === "102" && <Registros/>}

                    {this.state.contenido === "103" && <OperacionV2/>}

                    {this.state.contenido === "201" && <ListaProductos/>}

                    {this.state.contenido === "202" && <Inventario/>}

                    {this.state.contenido === "203" && <MovimientoInterno/>}

                    {this.state.contenido === "204" && <ImportarExistencias/>}

                    {this.state.contenido === "205" && <ActualizarExistencias/>}

                    {this.state.contenido === "300" && <Estados/>}

                    {(this.state.contenido === "400") && <AdministrarUsuarios/>}

                    {this.state.contenido === "501" && <Parametros/>}

                    {this.state.contenido === "502" && <DatosEmpresa/>}

                    {this.state.contenido === "503" && <ConfiguracionImpresion/>}

                    {this.state.contenido === "504" && <ImportarBD/>}
                

                </div>

            </div>
        );
    }
}

export default  Presentacion;