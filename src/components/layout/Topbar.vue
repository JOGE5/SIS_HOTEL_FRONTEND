<template>
  <header class="topbar">
    <button type="button" class="topbar-icon" title="Menú">
      <PanelLeft :size="20" />
    </button>
  </header>
</template>

<script setup lang="ts">
import { PanelLeft } from 'lucide-vue-next';
</script>

<style scoped>
.topbar {
  height: 68px;
  padding: 0 22px;
  background: #111827;
  border-bottom: 1px solid #253044;
  display: flex;
  align-items: center;
}

.topbar-icon {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: #cbd5e1;
  display: grid;
  place-items: center;
}

.topbar-icon:hover {
  background: #1e293b;
  color: #ffffff;
}
</style>