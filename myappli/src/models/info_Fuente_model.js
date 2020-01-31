const sqlNegocio = require('../config/connectionDbNegocios');

class Fuente {
    constructor(fuente) {
        this.codFuente=fuente.codFuente;
        this.Fuente=fuente.fuente;
        this.saldo=fuente.saldo;
    }

    static createFuente(cadenaDeConexion, newFuente, result) {
        sqlNegocio(
            cadenaDeConexion,
            `select codFuente from info_fuente where fuente=?`,
            [newFuente.Fuente],
            function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else {
                    if(res.length>0) {
                        sqlNegocio(
                            cadenaDeConexion,
                            "update info_fuente set ?  where Fuente=?",
                            [ {codFuente:res.codFuente,
                                Fuente: newFuente.fuente,
                                saldo: newFuente.saldo}, newFuente.fuente],
                            function (err_1, res_1) {
                                if (err_1) {
                                    console.log("error: ", err_1);
                                    result(err_1, null);
                                }
                                else {
                                    console.log(res_1.insertId);
                                    result(null,-1);
                                }
                            });
                    }
                    else{
                        sqlNegocio(
                            cadenaDeConexion,
                            "insert into info_fuente set ?",
                            [newFuente],
                            function (err_2, res_2) {
                                if (err_2) {
                                    console.log("error: ", err_2);
                                    result(err_2, null);
                                }else{
                                    console.log(res_2.insertId);
                                    result(null, res_2.insertId);
                                }
                            });
                    }
                }
            });
    }
    
    static getAllFuente(cadenaDeConexion, result) {
        sqlNegocio(
            cadenaDeConexion,
            `select * from info_fuente` ,
            [],
            function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                }else {
                    console.log('fuentes : ', res);
                    result(null, res);
                }
            });
    }
}

module.exports= Fuente;