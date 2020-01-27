const sql = require('../config/connection');
const sqlDbNegocios = require('../config/connectionDbNegocios');
const bcrypt = require('bcryptjs');
const momentTimezone = require('moment-timezone');

// ESTE MODELO MANEJA LOS DATOS DE INICIO DE SESIÓN Y LOS DATOS PERSONALES DE LOS USUARIOS, TALES DATOS NO SON TAN ESENCIALES.
class Usuario{
    constructor(usuario = null){
        if (usuario !== null){
            // DATOS DE USUARIO PARA INCIAR SESIÓN Y PRIMER REGISTRO
            this.nombreUM = usuario.nombreUM;
            //this.claveHashUM = "";
            this.tokenUM = "-";
            this.fechaCreacionUM = usuario.fechaCreacionUM;
            // Se usara para registrar los datos del usuario
            if (usuario.idUsuarioMaster !== undefined){ this.idUsuarioMaster = usuario.idUsuarioMaster;}
            if (usuario.rucUM !== undefined){           this.rucUM = usuario.rucUM;}
            if (usuario.claveUM !== undefined){         this.claveUM = usuario.claveUM;}
            if (usuario.creadoPorUM !== undefined){     this.creadoPorUM = usuario.creadoPorUM;}
            if (usuario.tipoPerfilUM !== undefined){    this.tipoPerfilUM = usuario.tipoPerfilUM;}
            if (usuario.habilitadoUM !== undefined){    this.habilitadoUM = usuario.habilitadoUM;}
            if (usuario.idNegocioAsignadoUM !== undefined){ this.idNegocioAsignadoUM = usuario.idNegocioAsignadoUM;}
            // DATOS DE USUARIOS EN OTRA TABLA
            if (usuario.numDocumentoUM !== undefined){      this.numDocumentoUM = usuario.numDocumentoUM;}
            if (usuario.tipoDocumentoUM !== undefined){     this.tipoDocumentoUM = usuario.tipoDocumentoUM;}
            if (usuario.nombresUM !== undefined){   this.nombresUM = usuario.nombresUM;}
            if (usuario.apellidosUM !== undefined){ this.apellidosUM = usuario.apellidosUM;}
            if (usuario.telefonosUM !== undefined){ this.telefonosUM = usuario.telefonosUM;}
            if (usuario.direccionUM !== undefined){ this.direccionUM = usuario.direccionUM;}
            if (usuario.correosUM !== undefined){   this.correosUM = usuario.correosUM;}
            if (usuario.ciudad !== undefined){      this.ciudad = usuario.ciudad;}
            if (usuario.departamento !== undefined){this.departamento = usuario.departamento;}
            if (usuario.provincia !== undefined){   this.provincia = usuario.provincia;}
        }
    }

