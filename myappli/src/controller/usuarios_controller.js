'use strict';

let Usuario = require('../models/usuarios_model');

exports.crearNuevoUsuario = function (req, res) {
    console.log("OBJ NUEVO USUARIO", req.body);
    //Hace la encriptacion de la contraseña
    let nuevoUsuario = new Usuario(req.body);
    nuevoUsuario.claveUM = Usuario.toHash(nuevoUsuario.claveUM);

    Usuario.registrarUsuarioSesion(nuevoUsuario, function(err, result) {
        /*
        if (err){
            res.send(err);
        }else{
            res.send(result);
            
        }
        */
        if (err){
            res.send(err);
        }else{
            res.json(result);
        } 
    });

};


exports.actualizarUsuario = function (req, res) {
    console.log("datos a actualizar:", req.body);
    let nuevoUsuario = new Usuario(req.body);
    Usuario.actualizarUsuario( nuevoUsuario, function(err, result) {
        if (err){
            console.log(err);
            res.send({status: "error", msg: "Error al actualizar", data: []});
        }else{
            console.log("Actualizar usuario:", result);
            res.send({status: "ok", msg: "Actualizacion con éxito, compruebe respuesta", data: result});
        }
    });
};


exports.inicioSesion = function (req, res) {
    let usuario = new Usuario(req.body);
    console.log("INGRESANDO", req.body);
    Usuario.inicioSesionMaster(usuario, function (err, result) {
        if (err){
            console.log("error al iniciar sesión en master");
            res.render('ingresar');
        }else{
            console.log("DATOS:", result);
            if (result){
                if (result.idUsuarioMaster > 0){
                    // DATOS QUE EL TOKEN ALMACENARA
                    let tokenData = {
                        idUsuarioMaster: result.idUsuarioMaster,
                        nombresUM: result.nombresUM,
                        tipoPerfilUM: result.tipoPerfilUM,
                        habilitadoUM: result.habilitadoUM,
                        idNegocioAsignadoUM: result.idNegocioAsignadoUM,
                        cadenaDeConexion: result.cadenaDeConexion,
                        timeStamp: new Date(),
                    };

                    const TOKEN = Usuario.generarToken(tokenData);
                    Usuario.guardarTokenDb(result, TOKEN);

                    // GUARDANDO LA COOKIE
                    res.cookie('sdgUsr', TOKEN, {
                        maxAge: new Date(Date.now() + 3600000),
                        //httpOnly: true
                    });
                    res.redirect('/');

                }else{
                    console.log("Credenciales incorrectos");
                    res.render('ingresar');
                }
            }else{
                console.log("No hay ninguna coincidencia");
                res.render('ingresar');
            }
        }
    });
};

/*
exports.inicioSesion = function (req, res) {
    let usuario = new Usuario(req.body);

    Usuario.inicioSesion(usuario,  function (err, result) {
        if (err){ // Si hubo algun error al momento de consultar por la info del usuario
            console.log("Error al iniciar sesión.");
            console.log(err);
            res.render('ingresar');
        }else{ // cuando todo esta normal
           if (result.idUsuario > 0){
               // en este punto creamos nuevo token
               const token = Usuario.generarToken(result); // se genera el token
               Usuario.guardarTokenDb(result, token); // se guarda el token
               console.log("TOKEN:",token);
               res.cookie('sdgUsr', token, {
                   maxAge: new Date(Date.now() + 3600000),
                   //httpOnly: true
               });
               res.redirect('/');
           }else{
               res.render('ingresar');
           }
        }
    })
};
*/
exports.obtenerPermisos = function (req, res) {
    console.log("PASO POR EL MIDDELWARE", req.body);
    if (req.body.apiKey === "GdC2019"){
        // LA CADENA DE CONEXION YA ESTA PASANDO POR
        // EL BODY PARA PODER SOLICITAR A SU MISMA BASE DE DATOS LA INFO REQUERIDA
        Usuario.recuperarPermisos(req.body.dataToken.cadenaDeConexion, req.body.dataToken.tipoPerfilUM, function (err, result) {
            if (err){
                res.send("[]");
            }else{
                let permisosLista = [];
                for (let i = 0; i < result.length; i++){
                    //permisosLista.push(result[i].idPermisoAsignado);
                    permisosLista.push(result[i].idPermisoAperfil);
                }
                console.log("DATOS:", permisosLista);
                res.send(permisosLista);
            }
        });
    }else{
        res.send("[]");
    }
};

exports.obtenerUsuarios = function (req, res) {
    if (req.params.idUsuario === undefined){
        Usuario.obtenerUsuarios(req.body.dataToken.idNegocioAsignadoUM, 0, (err, result) => {
            if (err){
                res.send({status: "error", msg: "Se tienen problemas al obtener usuarios1", data: []});
            }else{
                res.send({status: "ok", msg: "Todo bien", data: result});
            }
        });
    }else{
        Usuario.obtenerUsuarios(req.body.dataToken.idNegocioAsignadoUM, req.params.idUsuario, (err, result) => {
            if (err){
                res.send({status: "error", msg: "Se tienen problemas al obtener usuarios2 " + req.params.idUsuario, data: []});
            }else{
                console.log("DESDE CONTROLADOR:", result);
                res.send({status: "ok", msg: "Todo bien", data: result});
            }
        });
    }
};

exports.deshabilitarUsuarios = function (req, res){
    Usuario.dehabilitarUsuario(req.params.idUsuarioMaster, (err, result) => {
        if (err){
            res.send({status: 'error', msg: 'Error al solicitar consultar al servidor', data: []});
        }else{
            res.send({status: 'ok', msg: 'Usuario deshabilitado', data: result});
        }
    });
};

exports.existeUsuario = function (req, res) {
    console.log("CONTROLADOR:", req.body);
    Usuario.existeUsuario(req.body.dataToken.cadenaDeConexion, req.body.nombreUsuario, (err, result) => {
        if (err){
            console.log(err);
            res.send({status: "error", msg: "Error al validar si existe usuario", data: []});
        }else{
            console.log("validar usuario:", result);
            res.send({status: "ok", msg: "Validación con éxito, compruebe respuesta", data: result});
        }
    });
};



exports.list_all_perfiles= function(req, res) {
    Usuario.getAllPerfil(req.body.dataToken.cadenaDeConexion, function(err, perfil) {
  
      console.log('controller')
      if (err){
        res.send(err);
      }else{
        console.log('res', perfil);
        res.send(perfil);
      }
    });
  };

  exports.cerrar_sesion = function(req, res){
    res.cookie('sdgUsr', '', {
        maxAge: new Date(Date.now() * -1), 
        //httpOnly: true
    });
    res.redirect('/');
  }