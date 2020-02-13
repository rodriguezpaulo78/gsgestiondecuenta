const express = require('express');
const router = express.Router();

const RevisarTokenReact = require('../middlewares/revisarTokenReact');
const PerfilController = require('../controller/perfiles_controller');

//Aquí se definen las rutas a seguir luego del Index.js -> a los controladores y los métodos que manejan
router.get('/perfiles', RevisarTokenReact, PerfilController.obtenerPerfiles);
router.post('/perfiles', RevisarTokenReact, PerfilController.create_a_perfil );
router.get('/grupos', RevisarTokenReact, PerfilController.list_all_grupo);
router.get('/permisos', RevisarTokenReact, PerfilController.list_all_permisos);
router.get('/perfilesypermisos', RevisarTokenReact, PerfilController.obtenerPerfilesYpermisos);
router.post('/validarperfil', RevisarTokenReact, PerfilController.existePerfil);

module.exports = router;
