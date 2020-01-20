const sql = require('../config/connection');
const sqlNegocio = require('../config/connectionDbNegocios');

class Inventario {
    constructor(inventario) {
        this.idDetalle = inventario.idDetalle,
            this.idIngreso = inventario.idIngreso,
            this.ctdUnidadItem = inventario.ctdUnidadItem,
            this.codUnidadMedida = inventario.codUnidadMedida,
            this.idProducto = inventario.idProducto,
            this.desItem = inventario.desItem,
            this.tipoAfecto = inventario.tipoAfecto,
            this.mtoPrecioUnitario = inventario.mtoPrecioUnitario,
            this.mtoValorUnitario = inventario.mtoValorUnitario,
            this.mtoValorVenta = inventario.mtoValorVenta, //costo de venta
            this.igv = inventario.igv,
            this.isc = inventario.isc,
            this.mtoSumTributos = inventario.mtoSumTributos,
            this.mtoVentaTotal = inventario.mtoVentaTotal,
            this.mtoDsctoItem = inventario.mtoDsctoItem
        this.costVenta = inventario.costVenta

    }


    //funcion para obetenr un registro de la tabla detalle_inventario en funcion de su ID idDetalle
    static getInventarioById(cadenaDeConexion, inventariosId, result) {
        sqlNegocio(
            cadenaDeConexion,
            "Select * from detalle_Inventarios where idDetalle = ? ",
            [inventariosId],
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

    //funcion para obtener todos los registros de la tabla detalle_inventarios
    static getAllInventario(cadenaDeConexion, fI, fF, result) {
        sqlNegocio(
            cadenaDeConexion,
            `select detalle_Inventarios.idDetalle as numRegistro,info_Ingresos.codMes,info_Sucursales.nombreSucursal,info_Ingresos.tipOperacion,info_Ingresos.idPartida, nombrePartida, nombreGrupo,
        detalle_Inventarios.codUnidadMedida,detalle_Inventarios.idDetalle as codItem, detalle_Inventarios.desItem, detalle_Inventarios.mtoValorUnitario,detalle_Inventarios.mtoPrecioUnitario,detalle_Inventarios.tipoAfecto,detalle_Inventarios.ctdUnidadItem, detalle_Inventarios.mtoValorVenta,detalle_Inventarios.igv,detalle_Inventarios.isc,detalle_Inventarios.mtoSumTributos,detalle_Inventarios.mtoVentaTotal,info_Ingresos.idIngreso as codOperacion

from detalle_Inventarios left join info_Ingresos on detalle_Inventarios.idIngreso=info_Ingresos.idIngreso
left join info_Productos on info_Productos.idProducto= detalle_Inventarios.idProducto
left join info_Sucursales on info_Ingresos.codSucursal=info_Sucursales.codSucursal
left join (select info_Partidas.idPartida,info_Partidas.nombrePartida,info_GrupoPartidas.nombreGrupo from info_Partidas join info_GrupoPartidas   
  on info_Partidas.idGrupo =info_GrupoPartidas.idGrupoPartida) as partidas
      on partidas.idPartida= info_Ingresos.idPartida
      WHERE info_Ingresos.fecEmision  BETWEEN '`+ fI + `' AND '` + fF + `'`,
            [],
            function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else {
                    console.log('inventarios : ', res);
                    result(null, res);
                }
            });
    }

    //funcion para crear un nuevo registro en la tabla detalle_inventario
    //retorna el id del registro nuevo que se creo 
    static createInventario(cadenaDeConexion, newInventario, result) {
        var flag = (-1);
        sqlNegocio(
            cadenaDeConexion,
            "SELECT  * from info_Ingresos WHERE idIngreso = " + newInventario.idIngreso,
            [],
            function (err, ress) {
                if (ress[0].movimiento == 0) { flag = 1; }
                sqlNegocio(
                    cadenaDeConexion,
                    "insert into detalle_Inventarios set ?",
                    [ newInventario],
                    function (err, res) {
                        if (err) {
                            console.log("error: ", err);
                            result(err, null);
                        }
                        else {

                            ///actualziar el stock de productos cada que agrego un producto nuevo en mi inventario
                            sqlNegocio(
                                cadenaDeConexion,
                                "UPDATE info_Productos SET stockProducto=stockProducto+" + (newInventario.ctdUnidadItem * flag) + " WHERE idProducto =" + newInventario.idProducto,
                                [],
                                function (err_, res_) {
                                    if (err) {
                                        console.log("error: ", err_);
                                        result(null, err_);
                                    }
                                });

                            ///actualizar el costo de venta cada vez que agrego un nuevo item a un movimiento antiguo
                            var costo_venta_total = 0;
                            sqlNegocio(
                                cadenaDeConexion,
                                "Select * from detalle_Inventarios where idIngreso = ? ",
                                [newInventario.idIngreso],
                                function (errr1, res1, fields) {
                                    Object.keys(res1).forEach(function (key) {
                                        var row = res1[key];
                                        costo_venta_total = costo_venta_total + parseFloat(row.costVenta)
                                        // console.log(row.idDetalle, row.ctdUnidadItem)
                                    });
                                    if (newInventario.esIngreso){
                                        sqlNegocio(
                                            cadenaDeConexion,
                                            "UPDATE info_Ingresos SET costVenta=" + costo_venta_total + " WHERE idIngreso =" + newInventario.idIngreso,
                                            [],
                                            function (err_1, res_1) { });
                                    }
                                });
                            console.log(res.insertId);
                            result(null, res.insertId);
                        }
                });
            });

    }



    //funcion paa actualizar el costo de venta de un ingreso/egreso desúes de actualziar el costo de venta en la ventana de registros
    static updateCostoVentaRegistro(cadenaDeConexion, idIngreso) {
        var costo_venta_total = 0;
        sqlNegocio(
            cadenaDeConexion,
            "Select * from detalle_Inventarios where idIngreso = ? ",
            [idIngreso],
            function (errr, res, fields) {
                Object.keys(res).forEach(function (key) {
                    var row = res[key];
                    costo_venta_total = costo_venta_total + row.costVenta
                    // console.log(row.idDetalle, row.ctdUnidadItem)
                });
                sqlNegocio(
                    cadenaDeConexion,
                    "UPDATE info_Ingresos SET costVenta=" + costo_venta_total + " WHERE idIngreso =" + idIngreso,
                    [],
                    function (err_, res_) { });
            });
        return

    }


    //funcion para actualizar el costo de venta despues de editar un registro en la ventana registros   
    static updateCostoVenta(cadenaDeConexion, idDetalle, idIngreso, newCostoVenta, result) {
        var tipoMomiviento = null;
        sqlNegocio(
            cadenaDeConexion,
            "UPDATE detalle_Inventarios SET costVenta=" + newCostoVenta + " WHERE idDetalle =" + idDetalle,
            [],
            function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, err); modificarCostVenta
                }
                else {
                    var costo_venta_total = 0;

                    sqlNegocio(
                        cadenaDeConexion,
                        "Select * from info_Ingresos where idIngreso = ? ",
                        [idIngreso],
                        function (errrr, rres, fields) {
                            Object.keys(rres).forEach(function (key) {
                                var row = rres[key];
                                tipoMomiviento = row.movimiento
                                // console.log(row.idDetalle, row.ctdUnidadItem)
                            });
                        });

                    sqlNegocio(
                        cadenaDeConexion,
                        "Select * from detalle_Inventarios where idIngreso = ? ",
                        [idIngreso],
                        function (errr, res, fields) {
                            Object.keys(res).forEach(function (key) {
                                var row = res[key];
                                costo_venta_total = tipoMomiviento == 1 ? costo_venta_total + parseFloat(row.costVenta) : 0
                                // console.log(row.idDetalle, row.ctdUnidadItem)
                            });
                            sqlNegocio(
                                cadenaDeConexion,
                                "UPDATE info_Ingresos SET costVenta=" + costo_venta_total + " WHERE idIngreso =" + idIngreso,
                                [],
                                function (err_, res_) { });
                        });
                    console.log('update : ', res);
                    result(null, res);
                }
        });
    }
}

module.exports = Inventario;