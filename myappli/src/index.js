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
//app.set('env', 'development');
app.set('env', 'production');

//Settingsls
app.use(fileUpload());
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//A traves de express voy a usar los archivos estaticos que se encuentran en 'src/public'
//con esto el index.html se sirve de estos.
app.use(express.static(path.join(__dirname, 'public')));

//Middlewares
app.use(cors());
app.use(morgan("dev"));
//app.use(express.json());

//Start the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
})

//Routes
app.use('/api/tasks', require('./routes/app.routes'));

app.use('/api/ingresos', require('./routes/ingresos.routes'));
app.use('/api/pagos', require('./routes/ingresos.routes'));
app.use('/api/reportes', require('./routes/ingresos.routes'));
app.use('/api/utilidad', require('./routes/ingresos.routes'));
app.use('/api/cuentasxpagar', require('./routes/ingresos.routes'));

app.use('/api/inventarios', require('./routes/inventarios.routes'));
app.use('/api/sucursales', require('./routes/sucursales.routes'));

app.use('/api/partidas', require('./routes/partidas.routes'));
app.use('/api/grupos', require('./routes/partidas.routes'));

app.use('/api/clientes', require('./routes/clientes.routes'));

app.use('/api/productos', require('./routes/productos.routes'));

app.use('/api/detalles', require('./routes/detalles.routes'));
app.use('/api/fuentes', require('./routes/fuentes.routes'));
app.use('/api/datos', require('./routes/cargardatos.router'));
app.use('/api/negocio', require('./routes/negocio.router'));
app.use('/api/comprobante', require('./routes/contadores.routes'));
app.use('/', require('./routes/acceso.routes'));

app.use('/usuarios', require('./routes/usuarios.routes'));

//para perfiles.routes hay 2 rutas que seguir (revisar)
app.use('/perfiles', require('./routes/perfiles.routes'));
app.use('/api/grupos', require('./routes/perfiles.routes'));


