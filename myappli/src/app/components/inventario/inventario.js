import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import SingleInput from '../common/singleInput';
import matchSorter from 'match-sorter'
import ModalesInventario from './modales';


class Inventario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registros: [],
      numOperacion: '',
      fechaInicio: new Date().getFullYear() + "-" + (new Date().getMonth() + 1 < 10? '0' + (new Date().getMonth() + 1): new Date().getMonth() + 1) + "-" + (new Date().getDate() < 10? '0' + new Date().getDate(): new Date().getDate()),
      fechaFin: new Date().getFullYear() + "-" + (new Date().getMonth() + 1 < 10? '0' + (new Date().getMonth() + 1): new Date().getMonth() + 1) + "-" + (new Date().getDate() < 10? '0' + new Date().getDate(): new Date().getDate()),
      listaSucursales: [],
      tipoOperacion: 0,
    }
    this.refresh = this.refresh.bind(this);
    this.searchFecha = this.searchFecha.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    fetch('/api/sucursales/sucursales')
        .then(res => res.json())
        .then(
            data => {
              console.log("SUCURSALES.... Constructor Inventario");
              console.log(data);
              this.setState({
                listaSucursales: data
              });
            }
        )
        .catch( err => console.log(err));
  }


  refresh() {
    fetch('/api/inventarios/inventarios/' + this.state.fechaInicio + '/' + this.state.fechaFin)
      .then(res => res.json())
      .then(
        data => {
          this.setState({ registros: data });
          console.log(this.state.registros);
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
      alert('Ingrese un rango válido') //mas condiciones
      return;
    }
    if (this.state.fechaFin == '' || this.state.fechaInicio == '') {
      alert('Ingrese un rango válido') //mas condiciones
      return;
    }
    else { 
      this.refresh();
      console.log(this.state.fechaInicio, this.state.fechaFin, this.state.tipOperacion);

      /* this.setState({
        fechaInicio: '',
        fechaFin: ''
      });*/
    }
  } 
  componentDidMount() {
    //  this.refresh();
  }

  renderModalesInventario(){

    console.log("Render Modales Inventario");
    console.log(this.state.listaSucursales);
    console.log("--------------------------");
    return (
        <ModalesInventario
            listaSucursalesImportar={this.state.listaSucursales}
            modalOperacion={this.state.tipoOperacion}
        />
    );
  }

  render() {
    const columns = [
      {
        Header: "Comprobante",
        columns: [
          {
            Header: "Número",
            accessor: "numRegistro",
            className: "centerText",
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["numRegistro"] }),
            filterAll: true
          },
          {
            Header: "Código Mes",
            accessor: "codMes",
            className: "centerText",
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["codMes"] }),
            filterAll: true
          },
          {
            Header: "Nombre Sucursal",
            accessor: "nombreSucursal",
            className: "centerText",
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["nombreSucursal"] }),
            filterAll: true

          }
        ]
      },
      {
        Header: "Información General",
        columns: [
          {
            Header: "Tipo de Operación",
            accessor: "tipOperacion",
            className: "centerText",
            Cell: row => (
              <span>
                {
                  row.value === 101 ? 'Venta Interna'
                    : row.value === 112 ? 'Venta Interna - Sustenta Gastos Deducibles Persona Natural '
                      : row.value === 113 ? 'Venta Interna - NRUS'
                        : row.value === 200 ? 'Exportación de Bienes'
                          : row.value === 201 ? 'Exportación de Servicios - Prestación servicios realizados integramente en el país'
                            : row.value === 202 ? 'Exportación de Servicios - Prestación de servicios de hospedaje No Domiciliado'
                              : row.value === 203 ? 'Exportación de Servicios - Transporte de navieras'
                                : row.value === 204 ? 'Exportación de Servicios - Servicios a naves y aeronaves de bandera extranjera'
                                  : row.value === 205 ? 'Exportación de Servicios - Servicios que conformen un Paquete Turístico'
                                    : row.value === 206 ? 'Exportación de Servicios - Servicios complementarios al transporte de carga'
                                      : row.value === 207 ? 'Exportación de Servicios - Suministro de energía eléctrica a favor de sujetos domiciliados en ZED'
                                        : row.value === 208 ? 'Exportación de Servicios - Prestación servicios realizados parcialmente en el extranjero'
                                          : row.value === 301 ? 'Operaciones con Carta de porte aéreo (emitidas en el ámbito nacional)'
                                            : row.value === 302 ? 'Operaciones de Transporte ferroviario de pasajeros'
                                              : row.value === 303 ? 'Operaciones de Pago de regalía petrolera'
                                                : row.value === 401 ? 'Ventas no domiciliados que no califican como exportación'
                                                  : row.value === 1001 ? 'Operación Sujeta a Detracción'
                                                    : row.value === 1002 ? 'Operación Sujeta a Detracción - Recursos Hidrobiológicos'
                                                      : row.value === 1003 ? 'Operación Sujeta a Detracción - Servicios de Transporte Pasajeros'
                                                        : row.value === 1004 ? 'Operación Sujeta a Detracción - Servicios de Transporte Carga'
                                                          : row.value === 2001 ? 'Operación Sujeta a Percepción'
                                                            : 'Otro'
                }
              </span>
            ),
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["tipOperacion"] }),
            filterAll: true
          },
          {
            Header: "Partida",
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
            Header: "Código Unidad Medida",
            accessor: "codUnidadMedida",
            className: "centerText",
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["codUnidadMedida"] }),
            filterAll: true

          },
          {
            Header: "Código Item",
            accessor: "codItem",
            className: "centerText",
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["codItem"] }),
            filterAll: true

          },
          {
            Header: "Descripción Item",
            accessor: "desItem",
            className: "centerText",
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["desItem"] }),
            filterAll: true

          },
          {
            Header: "Valor Unitario",
            accessor: "mtoValorUnitario",
            className: "centerText",
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["mtoValorUnitario"] }),
            filterAll: true

          },
          {
            Header: "Precio Unitario",
            accessor: "mtoPrecioUnitario",
            className: "centerText",
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["mtoPrecioUnitario"] }),
            filterAll: true

          }
        ]
      },
      {
        Header: "Transacción",
        columns: [
          {
            Header: "Tipo de Afecto",
            accessor: "tipoAfecto",
            className: "centerText",
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["tipoAfecto"] }),
            filterAll: true


          },
          {
            Header: "Valor de Venta",
            accessor: "mtoValorVenta",
            className: "centerText",
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["mtoValorVenta"] }),
            filterAll: true
          },
          {
            Header: "IGV",
            accessor: "igv",
            className: "centerText",
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["igv"] }),
            filterAll: true
          },
          {
            Header: "ISC",
            accessor: "isc",
            className: "centerText",
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["isc"] }),
            filterAll: true
          },
          {
            Header: "Sumatoria de Tributos",
            accessor: "mtoSumTributos",
            className: "centerText",
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["mtoSumTributos"] }),
            filterAll: true
          },
          {
            Header: "Venta Total",
            accessor: "mtoVentaTotal",
            className: "centerText",
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["mtoVentaTotal"] }),
            filterAll: true
          },
          {
            Header: "Código de Operacion",
            accessor: "codOperacion",
            className: "centerText",
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["codOperacion"] }),
            filterAll: true
          }
        ]
      }
    ]

    return (
      <div className="container-fluid">
        <div className="search-inventario">
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
                max={'15'}
              />
            </div>
            <div className="col-3">
              <SingleInput
                labelClass={'col-2'}
                inputClass={'col'}
                inputType={'date'}
                title={'A: '}
                name={'fechaFin'}
                controlFunc={this.handleInputChange}
                content={this.state.fechaFin}
                max={'15'}
              />
            </div>
            <div className="col mt-1">
              <button className="btn btn-outline-primary btn-sm my-2 my-sm-0 mt-1"
                onClick={this.searchFecha.bind(this)}>
                Buscar
            </button>
            </div>

            {/*
            <div className="col mt-1 push-right">
              <a
                  data-backdrop="static"
                  data-keyboard="false"
                  className="btn btn-success"
                  name="importar_csv"
                  data-toggle="modal"
                  data-target="#modalImportarCsv"
              >
                IMPORTAR INVENTARIO
              </a>
            </div>

            <div className="col mt-1 push-right">
              <a
                  data-backdrop="static"
                  data-keyboard="false"
                  className="btn btn-warning"
                  name="actualizar_csv"
                  data-toggle="modal"
                  data-target="#modalactualizarcsv"
              >
                ACTUALIZAR INVENTARIO
              </a>
            </div>
                */}
          </div>

          <div className="row">
            <div className="mt-1 ml-3">
              <p className="form-text text-muted text-left custom-footer-text">
                Busque un elemento según un rango de fechas.
                <i className="ml-2 fas fa-arrow-up mr-2"></i>
                Busque un elemento en la tabla escribiendo en los primeros recuadros.
                <i className="ml-2 fas fa-arrow-down mr-2"></i>
                Desplácese hacia la derecha para ver más campos de la tabla.
                <i className="ml-2 fas fa-arrow-right"></i>
              </p>
            </div>
          </div>
{/*          <div className="row">
            <div className="col-3">
              <div className="refresh-button-inventario text-right">
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={this.refresh}>
                  Actualizar Tabla
                      <i className="fas fa-sync-alt ml-2">
                  </i>
                </button>
              </div>
            </div>
    </div>*/}

        </div>


        <div className="body-registro-ingresos">
          <ReactTable
            columns={columns}
            data={this.state.registros}
            filterable
            defaultFilterMethod={(filter, row) =>
              String(row[filter.id]) === filter.value}
            defaultPageSize={10}
            className="-striped -highlight"
            previousText={'Pág. Anterior'}
            nextText={'Pág. Siguiente'}
            noDataText={'No hay datos para mostrar'}
            pageText={'Página'}
            ofText={'de'}
            rowsText={'registros'}
          >

          </ReactTable>
        </div>

        {this.renderModalesInventario()}

      </div>


    );
  }
}

export default Inventario;

/*
 - pasar stock al elegir item, disminuirlo al ingresar cantidad (disminuir stock bd ) 
 - verificar el tipo de cambio usd y multiplicar el valor al guardar    
  
pagos , mandar id serie y numero para recibir data tabla de pagos 
  - tienen el mismo numero y serie pero sin id 
  
 - sumar dias a credito a la fecha 
 
importe total es menor del valor d venta debes y hay pagos 

sum precio venta es el total sumimpventa lo que estoy pagando
 -  row.original.sumImpVenta < row.original.sumPrecioVent


 guardar dua egresos y mostrar 

 total valor de venta 


  
Total Valor de Venta
0
Total precio de venta
0  
A cuenta
0
Costo de Venta
0  
Importe total de ventas
0




- ventana de administracion
convertir a pdf

 - que calculos con descuento y costo de venta

 - quitar campos innecesarios de la tabla de registros 














*/