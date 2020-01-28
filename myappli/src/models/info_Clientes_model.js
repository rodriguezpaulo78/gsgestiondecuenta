const sqlNegocio = require('../config/connectionDbNegocios');

class Clientes {
    constructor(clientes) {
        this.idCliente=clientes.idCliente,
        this.tipDocUsuario=clientes.tipDocUsuario,
        this.numDocUsuario=clientes.numDocUsuario,
        this.desDireccionCliente=clientes.desDireccionCliente,
        this.codPaisCliente=clientes.codPaisCliente,
        this.codUbigeoCliente=clientes.codUbigeoCliente,
        this.razSocial=clientes.razSocial
        this.telefonoCliente=clientes.telefonoCliente
        this.correoCliente=clientes.correoCliente
    }

    static createCliente(cadenaDeConexion, newCliente, result) {
        sqlNegocio(
            cadenaDeConexion,
            `select idCliente from info_clientes where numDocUsuario=?`,
            [newCliente.numDocUsuario],
            function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                }else{
                    if(res.length>0){
                        newCliente.idCliente=res[0].idCliente;
                        sqlNegocio(
                            cadenaDeConexion,
                            "update info_clientes set ?  where numDocUsuario=?",
                            [ newCliente , newCliente.numDocUsuario],
                            function (err_1, res_1) {
                                if (err_1) {
                                    console.log("error: ", err_1);
                                    result(err_1, null);
                                }
                                else {
                                    console.log(-1);
                                    console.log(err_1);
                                    result(null,-1);
                                }
                            });
                    }else{
                        sqlNegocio(
                            cadenaDeConexion,
                            "insert into info_clientes set ?",
                            [newCliente],
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

    static getClienteById(cadenaDeConexion, clienteId, result) {
        sqlNegocio(
            cadenaDeConexion,
            "Select * from info_clientes where numDocUsuario = ? ",
            [clienteId],
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
}

module.exports= Clientes;

