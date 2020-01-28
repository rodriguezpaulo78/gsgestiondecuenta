const sqlNegocio = require('../config/connectionDbNegocios');

class Detalle{
    constructor(detalle){
        this.idIngreso=detalle.idIngreso;
        this.ctdUnidadItem=detalle.ctdUnidadItem;
        this.codUnidadMedida=detalle.codUnidadMedida;
        this.idProducto=detalle.idProducto;
        this.desItem=detalle.desItem;
        this.tipoAfecto=detalle.tipoAfecto;
        this.mtoPrecioUnitario=detalle.mtoPrecioUnitario;
        this.mtoValorUnitario=detalle.mtoValorUnitario;
        this.mtoValorVenta=detalle.mtoValorVenta;
        this.igv=detalle.igv;
        this.isc=detalle.isc;
        this.mtoSumTributos=detalle.mtoSumTributos;
        this.mtoVentaTotal=detalle.mtoVentaTotal;
        this.mtoDsctoItem=detalle.mtoDsctoItem;
    }
    // 
    static getDetalleById(cadenaDeConexion, detallesId, result) {
        sqlNegocio(
            cadenaDeConexion,
            "Select * from detalle_inventarios where idIngreso = ? ",
            [detallesId],
            function (err, res) {
                if (err){
                    console.log("error: ", err);
                    result(err, null);
                }else{
                    console.log("error: ", res);
                    result(null, res);
                }
            });
    }
 

    //funcion para crear un nuevo registro en la tabla detalle_inventario
    //retorna el id del registro nuevo que se creo 
    static createDetalle(cadenaDeConexion, newDetalle, result) {
        sqlNegocio(
            cadenaDeConexion,
            "insert into detalle_inventarios set ?",
            [newDetalle],
            function (err, res) {
                if (err){
                    console.log("error: ", err);
                    result(err, null);
                }else{
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });
    }

    static getDetalleReferencia(cadenaDeConexion, idReferencia, result){
        sqlNegocio(
            cadenaDeConexion,
            'SELECT * FROM info_ingresos WHERE idIngreso=?',
            [idReferencia],
            function (err, res) {
                    if (err){
                        result(err, null);
                    }else{
                        result(null, res);
                    }
            });
    }

    static updateCostVentaReferencia(cadenaDeConexion, idReferencia, nuevoCostVenta, result){
        sqlNegocio(
            cadenaDeConexion,
            'UPDATE info_ingresos SET costVenta=? WHERE idIngreso=?',
            [nuevoCostVenta, idReferencia],
            function (err, res) {
                    if (err){
                        result(err, null);
                    }else{
                        result(null, res);
                    }
            });
    }
}

module.exports= Detalle;