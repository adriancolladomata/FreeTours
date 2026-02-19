<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Modal } from 'bootstrap'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMsg = ref('')
const router = useRouter()

async function registerUser() {
  errorMsg.value = ''

  // Validación de confirmación de contraseña
  if (password.value !== confirmPassword.value) {
    errorMsg.value = "Las contraseñas no coinciden"
    return
  }

  try {
    const response = await fetch('http://localhost:8005/api.php/usuarios?register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        contraseña: password.value
      })
    })

    const data = await response.json()

    if (data.status !== 'success') {
      throw new Error(data.message || 'Error al registrar')
    }

    console.log('Usuario registrado:', data.user)
    localStorage.setItem('user', JSON.stringify(data.user))
    const modalEl = document.getElementById('loginModal')
    const modal = Modal.getInstance(modalEl)
    modal.hide()

    router.push('/home')

    
  } catch (err) {
    errorMsg.value = err.message
  }
}
</script>

<template>
  <!-- PLANTILLA BOOTSTRAP DEL REGISTER -->
  <div class="text-center" style="max-width: 400px; margin: 20px auto;">
    <form class="form-signin" @submit.prevent="registerUser">

      <h1 class="h3 mb-3 font-weight-normal mb-4">Registrate</h1>

      <input type="email" class="form-control mb-2" placeholder="Email address" v-model="email" required autofocus>
      <input type="password" class="form-control mb-2" placeholder="Password" v-model="password" required>
      <input type="password" class="form-control mb-4" placeholder="Confirm Password" v-model="confirmPassword" required>

      <button class="btn btn-lg btn-danger btn-block" type="submit">Registrarse</button>

      <p v-if="errorMsg" class="text-danger mt-2">{{ errorMsg }}</p>
    </form>
  </div>
</template>

<style scoped>
.form-signin {
  width: 100%;
}

.registered {
	margin-top: 20px;  
}
</style>
