<template>
  <section class="guest-page">
    <p class="label">Portal del huésped</p>
    <h1>Bienvenido a La Mansión</h1>
    <p class="description">
      Desde este panel podrás reservar comida y consultar puntos turísticos disponibles durante tu estadía.
    </p>

    <div class="guest-cards">
      <article>
        <h2>Reservar comida</h2>
        <p>Consulta el menú disponible y realiza solicitudes gastronómicas.</p>
      </article>

      <article>
        <h2>Puntos turísticos</h2>
        <p>Explora lugares recomendados cercanos al hotel.</p>
      </article>
    </div>
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

.guest-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
  margin-top: 12px;
}

.guest-cards article {
  padding: 24px;
  border: 1px solid #253044;
  border-radius: 18px;
  background: #111827;
}

.guest-cards h2 {
  margin: 0 0 10px;
  color: #f8fafc;
}

.guest-cards p {
  margin: 0;
  color: #94a3b8;
  line-height: 1.5;
}
</style>