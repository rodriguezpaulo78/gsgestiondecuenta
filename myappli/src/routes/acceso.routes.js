const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/revisarToken');
const RevisarTokenReact = require('../middlewares/revisarTokenReact');
const UsuarioController = require('../controller/usuarios_controller');

router.route('/ingresar').get((req, res) => {
    console.log("Entrado a página iniciar sesion...");
    res.render('ingresar')
});
router.route('/ingresar').post(UsuarioController.inicioSesion, (req, res) => {
    console.log("la ptmr.");
});
router.post('/permisos', RevisarTokenReact, UsuarioController.obtenerPermisos);

router.get('/', verificarToken, (req, res) => {
    console.log("Entrado a página incial...");
    res.render('index')
});

module.exports = router;
