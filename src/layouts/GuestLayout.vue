<template>
  <div class="guest-layout">
    <GuestSidebar />

    <section class="guest-shell">
      <main class="guest-main">
        <router-view />
      </main>
    </section>
  </div>
</template>

<script setup lang="ts">
import GuestSidebar from '../components/layout/GuestSidebar.vue';
</script>

<style scoped>
.guest-layout {
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 264px minmax(0, 1fr);
  background: #0f172a;
  color: #e5e7eb;
  overflow-x: hidden;
}

.guest-shell {
  min-width: 0;
  min-height: 100vh;
  background: #0f172a;
  border-left: 1px solid #253044;
}

.guest-main {
  width: 100%;
  min-width: 0;
  min-height: 100vh;
  padding: 24px;
  background: #0f172a;
}

@media (max-width: 900px) {
  .guest-layout {
    grid-template-columns: 1fr;
  }

  .guest-main {
    padding: 18px;
  }
}
</style>