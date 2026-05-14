<template>
  <header class="topbar">
    <div class="topbar-copy">
      <p class="subtitle">Panel de administración hotelera</p>
      <h1>{{ title }}</h1>
    </div>
    <div class="topbar-user">
      <span class="user-badge">SUPER ADMIN</span>
    </div>
  </header>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.topbar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(47, 52, 61, 0.08);
}

.topbar-copy {
  display: grid;
  gap: 0.35rem;
}

.subtitle {
  margin: 0;
  color: #8b908a;
  font-size: 0.95rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  font-size: clamp(1.8rem, 2.5vw, 2.4rem);
  color: #2f343d;
}

.topbar-user {
  display: flex;
  align-items: center;
}

.user-badge {
  display: inline-flex;
  padding: 0.8rem 1.15rem;
  border-radius: 999px;
  background: #d8c7a3;
  color: #2f343d;
  font-weight: 700;
  letter-spacing: 0.03em;
}

@media (max-width: 720px) {
  .topbar {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
