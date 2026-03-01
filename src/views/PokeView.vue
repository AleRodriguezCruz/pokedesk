<script setup>
import axios from 'axios'
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// aqui guardo los datos del pokémon (la maestra no tenía el ref, por eso no cargaba)
const pokemon = ref(null)
const loading = ref(true)

// colores por tipo
const typeColors = {
  fire:     '#FF4500', water:    '#1E90FF', grass:    '#3CB371',
  electric: '#FFD700', psychic:  '#FF69B4', ice:      '#00CED1',
  dragon:   '#7B68EE', dark:     '#696969', fairy:    '#FF85C2',
  fighting: '#CD5C5C', flying:   '#87CEEB', poison:   '#9932CC',
  ground:   '#D2691E', rock:     '#A0522D', bug:      '#6B8E23',
  ghost:    '#4B0082', steel:    '#708090', normal:   '#A9A9A9',
}

// color principal según el primer tipo
const primaryColor = computed(() => {
  if (!pokemon.value) return '#ff3b3b'
  const type = pokemon.value.types[0]?.type?.name
  return typeColors[type] || '#ff3b3b'
})

// nombres cortos para las barras
const statLabel = {
  hp: 'HP', attack: 'ATK', defense: 'DEF',
  'special-attack': 'SP.ATK', 'special-defense': 'SP.DEF', speed: 'SPD'
}

const back = () => {
  router.push('/pokemon')
}

