const sqlNegocio = require('../config/connectionDbNegocios');

class Perfil{
    constructor(){

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
    
    //


    //
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
}

module.exports = Perfil;