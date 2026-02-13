<script setup>
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'

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
    		router.push('/home')

  		} catch (err) {
    		errorMsg.value = err.message
  		}	
	}
</script>

<template>
  <div class="text-center" style="max-width: 400px; margin: 50px auto;">
    <form class="form-signin" @submit.prevent="loginUser">
      <img class="mb-4" 
           src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" 
           alt="" width="72" height="72">

      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>

      <input type="email" class="form-control mb-2" placeholder="Email address" v-model="email" required autofocus />

      <input type="password" class="form-control mb-2" placeholder="Password" v-model="password" required />

      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>

	  <div class="not-registered">
		<p>¿No estás registrado?</p>
		<RouterLink to="/register">Regístrate</RouterLink>
	  </div>

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
