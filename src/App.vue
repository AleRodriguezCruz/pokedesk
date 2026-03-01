<template>
  <RouterView />
</template>

<script setup>
// Importo el RouterView para que funcionen las rutas
import { RouterView } from 'vue-router'
</script>

<style>
/* quito TODO límite de ancho en toda la app para pantalla completa */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  width: 100%;
  height: 100%;
}

body {
  width: 100%;
  min-height: 100vh;
  background: #0a0a0f; /* el fondo oscuro de la pokedex */
  font-family: monospace;
  overflow-x: hidden; /* evito que salga scroll abajo */
}

#app {
  /* forzamos que el contenedor de vue ocupe el 100% real */
  width: 100% !important;
  max-width: none !important; 
  margin: 0 !important;
  padding: 0 !important;
  display: block;
}

/* personalización del scrollbar para que se vea pro */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #0a0a0f; }
::-webkit-scrollbar-thumb { background: #222; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #ff3b3b; }
</style>