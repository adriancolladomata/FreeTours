<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

const router = useRouter()

// ESTADO REACTIVO
const user = ref(null)
const isLogged = ref(false)
const role = ref(null)

// COMPROBAR USUARIO EN LOCALSTORAGE (CON SEGURIDAD)
function checkUser() {
  const storedUser = localStorage.getItem('user')

  if (!storedUser) {
    user.value = null
    role.value = null
    isLogged.value = false
    return
  }

  try {
    user.value = JSON.parse(storedUser)
    role.value = user.value?.rol || null
    isLogged.value = true
  } catch (error) {
    console.error('Error leyendo user:', error)
    localStorage.removeItem('user')
    user.value = null
    role.value = null
    isLogged.value = false
  }
}

// CERRAR SESIÓN
function logout() {
  localStorage.removeItem('user')
  window.dispatchEvent(new Event('storage')) // avisamos al resto
  router.push('/home')
}

// CICLO DE VIDA
onMounted(() => {
  checkUser()
  window.addEventListener('storage', checkUser)
})

onUnmounted(() => {
  window.removeEventListener('storage', checkUser)
})
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
          <!-- TEXTO USUARIO -->
          <span v-if="isLogged" class="text-white small d-none d-lg-inline">
            Hola, {{ user?.nombre || 'Usuario' }}
          </span>

          <!-- BOTÓN CERRAR SESIÓN -->
          <button v-if="isLogged" class="btn btn-light btn-sm fw-bold text-danger" @click="logout">Cerrar sesión</button>

          <!-- BOTÓN INICIAR SESIÓN -->
          <button v-else class="btn btn-light btn-sm fw-bold text-danger" data-bs-toggle="modal" data-bs-target="#loginModal">Iniciar sesión</button>
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