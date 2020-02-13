const express = require('express');
const router = express.Router();

const RevisarTokenReact = require('../middlewares/revisarTokenReact');
const UsuarioController = require('../controller/usuarios_controller');

router.get('/usuarios', RevisarTokenReact, UsuarioController.obtenerUsuarios);
router.post('/usuarios', RevisarTokenReact, UsuarioController.crearNuevoUsuario);
router.put('/usuarios/:idUsuarioMaster', RevisarTokenReact, UsuarioController.deshabilitarUsuarios);
router.get('/usuarios/:idUsuario', RevisarTokenReact, UsuarioController.obtenerUsuarios);
router.get('/obtenerperfiles', RevisarTokenReact, UsuarioController.list_all_perfiles);
router.get('/obtenerruc', RevisarTokenReact, UsuarioController.obtenerRuc);
router.post('/validarusuario', RevisarTokenReact, UsuarioController.existeUsuario);
router.post('/actualizar', RevisarTokenReact, UsuarioController.actualizarUsuario);
router.get('/cerrarsesion', UsuarioController.cerrar_sesion);

module.exports = router;
