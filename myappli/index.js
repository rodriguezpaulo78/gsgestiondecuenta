//Express
const express = require('express');
const app = express();

//Middlewares
const cors = require('cors');
const morgan = require('morgan');

const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

//DEVELOPMENT OR PRODUCTION
app.set('env', 'development');
//app.set('env', 'production');

//Settingsls
app.use(fileUpload());
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//A traves de express voy a usar los archivos estaticos que se encuentran en 'src/public'
//con esto el index.html se sirve de estos.
app.use(express.static(path.join(__dirname, '/src/public')));

//Middlewares
app.use(cors());
app.use(morgan("dev"));
//app.use(express.json());

//Start the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
})

//Routes
app.use('/api/tasks', require('./src/routes/app.routes'));

app.use('/api/ingresos', require('./src/routes/ingresos.routes'));
app.use('/api/pagos', require('./src/routes/ingresos.routes'));
app.use('/api/reportes', require('./src/routes/ingresos.routes'));
app.use('/api/utilidad', require('./src/routes/ingresos.routes'));
app.use('/api/cuentasxpagar', require('./src/routes/ingresos.routes'));

app.use('/api/inventarios', require('./src/routes/inventarios.routes'));
app.use('/api/sucursales', require('./src/routes/sucursales.routes'));

app.use('/api/partidas', require('./src/routes/partidas.routes'));
app.use('/api/grupos', require('./src/routes/partidas.routes'));

app.use('/api/clientes', require('./src/routes/clientes.routes'));
app.use('/api/productos', require('./src/routes/productos.routes'));
app.use('/api/detalles', require('./src/routes/detalles.routes'));
app.use('/api/fuentes', require('./src/routes/fuentes.routes'));
app.use('/api/datos', require('./src/routes/cargardatos.router'));
app.use('/api/negocio', require('./src/routes/negocio.router'));
app.use('/api/comprobante', require('./src/routes/contadores.routes'));
app.use('/myappli/', require('./src/routes/acceso.routes'));
app.use('/usuarios', require('./src/routes/usuarios.routes'));

//para perfiles.routes hay 2 rutas que seguir (revisar)
app.use('/perfiles', require('./src/routes/perfiles.routes'));
app.use('/api/grupos', require('./src/routes/perfiles.routes'));


