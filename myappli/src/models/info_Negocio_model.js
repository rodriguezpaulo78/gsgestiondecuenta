const sqlNegocio = require('../config/connectionDbNegocios');

class Negocio{
    constructor(){

    }

    static obtenerDatosImpresion(cadenaDeConexion, result){
        sqlNegocio(
            cadenaDeConexion,
            "SELECT * FROM info_negocio",
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

    static actualizarDatosEmpresa(cadenaDeConexion, datos, result){
        sqlNegocio(
            cadenaDeConexion,
            'UPDATE info_negocio SET ? WHERE id_infonegocio=1',
            [datos],
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

module.exports = Negocio;