import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Home from '@/views/Home.vue'
import GestionUsuarios from '@/views/GestionUsuarios.vue'
import GestionRutas from '@/views/GestionRutas.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },
    {
      path: '/gestion_usuarios',
      name: 'Gestion de usuarios',
      component: GestionUsuarios,
    },
    {
      path: '/gestion_rutas',
      name: 'Gestion de rutas',
      component: GestionRutas,
    },
  ],
})

export default router