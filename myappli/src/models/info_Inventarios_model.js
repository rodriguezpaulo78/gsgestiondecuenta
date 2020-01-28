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
            "Select * from detalle_inventarios where idDetalle = ? ",
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
            `select detalle_inventarios.idDetalle as numRegistro,info_ingresos.codMes,info_sucursales.nombreSucursal,info_ingresos.tipOperacion,info_ingresos.idPartida, nombrePartida, nombreGrupo,
        detalle_inventarios.codUnidadMedida,detalle_inventarios.idDetalle as codItem, detalle_inventarios.desItem, detalle_inventarios.mtoValorUnitario,detalle_inventarios.mtoPrecioUnitario,detalle_inventarios.tipoAfecto,detalle_inventarios.ctdUnidadItem, detalle_inventarios.mtoValorVenta,detalle_inventarios.igv,detalle_inventarios.isc,detalle_inventarios.mtoSumTributos,detalle_inventarios.mtoVentaTotal,info_ingresos.idIngreso as codOperacion

from detalle_inventarios left join info_ingresos on detalle_inventarios.idIngreso=info_ingresos.idIngreso
left join info_productos on info_productos.idProducto= detalle_inventarios.idProducto
left join info_sucursales on info_ingresos.codSucursal=info_sucursales.codSucursal
left join (select info_partidas.idPartida,info_partidas.nombrePartida,info_grupopartidas.nombreGrupo from info_partidas join info_grupopartidas   
  on info_partidas.idGrupo =info_grupopartidas.idGrupoPartida) as partidas
      on partidas.idPartida= info_ingresos.idPartida
      WHERE info_ingresos.fecEmision  BETWEEN '`+ fI + `' AND '` + fF + `'`,
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
            "SELECT  * from info_ingresos WHERE idIngreso = " + newInventario.idIngreso,
            [],
            function (err, ress) {
                if (ress[0].movimiento == 0) { flag = 1; }
                sqlNegocio(
                    cadenaDeConexion,
                    "insert into detalle_inventarios set ?",
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
                                "UPDATE info_productos SET stockProducto=stockProducto+" + (newInventario.ctdUnidadItem * flag) + " WHERE idProducto =" + newInventario.idProducto,
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
                                "Select * from detalle_inventarios where idIngreso = ? ",
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
                                            "UPDATE info_ingresos SET costVenta=" + costo_venta_total + " WHERE idIngreso =" + newInventario.idIngreso,
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
            "Select * from detalle_inventarios where idIngreso = ? ",
            [idIngreso],
            function (errr, res, fields) {
                Object.keys(res).forEach(function (key) {
                    var row = res[key];
                    costo_venta_total = costo_venta_total + row.costVenta
                    // console.log(row.idDetalle, row.ctdUnidadItem)
                });
                sqlNegocio(
                    cadenaDeConexion,
                    "UPDATE info_ingresos SET costVenta=" + costo_venta_total + " WHERE idIngreso =" + idIngreso,
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
            "UPDATE detalle_inventarios SET costVenta=" + newCostoVenta + " WHERE idDetalle =" + idDetalle,
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
                        "Select * from info_ingresos where idIngreso = ? ",
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
                        "Select * from detalle_inventarios where idIngreso = ? ",
                        [idIngreso],
                        function (errr, res, fields) {
                            Object.keys(res).forEach(function (key) {
                                var row = res[key];
                                costo_venta_total = tipoMomiviento == 1 ? costo_venta_total + parseFloat(row.costVenta) : 0
                                // console.log(row.idDetalle, row.ctdUnidadItem)
                            });
                            sqlNegocio(
                                cadenaDeConexion,
                                "UPDATE info_ingresos SET costVenta=" + costo_venta_total + " WHERE idIngreso =" + idIngreso,
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