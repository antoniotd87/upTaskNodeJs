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

exports.cambiarEstadoTarea = async (req, res) => {
    const { id } = req.params
    const tarea = await Tareas.findOne({ where: { id } })
    // Estado
    let estado = 0
    if (tarea.estado === estado) {
        estado = 1
    }
    tarea.estado = estado

    const resultado = await tarea.save()
    if (!resultado) {
        next()
    }
    console.log(tarea);
    res.send('Actualizado...')
}

exports.eliminarTarea = async (req, res, next) => {
    const { id } = req.params
    const resultado = await Tareas.destroy({ where: { id } })
    if(!resultado) {
        return next()
    }
    res.send('Eliminando Correctamente')
}