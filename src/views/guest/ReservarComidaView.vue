<template>
  <section class="guest-page">
    <p class="label">Servicio gastronómico</p>
    <h1>Reservar comida</h1>
    <p class="description">
      Aquí el huésped podrá seleccionar platos disponibles del menú diario y enviar su solicitud.
    </p>

    <article class="empty-panel">
      Módulo pendiente de conexión con el menú diario.
    </article>
  </section>
</template>

<style scoped>
.guest-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.label {
  margin: 0;
  color: #93c5fd;
  font-size: 0.76rem;
  font-weight: 850;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  color: #f8fafc;
  font-size: 2rem;
}

.description {
  margin: 0;
  max-width: 760px;
  color: #94a3b8;
  line-height: 1.6;
}

.empty-panel {
  padding: 24px;
  border: 1px dashed #334155;
  border-radius: 18px;
  background: #111827;
  color: #94a3b8;
}
</style>