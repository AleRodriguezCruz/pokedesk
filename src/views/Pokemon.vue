<script setup>
// Importo lo que necesito
import axios from 'axios'
import { ref, computed } from 'vue'

const pokemons = ref([])  // aqui guardo los pokémons
const search = ref('')    // lo que escribe el usuario
const loading = ref(true) // para mostrar "cargando"

// función para traer los pokémons de la API
const getData = async () => {
  try {
    const data = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
    pokemons.value = data.data.results.map((p, i) => ({
      ...p,
      id: i + 1, // le agrego el numero de pokédex
    }))
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false // apago el loading al terminar
  }
}

// filtra los pokémons según lo que se escribe
const filtered = computed(() =>
  pokemons.value.filter(p => p.name.includes(search.value.toLowerCase()))
)

getData() // llamo la función al cargar la página
</script>

<template>
  <div class="page">
    <h1>Pokédex 2026</h1>

    <!-- buscador conectado a search -->
    <input v-model="search" placeholder="Buscar pokémon..." class="search" />

    <!-- si está cargando muestro este texto -->
    <p v-if="loading">Cargando...</p>

    <!-- si ya cargó muestro las tarjetas -->
    <div v-else class="grid">
      <router-link
        v-for="p in filtered"
        :key="p.id"
        :to="`/pokemon/${p.name}`"
        class="card"
      >
        <span class="num">#{{ String(p.id).padStart(3, '0') }}</span>
        <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`" :alt="p.name" />
        <p class="name">{{ p.name }}</p>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.page {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
  background: #1a1a2e;
  min-height: 100vh;
  color: #eee;
}

h1 {
  text-align: center;
  margin-bottom: 1rem;
  color: #e94560;
}

.search {
  display: block;
  margin: 0 auto 2rem;
  padding: 0.5rem 1rem;
  width: 250px;
  border: 1px solid #444;
  border-radius: 6px;
  background: #16213e;
  color: #eee;
  font-size: 1rem;
}

/* grilla que se adapta a la pantalla */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
}

.card {
  background: #16213e;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 0.8rem;
  text-align: center;
  text-decoration: none;
  color: #eee;
  transition: border-color 0.2s;
}

.card:hover {
  border-color: #e94560;
}

.num {
  font-size: 0.7rem;
  color: #888;
}

.name {
  font-size: 0.8rem;
  text-transform: capitalize;
  margin: 0;
}
</style>