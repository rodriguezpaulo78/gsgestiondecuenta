const express = require('express');
const router = express.Router();

const RevisarTokenReact = require('../middlewares/revisarTokenReact');
const PerfilController = require('../controller/perfiles_controller');
router.get('/perfiles', RevisarTokenReact, PerfilController.obtenerPerfiles);

module.exports = router;
