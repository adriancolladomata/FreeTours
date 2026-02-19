<script setup>
defineProps({
  id: Number,
  titulo: String,
  descripcion: String,
  localidad: String,
  fecha: String,
  hora: String,
  foto: String
})
</script>

<template>
  <div class="card mt-4" style="width: 22rem;">
    <!-- Imagen dinámica -->
    <img :src="foto || 'https://via.placeholder.com/286x180?text=Ruta'" class="card-img-top">

    <div class="card-body">
      <h5 class="card-title">{{ titulo }}</h5>
      <p class="card-text">{{ descripcion || 'Sin descripción' }}</p>
    </div>

    <ul class="list-group list-group-flush">
      <li class="list-group-item"><strong>Localidad:</strong> {{ localidad }}</li>
      <li class="list-group-item"><strong>Fecha:</strong> {{ fecha }}</li>
      <li class="list-group-item"><strong>Hora:</strong> {{ hora }}</li>
    </ul>

    <div class="card-body">
      <button class="btn btn-danger w-100" @click="$emit('reservar', id)">Reservar</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-5px);
}
</style>
