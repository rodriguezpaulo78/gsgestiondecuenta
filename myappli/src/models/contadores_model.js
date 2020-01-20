const sqlNegocio = require('../config/connectionDbNegocios');

class Contadores{
    constructor(){
    }

    static obtenerValores(cadenaDeConexion, codigo, result){
        sqlNegocio(
            cadenaDeConexion,
            'SELECT * FROM contadores WHERE codigo=?',
            [codigo === "0"? "boleta": codigo === "1"? "factura": "nada"],
            function (err, res){
                if (err){
                    console.log("ERRORES en el modelo");
                    result(err, null);
                }else{
                    console.log("Se obtuvieron datos desde el modelo");
                    result(null, res);
                }
            }
        );
    }
}

module.exports = Contadores;