const express = require('express');
const router = express.Router();

const RevisarTokenReact = require('../middlewares/revisarTokenReact');
const UsuarioController = require('../controller/usuarios_controller');

router.get('/usuarios', RevisarTokenReact, UsuarioController.obtenerUsuarios);
router.post('/usuarios', RevisarTokenReact, UsuarioController.crearNuevoUsuario);

//Al parecer sólo se puede usar una ruta de tipo /usuarios_
router.post('/usuariosCuenta', RevisarTokenReact, UsuarioController.crearNuevoUsuarioCuenta);
router.post('/usuariosnegocio', RevisarTokenReact, UsuarioController.crearNuevoUsuarioNegocio);

router.put('/usuarios/:idUsuario', RevisarTokenReact, UsuarioController.deshabilitarUsuarios);
router.get('/usuarios/:idUsuario', RevisarTokenReact, UsuarioController.obtenerUsuarios);

router.get('/perfiles', RevisarTokenReact, UsuarioController.list_all_perfiles);
router.post('/validarusuario', RevisarTokenReact, UsuarioController.existeUsuario);

module.exports = router;
