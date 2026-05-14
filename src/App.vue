<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
// El componente App ahora solo sirve como contenedor para el router
</script>

<style>
/* Reseteo básico de márgenes para que el diseño ocupe toda la pantalla */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

*, *::before, *::after {
  box-sizing: inherit;
}
</style>