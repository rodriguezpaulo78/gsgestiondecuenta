const sqlNegocio = require('../config/connectionDbNegocios');

class Partida {
    constructor(partida) {
        this.idPartida=partida.idPartida,
        this.nombrePartida=partida.nombrePartida,
        this.idGrupo=partida.idGrupo
    }


    static createPartida(cadenaDeConexion, newPartida, result) {
        sqlNegocio(
            cadenaDeConexion,
            "insert into info_partidas set ?",
            [newPartida],
            function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else {
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });
    }

    static createGrupo(cadenaDeConexion, newGrupo, result) {
        sqlNegocio(
            cadenaDeConexion,
            "insert into info_grupopartidas (nombreGrupo) values(?) ",
            [newGrupo],
            function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else {
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });
    }
    
    static getAllPartida(cadenaDeConexion, result) {
        sqlNegocio(
            cadenaDeConexion,
            `select idPartida,nombrePartida,nombreGrupo from info_partidas join info_grupopartidas   
        on info_partidas.idGrupo =info_grupopartidas.idGrupoPartida` ,
            [],
            function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else {
                    console.log('partidas : ', res);
                    result(null, res);
                }
            });
    }

    static getAllGrupoPartida(cadenaDeConexion, result) {
        sqlNegocio(
            cadenaDeConexion,
            `select idGrupoPartida,nombreGrupo from   info_grupopartidas   ` ,
            [],
            function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else {
                    console.log('partidas : ', res);
                    result(null, res);
                }
            });
    }
}

module.exports= Partida;

