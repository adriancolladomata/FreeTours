<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import NavBar from '@/components/NavBar.vue'

const routes = ref([])
const errorMsg = ref('')

const newRoute = ref({
  titulo: '',
  localidad: '',
  descripcion: '',
  fecha: '',
  hora: '',
})


async function loadRoutes() {
  errorMsg.value = ''

  try {
    const response = await fetch('http://localhost:8005/api.php/rutas')
    const data = await response.json()

    routes.value = data.routes ?? data
  } catch (err) {
    console.error(err)
    errorMsg.value = 'No se pudieron cargar las rutas'
  }
}

async function filterRoutes(fecha, localidad = '') {
  errorMsg.value = ''

  try {
    let url = `http://localhost:8005/api.php/rutas?fecha=${fecha}`

    if (localidad) {
      url += `&localidad=${localidad}`
    }

    const response = await fetch(url)
    const data = await response.json()

    routes.value = data.routes ?? data
  } catch (err) {
    console.error(err)
    errorMsg.value = 'Error al filtrar rutas'
  }
}

async function getRouteById(id) {
  errorMsg.value = ''

  try {
    const response = await fetch(
      `http://localhost:8005/api.php/rutas?id=${id}`
    )
    return await response.json()
  } catch (err) {
    console.error(err)
    errorMsg.value = 'No se pudo obtener la ruta'
    return null
  }
}

async function createRoute() {
  try {
    await fetch('http://localhost:8005/api.php/rutas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRoute.value)
    })

    // Reset
    newRoute.value = {
      titulo: '',
      localidad: '',
      descripcion: '',
      fecha: '',
      hora: ''
    }

    loadRoutes()

    // Cerrar modal manualmente
    const modal = document.getElementById('createRouteModal')
    const bootstrapModal = bootstrap.Modal.getInstance(modal)
    bootstrapModal.hide()

  } catch (err) {
    alert('Error al crear la ruta')
  }
}


async function deleteRoute(id) {
  if (!confirm('¿Eliminar esta ruta?')) return

  errorMsg.value = ''

  try {
    const response = await fetch(
      `http://localhost:8005/api.php/rutas?id=${id}`,
      { method: 'DELETE' }
    )

    const data = await response.json()

    if (data.status !== 'success') {
      throw new Error(data.message || 'Error al eliminar ruta')
    }

    loadRoutes()
  } catch (err) {
    console.error(err)
    errorMsg.value = err.message
  }
}

onMounted(loadRoutes)
</script>

<template>

  <!-- NAVBAR -->
  <NavBar></NavBar>

  <!-- CONTENIDO -->

  <!-- data-bs-toggle activa un elemento JavaScript de Bootstrap, en este caso el modal, y data-bs-target es su id -->
  <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createRouteModal">Crear ruta</button>

  <div class="container mt-5 pt-4">
    <h2 class="mb-3">Rutas disponibles</h2>

    <p v-if="errorMsg" class="text-danger">{{ errorMsg }}</p>

    <table class="table table-striped align-middle">
      <thead>
        <tr>
          <th>Título</th>
          <th>Localidad</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Guía</th>
          <th>Asistentes</th>
          <th class="text-center">Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="r in routes" :key="r.id">
          <td>{{ r.titulo }}</td>
          <td>{{ r.localidad }}</td>
          <td>{{ r.fecha }}</td>
          <td>{{ r.hora }}</td>
          <td>{{ r.guia_nombre ?? 'Sin asignar' }}</td>
          <td>{{ r.asistentes ?? 0 }}</td>
          <td class="text-center">
            <button
              class="btn btn-danger btn-sm"
              @click="deleteRoute(r.id)"
            >
              Eliminar
            </button>
          </td>
        </tr>

        <tr v-if="routes.length === 0">
          <td colspan="7" class="text-center text-muted">
            No hay rutas registradas
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="modal fade" id="createRouteModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">

      <!-- HEADER -->
      <div class="modal-header">
        <h5 class="modal-title">Crear nueva ruta</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
        ></button>
      </div>

      <!-- BODY -->
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

          <div class="mt-4 text-end">
            <button type="submit" class="btn btn-success">
              Guardar ruta
            </button>
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
</style>
