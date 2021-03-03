const express = require('express')
const routes = require('./routes')
const path = require('path')
const bodyParser = require('body-parser')
const db = require('./config/db')
// Crear la conexion a la base de datos

require('./models/Proyectos')
db.sync()
    .then(() => {
        console.log('Conectado al servidor');
    }).catch(err => console.error('Error', err))

// Crear una app de express
const app = express()

// Habilitar pug
app.set('view engine', 'pug');

// Donde Cargar los archivops estaticos
app.use(express.static('public'))

// Add la carpeta de las vistas
app.set('views', path.join(__dirname, 'views'))

// Habiliyar body parser para leer datos del formulario
app.use(bodyParser.urlencoded({ extended: true }))

// Utilizar las rutas
app.use('/', routes());

app.listen(3000)