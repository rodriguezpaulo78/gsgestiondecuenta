const sqlNegocio = require('../config/connectionDbNegocios');
const momentTimezone = require('moment-timezone');

class Perfil{
    constructor(perfil){
        
            this.idPerfil=perfil.idPerfil,
            this.nombrePerfil=perfil.nombrePerfil.toUpperCase()
            this.fechaCreacion=perfil.fechaCreacion.toUpperCase()
   
    }

    static obtenerListaPerfiles(cadenaDeConexion, result){
        sqlNegocio(
            cadenaDeConexion,
            'SELECT * FROM perfiles',
            [],
            (err, res) => {
                if (err){
                    result(err, null);
                }else{console.log("Perfiles Obtenidos:", res);
                    result(null, res);
                }
            }
        );
    }

    //FUNCION PARA CREAR UN NUEVO PERFIL EN LA BD
    static createPerfil(cadenaDeConexion, newPerfil, result){
        let fechaSistema = momentTimezone(new Date()).tz('america/Lima'); // libreria para convertir zona horaria - para cuando este en servidor en la nube.
        fechaSistema = fechaSistema.format("YYYY-MM-DD");
        sqlNegocio(
            cadenaDeConexion,
            `select idPerfil from perfiles where nombrePerfil=?`,
            [newPerfil.nombrePerfil],
            function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else {

                    if(res.length>0)
                    {
                        newPerfil.idPerfil=res[0].idPerfil;
                        sqlNegocio(
                            cadenaDeConexion,
                            "update perfiles set ?  where nombrePerfil=?",
                            [ newPerfil , newPerfil.nombrePerfil],
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
                            "insert into perfiles set ?",
                            [newPerfil],
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

    //Función que hace la consulta a la BD para obtener todos los grupos de permisos.
    static getAllGrupo(cadenaDeConexion, result) {
        sqlNegocio(
            cadenaDeConexion,
            `select  nombreGrupo from   grupos   ` ,
            [],
            function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else {
                    console.log('grupos : ', res);
                    result(null, res);
                }
            });
    }

     //Función que hace la consulta a la BD para obtener todos los permisos de los grupos
     static getAllPermisos(cadenaDeConexion, result) {
        sqlNegocio(
            cadenaDeConexion,
            `select  idPermisoRelacionado from   permisosgrupos   ` ,
            [],
            function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else {
                    console.log('permisos : ', res);
                    result(null, res);
                }
            });
    }

    static obtenerPerfilesYpermisos(cadenaDeConexion, result){
        sqlNegocio(
            cadenaDeConexion,
            'SELECT idPerfilAsignado,idPermisoAperfil,nombrePermiso,descripcion, nombrePerfil FROM (SELECT * FROM permisosperfiles INNER JOIN permisos ON permisosperfiles.idPermisoAperfil=permisos.idPermiso) AS PermisoPerfil INNER JOIN perfiles ON PermisoPerfil.idPerfilAsignado=perfiles.idPerfil WHERE PermisoPerfil.habilitado=true',
            [],
            (err, res) => {
                if (err){
                    result(err, null);
                }else{
                    result(null, res);
                }
            }
        );
    }

    static existePerfil(cadenaDeConexion, nombrePerfil, result){
        console.log("PARAMETRO:", nombrePerfil);
        sqlNegocio(
            cadenaDeConexion,
            "SELECT idPerfil FROM perfiles WHERE nombrePerfil=?",
            [nombrePerfil],
            (err, res) => {
                if (err){
                    result(err, null);
                }else{
                    console.log("VALIDAR:", res);
                    result(null, res);
                }
            }
        );
    }
}

module.exports = Perfil;