const express = require('express');
const router = express.Router();

const RevisarTokenReact = require('../middlewares/revisarTokenReact');
const PerfilController = require('../controller/perfiles_controller');

//Define la Ruta a través de PerfilController para obtenerPerfiles usando GET
router.get('/perfiles', RevisarTokenReact, PerfilController.obtenerPerfiles);

//Definir el metodo get/post a través del PerfillController(controller) que metodo acceder del Controller
router.post('/perfiles', RevisarTokenReact, PerfilController.create_a_perfil );

//Definer la Ruta a través de PerfilController para obtener los grupos usando GET
router.get('/grupos', RevisarTokenReact, PerfilController.list_all_grupo);
router.get('/permisos', RevisarTokenReact, PerfilController.list_all_permisos);
//router.get('/registrados', RevisarTokenReact, PerfilController.give_permisos);


router.get('/perfilesypermisos', RevisarTokenReact, PerfilController.obtenerPerfilesYpermisos);
router.post('/validarperfil', RevisarTokenReact, PerfilController.existePerfil);


module.exports = router;