// traigo el pokémon por nombre desde la URL
const getData = async () => {
  try {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${route.params.name}`)
    console.log(data)
    pokemon.value = data // aqui estaba el error de la maestra, faltaba guardar el data
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

getData()
</script>

<template>
  <div class="page">

    <button class="back-btn" @click="back">← Volver</button>

    <div v-if="loading" class="loading"><span class="blink">CARGANDO...</span></div>

    <div v-else-if="pokemon" class="panel">

      <!-- columna izquierda: imagen y datos básicos -->
      <div class="col-left">
        <p class="poke-num">#{{ String(pokemon.id).padStart(3, '0') }}</p>
        <h1 class="poke-name">{{ pokemon.name }}</h1>

        <!-- tipos con su color -->
        <div class="tipos">
          <span
            v-for="t in pokemon.types"
            :key="t.type.name"
            class="tipo"
            :style="{ background: typeColors[t.type.name] || '#555' }"
          >{{ t.type.name }}</span>
        </div>

        <!-- imagen con glow del color de su tipo -->
        <div class="sprite-wrapper" :style="{ '--color': primaryColor }">
          <img
            :src="pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default"
            :alt="pokemon.name"
            class="sprite"
          />
          <div class="sprite-glow"></div>
        </div>
      </div>

      <!-- columna derecha: stats, info y movimientos -->
      <div class="col-right">

        <section class="seccion">
          <h2 class="seccion-titulo">// BASE STATS</h2>
          <div class="stats">
            <div v-for="s in pokemon.stats" :key="s.stat.name" class="stat-row">
              <span class="stat-label">{{ statLabel[s.stat.name] || s.stat.name }}</span>
              <span class="stat-val">{{ s.base_stat }}</span>
              <!-- ancho de la barra = porcentaje del máximo de 255 -->
              <div class="barra-fondo">
                <div
                  class="barra-relleno"
                  :style="{ width: (s.base_stat / 255 * 100) + '%', background: primaryColor }"
                ></div>
              </div>
            </div>
          </div>
        </section>

        <section class="seccion">
          <h2 class="seccion-titulo">// INFO</h2>
          <div class="info-grid">
            <!-- la API da decímetros, divido entre 10 para metros -->
            <div class="info-item">
              <span class="info-label">ALTURA</span>
              <span class="info-val">{{ (pokemon.height / 10).toFixed(1) }} m</span>
            </div>
            <!-- la API da hectogramos, divido entre 10 para kg -->
            <div class="info-item">
              <span class="info-label">PESO</span>
              <span class="info-val">{{ (pokemon.weight / 10).toFixed(1) }} kg</span>
            </div>
            <div class="info-item">
              <span class="info-label">EXP BASE</span>
              <span class="info-val">{{ pokemon.base_experience }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">HABILIDADES</span>
              <span class="info-val small">{{ pokemon.abilities.map(a => a.ability.name).join(', ') }}</span>
            </div>
          </div>
        </section>

        <section class="seccion">
          <h2 class="seccion-titulo">// MOVIMIENTOS <span class="muted">(primeros 12)</span></h2>
          <div class="movimientos">
            <span v-for="m in pokemon.moves.slice(0, 12)" :key="m.move.name" class="movimiento">
              {{ m.move.name }}
            </span>
          </div>
        </section>

      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@700&display=swap');

.page {
  min-height: 100vh;
  background: #0a0a0f;
  font-family: 'Share Tech Mono', monospace;
  color: #ddd;
  padding: 2rem;
}

.back-btn {
  background: none;
  border: 1px solid #2a2a3a;
  color: #888;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8rem;
  padding: 0.4rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 2rem;
  display: block;
  letter-spacing: 0.1em;
}
.back-btn:hover { border-color: #ff3b3b; color: #ff3b3b; }

.loading { text-align: center; margin-top: 5rem; font-size: 1.2rem; color: #ffd600; }
.blink { animation: blink 1s step-end infinite; }
@keyframes blink { 50% { opacity: 0; } }

.panel {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2.5rem;
  max-width: 950px;
  margin: 0 auto;
}
@media (max-width: 700px) { .panel { grid-template-columns: 1fr; } }

.col-left { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }

.poke-num { font-size: 0.75rem; color: #444; margin: 0; letter-spacing: 0.1em; }

.poke-name {
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(1.3rem, 4vw, 1.8rem);
  text-transform: capitalize;
  color: #fff;
  margin: 0;
  letter-spacing: 0.08em;
  text-align: center;
}

.tipos { display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center; margin: 0.3rem 0; }
.tipo {
  font-size: 0.65rem;
  padding: 0.25rem 0.8rem;
  border-radius: 3px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #fff;
  font-weight: bold;
}

.sprite-wrapper {
  position: relative;
  width: 220px; height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.8rem;
}
.sprite-glow {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle, var(--color, #ff3b3b) 0%, transparent 70%);
  opacity: 0.15;
  animation: pulse 3s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 0.15; transform: scale(1); }
  50%       { opacity: 0.25; transform: scale(1.08); }
}
.sprite {
  width: 190px; height: 190px;
  object-fit: contain;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 0 18px var(--color, #ff3b3b)) brightness(1.05);
  animation: float 4s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-10px); }
}

.col-right { display: flex; flex-direction: column; gap: 1.8rem; }

.seccion-titulo {
  font-size: 0.68rem;
  color: #555;
  letter-spacing: 0.15em;
  margin: 0 0 0.9rem;
  border-bottom: 1px solid #1a1a2a;
  padding-bottom: 0.5rem;
  font-weight: normal;
}
.muted { color: #333; }

.stats { display: flex; flex-direction: column; gap: 0.6rem; }
.stat-row {
  display: grid;
  grid-template-columns: 70px 38px 1fr;
  align-items: center;
  gap: 0.7rem;
}
.stat-label { font-size: 0.62rem; color: #666; letter-spacing: 0.06em; }
.stat-val   { font-size: 0.85rem; color: #ccc; text-align: right; }
.barra-fondo  { height: 4px; background: #1a1a2a; border-radius: 2px; overflow: hidden; }
.barra-relleno { height: 100%; border-radius: 2px; transition: width 1s ease; opacity: 0.85; }

.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.7rem; }
.info-item {
  background: #111118;
  border: 1px solid #1e1e2e;
  border-radius: 6px;
  padding: 0.7rem 0.9rem;
}
.info-label { display: block; font-size: 0.58rem; color: #555; letter-spacing: 0.1em; margin-bottom: 0.3rem; }
.info-val { font-size: 0.9rem; color: #eee; text-transform: capitalize; }
.info-val.small { font-size: 0.72rem; }

.movimientos { display: flex; flex-wrap: wrap; gap: 0.45rem; }
.movimiento {
  font-size: 0.63rem;
  padding: 0.22rem 0.65rem;
  background: #111118;
  border: 1px solid #2a2a3a;
  border-radius: 3px;
  color: #888;
  text-transform: capitalize;
  letter-spacing: 0.04em;
  transition: all 0.15s;
}
.movimiento:hover { border-color: #444; color: #ccc; }
</style>