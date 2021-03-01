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
exports.nuevoProyecto = (req, res) => {
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
    }else{
        // Insertar en la base de datosI
    }
}