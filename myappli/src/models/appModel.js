const sql=require('../config/connection');

var Task = function(task){
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};
Task.createTask = function createUser(newTask, result) {    
        sql.query("INSERT INTO tasks set ?", newTask, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });           
};
Task.getTaskById = function createUser(taskId, result) {
        sql.query("Select * from tasks where id = ? ", taskId, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
                }
            });   
};
Task.getAllTask = function getAllTask(result) {
        sql.query("Select * from tasks", function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('tasks : ', res); 
                 result(null, res);
                }
            });   
};
Task.updateById = function(id, task, result){
  sql.query("UPDATE tasks SET task = ? WHERE id = ?", [task.task, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};
Task.remove = function(id, result){
     sql.query("DELETE FROM tasks WHERE id = ?", [id], function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                 result(null, res);
                }
            }); 
};

//nueva conexion a BD demo
var mysql = require('mysql');
let CADENA_DE_CONEXION = "";
//Cuando entra al servidor le da el valor a esta variable de entorno STR:CONNECTION:DB si no le da le dará el valor de cadena de conexion?
if (process.env.STR_CONNECTION_DB) {
    CADENA_DE_CONEXION = process.env.STR_CONNECTION_DB;
} else {
	//CADENA_DE_CONEXION = "mysql://gestyxtf_concada:concadamaster2020@localhost/gestyxtf_concadamaster?charset=utf8mb4&timezone=-0500";
    //CADENA_DE_CONEXION = "mysql://gestioncuentas:gestioncuentas@127.0.0.1/concadamaster?charset=utf8mb4&timezone=-0500";
    CADENA_DE_CONEXION = "mysql://root:@127.0.0.1/demo?charset=utf8mb4&timezone=-0500";
}
let connection = mysql.createConnection(CADENA_DE_CONEXION);

Task.importarABD = function(file, result){
    console.log("el método llega hasta el modelo");

    /*
    //DEBE estar conectado con la bd a importar (en este caso demo)
    connection.connect(function (err) {
        if (err) throw err;
        else {
            console.log('Servidor Conectado a la BD. :D', connection.CADENA_DE_CONEXION);
        }
    });
    */

    //query para importar a la BD demo 
    sql.query("source ?", 
            [file], 
            function (err, res) {
               if(err) {
                   console.log("error: ", err);
                   result(null, err);
               }
               else{
              
                result(null, res);
               }
           }); 
};

module.exports= Task;