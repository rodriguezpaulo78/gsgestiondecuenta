const sqlNegocio = require('../config/connectionDbNegocios');

class Ingresos {
    constructor(ingresos) {
        //   this.numero = ingresos.numero; // sera y tomara el valor de idingreso
        this.codSucursal = ingresos.codSucursal,
            this.tipOperacion = ingresos.tipOperacion,
            this.codMes = ingresos.codMes,
            this.codFuente = ingresos.codFuente,
            this.idPartida = ingresos.idPartida,  // reemplaza a codigo de partida
            this.horEmision = ingresos.horEmision,
            this.fecEmision = ingresos.fecEmision,
            this.fecVencimiento = ingresos.fecVencimiento,
            this.tipoComprobante = ingresos.tipoComprobante,
            this.numSerieComprobante = ingresos.numSerieComprobante,
            this.numComprobante = ingresos.numComprobante,
            this.detalleIngreso = ingresos.detalleIngreso,
            this.tipMoneda = ingresos.tipMoneda,
            this.aCreditoDias = ingresos.aCreditoDias,
            this.idCliente = ingresos.idCliente,

            this.sumTotTributos = ingresos.sumTotTributos,
            this.sumTotValVenta = ingresos.sumTotValVenta,
            this.sumPrecioVenta = ingresos.sumPrecioVenta,
            this.sumDescTotal = ingresos.sumDescTotal,
            this.sumOtrosCargos = ingresos.sumOtrosCargos,
            this.aCuenta = ingresos.aCuenta,
            this.costVenta = ingresos.costVenta,
            this.costServicio = ingresos.costServicio,
            this.utilidad = ingresos.utilidad,

            this.movimiento = ingresos.movimiento, //1 ingreso, 0 egreso
            this.dua_dsi = ingresos.dua_dsi,
            this.editable = ingresos.editable, //1 vacio(editar-llenar), 0 lleno(ver)
            this.estado = ingresos.estado, //1 vigete , 0 anulado    

            this.codOperacion = ingresos.codOperacion,
            this.codMotivoNC = ingresos.codMotivoNC,
            this.descMotivoNC = ingresos.descMotivoNC,
            this.tipoComprobanteNC = ingresos.tipoComprobanteNC,
            this.numSerieComprobanteNC = ingresos.numSerieComprobanteNC,
            this.numComprobanteNC = ingresos.numComprobanteNC,
            this.otroTipoComprobante = ingresos.otroTipoComprobante,
            this.otroTipoComprobanteNC = ingresos.otroTipoComprobanteNC
    }
    static getIngresoById(cadenaDeConexion, ingresosId, result) {
        sqlNegocio(
            cadenaDeConexion,
            "Select * from info_Ingresos where idIngreso = ? ",
            [ingresosId],
            function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else {
                    console.log("error: ", res);
                    result(null, res);
                }
            });
    }
    static getAllIngreso(cadenaDeConexion, fI, fF, tOp, result) {
        console.log("GET ALL INGRESO");
        var movimiento_t = '';
        if (tOp !== "2") {
            movimiento_t = `WHERE tbl.movimiento=? `;
        }

        let sql_comand = `select * from (select idIngreso as numero,codMes,horEmision,nombreSucursal,tipOperacion,info_Fuente.fuente as codFuente,info_Ingresos.idPartida,nombrePartida,nombreGrupo,fecEmision,fecVencimiento,tipoComprobante,
        numSerieComprobante,numComprobante,tipDocUsuario,numDocUsuario,razSocial,desDireccionCliente,codPaisCliente,codUbigeoCliente,tipMoneda, detalleIngreso,aCreditoDias,
        sumTotValVenta,sumTotTributos,sumPrecioVenta,sumDescTotal,sumOtrosCargos,
        aCuenta,costVenta,costServicio,utilidad,movimiento,dua_dsi,editable, estado,(sumPrecioVenta - aCuenta) as saldo
                 from info_Ingresos left join info_Sucursales 
                                    on info_Ingresos.codSucursal=info_Sucursales.codSucursal
                                    left join info_Clientes on info_Clientes.idCliente= info_Ingresos.idCliente
                                    left join info_Fuente on info_Ingresos.codFuente= info_Fuente.codFuente
                                    left join (select idPartida,nombrePartida,nombreGrupo from info_Partidas left join info_GrupoPartidas   
                                            on info_Partidas.idGrupo =info_GrupoPartidas.idGrupoPartida) as partidas
                                         on partidas.idPartida= info_Ingresos.idPartida
                                         WHERE (info_Ingresos.fecEmision  BETWEEN '`+ fI + `' AND '` + fF + `')) as tbl ` + movimiento_t + ` order by tbl.numero DESC`;
        sqlNegocio(
            cadenaDeConexion,
            sql_comand,
            [tOp],
            function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else {
                    console.log("Todos los ingresos Controller");
                    console.log(res.length);
                    result(null, res);
                }
            });
    }


    static getAllPagos(cadenaDeConexion, idIngreso, result) {

        sqlNegocio(
            cadenaDeConexion,
            `select idIngreso as numero,codMes,horEmision,nombreSucursal,tipOperacion,info_Fuente.fuente as codFuente,info_Ingresos.idPartida,nombrePartida,nombreGrupo,fecEmision,fecVencimiento,tipoComprobante,
        numSerieComprobante,numComprobante,tipDocUsuario,numDocUsuario,razSocial,desDireccionCliente,codPaisCliente,codUbigeoCliente,tipMoneda, detalleIngreso,aCreditoDias,
        sumTotValVenta,sumTotTributos,sumPrecioVenta,sumDescTotal,sumOtrosCargos,
        aCuenta,costVenta,costServicio,utilidad,movimiento,dua_dsi,editable, estado
                 from info_Ingresos left join info_Sucursales 
                                    on info_Ingresos.codSucursal=info_Sucursales.codSucursal
                                    left join info_Clientes on info_Clientes.idCliente= info_Ingresos.idCliente
                                    left join info_Fuente on info_Ingresos.codFuente= info_Fuente.codFuente
                                    left join (select idPartida,nombrePartida,nombreGrupo from info_Partidas left join info_GrupoPartidas   
                                            on info_Partidas.idGrupo =info_GrupoPartidas.idGrupoPartida) as partidas
                                         on partidas.idPartida= info_Ingresos.idPartida
                                         WHERE info_Ingresos.codOperacion = `+ idIngreso +
            ` AND info_Ingresos.tipoComprobante =2 `,
            [],
            function (err, res) {
                //2 es pago
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else {
                    console.log('ingresos : ', res);
                    result(null, res);
                }
            });
    }


    static createIngreso(cadenaDeConexion, newIngreso, result) {
        var flag = -1;
        //1 - ingreso, 0-egreso
        sqlNegocio(
            cadenaDeConexion,
            "insert into info_Ingresos set ?",
            [newIngreso],
            function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else {

                    ///verificar si es ingreso o egreso para sumar o restar el valor a la caja fuente
                    if (newIngreso.movimiento == 1) { flag = 1; }
                    ///actualizar fuente- caja, sumar o restar el valor a cuenta segun sea ingreso o egreso a cada caja que se registre
                    sqlNegocio(
                        cadenaDeConexion,
                        "UPDATE info_Fuente SET  saldo=saldo+ " + (newIngreso.aCuenta * flag) + " WHERE codFuente = " + newIngreso.codFuente,
                        [],
                        function (err_, res_) {
                            if (err_) {
                                console.log("error: ", err_);
                                result(null, err_);
                            }
                        });


                    if ((newIngreso.codOperacion != null) && (newIngreso.tipoComprobante != 3) && (newIngreso.tipoComprobante != 2)) {
                        sqlNegocio(
                            cadenaDeConexion,
                            "UPDATE info_Ingresos SET  costServicio = costServicio+" + newIngreso.sumPrecioVenta + " WHERE idIngreso = " + newIngreso.codOperacion,
                            [],
                            function (err_, res_) {
                                if (err_) {
                                    console.log("error: ", err_);
                                    result(null, err_);
                                }
                                else {
                                    result(null, res.insertId);
                                }
                            });
                    }
                    else {
                        ///si es pago se le suma el acuenta al registro que se le realiza el pago
                        if (newIngreso.tipoComprobante == 2) {
                            sqlNegocio(
                                cadenaDeConexion,
                                "UPDATE info_Ingresos SET  aCuenta = aCuenta+" + newIngreso.aCuenta + " WHERE idIngreso = " + newIngreso.codOperacion,
                                [],
                                function (error_, resu_) {
                                    if (error_) {
                                        console.log("error: ", error_);
                                        result(null, error_);
                                    }
                                    else {
                                        result(null, res.insertId);
                                    }
                                });
                        }
                        else {
                            result(null, res.insertId);
                        }

                    }
                    //   console.log(res.insertId);
                    //
                }
            });
    };

    //funcion paa actualizar el valor de una caja fuente cuando eliino un pago y cuando anulo un movimiento
    static update_fuente(cadenaDeConexion, idIngreso) {
        var flag = (-1);
        //1 - ingreso, 0-egreso
        ///verificar si es ingreso o egreso para sumar o restar el valor a la caja fuente
        sqlNegocio(
            cadenaDeConexion,
            "SELECT  * from info_Ingresos WHERE idIngreso = " + idIngreso,
            [],
            function (err, res) {
                if (res[0].movimiento == 0) { flag = 1; }
                sqlNegocio(
                    cadenaDeConexion,
                    "UPDATE info_Fuente SET  saldo = saldo +" + (res[0].aCuenta * flag) + " WHERE codFuente = " + res[0].codFuente,
                    [],
                    function (err, res18) {
                        if (err) {
                            console.log("error: ", err);
                            result(null, err);
                        }
                });
        });
    };



    ////funcion para actualziar el valor de un registro cuando a este se le eliminar un pago realizado
    static update_pago_deleted(cadenaDeConexion, idIngreso) {

        sqlNegocio(
            cadenaDeConexion,
            "SELECT  * from info_Ingresos WHERE idIngreso = " + idIngreso,
            [],
            function (err, res) {
                sqlNegocio(
                    cadenaDeConexion,
                    "UPDATE info_Ingresos SET  aCuenta = aCuenta-" + (res[0].aCuenta) + " WHERE idIngreso = " + res[0].codOperacion,
                    [],
                    function (err, res18) {
                        if (err) {
                            console.log("error: ", err);
                            result(null, err);
                        }
                });
            });
    };

    static update_stock_items(cadenaDeConexion, ingresosId, result) {
        var flag = (-1);
        sqlNegocio(
            cadenaDeConexion,
            "SELECT  * from info_Ingresos WHERE idIngreso = " + ingresosId,
            [],
            function (err, ress) {
                if (ress[0].movimiento == 1) { flag = 1; }
                sqlNegocio(
                    cadenaDeConexion,
                    "Select * from detalle_Inventarios where idIngreso = ? ", ingresosId,
                    [],
                    function (errr, res, fields) {
                        Object.keys(res).forEach(function (key) {
                            var row = res[key];
                            // console.log(row.idDetalle, row.ctdUnidadItem)
                            sqlNegocio(
                                cadenaDeConexion,
                                "UPDATE info_Productos SET stockProducto=stockProducto+" + (row.ctdUnidadItem * flag) + " WHERE idProducto =" + row.idProducto,
                                [],
                                function (err_, res_) { });
                        });
                    });
        });
    };


    static updateById(cadenaDeConexion, id, field, value, result) {
        if (field == 'estado') {
            this.update_fuente(id);
            this.update_stock_items(id);
        }

        sqlNegocio(
            cadenaDeConexion,
            "UPDATE info_Ingresos SET " + field + " = " + value + " WHERE idIngreso = " + id,
            [],
            function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else {
                    result(null, res);
                }
            });
    };


    //funcion para obtener los resultados mostrados en la tabla de reposrtes que muestra los valreoesu por meses de grupos de partidas
    static GetInfoReports(cadenaDeConexion, fI, fF, idSucursal, result) {
        var sucursal = '';
        if (idSucursal != 1) {
            sucursal = `AND info_Ingresos.codSucursal=` + idSucursal;
        }
        console.log("sucursal ", sucursal);
        sqlNegocio(
            cadenaDeConexion,
            `SELECT info_GrupoPartidas.nombreGrupo,info_Partidas.idPartida,info_Partidas.nombrePartida,codMes,SUM(sumPrecioVenta) as PrecioVenta, (SUM(sumPrecioVenta) - SUM(aCuenta)) as pagar_cobrar,SUM(costVenta) as cost_venta
        FROM info_Ingresos 
            left join info_Partidas
                on info_Ingresos.idPartida=info_Partidas.idPartida
            left join info_Fuente 
                on info_Ingresos.codFuente=info_Fuente.codFuente
             left join info_GrupoPartidas
                 on info_Partidas.idGrupo=info_GrupoPartidas.idGrupoPartida
                where  info_Ingresos.idPartida!=1 ` + sucursal + ` and tipoComprobante!=2 and tipoComprobante!=3  
               									 and fecEmision BETWEEN  '`+ fI + `' AND '` + fF + `' AND estado=1
                group by nombreGrupo,idPartida,codMes
                order by idGrupoPartida ASC,idPartida ASC`,
            [],
            function (err, res) {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                    }
                    else {
                        result(null, res);
                    }
            });
    };
    ///funcionar para obtener la utilidad 
    static GetUtilidad(cadenaDeConexion, fI, fF, idSucursal, result) {

        var sucursal = '';
        if (idSucursal != 1) {
            sucursal = `AND info_Ingresos.codSucursal=` + idSucursal;
        }
        console.log("sucursal ", sucursal);
        sqlNegocio(
            cadenaDeConexion,
            `    SELECT  base.codMes, SUM(base.precioVenta) as totalVenta from (SELECT info_GrupoPartidas.nombreGrupo,info_Ingresos.codMes,

            CASE  info_GrupoPartidas.nombreGrupo
            WHEN    'EGRESOS' THEN -(SUM(info_Ingresos.sumPrecioVenta))
            WHEN    'INGRESOS' THEN SUM(info_Ingresos.sumPrecioVenta)
            END as precioVenta
        
        
        from info_Ingresos  LEFT JOIN
        info_Partidas on info_Ingresos.idPartida = info_Partidas.idPartida  LEFT JOIN 
        info_GrupoPartidas on info_GrupoPartidas.idGrupoPartida = info_Partidas.idGrupo 
        where info_Ingresos.fecEmision BETWEEN '`+ fI + `' AND '` + fF + `' AND info_Ingresos.estado=1 ` + sucursal + ` AND ( info_GrupoPartidas.nombreGrupo = 'EGRESOS' or info_GrupoPartidas.nombreGrupo = 'INGRESOS')
        group by info_GrupoPartidas.nombreGrupo,info_Ingresos.codMes)as base group by  base.codMes
        order by base.codMes ASC`,
            [],
            function (err, res) {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                    }
                    else {
                        result(null, res);
                    }
            });
    };

    static GetCuentasPagarCobrar(cadenaDeConexion, fI, fF, idSucursal, result) {

        var sucursal = '';
        if (idSucursal != 1) {
            sucursal = `AND info_Ingresos.codSucursal=` + idSucursal;
        }
        console.log("sucursal ", sucursal);
        sqlNegocio(
            cadenaDeConexion,
            `SELECT movimiento ,sum((sumPrecioVenta - aCuenta) ) as saldo from info_Ingresos
                     where estado=1 ` + sucursal + ` and tipoComprobante!=2 and tipoComprobante!=3  
               			   and fecEmision BETWEEN  '`+ fI + `' AND '` + fF + `' 
                        group by movimiento`,
            [],
            function (err, res) {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                    }
                    else {
                        result(null, res);
                    }
            });
    }



    static remove(cadenaDeConexion, ingresosId, result) {
        this.update_fuente(ingresosId);//actualizo el valor de caja c fuente  cuando elimino un registro
        this.update_pago_deleted(ingresosId);

        sqlNegocio(
            cadenaDeConexion,
            "DELETE FROM detalle_Inventarios WHERE idIngreso = ?",
            [ingresosId],
            function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                }else {
                    sqlNegocio(
                        cadenaDeConexion,
                        "DELETE FROM info_Ingresos WHERE idIngreso = ?",
                        [ingresosId],
                        function (err, res) {
                            if (err) {
                                console.log("error: ", err);
                                result(null, err);
                            }
                            else {
                                result(null, res);
                            }
                        });
                }
            });
    };
}

module.exports = Ingresos;