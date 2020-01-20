import React, { Component } from 'react';
import SingleInput from '../common/singleInput';

var cabeceras_temp = [];
var contentarray = new Array();
var cobrar = 0
var pagar = 0

var content = []
var utilidad_i = []
var utilidad_e = []
var cv = new Array();
var repetir = true;
var repetir_utilidad = true;
var resUtilidad = null;

class Estados extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fechaInicio: new Date().getFullYear() + "-" + (new Date().getMonth() + 1 < 10? '0' + (new Date().getMonth() + 1): new Date().getMonth() + 1) + "-" + (new Date().getDate() < 10? '0' + new Date().getDate(): new Date().getDate()),
            fechaFin: new Date().getFullYear() + "-" + (new Date().getMonth() + 1 < 10? '0' + (new Date().getMonth() + 1): new Date().getMonth() + 1) + "-" + (new Date().getDate() < 10? '0' + new Date().getDate(): new Date().getDate()),
            sucursalEstados: 1,
            registros: [],
            registros2: [],
            utilidad_api: [],
            movimiento: '',
            body_cajas: [],
            cuentaxpagarAPI: 0,
            cuentaxcobrarAPI: 0,
            opciones_sucursal: []
        }
        this.refresh = this.refresh.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.show = this.show.bind(this);

    }
    componentDidMount() {
        //this.refresh();
        fetch('/api/sucursales/sucursales')
            .then(res => res.json())
            .then(
                data => {
                    this.setState({ opciones_sucursal: data });
                    //console.log('sucu', data)
                })
            .catch(err => console.log(err));
    }
    searchFecha() {
        if (this.state.fechaFin == '' || this.state.fechaInicio == '') {
            this.refresh();

            alert('Ingrese un rango válido') //mas condiciones
            return;
        }
        else {
            /* if (this.state.movimiento == '') {
             alert('Mostrando registros de ingresos y egresos') //mas condiciones
           }*/
            //console.log(this.state.fechaInicio, this.state.fechaFin);
            this.refresh();
            /*this.setState({
              fechaInicio: '',
              fechaFin: ''
            });*/
        }
    }
    refresh() { // 1 ingresos 0 egresos
        cabeceras_temp = [];
        contentarray = new Array();
        cobrar = 0
        pagar = 0
        content = []
        utilidad_i = []
        utilidad_e = []
        // cuentaxpagarAPI=0
        // cuentaxcobrarAPI=0
        cv = new Array();
        repetir = true
        repetir_utilidad = true
        resUtilidad = null
        //console.log('sucursal ', this.state.sucursalEstados);
        fetch('/api/ingresos/reportes/' + this.state.fechaInicio + '/' + this.state.fechaFin + '/' + this.state.sucursalEstados)
            .then(res => res.json())
            .then(
                data => {
                    if (data.length == 0) { alert('No hay registros en ese rango de fechas') }
                    else {

                        this.setState({ registros: data.data });
                        console.log("dataaaaa: ", this.state.registros);
                    }
                })
            .catch(err => console.log(err));


        fetch('/api/ingresos/utilidad/' + this.state.fechaInicio + '/' + this.state.fechaFin + '/' + this.state.sucursalEstados)
            .then(res => res.json())
            .then(
                data => {


                    this.setState({ utilidad_api: data });
                    console.log("dataaaaa utilidad api: ", this.state.utilidad_api);

                })
            .catch(err => console.log(err));


        fetch('/api/fuentes/fuentes')
            .then(res => res.json())
            .then(
                data => {
                    this.setState({ body_cajas: data });
                    //console.log('body cajas ',this.state.body_cajas);
                })
            .catch(err => console.log(err));

        fetch('/api/ingresos/cuentasxpagar/' + this.state.fechaInicio + '/' + this.state.fechaFin + '/' + this.state.sucursalEstados)
            .then(res => res.json())
            .then(
                data => {
                    console.log("FETCH cuentasxpagar");
                    console.log('/api/ingresos/cuentasxpagar/' + this.state.fechaInicio + '/' + this.state.fechaFin + '/' + this.state.sucursalEstados);
                    // cuentaxcobrarpagarAPI= data;
                    if (data.length > 1){
                        this.setState({
                            cuentaxpagarAPI: data[0].saldo,

                            cuentaxcobrarAPI: data[1].saldo
                        })
                    }else{
                        this.setState({
                            cuentaxpagarAPI: data[0].saldo,
                        })
                    }
                    //console.log("saldoocbprar : ",data, cuentaxcobrarAPI, cuentaxpagarAPI);
                })
            .catch(err => console.log(err));

    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        //console.log(name, value);
    }
    handleSelectChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
        //console.log(event.target.name, event.target.value);
    }

    show() {

        this.state.registros.map((value, i) => {
            cabeceras_temp = [...cabeceras_temp, value.codMes];

            var NombreyGrupo = value.nombreGrupo + value.nombrePartida;
            if (contentarray[NombreyGrupo] === undefined) {
                contentarray[NombreyGrupo] = new Array()
            }

            if (value.nombreGrupo == "INGRESOS") {
                cobrar = cobrar + value.pagar_cobrar
            }
            if (value.nombreGrupo == "EGRESOS") {
                pagar = pagar + value.pagar_cobrar
            }

            let newContent = {
                nombreGrupo: value.nombreGrupo,
                idPartida: value.idPartida,
                nombrePartida: value.nombrePartida,
                codMes: value.codMes,
                PrecioVenta: value.PrecioVenta,
                pagar_cobrar: value.pagar_cobrar,
                cost_venta: value.cost_venta
            }
            contentarray[NombreyGrupo] = [...contentarray[NombreyGrupo], newContent]
        })

        //console.log('contentArray:  ', Object.values(contentarray))


        var cabeceras_meses = [...new Set(cabeceras_temp)];
        cabeceras_meses.sort();
        cv[2] = "COSTO VENTA";
        cv[1] = "";
        cv[0] = "EGRESOS";
        Object.values(contentarray).map((value, i) => {

            if (content[i] === undefined) {
                content[i] = new Array()
            }
            content[i][0] = value[0].nombreGrupo;
            content[i][1] = value[0].idPartida;
            content[i][2] = value[0].nombrePartida;
            var cont = 3;
            value.map((val, ii) => {
                cabeceras_meses.map((mes, iii) => {
                    if (!content[i][iii + cont] || content[i][iii + cont] == 0)
                        content[i][iii + cont] = mes === val.codMes ? val.PrecioVenta : 0;
                    if (cv[iii + cont] === undefined) {
                        cv[iii + cont] = 0;
                    }

                    var tmp = mes === val.codMes ? val.cost_venta : 0;
                    // console.log("valor ", val.cost_venta, tmp);
                    if (tmp != 0) { cv[iii + cont] = cv[iii + cont] + tmp; }


                })
                // console.log('cv ',cv);
                // console.log('qwerty ', 1);
            })
            //console.log('matrizzz ', content)

        })
        //console.log('cv ', cv)
        if (repetir == true) {
            // content.push(cv); 
            var n = content.length;
            content.push(new Array());
            var m = cv.length;
            for (var i = 0; i < m; i++) {
                content[n].push(cv[i]);

            }

            repetir = false; //console.log('cv concat ', content)

        }
        // content = [...content, cv];



        var matriz_totales_grupos_partidas = []
        var tmp_grupo_partida = content[0][0]
        var total_filas_partidas = [];
        total_filas_partidas[0] = tmp_grupo_partida;
        total_filas_partidas[1] = "";
        total_filas_partidas[2] = "";
        //  console.log("oli ", content[0][0]);
        let res = content.map((fila, i) => {
            var total = 0;

            // console.log(tmp_grupo_partida, " ",total_filas_partidas)

            if (fila[0] != tmp_grupo_partida) {
                tmp_grupo_partida = fila[0];
                // console.log(tmp_grupo_partida, " -  ", total_filas_partidas)
                matriz_totales_grupos_partidas = [...matriz_totales_grupos_partidas, total_filas_partidas]
                total_filas_partidas = [];
                total_filas_partidas[0] = tmp_grupo_partida;
                total_filas_partidas[1] = "";
                total_filas_partidas[2] = "";
            }

            return (
                <tr key={i}>
                    {fila.map((columna, j) => {
                        if (j > 2) {
                            if (utilidad_i[j - 3] === undefined) {
                                utilidad_i[j - 3] = 0
                            }
                            if (utilidad_e[j - 3] === undefined) {
                                utilidad_e[j - 3] = 0
                            }
                            if (total_filas_partidas[j] === undefined) {
                                total_filas_partidas[j] = 0
                            }
                            total_filas_partidas[j] = total_filas_partidas[j] + columna;
                            if (fila[0] === "INGRESOS") { utilidad_i[j - 3] = utilidad_i[j - 3] + columna; }
                            if (fila[0] === "EGRESOS") { utilidad_e[j - 3] = utilidad_e[j - 3] + columna; }

                            total = total + columna; //sumar todos los meses por fila
                            //console.log('j  ', utilidad[j - 3])
                            columna = (Number(columna) / 1.0).toFixed(2)
                        }

                        return (
                            <td key={j}>
                                {columna}
                            </td>
                        )

                    })
                    }
                    <td key={'i'}>
                        {(Number(total) / 1.0).toFixed(2)}
                    </td>
                </tr>
            )


        })
        console.log("total ", matriz_totales_grupos_partidas)

        let total_grupos = matriz_totales_grupos_partidas.map((fila, i) => {
            var total = 0;
            return (
                <tr key={i}>
                    {
                        fila.map((columna, j) => {
                            if (j > 2) {
                                total = total + columna; //sumar todos los meses por fila
                                //console.log('j  ', utilidad[j - 3])

                            }

                            return (
                                <td key={j}>
                                    {columna}
                                </td>
                            )
                        })
                    }
                    <td key={'i'}>
                        {(Number(total) / 1.0).toFixed(2)}
                    </td>
                </tr>
            )
        })



        if (repetir_utilidad === true) {
            resUtilidad = this.state.utilidad_api.map((value, i) => {

                return (
                    <td key={i}>
                        {/* {alert((Number(cv[i + 3]) / 1.0).toFixed(2))} */}
                        <h5>
                            {
                                Number(value.totalVenta) ? (Number(Number(value.totalVenta) - Number(cv[i + 3])).toFixed(2))
                                    : Number(cv[i + 3]).toFixed(2)

                            }

                        </h5>
                    </td>
                )

            })


            var m = cv.length;
            var cv_copia = [];
            for (var i = 3; i < m; i++) {
                cv_copia[i] = cv[i];

            }

            if (this.state.utilidad_api.length == 0) {
                resUtilidad = cv_copia.map((value, i) => {

                    return (
                        <td key={i}>
                            <h5>
                                {
                                    value
                                }

                            </h5>
                        </td>
                    )

                })


            }
            repetir_utilidad = false;

        }

        return (
            <div className="container-fluid" >
                <div className="ver-estados-financieros mb-5">
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
                        <div className="col mt-1">
                            <div className="row">
                                <div className="col-2">
                                    Sucursal
                        </div>
                                <div className="col">



                                    <select className="form-control form-control-sm" id="select_sucursalEstados"
                                        name={'sucursalEstados'}
                                        onChange={this.handleSelectChange}>

                                        {this.state.opciones_sucursal.map((val, i) => {
                                            return (
                                                <option key={i} value={val.codSucursal}>
                                                    {val.nombreSucursal}
                                                </option>
                                            )
                                        })}
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
                    </div>
                    <div>
                        <table className="table table-bordered table-estados mt-2">
                            <thead>
                                <tr>
                                    <th> Código Caja </th>
                                    <th> Nombre </th>
                                    <th> Saldo </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.body_cajas.map((value, i) => {
                                        if (value.codFuente != 1) {
                                            return (
                                                <tr key={i}>
                                                    <td> {value.codFuente} </td>
                                                    <td> {value.fuente} </td>
                                                    <td> {value.saldo == null ? '0' : value.saldo} </td>
                                                </tr>
                                            )
                                        }
                                    })
                                }
                            </tbody>
                        </table>
                    </div>




                    <div>
                        <table className="table table-bordered table-estados mt-2">
                            <thead>
                                <tr>
                                    <th> Grupo partida </th>
                                    <th> Id partida </th>
                                    <th> Nombre partida </th>

                                    {
                                        cabeceras_meses.map((value, i) => {
                                            return (
                                                <th key={i}> {value} </th>
                                            )
                                        })
                                    }
                                    <th> Total </th>

                                    <th> </th>
                                    <th> </th>
                                </tr>
                            </thead>
                            <tbody>
                                {res}
                                {/*res2*/}
                                <tr className="mt-2 bg-primary ">
                                    <td></td>
                                    <td></td>
                                    <td><h5 >SUMA TOTAL DE CADA GRUPO DE PARTIDAS</h5></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>

                                </tr>

                                {total_grupos}

                                <tr className="mt-2 bg-primary ">
                                    <td></td>
                                    <td></td>
                                    <td><h5 > CUENTAS TOTALES </h5></td>
                                    <td></td>
                                    <td></td>

                                </tr>

                                <tr className="mt-2">
                                    <td></td>
                                    <td></td>

                                    <td><h5>Utilidad</h5></td>
                                    {resUtilidad}
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr className="mt-2">
                                    <td></td>
                                    <td></td>
                                    <td><h5>Ctas x Cobrar</h5></td>

                                    <td><h5>{this.state.cuentaxcobrarAPI}</h5></td>
                                </tr>
                                <tr className="mt-2">
                                    <td></td>
                                    <td></td>
                                    <td><h5>Ctas x Pagar</h5></td>

                                    <td><h5>{this.state.cuentaxpagarAPI}</h5></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        )
    }
    render() {
        return (
            <div>
                {this.show()
                }
            </div>
        )
    }

}

export default Estados;
