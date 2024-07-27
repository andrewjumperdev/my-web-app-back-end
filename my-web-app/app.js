const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./db')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const contactRouter = require('./routes/contact');

const app = express();

// Configuración de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para analizar application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Middleware para analizar application/json
app.use(bodyParser.json());

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:3000', // Cambia esto si tu frontend está en otro puerto u origen
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contact', contactRouter); // Agregar la ruta de contact

// Captura 404 y reenvía al manejador de errores
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejador de errores
app.use(function(err, req, res, next) {
  // Configura locales, solo proporciona error en desarrollo
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderiza la página de error
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;