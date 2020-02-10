'user strict';

var mysql = require('mysql');

//'mysql://root:@host/concada?charset=utf8mb4&timezone=-0500'
//local mysql db connection
/*var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'concada',
    chartset: 'utf8mb4',
});*/

let CADENA_DE_CONEXION = "";
//Cuando entra al servidor le da el valor a esta variable de entorno STR:CONNECTION:DB si no le da le dará el valor de cadena de conexion?
if (process.env.STR_CONNECTION_DB) {
    CADENA_DE_CONEXION = process.env.STR_CONNECTION_DB;
} else {
	//CADENA_DE_CONEXION = "mysql://gestyxtf_concada:concadamaster2020@localhost/gestyxtf_concadamaster?charset=utf8mb4&timezone=-0500";
    //CADENA_DE_CONEXION = "mysql://gestioncuentas:gestioncuentas@127.0.0.1/concadamaster?charset=utf8mb4&timezone=-0500";
    CADENA_DE_CONEXION = "mysql://root:@127.0.0.1/concadamaster?charset=utf8mb4&timezone=-0500";
}

let connection = mysql.createConnection(CADENA_DE_CONEXION);

connection.connect(function (err) {
    if (err) throw err;
    else {
        console.log('Servidor Conectado a la BD. :D');
    }
});

module.exports = connection;
