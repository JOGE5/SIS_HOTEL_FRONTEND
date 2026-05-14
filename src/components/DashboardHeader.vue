<template>
  <header class="dashboard-header">
    <button class="menu-button" type="button" @click="$emit('toggle-drawer')" aria-label="Abrir menú">
      <span />
      <span />
      <span />
    </button>

    <div class="brand-row">
      <img src="/images/logo-lamansion.png" alt="La Mansión" class="brand-icon" />
      <div>
        <span class="brand-name">La Mansión</span>
        <small>Sistema de gestión hotelera</small>
      </div>
    </div>

    <div class="header-actions">
      <span class="header-user">SUPER ADMIN</span>
    </div>
  </header>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: false,
    default: '',
  },
});
</script>

<style scoped>
.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.85rem;
  padding: 1rem 1rem 0.8rem;
}

.menu-button {
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 14px;
  background: rgba(47, 52, 61, 0.12);
  display: grid;
  gap: 5px;
  padding: 0.75rem 0.7rem;
  cursor: pointer;
}

.menu-button span {
  display: block;
  width: 100%;
  height: 3px;
  border-radius: 999px;
  background: #2f343d;
}

.brand-row {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.brand-icon {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: #fffaf2;
  padding: 6px;
  object-fit: contain;
}

.brand-name {
  display: block;
  font-size: 0.95rem;
  font-weight: 700;
  color: #2f343d;
}

small {
  display: block;
  color: #8b908a;
  font-size: 0.78rem;
}

.header-actions {
  display: flex;
  align-items: center;
}

.header-user {
  padding: 0.65rem 1rem;
  border-radius: 999px;
  background: rgba(216, 199, 163, 0.3);
  color: #2f343d;
  font-size: 0.8rem;
  font-weight: 700;
}
</style>
