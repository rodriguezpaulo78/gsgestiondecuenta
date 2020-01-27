const express = require('express');
const router = express.Router();

const RevisarTokenReact = require('../middlewares/revisarTokenReact');
const UsuarioController = require('../controller/usuarios_controller');

router.get('/usuarios', RevisarTokenReact, UsuarioController.obtenerUsuarios);
router.post('/usuarios', RevisarTokenReact, UsuarioController.create_a_user);

router.put('/usuarios/:idUsuario', RevisarTokenReact, UsuarioController.deshabilitarUsuarios);
router.get('/usuarios/:idUsuario', RevisarTokenReact, UsuarioController.obtenerUsuarios);

router.get('/perfiles', RevisarTokenReact, UsuarioController.list_all_perfiles);

module.exports = router;
