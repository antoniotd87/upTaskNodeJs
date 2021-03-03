// Importar el modelo
const Proyectos = require('../models/Proyectos')
const slug = require('slug');

exports.proyectosHome = async (req, res) => {
    const proyectos = await Proyectos.findAll();
    res.render('index', {
        nombrePagina: 'Proyectos',
        proyectos
    })
}

exports.formularioProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll();
    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    })
}

exports.nuevoProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll();

    // Validar que tengamos algo en el input

    const { nombre } = req.body

    let errores = [];

    if (!nombre) {
        errores.push({
            'texto': 'Agregar un nombre al proyecto'
        })
    }

    if (errores.length > 0) {
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos,
        })
    } else {
        // Insertar en la base de datos
        // Proyectos.create({ nombre })
        //     .then(() => {
        //         console.log('Insertado Correctamente');
        //     }).catch(err => {
        //         console.log(err);
        //     })

        // const url = slug(nombre)

        // const proyecto = await Proyectos.create({ nombre, url })
        const proyecto = await Proyectos.create({ nombre })
        res.redirect('/')
    }
}

exports.proyectoPorUrl = async (req, res) => {
    const proyectos = await Proyectos.findAll();
    const proyecto = await Proyectos.findOne({
        where: {
            url: req.params.url
        }
    })
    if (!proyecto) {
        res.send('BAD')
        return
    }
    // console.log(proyecto);
    res.render('tareas', {
        nombrePagina: 'Tareas del Proyecto',
        proyecto,
        proyectos
    })
}