    //FUNCION PARA CREAR UN NUEVO USUARIO EN LA BD
    static createUsuario(cadenaDeConexion, newUsuario, result){
        let fechaSistema = momentTimezone(new Date()).tz('america/Lima'); // libreria para convertir zona horaria - para cuando este en servidor en la nube.
        fechaSistema = fechaSistema.format("YYYY-MM-DD");
        sql.query(
            
            `select idUsuarioMaster from usuariosmaster where nombreUM=?`,
            [newUsuario.nombreUM],
            function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else {

                    if(res.length>0)
                    {
                        newUsuario.idUsuarioMaster=res[0].idUsuarioMaster;
                        sql.query(
                            
                            "update usuariosmaster set ?  where nombreUM=?",
                            [ newUsuario , newUsuario.nombreUM],
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
                        sql.query(
                            
                            "insert into usuariosmaster set ?",
                            [newUsuario],
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
    static getAllPerfil(cadenaDeConexion, result) {
        sqlDbNegocios(
            cadenaDeConexion,
            `select  nombrePerfil from   perfiles   ` ,
            [],
            function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else {
                    console.log('perfiles : ', res);
                    result(null, res);
                }
            });
    }

    // FUNCIÓN PARA REGISTRAR UN USUARIO NUEVO
    // {nombreUsuario: "", claveUsuario: "", creadoPor: "", tipoPerfil: ""}
    static registrarUsuarioSesion(nuevoUsuario, result){
        let fechaSistema = momentTimezone(new Date()).tz('america/Lima'); // libreria para convertir zona horaria - para cuando este en servidor en la nube.
        fechaSistema = fechaSistema.format("YYYY-MM-DD");
        sql.query(
            'INSERT INTO usuariosmaster(nombreUM,rucUM,claveUM,tokenUM,fechaCreacionUM,creadoPorUM,tipoPerfilUM,habilitadoUM,idNegocioAsignadoUM) VALUES (?,?,?,?,?,?,?,?,?)',
            [this.nombreUM,this.rucUM,this.claveUM,'-',fechaSistema,this.creadoPorUM !== undefined? this.creadoPorUM: 1,this.tipoPerfilUM !== undefined?this.tipoPerfilUM:2,this.habilitadoUM,this.creadoPorUM !== undefined?this.idNegocioAsignadoUM:1],
            (err, res) => {
                if (err){
                    result(err, null);
                }else{
                    result(null, res);
                }
            }
        );
    }

    static registrarUsuarioDatos(nuevoUsuario, result){
        sqlDbNegocios(
            cadenaDeConexion,
            'INSERT INTO datosusuariosmaster(idDatosUM,nombresUM,apellidosUM,numDocumentoUM,tipoDocumentoUM,telefonosUM,direccionUM,correosUM,ciudad,departamento,provincia) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
            [this.idUsuarioMaster,this.nombresUM,this.apellidosUM,this.numDocumentoUM,this.tipoDocumentoUM,this.telefonosUM,this.direccionUM,this.correosUM,this.ciudad,this.departamento,this.provincia],
            (err, res) => {
                if (err){
                    result(err, null);
                }else{
                    result(null, res);
                }
            }
        );
    }

    // FUNCIÓN PARA INICIAR SESIÓN, SE BUSCAN LOS DATOS DE TODOS DEL USUARIO ASÍ COMO LOS DATOS DEL
    // NEGOCIO AL CUAL FUE ASIGNADO, DE ESTA MANERA YA RECUPERAMOS LA CADENA DE CONEXION
    static inicioSesionMaster(usuario, result){
        sql.query(
            "SELECT * FROM (SELECT * FROM (SELECT * FROM usuariosmaster WHERE nombreUM=? AND rucUM=?) as UsuarioMaster INNER JOIN datosusuariosmaster ON UsuarioMaster.idUsuarioMaster=datosusuariosmaster.idDatosUM) as UsuariosDatosCompletos INNER JOIN datosnegocios ON UsuariosDatosCompletos.idNegocioAsignadoUM=datosnegocios.idDatoNegocio",
            [usuario.nombreUM, usuario.rucUM],
            (err, res) => {
                if (err){
                    result(err, null);
                }else{
                    result(null, res[0]);
                }
            }
        )
    }

    // FUNCION PARA GENERAR EL TOKEN, EN "DATA" CONTIENE LOS DATOS GUARDAR EN EL TOKEN
    static generarToken(data){
        const JWT = require('jsonwebtoken');

        const dataToken = data; // -----------------

        let JWT_PASS_SECRET = "";

        if (process.env.JWT_PASS_SERVER) {
            JWT_PASS_SECRET = process.env.JWT_PASS_SERVER;
        } else {
            JWT_PASS_SECRET = "%%-M1P0d3r0s4Cl4v3-%%";
        }

        let dieTime = {
            expiresIn: '24h'
        };

        return JWT.sign(
            dataToken,
            JWT_PASS_SECRET,
            dieTime
        );
    };

    static recuperarPermisos(cadenaDeConexion, usuario, result) {
        console.log("CONECTANDO PARA EXTRAENDO PERMISOS")
        sqlDbNegocios(
            cadenaDeConexion,
            'SELECT * FROM permisosasignados WHERE idUsuarioAsignado=?',
            [usuario],
            (err, res) => {
                if (err) {
                    result(err, null);
                } else {
                    console.log("EN FN RecuperarPermisos", res);
                    result(null, res);
                }
            }
         );
    }


    static guardarTokenDb(usuario, token){
        sql.query(
            'UPDATE usuarios SET token=? WHERE idUsuario=?',
            [token, usuario.idUsuario],
            (err, res) => {
                if (err){
                    return false;
                }
                return true;
            }
        );
    }

    static toHash(clave){
        console.log("clave:", clave);
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(clave, salt);
    }

    static compareHash(hashClave, clavePlano){
        return bcrypt.compareSync(clavePlano, hashClave);
    }

    // ------------------- ESTA CONSULTA ES EN LA BASE DE DATOS PRINCIPAL ---------------------------------------
    // el parametro IDUSUARIO es para definir que datos obtenemos
    // si idUsuario es 0 obtendra todos los usuarios del negocio
    // si idUsuario es diferente de 0 obtendra solo los datos del usuario que especifiquemos
    static obtenerUsuarios(idNegocio, idUsuario, result){
        let sql_command = '';
        let values = [];
        if (idUsuario === 0){
            sql_command = 'SELECT * FROM (SELECT * FROM usuariosmaster WHERE idNegocioAsignadoUM=?) AS Usuarios INNER JOIN datosusuariosmaster ON Usuarios.idUsuarioMaster=datosusuariosmaster.idDatosUM';
            values = [idNegocio];
        }else{
            sql_command = 'SELECT * FROM (SELECT * FROM usuariosmaster WHERE idUsuario=?) AS Usuarios INNER JOIN datosusuariosmaster ON Usuarios.idUsuarioMaster=datosusuariosmaster.idDatosUM';
            values = [idUsuario];
        }
        sql.query(
            sql_command,
            values,
            (err, res) => {
                if (err){
                    result(err, null);
                }else{
                    result(null, res);
                }
            });
    }

    static dehabilitarUsuario(id_Usuario, result){
        sqlDbNegocios(
            cadenaDeConexion,
            'UPDATE usuarios SET habilitado=\'0\' WHERE idUsuario=?',
            [id_Usuario],
            (err, res) => {
                if (err){
                    console.log("Error en consulta a DB:", err);
                    result(err, null);
                }else{
                    console.log("Sin errores al consultar a la base de datso:", res);
                    result(null, res);
                }
            }
        );
    }

    static habilitarUsuario(idUsuario, result){
        sqlDbNegocios(
            cadenaDeConexion,
            'UDATE usuarios SET habilitado=1 WHERE idUsuario=?',
            [idUsuario],
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

module.exports = Usuario;