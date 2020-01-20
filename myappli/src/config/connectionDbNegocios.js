// CONEXION ESPECIAL PARA LOS OTROS NEGOCIOS
module.exports = async (cadenaDeConexion, query, params, result) => {
    var mysql = require('mysql');
    let connection = mysql.createConnection(cadenaDeConexion);

    await connection.connect(function (err) {
        if (err){
            console.log("Error al conectar con la base de datos");
            throw err;
        }else {
            console.log('Conectado a la base de datos');
        }
    });

    if (params === []){
        connection.query(
            query,
            (err, res) => {
                if (err){
                    result(err, null);
                }else{
                    result(null, res);
                }
            }
        );
    }else{
        connection.query(
            query,
            params,
            (err, res) => {
                if (err){
                    result(err, null);
                }else{
                    result(null, res);
                }
            }
        );
    }
};
