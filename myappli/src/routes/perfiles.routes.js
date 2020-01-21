const express = require('express');
const router = express.Router();

const RevisarTokenReact = require('../middlewares/revisarTokenReact');
const PerfilController = require('../controller/perfiles_controller');

router.get('/perfiles', RevisarTokenReact, PerfilController.obtenerPerfiles);

//Definir el metodo get/post a través del PerfillController(controller) que metodo acceder del Controller
router.post('/perfiles', RevisarTokenReact, PerfilController.create_a_perfil );

module.exports = router;
