import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // la página principal ahora muestra directamente los pokémons
      component: () => import('../components/Pokemon.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../components/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/Login.vue')
    },
    {
      path: '/pokemon',
      name: 'pokemon',
      component: () => import('../components/Pokemon.vue')
    },
    {
      // :name es el parámetro dinámico, ej: /pokemon/charizard
      path: '/pokemon/:name',
      name: 'poke',
      component: () => import('../views/PokeView.vue')
    }
  ],
})

export default router