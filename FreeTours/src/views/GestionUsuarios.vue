<script setup>
import { ref, onMounted } from 'vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import NavBar from '@/components/NavBar.vue'

const users = ref([])
const errorMsg = ref('')

async function loadUsers() {
  try {
    const response = await fetch('http://localhost:8005/api.php/usuarios')
    const data = await response.json()

    users.value = (data.users ?? data).map(u => ({
      ...u,
      isEditing: false,
      originalRol: u.rol
    }))
  } catch (err) {
    console.error(err)
    errorMsg.value = 'No se pudieron cargar los usuarios'
  }
}

function editUser(user) {
  user.isEditing = true
  user.originalRol = user.rol
}

function cancelEdit(user) {
  user.rol = user.originalRol
  user.isEditing = false
}

async function saveUser(user) {
  try {
    await fetch(`http://localhost:8005/api.php/usuarios?id=${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rol: user.rol })
    })

    user.isEditing = false
  } catch (err) {
    alert('Error al guardar cambios')
  }
}

async function deleteUser(id) {
  if (!confirm('¿Eliminar usuario?')) return

  try {
    await fetch(`http://localhost:8005/api.php/usuarios?id=${id}`, {
      method: 'DELETE'
    })

    loadUsers()
  } catch (err) {
    alert('Error al eliminar usuario')
  }
}

onMounted(loadUsers)
</script>

<template>
  <!-- NAVBAR -->
   <NavBar></NavBar>

  <!-- CONTENIDO -->
  <div class="container mt-5 pt-4">
    <h2 class="mb-3">Gestión de usuarios</h2>

    <p v-if="errorMsg" class="text-danger">{{ errorMsg }}</p>

    <table class="table table-striped align-middle">
        <thead>
          <tr>
            <th style="width: 30%;">Email</th>
            <th style="width: 20%;">Contraseña</th>
            <th style="width: 20%;">Rol</th>
            <th class="text-center" style="width: 30%;">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in users" :key="u.id">
          <td style="width: 30%;">{{ u.email }}</td>
		      <td style="width: 20%;">{{ u.contraseña }}</td>
          <!-- ROL -->
          <td style="width: 20%;">
            <span v-if="!u.isEditing">{{ u.rol }}</span>
            <select v-else v-model="u.rol" class="form-select form-select-sm">
              <option value="cliente">Cliente</option>
              <option value="guia">Guía</option>
              <option value="admin">Admin</option>
            </select>
          </td>
          <!-- ACCIONES -->
          <td class="gap-2 text-center">
            <button v-if="!u.isEditing" class="btn btn-secondary btn-sm mx-2" @click="editUser(u)">Editar</button>
            <button v-if="u.isEditing" class="btn btn-success btn-sm mx-2" @click="saveUser(u)">Guardar</button>
			      <button v-if="u.isEditing" class="btn btn-secondary btn-sm mx-2" @click="cancelEdit(u)">Cancelar</button>
			      <button class="btn btn-danger btn-sm mx-2" @click="deleteUser(u.id)">Eliminar</button>
          </td>
        </tr>
        <tr v-if="users.length === 0">
          <td colspan="3" class="text-center text-muted">No hay usuarios registrados</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  table-layout: fixed; /* permite que las columnas respeten los anchos */
  width: 100%;         /* ocupa todo el contenedor */
}

th, td {
  overflow: hidden;    /* para contenido que no cabe */
  text-overflow: ellipsis; /* opcional: "..." si no cabe */
  white-space: nowrap; /* opcional: evita salto de línea */
}
</style>
