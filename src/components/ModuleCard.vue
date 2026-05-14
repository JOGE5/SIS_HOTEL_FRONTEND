<template>
  <article :class="['module-card', { active }]">
    <div class="module-icon">{{ icon }}</div>
    <div class="module-copy">
      <h3>{{ label }}</h3>
      <p>{{ description }}</p>
    </div>
    <button type="button" class="module-action" @click="$emit('open')">Abrir</button>
  </article>
</template>

<script setup lang="ts">
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.module-card {
  display: grid;
  gap: 1rem;
  padding: 1.05rem;
  border-radius: 20px;
  background: #fffaf2;
  border: 1px solid rgba(47, 52, 61, 0.08);
  box-shadow: 0 18px 30px rgba(47, 52, 61, 0.06);
}

.module-card.active {
  border-color: rgba(216, 199, 163, 0.8);
  box-shadow: 0 22px 36px rgba(47, 52, 61, 0.1);
}

.module-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: rgba(216, 199, 163, 0.18);
  font-size: 1.3rem;
}

.module-copy h3 {
  margin: 0;
  font-size: 1rem;
  color: #2f343d;
}

.module-copy p {
  margin: 0;
  color: #6e6b63;
  font-size: 0.92rem;
  line-height: 1.45;
}

.module-action {
  align-self: flex-start;
  margin-top: 0.3rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 14px;
  background: #2f343d;
  color: #fffaf2;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.module-action:hover {
  background: #40474f;
  transform: translateY(-1px);
}
</style>
