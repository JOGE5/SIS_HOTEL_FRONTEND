<template>
  <div class="mouse-glow" ref="glowRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const glowRef = ref<HTMLElement>();

const handleMouseMove = (event: MouseEvent) => {
  if (glowRef.value) {
    glowRef.value.style.left = `${event.clientX - 150}px`;
    glowRef.value.style.top = `${event.clientY - 150}px`;
  }
};

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove);
});
</script>

<style scoped>
.mouse-glow {
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(187, 185, 159, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: -1;
  transition: opacity 0.3s ease;
}
</style>