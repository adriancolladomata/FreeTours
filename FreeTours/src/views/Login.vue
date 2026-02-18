<script setup>
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'
	import { Modal } from 'bootstrap'


	const email = ref('');
	const password = ref('');
	const errorMsg = ref('');
	const router = useRouter();

	async function loginUser() {
  		errorMsg.value = '';

  		try {
    		const response = await fetch('http://localhost:8005/api.php/usuarios?login', {
      			method: 'POST',
      			headers: { 'Content-Type': 'application/json' },
      			body: JSON.stringify({
        			email: email.value,
        			contraseña: password.value
      			})
    		})

    		const data = await response.json()

    		if (data.status !== 'success') {
      			throw new Error(data.message || 'Datos incorrectas')
    		}

    		console.log('Usuario logueado:', data.user)
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
	<!-- PLANTILLA BOOTSTRAP DEL LOGIN -->
  <div class="text-center" style="max-width: 400px; margin: 20px auto;">
    <form class="form-signin" @submit.prevent="loginUser">

      <h1 class="h3 font-weight-normal mb-4">Iniciar Sesión</h1>

      <input type="email" class="form-control mb-2" placeholder="Correo electrónico" v-model="email" required autofocus />

      <input type="password" class="form-control mb-4" placeholder="Contraseña" v-model="password" required />

      <button class="btn btn-lg btn-primary btn-block btn-danger" type="submit">Iniciar sesión</button>

      <p v-if="errorMsg" class="text-danger mt-2">{{ errorMsg }}</p>
    </form>
  </div>
</template>

<style scoped>
.form-signin {
  width: 100%;
}

.not-registered {
	margin-top: 20px;  
}
</style>
