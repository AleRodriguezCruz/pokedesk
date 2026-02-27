import { createRouter, createWebHistory } from 'vue-router'
import Pokemon from '../views/Pokemon.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Pokemon,
    },
    {
      // Ruta del detalle, aunque no lo entregues hoy el router la necesita
      path: '/pokemon/:name',
      name: 'pokemon-detail',
      component: Pokemon, // apunta a Pokemon.vue temporalmente
    },
  ],
})

export default router