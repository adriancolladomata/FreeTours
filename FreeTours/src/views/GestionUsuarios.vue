<script setup>
import { ref, onMounted } from 'vue'

import NavBar from '@/components/NavBar.vue'

// LISTA DE USUARIOS
const users = ref([])

// MENSAJE DE ERROR GLOBAL
const errorMsg = ref('')

// CARGA DE USUARIOS
// Obtiene los usuarios desde la API y los prepara para edición
async function loadUsers() {
  try {
    const response = await fetch('http://localhost:8005/api.php/usuarios')
    const data = await response.json()

    // Mapea cada usuario añadiendo propiedades de edición
    users.value = (data.users ?? data).map(u => ({
      ...u,
      isEditing: false,       // Indica si está en modo edición
      originalRol: u.rol      // Guarda el rol original para cancelar cambios
    }))
  } catch (err) {
    console.error(err)
    errorMsg.value = 'No se pudieron cargar los usuarios'
  }
}

// EDITAR USUARIO
// Pone un usuario en modo edición
function editUser(user) {
  user.isEditing = true
  user.originalRol = user.rol
}

// CANCELAR EDICIÓN
// Revierte cambios de rol y sale del modo edición
function cancelEdit(user) {
  user.rol = user.originalRol
  user.isEditing = false
}

// GUARDAR CAMBIOS
// Envía los cambios del rol a la API y cierra la edición
async function saveUser(user) {
  try {
    await fetch(`http://localhost:8005/api.php/usuarios?id=${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rol: user.rol })
    })

    // Sal del modo edición tras guardar
    user.isEditing = false
  } catch (err) {
    alert('Error al guardar cambios')
  }
}

// ELIMINAR USUARIO
// Confirma con el usuario y elimina la cuenta mediante API
async function deleteUser(id) {
  if (!confirm('¿Eliminar usuario?')) return

  try {
    await fetch(`http://localhost:8005/api.php/usuarios?id=${id}`, {
      method: 'DELETE'
    })

    // Recarga la lista de usuarios tras eliminar
    loadUsers()
  } catch (err) {
    alert('Error al eliminar usuario')
  }
}

// Carga los usuarios cuando se inicia la vista
onMounted(loadUsers)
</script>

<template>
  <!-- NAVBAR -->
  <NavBar />

  <!-- CONTENIDO PRINCIPAL -->
  <div class="container mt-5 pt-4">

    <!-- TÍTULO Y DESCRIPCIÓN -->
    <div class="text-center mb-4">
      <h2 class="fw-bold text-danger">
        Gestión de usuarios
      </h2>
      <p class="text-muted">
        Administración de roles y cuentas registradas
      </p>
      <span class="badge bg-danger px-3 py-2">
        Panel de administración
      </span>
    </div>

    <!-- MENSAJE DE ERROR -->
    <p v-if="errorMsg" class="text-danger text-center">{{ errorMsg }}</p>

    <!-- CARD PRINCIPAL -->
    <div class="card shadow-sm">
      <div class="card-body">

        <!-- TABLA DE USUARIOS -->
        <table class="table table-striped align-middle mb-0">
          <thead class="table-danger text-center">
            <tr>
              <th style="width: 30%;">Email</th>
              <th style="width: 20%;">Contraseña</th>
              <th style="width: 20%;">Rol</th>
              <th style="width: 30%;">Acciones</th>
            </tr>
          </thead>

          <tbody>
            <!-- FILA POR USUARIO -->
            <tr v-for="u in users" :key="u.id">
              <td>{{ u.email }}</td>
              <td>{{ u.contraseña }}</td>

              <!-- ROL -->
              <td>
                <!-- Modo visualización -->
                <span v-if="!u.isEditing" class="badge bg-secondary">
                  {{ u.rol }}
                </span>

                <!-- Modo edición -->
                <select v-else v-model="u.rol" class="form-select form-select-sm">
                  <option value="cliente">Cliente</option>
                  <option value="guia">Guía</option>
                  <option value="admin">Admin</option>
                </select>
              </td>

              <!-- ACCIONES -->
              <td class="text-center">
                <!-- Botón editar -->
                <button v-if="!u.isEditing" class="btn btn-outline-secondary btn-sm mx-1" @click="editUser(u)">Editar</button>

                <!-- Botón guardar cambios -->
                <button v-if="u.isEditing" class="btn btn-success btn-sm mx-1" @click="saveUser(u)">Guardar</button>

                <!-- Botón cancelar edición -->
                <button v-if="u.isEditing" class="btn btn-outline-secondary btn-sm mx-1" @click="cancelEdit(u)">Cancelar</button>

                <!-- Botón eliminar usuario -->
                <button class="btn btn-outline-danger btn-sm mx-1" @click="deleteUser(u.id)">
                  Eliminar
                </button>
              </td>
            </tr>

            <!-- MENSAJE CUANDO NO HAY USUARIOS -->
            <tr v-if="users.length === 0">
              <td colspan="4" class="text-center text-muted py-4">
                No hay usuarios registrados
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* TABLA: columnas fijas y overflow controlado */
table {
  table-layout: fixed;
  width: 100%;
}

th, td {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ESTILO DEL TÍTULO PRINCIPAL */
h2 {
  letter-spacing: 0.5px;
}
</style>
