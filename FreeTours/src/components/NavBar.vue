<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router' // Importamos RouterLink

const router = useRouter()

const user = ref(null)
const isLogged = ref(false)
const role = ref(null)

function checkUser() {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
    role.value = user.value.rol
    isLogged.value = true
  } else {
    user.value = null
    role.value = null
    isLogged.value = false
  }
}

function logout() {
  localStorage.removeItem('user')
  isLogged.value = false
  router.push('/home')
}

onMounted(checkUser)
</script>

<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top shadow" style="background-color: #dc3545;">
    <div class="container">
      <RouterLink class="navbar-brand fw-bold" to="/home">Wanderly</RouterLink>

      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarCollapse"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/gestion_usuarios">Usuarios</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/gestion_rutas">Rutas</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/gestion_reservas">Reservas</RouterLink>
          </li>
        </ul>

        <div class="d-flex align-items-center gap-3">
          <span v-if="isLogged" class="text-white small d-none d-lg-inline">
            Hola, {{ user?.nombre || 'Admin' }}
          </span>
          <button v-if="isLogged" class="btn btn-light btn-sm fw-bold text-danger" @click="logout">
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Estilo para que el enlace activo se vea resaltado */
.router-link-active {
  color: white !important;
  font-weight: bold;
  border-bottom: 2px solid white;
}

.navbar-brand {
  font-size: 1.5rem;
  letter-spacing: 1px;
}

/* Evitamos que el borde inferior se aplique al logo */
.navbar-brand.router-link-active {
  border-bottom: none;
}
</style>