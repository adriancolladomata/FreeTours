<script setup>
import { ref, computed, onMounted, watch } from 'vue' // Añadimos watch
import NavBar from '@/components/NavBar.vue'
import Card from '@/components/Card.vue'

const routes = ref([])
const search = ref('')
const currentPage = ref(1)
const itemsPerPage = 6

async function loadRoutes() {
  try {
    const response = await fetch('http://localhost:8005/api.php/rutas')
    const data = await response.json()
    routes.value = data.routes ?? data
  } catch (err) {
    console.error('Error cargando rutas', err)
  }
}

// SOLUCIÓN AL BUSCADOR: Si el usuario escribe, volvemos a la página 1
// Esto evita que el diseño se "rompa" al mostrar una página inexistente
watch(search, () => {
  currentPage.value = 1
})

const filteredRoutes = computed(() => {
  if (!search.value) return routes.value
  return routes.value.filter(r =>
    r.localidad.toLowerCase().includes(search.value.toLowerCase())
  )
})

const totalPages = computed(() => {
  const count = Math.ceil(filteredRoutes.value.length / itemsPerPage)
  return count > 0 ? count : 1
})

const paginatedRoutes = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredRoutes.value.slice(start, start + itemsPerPage)
})

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page
}

function reservarRuta(id) {
  // Corregido: Uso de backticks `` para que el alert funcione
  alert(`Has reservado la ruta con ID: ${id}`)
}

onMounted(loadRoutes)
</script>

<template>
  <NavBar />

  <div class="container text-center" style="margin-top: 0em;"> 
    <h2 class="fw-bold text-danger">Rutas disponibles</h2>
    <p class="text-muted">Explora nuestras rutas y reserva la que más te guste</p>
  </div>

  <div class="container my-4">
    <input 
      v-model="search" 
      type="text" 
      class="form-control form-control-lg" 
      placeholder="Buscar por localidad..." 
    />
  </div>

  <div class="container">
    <div class="row g-4">
      <div class="col-12 col-sm-6 col-md-4" v-for="r in paginatedRoutes" :key="r.id">
        <Card
          :id="r.id"
          :titulo="r.titulo"
          :descripcion="r.descripcion"
          :localidad="r.localidad"
          :fecha="r.fecha"
          :hora="r.hora"
          :foto="r.foto"
          @reservar="reservarRuta"
        />
      </div>

      <div v-if="paginatedRoutes.length === 0" class="col-12 text-center text-muted py-5">
        <p class="h4">No hay rutas disponibles para esa búsqueda</p>
      </div>
    </div>

    <nav v-if="totalPages > 1" class="mt-5 mb-5">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="goToPage(currentPage - 1)">Anterior</button>
        </li>

        <li class="page-item"
            v-for="page in totalPages"
            :key="page"
            :class="{ active: page === currentPage }">
          <button class="page-link" @click="goToPage(page)">{{ page }}</button>
        </li>

        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="goToPage(currentPage + 1)">Siguiente</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>

/* Usamos :deep() para que los estilos afecten al componente Card.vue */
:deep(.card) {
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  height: 100%; /* Para que todas las cards midan lo mismo en la fila */
}

:deep(.card:hover) {
  transform: translateY(-8px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

/* Ajuste para que el input se vea bien en móviles */
.form-control {
  border-radius: 10px;
}
</style>