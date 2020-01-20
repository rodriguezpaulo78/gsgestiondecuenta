const express = require('express');
const router = express.Router();
const RevisarTokenReact = require('../middlewares/revisarTokenReact');
const UsuarioController = require('../controller/usuarios_controller');

router.post('/crearusuario', RevisarTokenReact, UsuarioController.crearNuevoUsuario);
router.put('/usuarios/:idUsuario', RevisarTokenReact, UsuarioController.deshabilitarUsuarios);
router.get('/usuarios/:idUsuario', RevisarTokenReact, UsuarioController.obtenerUsuarios);
router.get('/usuarios', RevisarTokenReact, UsuarioController.obtenerUsuarios);

module.exports = router;
