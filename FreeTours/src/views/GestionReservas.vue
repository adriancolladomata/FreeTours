<script setup>
import { ref, onMounted } from 'vue'

import NavBar from '@/components/NavBar.vue'

</script>

<template>
  <!-- NAVBAR -->
   <NavBar></NavBar>

  <!-- CONTENIDO -->
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