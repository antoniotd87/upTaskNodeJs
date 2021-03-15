const Proyectos = require('../models/Proyectos')
const Tareas = require('../models/Tareas')
exports.agregarTarea = async (req, res, next) => {
    const proyecto = await Proyectos.findOne({ where: { url: req.params.url } })
    const { tarea } = req.body

    // Estado y ID del Proyecto
    const estado = 0
    const proyectoId = proyecto.id

    // Insertar en la DB
    const resultado = await Tareas.create({ tarea, estado, proyectoId })

    if (!resultado) {
        // next()
    }

    // Redireccionar
    res.redirect(`/proyectos/${req.params.url}`)
}