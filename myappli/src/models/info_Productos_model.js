const sqlNegocio = require('../config/connectionDbNegocios');

class Producto {
    constructor(producto) {
        this.idProducto = producto.idProducto;
        this.nombreProducto = producto.nombreProducto;
        this.stockProducto = producto.stockProducto;
        this.precioProducto = producto.precioProducto;
        this.costVenta = producto.costVenta;
        this.sucursal = producto.sucursal;
        this.serie = producto.serie;
        this.codUnidadMedida = producto.codUnidadMedida;
        this.codPartida = producto.codPartida;
        this.fechaVencimiento = producto.fechaVencimiento;
    }


    static getProductoById(cadenaDeConexion, productoId, result) {
        sqlNegocio(
            cadenaDeConexion,
            "Select * from info_productos  WHERE nombreProducto LIKE '%"+productoId+"%' ",
            [],
            function (err, res) {
              //productoId remplaza a nombre producto, hacemos la busca de todos los productos q tengas ese contenido en su campo nombreproducto
                if (err) {
                    console.log("error obtener: ", err);
                    result(err, null);
                }
                else {
                    result(null, res);
                }
            });
    }

    static getAllProducto(cadenaDeConexion, result) {
        sqlNegocio(
            cadenaDeConexion,
            `select *from info_productos` ,
            [],
            function (err, res) {
                if (err) {
                    console.log("error obtener todos: ", err);
                    result(null, err);
                }
                else {
                    console.log('OBTENIDO TODOS LOS PRODUCTOS');
                    result(null, res);
                }
            });
    }

    static getProductoSucursal(cadenaDeConexion, sucursalId, result){
        if (sucursalId < 0){
            sqlNegocio(
                cadenaDeConexion,
                'SELECT * FROM info_productos',
                [],
                function (err, res) {
                    if (err){
                        result(err, res);
                    }else{
                        result(null, res);
                    }
                })
        }else{
            sqlNegocio(
                cadenaDeConexion,
                'SELECT * FROM info_productos WHERE sucursal=?',
                [sucursalId],
                function (err, res) {
                    if (err){
                        result(err, res);
                    }else{
                        result(null, res);
                    }
                })
        }
    }

    static getProductsToPrint(cadenaDeConexion, sucursalId, result){
        if (sucursalId === "-1"){
            sqlNegocio(
                cadenaDeConexion,
                'SELECT * FROM info_productos',
                [],
                function (err, res) {
                    if (err) {
                        result(err, null);
                    }else{
                        result(null, res);
                    }
                }
            );
        }else{
            sqlNegocio(
                cadenaDeConexion,
                'SELECT * FROM info_productos WHERE sucursal=?',
                [sucursalId],
                function (err, res) {
                    if (err) {
                        result(err, null);
                    }else{
                        result(null, res);
                    }
                }
            );
        }
    }

    static getProductosByCondition(cadenaDeConexion, sucursalId, columnName, valueColumn, result){
        console.log("ID:", sucursalId, "- Columna:", columnName, "- Valor:", valueColumn);
        if (sucursalId === "-1"){
            sqlNegocio(
                cadenaDeConexion,
                'SELECT * FROM info_productos WHERE ' + columnName + ' LIKE \'%' + valueColumn +'%\'',
                [],
                function (err, res) {
                    if (err) {
                        result(null, err);
                    }else{
                        result(null, res);
                    }
                }
            );
        }else{
            sqlNegocio(
                cadenaDeConexion,
                'SELECT *  FROM (SELECT * FROM info_productos WHERE sucursal=?) as productos WHERE ' + columnName + ' LIKE \'%' + valueColumn +'%\'',
                [sucursalId],
                function (err, res) {
                    if (err) {
                        result(null, err);
                    }else{
                        result(null, res);
                    }
                }
            );
        }
    }

    static createProducto(cadenaDeConexion, newProducto, result) {
        sqlNegocio(
            cadenaDeConexion,
            `select idProducto from info_productos where nombreProducto=?`,
            [newProducto.nombreProducto],
            function (err, res) {
                if (err) {
                    console.log("error buscando: ", err);
                    result(null, err);
                }
                else {

                    if(res.length>0)
                    {
                        newProducto.idProducto=res[0].idProducto;
                        sqlNegocio(
                            cadenaDeConexion,
                            "update info_productos set ?  where nombreProducto=?",
                            [ newProducto , newProducto.nombreProducto],
                            function (err_1, res_1) {
                                if (err_1) {
                                    console.log("error actualizando: ", err_1);
                                    result(err_1, null);
                                }
                                else {
                                    console.log(-1);
                                    result(null,-1);
                                }
                            });
                    }
                    else{
                        sqlNegocio(
                            cadenaDeConexion,
                            "insert into info_productos set ?",
                            [newProducto],
                            function (err_2, res_2) {
                                if (err_2) {
                                    console.log("error insertando: ", err_2);
                                    result(err_2, null);
                                }
                                else {
                                    console.log(res_2.insertId);
                                    result(null, res_2.insertId);
                                }
                            });
                    }
                }
            });
    }

    static updateProductoStock(cadenaDeConexion, oldStock, result){
        console.log("OBJETO");
        console.log(oldStock);
        sqlNegocio(
            cadenaDeConexion,
            'UPDATE info_productos SET stockProducto=? WHERE idProducto=?',
            [oldStock.nuevoStock, oldStock.idProducto],
            function (err, res) {
                if (err){
                    console.log("error al insertar");
                    result(null, err);
                }else{
                    console.log("Stock actualizado");
                    console.log(oldStock);
                    result(null, res);
                }
            }
        );
    }
}

module.exports= Producto;