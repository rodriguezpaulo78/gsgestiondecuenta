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
}

module.exports = Perfil;