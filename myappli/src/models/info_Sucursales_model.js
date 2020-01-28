const sqlNegocio = require('../config/connectionDbNegocios');

class Sucursal {
    constructor(sucursal) {
        this.codSucursal=sucursal.codSucursal,
        this.nombreSucursal=sucursal.nombreSucursal.toUpperCase(),
        this.direccionSucursal=sucursal.direccionSucursal,
        this.distrito=sucursal.distrito,
        this.provincia=sucursal.provincia,
        this.departamento=sucursal.departamento

    }


    static getSucursalById(cadenaDeConexion, sucursalId, result) {
        sqlNegocio(
            cadenaDeConexion,
            "Select * from info_sucursales where codSucursal = ? ",
            [sucursalId],
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

    static getAllSucursal(cadenaDeConexion, result) {
        sqlNegocio(
            cadenaDeConexion,
            `select codSucursal,nombreSucursal from info_sucursales`,
            [],
            function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else {
                    console.log('sucursales : ', res);
                    result(null, res);
            }
        });
    }

    static createSucursal(cadenaDeConexion, newSucursal, result) {

        sqlNegocio(
            cadenaDeConexion,
            `select codSucursal from info_sucursales where nombreSucursal=?`,
            [newSucursal.nombreSucursal],
            function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else {

                    if(res.length>0)
                    {
                        newSucursal.codSucursal=res[0].codSucursal;
                        sqlNegocio(
                            cadenaDeConexion,
                            "update info_sucursales set ?  where nombreSucursal=?",
                            [ newSucursal , newSucursal.nombreSucursal],
                            function (err_1, res_1) {
                                if (err_1) {
                                    console.log("error: ", err_1);
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
                            "insert into info_sucursales set ?",
                            [newSucursal],
                            function (err_2, res_2) {
                                if (err_2) {
                                    console.log("error: ", err_2);
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
}

module.exports= Sucursal;