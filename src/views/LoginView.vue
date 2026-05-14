<template>
  <div class="login-container">
    <!-- Video de fondo con fallback -->
    <video
      v-if="videoExists"
      class="background-video"
      autoplay
      muted
      loop
      playsinline
      @error="handleVideoError"
    >
      <source :src="videoSrc" type="video/mp4" />
    </video>
    <div v-else class="background-fallback"></div>

    <!-- Overlay oscuro -->
    <div class="overlay"></div>

    <!-- Efecto MouseGlow -->
    <MouseGlow />

    <!-- Tarjeta de login -->
    <div class="login-card">
      <div class="logo-section">
        <img
          v-if="logoExists"
          src="/images/logo-lamansion.png"
          alt="Hotel La Mansión"
          class="logo"
        />
        <h1 v-else class="title">Hotel Club Campestre La Mansión</h1>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
          <label for="email">Correo electrónico</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            placeholder="Ingrese su email"
            class="input-field"
          />
        </div>

        <div class="input-group">
          <label for="password">Contraseña</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            placeholder="Ingrese su contraseña"
            class="input-field"
          />
        </div>

        <button type="submit" :disabled="loading" class="login-button">
          {{ loading ? 'Ingresando...' : 'Ingresar al sistema' }}
        </button>

        <p v-if="error" class="error-message">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../services/api.ts';
import MouseGlow from '../components/MouseGlow.vue';

const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');
const videoSrc = '/videos/hotel-bg.mp4';
const videoExists = ref(false);
const logoExists = ref(false);

const checkAssets = () => {
  // Verificar si el video existe
  const video = document.createElement('video');
  video.preload = 'metadata';
  video.src = videoSrc;
  video.onloadedmetadata = () => {
    videoExists.value = true;
  };
  video.onerror = () => {
    videoExists.value = false;
  };

  // Verificar si el logo existe
  const img = new Image();
  img.src = '/images/logo-lamansion.png';
  img.onload = () => {
    logoExists.value = true;
  };
  img.onerror = () => {
    logoExists.value = false;
  };
};

const handleVideoError = () => {
  videoExists.value = false;
};

const handleLogin = async () => {
  loading.value = true;
  error.value = '';

  try {
    const response = await api.post('/login', { email: email.value, password: password.value });
    const token = response.data.token;
    localStorage.setItem('hotel_token', token);
    // Emitir evento para que App.vue actualice el estado
    window.dispatchEvent(new CustomEvent('login-success'));
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Error al iniciar sesión';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  checkAssets();
});
</script>

<style scoped>
.login-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -2;
}

.background-fallback {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #2f343d 0%, #cbb99f 100%);
  z-index: -2;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: -1;
}

.login-card {
  background: rgba(47, 52, 61, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(203, 185, 159, 0.3);
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.logo-section {
  text-align: center;
  margin-bottom: 2rem;
}

.logo {
  max-width: 200px;
  height: auto;
}

.title {
  font-size: 2rem;
  color: #cbb99f;
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group label {
  font-weight: 500;
  color: #cbb99f;
}

.input-field {
  padding: 0.75rem;
  border: 1px solid rgba(203, 185, 159, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 1rem;
}

.input-field:focus {
  outline: none;
  border-color: #cbb99f;
  box-shadow: 0 0 0 2px rgba(203, 185, 159, 0.2);
}

.login-button {
  padding: 0.75rem;
  background: #cbb99f;
  color: #2f343d;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.login-button:hover:not(:disabled) {
  background: #a89b7d;
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-message {
  color: #ff6b6b;
  text-align: center;
  font-size: 0.9rem;
}

@media (max-width: 480px) {
  .login-card {
    margin: 1rem;
    padding: 1.5rem;
  }

  .title {
    font-size: 1.5rem;
  }
}
</style>