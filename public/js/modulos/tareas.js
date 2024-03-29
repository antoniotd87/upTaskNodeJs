import axios from "axios"
import Swal from "sweetalert2"
import { actualizarAvance } from "../funciones/avance"

const tareas = document.querySelector('.listado-pendientes')

if (tareas) {
    tareas.addEventListener('click', (e) => {
        if (e.target.classList.contains('fa-check-circle')) {
            const icono = e.target
            const idTarea = icono.parentElement.parentElement.dataset.tarea

            // reqeuest hacia /Tareas/:id
            const url = `${location.origin}/tareas/${idTarea}`

            axios.patch(url, { idTarea })
                .then(respuesta => {
                    if (respuesta.status = 200) {
                        icono.classList.toggle('completo')

                        actualizarAvance()
                    }
                })
        }
        if (e.target.classList.contains('fa-trash')) {
            const icono = e.target
            const idTarea = icono.parentElement.parentElement.dataset.tarea


            Swal.fire({
                title: 'Deseas borrar esta tarea?',
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
                    const url = `${location.origin}/tareas/${idTarea}`

                    axios.delete(url, { params: { idTarea } })
                        .then(function (respuesta) {
                            if (respuesta.status === 200) {
                                Swal.fire(
                                    'Tarea eliminada!',
                                    respuesta.data,
                                    'success'
                                )
                                icono.parentElement.parentElement.remove()
                                actualizarAvance()
                            }
                        })
                        .catch(() => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'No se pudo eliminar la tarea!',
                            })
                        })

                }

            })
        }
    })
}
export default tareas