const express = require('express');
const router = express.Router();
const todoList = require('../controller/info_Productos_controller');
const RevisarTokenReact = require('../middlewares/revisarTokenReact');

router.get('/productos/plantillaimportar/:tipo', RevisarTokenReact, todoList.crearPlantilla);

router.get('/productos/:productoId', RevisarTokenReact, todoList.read_a_productos);

router.get('/productos', RevisarTokenReact, todoList.list_all_producto)
    .post('/productos', RevisarTokenReact, todoList.create_a_producto);


router.post('/productos/cargardatos', RevisarTokenReact, todoList.load_data_csv);

router.post('/productos/actualizardatos', RevisarTokenReact, todoList.update_data_csv);

router.get('/productos/sucursal/:sucursalId', RevisarTokenReact, todoList.list_producto_sucursal);

router.get('/productos/:idProvedor', RevisarTokenReact, todoList.toShowProducts);

router.get('/productos/filtro/:idSucursal/:nomColumna/:valColumna', RevisarTokenReact, todoList.getByFilter);

router.post('/productos/exportar/:idProvedor/:unidadesMinimas', RevisarTokenReact, todoList.exportar_excel);

router.get('/productos/:productoId', RevisarTokenReact, todoList.read_a_productos);

router.get('/generar', RevisarTokenReact, todoList.crearPdf);

module.exports = router;