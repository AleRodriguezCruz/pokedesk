
<div align="center">

```
██████╗  ██████╗ ██╗  ██╗███████╗██████╗ ███████╗███████╗██╗  ██╗
██╔══██╗██╔═══██╗██║ ██╔╝██╔════╝██╔══██╗██╔════╝██╔════╝██║ ██╔╝
██████╔╝██║   ██║█████╔╝ █████╗  ██║  ██║█████╗  ███████╗█████╔╝ 
██╔═══╝ ██║   ██║██╔═██╗ ██╔══╝  ██║  ██║██╔══╝  ╚════██║██╔═██╗ 
██║     ╚██████╔╝██║  ██╗███████╗██████╔╝███████╗███████║██║  ██╗
╚═╝      ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝
```

### `// SISTEMA DE CONSULTA POKÉMON · GEN I · 2026`

![Vue](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-REST-5A29E4?style=flat-square&logo=axios&logoColor=white)
![PokéAPI](https://img.shields.io/badge/PokéAPI-v2-EF5350?style=flat-square)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

</div>

---

## 🔴 ¿Qué es PokéDesk?

**PokéDesk** es una aplicación web desarrollada con **Vue 3** que consume la [PokéAPI](https://pokeapi.co/) para mostrar los 151 pokémons de la primera generación en formato de **cartas coleccionables**, con diseño retro-futurista, paginación, buscador y vista de detalle con estadísticas completas.

---

## ⚡ Funcionalidades

| Feature | Descripción |
|---|---|
| 🃏 **Cartas por tipo** | Cada carta tiene el color del tipo del pokémon (fuego, agua, planta...) |
| 🔍 **Buscador en tiempo real** | Filtra los pokémons mientras escribes |
| 📄 **Paginación** | 20 pokémons por página con botones anterior / siguiente |
| 📊 **Vista de detalle** | Stats, altura, peso, habilidades y movimientos |
| 🌐 **Responsive** | Adaptado para móvil, tablet y escritorio |
| 🧭 **Navegación SPA** | Vue Router con rutas dinámicas `/pokemon/:name` |

---

## 🛠️ Tecnologías

```
Vue 3          →  Framework principal (Composition API)
Vite           →  Bundler y servidor de desarrollo
Vue Router     →  Navegación entre páginas
Axios          →  Peticiones HTTP a la PokéAPI
PokéAPI v2     →  Fuente de datos de todos los pokémons
Vercel         →  Deploy y hosting
```

---

## 🚀 Instalación y uso

**1. Clona el repositorio**
```bash
git clone https://github.com/AleRodriguezCruz/pokedesk.git
cd pokedesk
```

**2. Instala las dependencias**
```bash
npm install
npm install axios
```

**3. Corre el proyecto**
```bash
npm run dev
```

**4. Abre en el navegador**
```
http://localhost:5173
```

---

## 📁 Estructura del proyecto

```
pokedesk/
├── src/
│   ├── components/
│   │   ├── Pokemon.vue       ← lista principal con cartas y paginación
│   │   ├── HomeView.vue      ← página de inicio
│   │   ├── About.vue         ← página about
│   │   └── Login.vue         ← página de login
│   ├── views/
│   │   └── PokeView.vue      ← detalle de cada pokémon
│   ├── router/
│   │   └── index.js          ← configuración de rutas
│   └── App.vue               ← componente raíz
├── vercel.json               ← configuración para deploy
└── package.json
```

---

## 🗺️ Rutas

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `Pokemon.vue` | Lista de todos los pokémons |
| `/pokemon` | `Pokemon.vue` | Lista de todos los pokémons |
| `/pokemon/:name` | `PokeView.vue` | Detalle del pokémon seleccionado |
| `/about` | `About.vue` | Información del proyecto |
| `/login` | `Login.vue` | Página de login |

---

## 🎨 Diseño

El diseño sigue una estética **retro-futurista / dark terminal**:

- 🖤 Fondo negro profundo `#0a0a0f`
- 🔴 Acento rojo `#ff3b3b` y dorado `#ffd700`
- 🟢 Verde terminal `#00e676` en el buscador
- 🃏 Cartas con gradiente dinámico según el tipo de pokémon
- ✨ Efecto de brillo al hacer hover sobre las cartas
- 🔠 Tipografía `Orbitron` para títulos + `Share Tech Mono` para datos

---

## 📡 API utilizada

**[PokéAPI v2](https://pokeapi.co/)** — API REST pública y gratuita

```
// Lista de pokémons
GET https://pokeapi.co/api/v2/pokemon?limit=151

// Detalle de un pokémon
GET https://pokeapi.co/api/v2/pokemon/{name}

// Sprites oficiales
https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{id}.png
```

---

## 👩‍💻 Desarrollado por

<div align="center">

**Alejandra Rodríguez Cruz**  
`Desarrollo de Aplicaciones Web · 2026`

</div>

---

<div align="center">

`// POKÉDESK 2026 · BUILT WITH VUE 3 + POKEAPI`

</div>