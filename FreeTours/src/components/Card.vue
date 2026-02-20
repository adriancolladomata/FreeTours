<script setup>
defineProps({
  id: { type: String, required: true },
  titulo: { type: String, default: 'Ruta sin título' },
  descripcion: { type: String, default: '' },
  localidad: { type: String, default: 'No especificada' },
  fecha: { type: String, default: 'Pendiente' },
  hora: { type: String, default: '--:--' },
  foto: { type: String, default: '' }
})

defineEmits(['reservar'])
</script>

<template>
  <article class="card h-100 shadow-sm border-0 card-hover w-100">
    <div class="ratio ratio-16x9">
      <img 
        :src="foto || 'https://via.placeholder.com/400x225?text=Sin+Imagen'" 
        class="card-img-top object-fit-cover rounded-top"
        :alt="titulo"
      >
    </div>

    <div class="card-body d-flex flex-column p-3">
      <h5 class="card-title fw-bold text-dark mb-2">{{ titulo }}</h5>
      
      <p class="card-text text-muted small mb-3 flex-grow-1 text-clamp">
        {{ descripcion }}
      </p>

      <div class="mt-auto pt-3 border-top">
        <div class="d-flex justify-content-between mb-1 small">
          <span class="text-secondary fw-bold">📍 Localidad:</span>
          <span class="text-dark">{{ localidad }}</span>
        </div>
        <div class="d-flex justify-content-between mb-1 small">
          <span class="text-secondary fw-bold">📅 Fecha:</span>
          <span class="text-dark">{{ fecha }}</span>
        </div>
        <div class="d-flex justify-content-between small">
          <span class="text-secondary fw-bold">⏰ Hora:</span>
          <span class="text-dark">{{ hora }}</span>
        </div>
      </div>
    </div>

    <div class="p-3 pt-0">
      <button class="btn btn-danger w-100 fw-bold" @click="$emit('reservar', id)">
        RESERVAR
      </button>
    </div>
  </article>
</template>

<style scoped>
/* Solo el efecto hover y el truncado de texto */
.card-hover {
  transition: all 0.3s ease;
  min-width: 250px; /* Evita que la card se colapse demasiado */
}
.card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
}
.text-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>