<script setup>
import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'

// Importación de Bootstrap (CSS + JS) para estilos y modales
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Importación del componente de navegación superior
import NavBar from '@/components/NavBar.vue'

// DECLARACIÓN DE LAS VARIABLES

// Lista de rutas obtenidas desde la API
const routes = ref([])

// Lista de usuarios (guías incluidos)
const users = ref([])

// Mensaje de error general
const errorMsg = ref('')

// ID de la ruta que se está editando actualmente
const editingRouteId = ref(null)

// ID del guía seleccionado en el desplegable
const selectedGuideId = ref('')

// INSTANCIACIÓN DE LA RUTA Y SUS VALORES
// Objeto reactivo que se usa para crear una nueva ruta
const newRoute = ref({
  titulo: '',
  localidad: '',
  descripcion: '',
  fecha: '',
  hora: '',
  latitud: '',
  longitud: ''
})

// FUNCIÓN PARA CARGAR LAS RUTAS //
// Obtiene todas las rutas desde la API y las guarda en el estado

async function loadRoutes() {
  errorMsg.value = ''

  try {
    const response = await fetch('http://localhost:8005/api.php/rutas')
    const data = await response.json()
    // Si routes no es null usa su valor, y si lo es, usa data
    routes.value = data.routes ?? data
  } catch (err) {
    console.error(err)
    errorMsg.value = 'No se pudieron cargar las rutas'
  }
}

// FUNCION PARA CARGAR USUARIOS //
// Carga todos los usuarios para poder filtrar guías disponibles

async function loadUsers() {
  try {
    const response = await fetch('http://localhost:8005/api.php/usuarios')
    users.value = await response.json()
  } catch (err) {
    console.error('Error cargando usuarios')
  }
}

// FUNCION PARA CARGAR LAS RUTAS DISPONIBLES DE LOS GUIAS
// Devuelve solo los guías que no tengan ruta asignada en la misma fecha

function availableGuidesForDate(fecha) {
  return users.value.filter(
    u =>
      u.rol === 'guia' &&
      !routes.value.some(r => r.fecha === fecha && r.guia_id === u.id)
  )
}

// CREAR RUTA //
// Envía los datos del formulario a la API y crea una nueva ruta

async function createRoute() {
  try {
    // Genera un ID aleatorio de 5 cifras
    newRoute.value.id = Math.floor(10000 + Math.random() * 90000)

    // Campos extra necesarios para la API
    newRoute.value.foto = ''
    newRoute.value.guia_id = null

    const response = await fetch('http://localhost:8005/api.php/rutas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRoute.value)
    })

    const data = await response.json()

    // Si la API responde con error, se lanza excepción
    if (data.status !== 'success') {
      throw new Error(data.message || 'Error al crear ruta')
    }

    // Resetea el formulario tras crear la ruta
    newRoute.value = {
      titulo: '',
      localidad: '',
      descripcion: '',
      fecha: '',
      hora: '',
      latitud: '',
      longitud: ''
    }

    // Recarga las rutas para reflejar los cambios
    loadRoutes()

    // Cierra el modal manualmente usando Bootstrap
    const modal = document.getElementById('createRouteModal')
    const bootstrapModal = Modal.getInstance(modal) || new Modal(modal)
    bootstrapModal.hide()

  } catch (err) {
    alert(err.message)
  }
}

// ASIGNAR GUÍA //
// Asigna un guía a una ruta concreta

async function assignGuide(routeId) {
  try {
    const response = await fetch('http://localhost:8005/api.php/asignaciones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ruta_id: routeId,
        guia_id: selectedGuideId.value
      })
    })

    const data = await response.json()

    // Control de errores devueltos por la API
    if (data.status !== 'success') {
      throw new Error(data.message)
    }

    // Sale del modo edición
    editingRouteId.value = null
    selectedGuideId.value = ''

    // Recarga las rutas para mostrar el guía asignado
    loadRoutes()

  } catch (err) {
    alert('Error al asignar guía')
  }
}

// ELIMINAR RUTA //
// Elimina una ruta tras confirmación del usuario

async function deleteRoute(id) {
  if (!confirm('¿Eliminar esta ruta?')) return

  try {
    const response = await fetch(
      `http://localhost:8005/api.php/rutas?id=${id}`,
      { method: 'DELETE' }
    )

    const data = await response.json()

    if (data.status !== 'success') {
      throw new Error(data.message)
    }

    // Recarga la lista tras eliminar
    loadRoutes()
  } catch (err) {
    errorMsg.value = err.message
  }
}

// CANCELAR EDICION //
// Cancela la asignación de guía y restaura el estado inicial

function cancelEdit() {
  editingRouteId.value = null
  selectedGuideId.value = ''
}

