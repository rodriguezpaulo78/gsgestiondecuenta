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
            "Select * from info_ingresos where idIngreso = ? ",
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

        let sql_comand = `select * from (select idIngreso as numero,codMes,horEmision,nombreSucursal,tipOperacion,info_fuente.fuente as codFuente,info_ingresos.idPartida,nombrePartida,nombreGrupo,fecEmision,fecVencimiento,tipoComprobante,
        numSerieComprobante,numComprobante,tipDocUsuario,numDocUsuario,razSocial,desDireccionCliente,codPaisCliente,codUbigeoCliente,tipMoneda, detalleIngreso,aCreditoDias,
        sumTotValVenta,sumTotTributos,sumPrecioVenta,sumDescTotal,sumOtrosCargos,
        aCuenta,costVenta,costServicio,utilidad,movimiento,dua_dsi,editable, estado,(sumPrecioVenta - aCuenta) as saldo
                 from info_ingresos left join info_sucursales 
                                    on info_ingresos.codSucursal=info_sucursales.codSucursal
                                    left join info_clientes on info_clientes.idCliente= info_ingresos.idCliente
                                    left join info_fuente on info_ingresos.codFuente= info_fuente.codFuente
                                    left join (select idPartida,nombrePartida,nombreGrupo from info_partidas left join info_grupopartidas   
                                            on info_partidas.idGrupo =info_grupopartidas.idGrupoPartida) as partidas
                                         on partidas.idPartida= info_ingresos.idPartida
                                         WHERE (info_ingresos.fecEmision  BETWEEN '`+ fI + `' AND '` + fF + `')) as tbl ` + movimiento_t + ` order by tbl.numero DESC`;
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
            `select idIngreso as numero,codMes,horEmision,nombreSucursal,tipOperacion,info_fuente.fuente as codFuente,info_ingresos.idPartida,nombrePartida,nombreGrupo,fecEmision,fecVencimiento,tipoComprobante,
        numSerieComprobante,numComprobante,tipDocUsuario,numDocUsuario,razSocial,desDireccionCliente,codPaisCliente,codUbigeoCliente,tipMoneda, detalleIngreso,aCreditoDias,
        sumTotValVenta,sumTotTributos,sumPrecioVenta,sumDescTotal,sumOtrosCargos,
        aCuenta,costVenta,costServicio,utilidad,movimiento,dua_dsi,editable, estado
                 from info_ingresos left join info_sucursales 
                                    on info_ingresos.codSucursal=info_sucursales.codSucursal
                                    left join info_clientes on info_clientes.idCliente= info_ingresos.idCliente
                                    left join info_fuente on info_ingresos.codFuente= info_fuente.codFuente
                                    left join (select idPartida,nombrePartida,nombreGrupo from info_partidas left join info_grupopartidas   
                                            on info_partidas.idGrupo =info_grupopartidas.idGrupoPartida) as partidas
                                         on partidas.idPartida= info_ingresos.idPartida
                                         WHERE info_ingresos.codOperacion = `+ idIngreso +
            ` AND info_ingresos.tipoComprobante =2 `,
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
            "insert into info_ingresos set ?",
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
                        "UPDATE info_fuente SET  saldo=saldo+ " + (newIngreso.aCuenta * flag) + " WHERE codFuente = " + newIngreso.codFuente,
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
                            "UPDATE info_ingresos SET  costServicio = costServicio+" + newIngreso.sumPrecioVenta + " WHERE idIngreso = " + newIngreso.codOperacion,
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
                                "UPDATE info_ingresos SET  aCuenta = aCuenta+" + newIngreso.aCuenta + " WHERE idIngreso = " + newIngreso.codOperacion,
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
            "SELECT  * from info_ingresos WHERE idIngreso = " + idIngreso,
            [],
            function (err, res) {
                if (res[0].movimiento == 0) { flag = 1; }
                sqlNegocio(
                    cadenaDeConexion,
                    "UPDATE info_fuente SET  saldo = saldo +" + (res[0].aCuenta * flag) + " WHERE codFuente = " + res[0].codFuente,
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
            "SELECT  * from info_ingresos WHERE idIngreso = " + idIngreso,
            [],
            function (err, res) {
                sqlNegocio(
                    cadenaDeConexion,
                    "UPDATE info_ingresos SET  aCuenta = aCuenta-" + (res[0].aCuenta) + " WHERE idIngreso = " + res[0].codOperacion,
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
            "SELECT  * from info_ingresos WHERE idIngreso = " + ingresosId,
            [],
            function (err, ress) {
                if (ress[0].movimiento == 1) { flag = 1; }
                sqlNegocio(
                    cadenaDeConexion,
                    "Select * from detalle_inventarios where idIngreso = ? ", ingresosId,
                    [],
                    function (errr, res, fields) {
                        Object.keys(res).forEach(function (key) {
                            var row = res[key];
                            // console.log(row.idDetalle, row.ctdUnidadItem)
                            sqlNegocio(
                                cadenaDeConexion,
                                "UPDATE info_productos SET stockProducto=stockProducto+" + (row.ctdUnidadItem * flag) + " WHERE idProducto =" + row.idProducto,
                                [],
                                function (err_, res_) { });
                        });
                    });
        });
    };


    static updateById(cadenaDeConexion, id, field, value, result) {
        if (field == 'estado') {
            //ESTE ERA EL ERROR POR EL CUAL NO SE PODIA ANULAR LOS MOVIMIENTOS EN EL SERVIDOR NO PASABA LA CADENA DE CONEXION
            this.update_fuente(cadenaDeConexion, id);
            this.update_stock_items(cadenaDeConexion, id);
        }
        sqlNegocio(
            cadenaDeConexion,
            "UPDATE info_ingresos SET " + field + " = " + value + " WHERE idIngreso = " + id,
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
            sucursal = `AND info_ingresos.codSucursal=` + idSucursal;
        }
        console.log("sucursal ", sucursal);
        sqlNegocio(
            cadenaDeConexion,
            `SELECT info_grupopartidas.nombreGrupo,info_partidas.idPartida,info_partidas.nombrePartida,codMes,SUM(sumPrecioVenta) as PrecioVenta, (SUM(sumPrecioVenta) - SUM(aCuenta)) as pagar_cobrar,SUM(costVenta) as cost_venta
        FROM info_ingresos 
            left join info_partidas
                on info_ingresos.idPartida=info_partidas.idPartida
            left join info_fuente 
                on info_ingresos.codFuente=info_fuente.codFuente
             left join info_grupopartidas
                 on info_partidas.idGrupo=info_grupopartidas.idGrupoPartida
                where  info_ingresos.idPartida!=1 ` + sucursal + ` and tipoComprobante!=2 and tipoComprobante!=3  
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
            sucursal = `AND info_ingresos.codSucursal=` + idSucursal;
        }
        console.log("sucursal ", sucursal);
        sqlNegocio(
            cadenaDeConexion,
            `    SELECT  base.codMes, SUM(base.precioVenta) as totalVenta from (SELECT info_grupopartidas.nombreGrupo,info_ingresos.codMes,

            CASE  info_grupopartidas.nombreGrupo
            WHEN    'EGRESOS' THEN -(SUM(info_ingresos.sumPrecioVenta))
            WHEN    'INGRESOS' THEN SUM(info_ingresos.sumPrecioVenta)
            END as precioVenta
        
        
        from info_ingresos  LEFT JOIN
        info_partidas on info_ingresos.idPartida = info_partidas.idPartida  LEFT JOIN 
        info_grupopartidas on info_grupopartidas.idGrupoPartida = info_partidas.idGrupo 
        where info_ingresos.fecEmision BETWEEN '`+ fI + `' AND '` + fF + `' AND info_ingresos.estado=1 ` + sucursal + ` AND ( info_grupopartidas.nombreGrupo = 'EGRESOS' or info_grupopartidas.nombreGrupo = 'INGRESOS')
        group by info_grupopartidas.nombreGrupo,info_ingresos.codMes)as base group by  base.codMes
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
            sucursal = `AND info_ingresos.codSucursal=` + idSucursal;
        }
        console.log("sucursal ", sucursal);
        sqlNegocio(
            cadenaDeConexion,
            `SELECT movimiento ,sum((sumPrecioVenta - aCuenta) ) as saldo from info_ingresos
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
            "DELETE FROM detalle_inventarios WHERE idIngreso = ?",
            [ingresosId],
            function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                }else {
                    sqlNegocio(
                        cadenaDeConexion,
                        "DELETE FROM info_ingresos WHERE idIngreso = ?",
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