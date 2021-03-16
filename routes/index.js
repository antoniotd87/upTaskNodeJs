const express = require('express')
const router = express.Router();

// Importar Express Validatos
const { body } = require('express-validator/check')

// Importar el controlador\
const proyectosController = require('../controllers/proyectosController')
const tareasController = require('../controllers/tareasControllers')
module.exports = function () {
    // Ruta para el home 
    router.get('/', proyectosController.proyectosHome)
    router.get('/nuevo-proyecto', proyectosController.formularioProyecto)
    router.post('/nuevo-proyecto',
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto
    )

    // Listar proyecto
    router.get('/proyectos/:url', proyectosController.proyectoPorUrl)

    // Actualizar proyecto
    router.get('/proyectos/editar/:id', proyectosController.formularioEditar)
    router.post('/nuevo-proyecto/:id',
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.actualizarProyecto
    )

    // Eliminar proyecto
    router.delete('/proyectos/:url', proyectosController.eliminarProyecto)

    // Tareas
    router.post('/proyectos/:url', tareasController.agregarTarea)
    // Actualizar tareas
    router.patch('/tareas/:id', tareasController.cambiarEstadoTarea)
    // Eliminar Tarea
    router.delete('/tareas/:id', tareasController.eliminarTarea)
    return router;
}