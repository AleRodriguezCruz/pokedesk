<script setup>
// importo lo necesario
import axios from 'axios'
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

const pokemons = ref([])       // lista de todos los pokémons
const pokemonTypes = ref({})   // tipos de cada pokémon por id
const search = ref('')         // texto del buscador
const loading = ref(true)      // controla el "cargando"
const pagina = ref(1)          // página actual
const porPagina = 5          // pokémons por página (subí este valor para llenar la pantalla)

// colores por tipo para las cartas
const typeColors = {
  fire:     ['#ff6b35', '#ff2200'],
  water:    ['#5bc8f5', '#0277bd'],
  grass:    ['#7ecb82', '#2e7d32'],
  electric: ['#ffe566', '#f9a825'],
  psychic:  ['#f8789a', '#c2185b'],
  ice:      ['#7ee8f0', '#00838f'],
  dragon:   ['#9b7fe8', '#4527a0'],
  dark:     ['#777777', '#222222'],
  fairy:    ['#f9b8d4', '#d81b8c'],
  fighting: ['#e57373', '#b71c1c'],
  flying:   ['#aad4f0', '#0277bd'],
  poison:   ['#c97be0', '#6a1b9a'],
  ground:   ['#e8c07a', '#bf360c'],
  rock:     ['#c4b59a', '#4e342e'],
  bug:      ['#aed168', '#33691e'],
  ghost:    ['#9c6fdc', '#311b92'],
  steel:    ['#bfcdd4', '#37474f'],
  normal:   ['#d4d4d4', '#757575'],
}

// genera el fondo degradado según el tipo del pokemon
const getTypeGradient = (type) => {
  const c = typeColors[type] || ['#333', '#111']
  return `linear-gradient(145deg, ${c[0]}22, ${c[1]}44)`
}

// regresa el color del borde según el tipo
const getTypeBorder = (type) => {
  return (typeColors[type] || ['#333'])[0]
}

