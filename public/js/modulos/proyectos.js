import Swal from 'sweetalert2'
import axios from 'axios'

const btnEliminar = document.querySelector('#eliminar-proyecto')

if (btnEliminar) {
    btnEliminar.addEventListener('click', (e) => {
        const urlProyecto = e.target.dataset.proyectoUrl
        // console.log(urlProyecto);

        // Mensaje de confirmacion
        Swal.fire({
            title: 'Deseas borrar este proyecto?',
            text: "Esta accion no se puede revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'No, cancelar!'
        }).then((result) => {
            if (result.isConfirmed) {

                // Peticion a axios
                const url = `${location.origin}/proyectos/${urlProyecto}`

                axios.delete(url, { params: { urlProyecto } })
                    .then(function (respuesta) {
                        console.log(respuesta);
                        Swal.fire(
                            'Proyecto eliminado!',
                            respuesta.data,
                            'success'
                        )
                        setTimeout(() => {
                            window.location.href = '/'
                        }, 2000);
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'No se pudo eliminar el proyecto!',
                        })
                    })

            }

        })
    })
}

export default btnEliminar;