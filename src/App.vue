<template>
  <div id="app">
    <LoginView v-if="!hasToken" />
    <DashboardLayout v-else @logout="handleLogout" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import LoginView from './views/LoginView.vue';
import DashboardLayout from './layouts/DashboardLayout.vue';

const hasToken = ref(false);

const updateTokenState = () => {
  hasToken.value = !!localStorage.getItem('hotel_token');
};

const handleLogout = () => {
  localStorage.removeItem('hotel_token');
  hasToken.value = false;
};

const handleLoginSuccess = () => {
  updateTokenState();
};

onMounted(() => {
  updateTokenState();
  window.addEventListener('login-success', handleLoginSuccess);
});

onBeforeUnmount(() => {
  window.removeEventListener('login-success', handleLoginSuccess);
});
</script>

<style scoped>
#app {
  min-height: 100vh;
  background: #f1e7d6;
}
</style>