// traigo los pokémons de la API 
const getData = async () => {
  try {
    const data = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
    pokemons.value = data.data.results.map((p, i) => ({ ...p, id: i + 1 }))
    fetchTypes()
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

// traigo el tipo de todos los pokémons al mismo tiempo
const fetchTypes = async () => {
  const requests = pokemons.value.map(p =>
    axios.get(`https://pokeapi.co/api/v2/pokemon/${p.id}`)
      .then(res => { pokemonTypes.value[p.id] = res.data.types.map(t => t.type.name) })
      .catch(() => {})
  )
  await Promise.all(requests)
}

// filtra según búsqueda
const filtered = computed(() => {
  return pokemons.value.filter(p => p.name.includes(search.value.toLowerCase()))
})

// total de páginas disponibles
const totalPaginas = computed(() => Math.ceil(filtered.value.length / porPagina))

// pokémons que se muestran en la página actual
const pokemonsPagina = computed(() => {
  const inicio = (pagina.value - 1) * porPagina
  return filtered.value.slice(inicio, inicio + porPagina)
})

// funciones de navegación
const siguiente = () => {
  if (pagina.value < totalPaginas.value) {
    pagina.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const anterior = () => {
  if (pagina.value > 1) {
    pagina.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// ejecuto la carga de datos
getData()
</script>

<template>
  <div class="pokedex">

    <nav class="nav">
      <div class="nav-logo">
        <span class="dot r"></span>
        <span class="dot y"></span>
        <span class="dot g"></span>
        <span class="nav-title">POKÉDESK <span class="year">2026</span></span>
      </div>
      <div class="nav-links">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/about" class="nav-link">About</router-link>
        <router-link to="/login" class="nav-link login-btn">Login</router-link>
      </div>
    </nav>

    <div class="page-header">
      <h1 class="titulo">POKÉMONS</h1>
      <input v-model="search" class="search" placeholder="// buscar pokémon..." @input="pagina = 1" />
    </div>

    <div v-if="loading" class="loading">
      <span class="blink">Loading...</span>
    </div>

    <div v-else>
      <div class="controles-superiores">
        <p class="contador">
          {{ filtered.length }} pokémons &nbsp;·&nbsp; página {{ pagina }} de {{ totalPaginas }}
        </p>

        <div class="paginacion">
          <button @click="anterior" :disabled="pagina === 1" class="btn">← Anterior</button>
          <span class="pag-info">{{ pagina }} / {{ totalPaginas }}</span>
          <button @click="siguiente" :disabled="pagina === totalPaginas" class="btn">Siguiente →</button>
        </div>
      </div>

      <div class="grid">
        <router-link
          v-for="pokemon in pokemonsPagina"
          :key="pokemon.id"
          :to="`/pokemon/${pokemon.name}`"
          class="card"
          :style="{
            background: pokemonTypes[pokemon.id] ? getTypeGradient(pokemonTypes[pokemon.id][0]) : '#12121f',
            borderColor: pokemonTypes[pokemon.id] ? getTypeBorder(pokemonTypes[pokemon.id][0]) + '66' : '#2a2a4a'
          }"
        >
          <div class="shine"></div>

          <div class="card-header">
            <span class="card-num">Nº {{ String(pokemon.id).padStart(3, '0') }}</span>
            <span class="card-hp">HP <strong>45</strong></span>
          </div>

          <p class="card-name">{{ pokemon.name }}</p>

          <div class="card-img-box">
            <div class="img-glow" :style="{
              background: pokemonTypes[pokemon.id] 
                ? 'radial-gradient(circle, ' + getTypeBorder(pokemonTypes[pokemon.id][0]) + '44, transparent 70%)' 
                : 'transparent'
            }"></div>
            <img
              :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`"
              class="card-img"
            />
          </div>

          <div class="card-tipos">
            <span
              v-for="t in (pokemonTypes[pokemon.id] || [])"
              :key="t"
              class="card-tipo"
              :style="{ background: typeColors[t] ? typeColors[t][0] + 'cc' : '#555' }"
            >{{ t }}</span>
          </div>

          <div class="card-footer">
            <span class="card-gen">GEN I</span>
            <span class="card-stars">★★★</span>
          </div>
        </router-link>
      </div>
    </div>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@700;900&display=swap');

.pokedex {
  min-height: 100vh;
  width: 100%;
  background: #0a0a0f;
  font-family: 'Share Tech Mono', monospace;
  color: #ddd;
}

.nav {
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  border-bottom: 1px solid #1a1a2a;
  background: rgba(10,10,15,0.95);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(8px);
}

.nav-logo { display: flex; align-items: center; gap: 0.5rem; }
.dot { width: 10px; height: 10px; border-radius: 50%; }
.dot.r { background: #ff3b3b; box-shadow: 0 0 7px #ff3b3b; }
.dot.y { background: #ffd600; box-shadow: 0 0 7px #ffd600; }
.dot.g { background: #00e676; box-shadow: 0 0 7px #00e676; }
.nav-title { font-family: 'Orbitron', sans-serif; color: #fff; letter-spacing: 0.12em; }
.year { color: #ff3b3b; font-size: 0.75em; vertical-align: super; }

.nav-links { display: flex; gap: 0.5rem; }
.nav-link { color: #888; text-decoration: none; padding: 0.35rem 0.9rem; font-size: 0.8rem; }
.nav-link:hover, .router-link-active { color: #fff; }
.login-btn { border: 1px solid #2a2a3a; border-radius: 4px; }

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #1a1a2a;
}

.titulo { font-family: 'Orbitron', sans-serif; font-size: 1.6rem; color: #fff; margin: 0; }

.search {
  background: #111118;
  border: 1px solid #2a2a3a;
  color: #00e676;
  padding: 0.55rem 1rem;
  width: 280px;
  font-family: inherit;
}

.controles-superiores {
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  align-items: center;
}

.contador { font-size: 0.7rem; color: #444; }

.paginacion { display: flex; align-items: center; gap: 1.5rem; }

/* EL TRUCO PARA PANTALLA COMPLETA: */
.grid {
  display: grid;
  padding: 1rem 2rem;
  /* El minmax(230px) hace que las cartas no se vuelvan gigantes en monitores anchos */
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 1.5rem;
  width: 100%;
  box-sizing: border-box;
}

.card {
  position: relative;
  border: 2px solid #2a2a4a;
  border-radius: 16px;
  padding: 0.9rem;
  text-decoration: none;
  color: #eee;
  transition: all 0.25s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-5px);
  border-color: #ffd700 !important;
  box-shadow: 0 10px 20px rgba(0,0,0,0.5);
}

.card-name { font-family: 'Orbitron', sans-serif; text-transform: capitalize; margin: 0.5rem 0; }

.card-img-box {
  background: rgba(0,0,0,0.2);
  border-radius: 12px;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.card-img { width: 80%; z-index: 1; }

.card-tipos { display: flex; gap: 0.3rem; margin-top: 0.5rem; }
.card-tipo { font-size: 0.6rem; padding: 0.2rem 0.6rem; border-radius: 10px; font-weight: bold; }

.btn {
  background: #111118;
  border: 1px solid #2a2a3a;
  color: #00e676;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
}
.btn:disabled { opacity: 0.2; }
.btn:hover:not(:disabled) { border-color: #ff3b3b; color: #ff3b3b; }

.loading { text-align: center; padding: 5rem; color: #ffd600; }
.blink { animation: blink 1s infinite; }
@keyframes blink { 50% { opacity: 0; } }
</style>
