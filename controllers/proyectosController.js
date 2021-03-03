// Importar el modelo
const Proyectos = require('../models/Proyectos')
const slug = require('slug')

exports.proyectosHome = (req, res) => {
    res.render('index', {
        nombrePagina: 'Proyectos'
    })
}

exports.formularioProyecto = (req, res) => {
    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto'
    })
}

exports.nuevoProyecto = async (req, res) => {
    console.log(req.body);

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
            errores
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