
// CONEXION ESPECIAL PARA LOS OTROS NEGOCIOS
module.exports =  async (cadenaDeConexion, query, params, result) => {
    var mysql = require('mysql');
    let connection = mysql.createConnection(cadenaDeConexion);
    //Se ejecuta 3 veces cuando se quiere anular ingreso
    console.log("cadena de conexion antes de entrar a connect >> "+cadenaDeConexion);

    await connection.connect(function (err) {
        console.log("Cadena de conexion en connect >> "  + cadenaDeConexion);        
        if (err){
            console.log("Error al conectar con la base de datos DB Negocios");
            console.log("------------------");
            throw err;
        }else {
            console.log('Conectado a la base de datos DB NEGOCIOS :d');
            
        }
    });

    //Params son los permisos cargados al iniciar sesion
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