// CARGA INICIAL
// Se ejecuta al montar el componente

onMounted(() => {
  loadRoutes()
  loadUsers()
})
</script>


<template>

  <NavBar />

  <!-- TÍTULO -->
  <div class="container mt-4 pt-4 text-center">
    <h2 class="fw-bold text-danger">Rutas disponibles</h2>
    <p class="text-muted">Gestión y asignación de rutas activas</p>
    <span class="badge bg-danger px-3 py-2">Panel de rutas</span>
  </div>

  <!-- BOTÓN CREAR RUTA -->
  <div class="d-flex justify-content-center mt-4">
    <button class="btn btn-danger px-4" data-bs-toggle="modal" data-bs-target="#createRouteModal">+ Crear ruta</button>
  </div>

  <!-- CONTENIDO -->
  <div class="container mt-4">

    <p v-if="errorMsg" class="text-danger text-center">{{ errorMsg }}</p>

    <div class="card shadow-sm">
      <div class="card-body p-0">

        <table class="table table-striped align-middle mb-0">
          <thead class="table-danger text-center">
            <tr>
              <th>Título</th>
              <th>Localidad</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Guía</th>
              <th>Asistentes</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="r in routes" :key="r.id">
              <td>{{ r.titulo }}</td>
              <td>{{ r.localidad }}</td>
              <td>{{ r.fecha }}</td>
              <td>{{ r.hora }}</td>

              <!-- GUÍA -->
              <td>
                <template v-if="editingRouteId === r.id">
                  <select v-model="selectedGuideId" class="form-select form-select-sm">
                    <option disabled value="">Selecciona guía</option>
                    <option v-for="g in availableGuidesForDate(r.fecha)" :key="g.id" :value="g.id">{{ g.nombre }}</option>
                  </select>
                </template>

                <template v-else>
                  <span class="badge bg-secondary">
                    {{ r.guia_nombre ?? 'Sin asignar' }}
                  </span>
                </template>
              </td>

              <!-- ASISTENTES -->
              <td class="text-center">
                <span v-if="(r.asistentes ?? 0) < 10" class="text-warning fw-semibold">
                  <i class="bi bi-exclamation-triangle-fill me-1" title="Menos de 10 asistentes"></i>
                  {{ r.asistentes ?? 0 }}
                </span>

                <span v-else class="fw-semibold">
                  {{ r.asistentes ?? 0 }}
                </span>
              </td>

              <!-- ACCIONES -->
              <td class="text-center">
                <button v-if="editingRouteId !== r.id" class="btn btn-outline-warning btn-sm me-1" @click="editingRouteId = r.id">Modificar</button>
                <button v-if="editingRouteId === r.id" class="btn btn-success btn-sm me-1" :disabled="!selectedGuideId" @click="assignGuide(r.id)">Guardar</button>
                <button v-if="editingRouteId === r.id" class="btn btn-outline-secondary btn-sm me-1" @click="cancelEdit">Cancelar</button>
                <button class="btn btn-outline-danger btn-sm" @click="deleteRoute(r.id)">Eliminar</button>
              </td>
            </tr>

            <tr v-if="routes.length === 0">
              <td colspan="7" class="text-center text-muted py-4">No hay rutas registradas</td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  </div>

  <div class="modal fade" id="createRouteModal" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">

        <div class="modal-header">
          <h5 class="modal-title text-danger fw-bold">
            Crear nueva ruta
          </h5>
          <button class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="createRoute">

            <div class="mb-3">
              <label class="form-label">Título</label>
              <input v-model="newRoute.titulo" class="form-control" required>
            </div>

            <div class="mb-3">
              <label class="form-label">Localidad</label>
              <input v-model="newRoute.localidad" class="form-control" required>
            </div>

            <div class="mb-3">
              <label class="form-label">Descripción</label>
              <textarea v-model="newRoute.descripcion" class="form-control"></textarea>
            </div>

            <div class="row">
              <div class="col">
                <label class="form-label">Fecha</label>
                <input type="date" v-model="newRoute.fecha" class="form-control">
              </div>
              <div class="col">
                <label class="form-label">Hora</label>
                <input type="time" v-model="newRoute.hora" class="form-control">
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Latitud</label>
              <input v-model="newRoute.latitud" class="form-control" required>
            </div>

            <div class="mb-3">
              <label class="form-label">Longitud</label>
              <input v-model="newRoute.longitud" class="form-control" required>
            </div>

            <div class="text-end mt-3">
              <button class="btn btn-danger" type="submit">Guardar ruta</button>
            </div>

          </form>
        </div>

      </div>
    </div>
  </div>

</template>


<style scoped>
table td {
  vertical-align: middle;
}

h2 {
  letter-spacing: 0.5px;
}
</style>

