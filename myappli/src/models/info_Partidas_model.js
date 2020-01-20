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
            "insert into info_Partidas set ?",
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
            "insert into info_GrupoPartidas (nombreGrupo) values(?) ",
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
            `select idPartida,nombrePartida,nombreGrupo from info_Partidas join info_GrupoPartidas   
        on info_Partidas.idGrupo =info_GrupoPartidas.idGrupoPartida` ,
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
            `select idGrupoPartida,nombreGrupo from   info_GrupoPartidas   ` ,
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

