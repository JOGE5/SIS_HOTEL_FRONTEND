<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import {
  Search,
  SlidersHorizontal,
  Utensils,
  Plus,
  Trash2,
  Clock,
  BadgeDollarSign,
  ChefHat,
  CalendarDays,
  Soup,
  Coffee,
  Drumstick,
  Sparkles,
} from 'lucide-vue-next';

type CategoriaPlato = 'DESAYUNO' | 'ALMUERZO' | 'CENA' | 'BEBIDA' | 'POSTRE';

interface Plato {
  id: number;
  nombre: string;
  categoria: CategoriaPlato;
  precio: number;
  descripcion: string;
  tiempo: string;
}

interface MenuDiario {
  fecha: string;
  platos: Plato[];
}

const searchTerm = ref('');
const selectedCategoria = ref<CategoriaPlato | 'TODOS'>('TODOS');
const menuDiario = ref<MenuDiario>({
  fecha: getTodayKey(),
  platos: [],
});

let midnightChecker: number | undefined;

const platos = ref<Plato[]>([
  {
    id: 1,
    nombre: 'Desayuno Campestre',
    categoria: 'DESAYUNO',
    precio: 35,
    descripcion: 'Pan artesanal, huevo, fruta de temporada, café o té.',
    tiempo: '15 min',
  },
  {
    id: 2,
    nombre: 'Sopa de Maní',
    categoria: 'ALMUERZO',
    precio: 28,
    descripcion: 'Sopa tradicional boliviana con carne, maní y papas.',
    tiempo: '25 min',
  },
  {
    id: 3,
    nombre: 'Trucha a la Plancha',
    categoria: 'ALMUERZO',
    precio: 58,
    descripcion: 'Trucha fresca acompañada de arroz, papas y ensalada.',
    tiempo: '30 min',
  },
  {
    id: 4,
    nombre: 'Pollo Campestre',
    categoria: 'CENA',
    precio: 45,
    descripcion: 'Pollo dorado con guarnición de papas y vegetales.',
    tiempo: '28 min',
  },
  {
    id: 5,
    nombre: 'Café Especial de la Casa',
    categoria: 'BEBIDA',
    precio: 18,
    descripcion: 'Café caliente preparado al estilo de la casa.',
    tiempo: '8 min',
  },
  {
    id: 6,
    nombre: 'Postre de Frutas',
    categoria: 'POSTRE',
    precio: 22,
    descripcion: 'Postre fresco con frutas de temporada.',
    tiempo: '10 min',
  },
]);

const categorias: Array<{
  label: CategoriaPlato | 'TODOS';
  text: string;
}> = [
  { label: 'TODOS', text: 'Todos' },
  { label: 'DESAYUNO', text: 'Desayuno' },
  { label: 'ALMUERZO', text: 'Almuerzo' },
  { label: 'CENA', text: 'Cena' },
  { label: 'BEBIDA', text: 'Bebida' },
  { label: 'POSTRE', text: 'Postre' },
];

const filteredPlatos = computed(() => {
  const term = searchTerm.value.trim().toLowerCase();

  return platos.value.filter((plato) => {
    const matchesSearch =
      plato.nombre.toLowerCase().includes(term) ||
      plato.descripcion.toLowerCase().includes(term) ||
      plato.categoria.toLowerCase().includes(term);

    const matchesCategoria =
      selectedCategoria.value === 'TODOS' ||
      plato.categoria === selectedCategoria.value;

    return matchesSearch && matchesCategoria;
  });
});

const totalMenu = computed(() => {
  return menuDiario.value.platos.reduce((total, plato) => total + plato.precio, 0);
});

const menuAgrupado = computed(() => {
  return categorias
    .filter((categoria) => categoria.label !== 'TODOS')
    .map((categoria) => ({
      categoria: categoria.text,
      platos: menuDiario.value.platos.filter(
        (plato) => plato.categoria === categoria.label,
      ),
    }))
    .filter((grupo) => grupo.platos.length > 0);
});

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function loadMenu() {
  const saved = localStorage.getItem('hotel_menu_diario');

  if (!saved) {
    menuDiario.value = {
      fecha: getTodayKey(),
      platos: [],
    };
    return;
  }

  try {
    const parsedMenu = JSON.parse(saved) as MenuDiario;

    if (parsedMenu.fecha !== getTodayKey()) {
      clearMenu();
      return;
    }

    menuDiario.value = parsedMenu;
  } catch {
    clearMenu();
  }
}

function saveMenu() {
  localStorage.setItem('hotel_menu_diario', JSON.stringify(menuDiario.value));
}

function clearMenu() {
  menuDiario.value = {
    fecha: getTodayKey(),
    platos: [],
  };

  localStorage.setItem('hotel_menu_diario', JSON.stringify(menuDiario.value));
}

function checkMidnightReset() {
  if (menuDiario.value.fecha !== getTodayKey()) {
    clearMenu();
  }
}

function addToMenu(plato: Plato) {
  const alreadyExists = menuDiario.value.platos.some((item) => item.id === plato.id);

  if (alreadyExists) return;

  menuDiario.value.platos.push(plato);
}

function removeFromMenu(platoId: number) {
  menuDiario.value.platos = menuDiario.value.platos.filter(
    (plato) => plato.id !== platoId,
  );
}

function getCategoriaIcon(categoria: CategoriaPlato) {
  return {
    DESAYUNO: Coffee,
    ALMUERZO: Soup,
    CENA: Drumstick,
    BEBIDA: Coffee,
    POSTRE: Sparkles,
  }[categoria];
}

function getCategoriaClass(categoria: CategoriaPlato) {
  return {
    DESAYUNO: 'categoria-desayuno',
    ALMUERZO: 'categoria-almuerzo',
    CENA: 'categoria-cena',
    BEBIDA: 'categoria-bebida',
    POSTRE: 'categoria-postre',
  }[categoria];
}

function isInMenu(platoId: number) {
  return menuDiario.value.platos.some((plato) => plato.id === platoId);
}

watch(
  menuDiario,
  () => {
    saveMenu();
  },
  { deep: true },
);

onMounted(() => {
  loadMenu();

  midnightChecker = window.setInterval(() => {
    checkMidnightReset();
  }, 60000);
});

onUnmounted(() => {
  if (midnightChecker) {
    window.clearInterval(midnightChecker);
  }
});
</script>

<template>
  <section class="platos-view">
    <header class="page-header">
      <div>
        <p class="page-label">Gestión gastronómica</p>
        <h1>Menú diario</h1>
        <p class="page-description">
          Generación del menú del día para el restaurante del hotel. El menú se reinicia automáticamente al cambiar de fecha.
        </p>
      </div>

      <div class="date-card">
        <CalendarDays :size="20" />
        <div>
          <span>Fecha del menú</span>
          <strong>{{ menuDiario.fecha }}</strong>
        </div>
      </div>
    </header>

    <section class="toolbar">
      <form class="input-group" @submit.prevent>
        <div class="input-wrapper">
          <Search :size="19" class="search-icon" />
          <input
            v-model="searchTerm"
            type="text"
            class="input"
            placeholder="Buscar plato..."
            autocomplete="off"
          />
        </div>

        <button class="button--submit" type="submit">
          Buscar
        </button>
      </form>

      <div class="filter-box">
        <SlidersHorizontal :size="18" />
        <select v-model="selectedCategoria">
          <option
            v-for="categoria in categorias"
            :key="categoria.label"
            :value="categoria.label"
          >
            {{ categoria.text }}
          </option>
        </select>
      </div>
    </section>

    <section class="menu-layout">
      <article class="catalog-panel">
        <div class="section-title">
          <div>
            <p>Catálogo</p>
            <h2>Platos disponibles</h2>
          </div>
          <Utensils :size="22" />
        </div>

        <div class="platos-list">
          <article
            v-for="plato in filteredPlatos"
            :key="plato.id"
            class="plato-card"
          >
            <div class="plato-icon" :class="getCategoriaClass(plato.categoria)">
              <component :is="getCategoriaIcon(plato.categoria)" :size="24" />
            </div>

            <div class="plato-info">
              <div class="plato-heading">
                <div>
                  <span class="categoria-chip" :class="getCategoriaClass(plato.categoria)">
                    {{ plato.categoria }}
                  </span>
                  <h3>{{ plato.nombre }}</h3>
                </div>

                <strong>Bs. {{ plato.precio }}</strong>
              </div>

              <p>{{ plato.descripcion }}</p>

              <div class="plato-meta">
                <span>
                  <Clock :size="15" />
                  {{ plato.tiempo }}
                </span>

                <span>
                  <ChefHat :size="15" />
                  Cocina
                </span>
              </div>
            </div>

            <button
              type="button"
              class="add-button"
              :class="{ added: isInMenu(plato.id) }"
              :disabled="isInMenu(plato.id)"
              @click="addToMenu(plato)"
            >
              <Plus v-if="!isInMenu(plato.id)" :size="17" />
              <span>{{ isInMenu(plato.id) ? 'Agregado' : 'Agregar' }}</span>
            </button>
          </article>
        </div>
      </article>

      <aside class="menu-panel">
        <div class="menu-preview">
          <div class="menu-cover">
            <p>Hotel Club Campestre</p>
            <h2>La Mansión</h2>
            <span>Menú del día</span>
          </div>

          <div v-if="menuDiario.platos.length === 0" class="empty-menu">
            <ChefHat :size="42" />
            <h3>Menú sin generar</h3>
            <p>
              Agrega platos desde el catálogo para construir el menú diario.
            </p>
          </div>

          <div v-else class="menu-content">
            <div
              v-for="grupo in menuAgrupado"
              :key="grupo.categoria"
              class="menu-group"
            >
              <h3>{{ grupo.categoria }}</h3>

              <div
                v-for="plato in grupo.platos"
                :key="plato.id"
                class="menu-item"
              >
                <div>
                  <strong>{{ plato.nombre }}</strong>
                  <p>{{ plato.descripcion }}</p>
                </div>

                <div class="menu-price">
                  <span>Bs. {{ plato.precio }}</span>
                  <button
                    type="button"
                    title="Quitar del menú"
                    @click="removeFromMenu(plato.id)"
                  >
                    <Trash2 :size="15" />
                  </button>
                </div>
              </div>
            </div>

            <div class="menu-total">
              <span>Total referencial</span>
              <strong>Bs. {{ totalMenu }}</strong>
            </div>
          </div>
        </div>

        <button
          type="button"
          class="clear-button"
          :disabled="menuDiario.platos.length === 0"
          @click="clearMenu"
        >
          <Trash2 :size="17" />
          Limpiar menú del día
        </button>
      </aside>
    </section>
  </section>
</template>

<style scoped>
.platos-view {
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
}

.page-label {
  margin: 0 0 6px;
  color: #93c5fd;
  font-size: 0.76rem;
  font-weight: 850;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.page-header h1 {
  margin: 0;
  color: #f8fafc;
  font-size: 2rem;
  font-weight: 850;
  line-height: 1.1;
}

.page-description {
  margin: 10px 0 0;
  max-width: 820px;
  color: #94a3b8;
  font-size: 0.96rem;
  line-height: 1.55;
}

.date-card {
  min-width: 210px;
  padding: 14px 16px;
  border: 1px solid #253044;
  border-radius: 14px;
  background: #111827;
  color: #cbd5e1;
  display: flex;
  align-items: center;
  gap: 12px;
}

.date-card svg {
  color: #93c5fd;
}

.date-card span {
  display: block;
  color: #64748b;
  font-size: 0.76rem;
  font-weight: 800;
  text-transform: uppercase;
}

.date-card strong {
  display: block;
  margin-top: 3px;
  color: #f8fafc;
  font-size: 0.95rem;
}

.toolbar {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(280px, 1fr) 220px;
  gap: 14px;
  align-items: center;
}

.input-group {
  width: 100%;
  display: flex;
  align-items: center;
}

.input-wrapper {
  position: relative;
  flex: 1;
  min-width: 0;
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
}

.input {
  width: 100%;
  min-height: 50px;
  padding: 0 1rem 0 2.8rem;
  color: #f8fafc;
  font-size: 15px;
  border: 1px solid #334155;
  border-radius: 10px 0 0 10px;
  background-color: #111827;
}

.button--submit {
  min-height: 50px;
  padding: 0.5em 1.2em;
  border: none;
  border-radius: 0 10px 10px 0;
  background-color: #2563eb;
  color: #fff;
  font-size: 15px;
  font-weight: 800;
}

.button--submit:hover {
  background-color: #1d4ed8;
}

.input:focus,
.input:focus-visible {
  border-color: #3898ec;
  outline: none;
}

.filter-box {
  min-height: 50px;
  padding: 0 14px;
  border: 1px solid #334155;
  border-radius: 10px;
  background: #111827;
  color: #cbd5e1;
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-box svg {
  color: #93c5fd;
}

.filter-box select {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: #f8fafc;
  font-size: 0.9rem;
  font-weight: 750;
}

.menu-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(360px, 0.75fr);
  gap: 22px;
  align-items: start;
}

.catalog-panel,
.menu-panel {
  min-width: 0;
}

.catalog-panel {
  border: 1px solid #253044;
  border-radius: 18px;
  background: #111827;
  padding: 20px;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.24);
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.section-title p {
  margin: 0 0 5px;
  color: #93c5fd;
  font-size: 0.76rem;
  font-weight: 850;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.section-title h2 {
  margin: 0;
  color: #f8fafc;
  font-size: 1.25rem;
  font-weight: 850;
}

.section-title svg {
  color: #93c5fd;
}

.platos-list {
  display: grid;
  gap: 14px;
}

.plato-card {
  display: grid;
  grid-template-columns: 54px minmax(0, 1fr) auto;
  gap: 14px;
  align-items: center;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid #253044;
  background: #0f172a;
}

.plato-icon {
  width: 54px;
  height: 54px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  background: #1e293b;
}

.plato-heading {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
}

.plato-heading h3 {
  margin: 7px 0 0;
  color: #f8fafc;
  font-size: 1rem;
  font-weight: 850;
}

.plato-heading strong {
  color: #f8fafc;
  font-size: 0.95rem;
  white-space: nowrap;
}

.plato-info p {
  margin: 8px 0 0;
  color: #94a3b8;
  font-size: 0.88rem;
  line-height: 1.45;
}

.categoria-chip {
  width: fit-content;
  display: inline-flex;
  padding: 5px 8px;
  border-radius: 999px;
  background: #1e293b;
  font-size: 0.66rem;
  font-weight: 900;
  letter-spacing: 0.08em;
}

.categoria-desayuno {
  color: #facc15;
}

.categoria-almuerzo {
  color: #22c55e;
}

.categoria-cena {
  color: #60a5fa;
}

.categoria-bebida {
  color: #2dd4bf;
}

.categoria-postre {
  color: #f472b6;
}

.plato-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;
}

.plato-meta span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #64748b;
  font-size: 0.8rem;
  font-weight: 750;
}

.add-button {
  border: 1px solid #334155;
  border-radius: 12px;
  background: #1e293b;
  color: #f8fafc;
  padding: 10px 13px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 0.82rem;
  font-weight: 850;
}

.add-button:hover {
  background: #2563eb;
  border-color: #2563eb;
}

.add-button.added,
.add-button:disabled {
  background: #064e3b;
  border-color: #166534;
  color: #bbf7d0;
  cursor: not-allowed;
}

.menu-panel {
  position: sticky;
  top: 90px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.menu-preview {
  overflow: hidden;
  border-radius: 22px;
  border: 1px solid #3f2f1f;
  background: #fff7ed;
  color: #1f2937;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.35);
}

.menu-cover {
  padding: 28px;
  text-align: center;
  background:
    radial-gradient(circle at top left, rgba(251, 191, 36, 0.35), transparent 34%),
    linear-gradient(135deg, #7c2d12, #431407);
  color: #fff7ed;
}

.menu-cover p {
  margin: 0;
  font-size: 0.78rem;
  font-weight: 850;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.menu-cover h2 {
  margin: 8px 0;
  font-size: 2rem;
  font-weight: 900;
  font-family: Georgia, serif;
}

.menu-cover span {
  color: #fed7aa;
  font-size: 0.95rem;
}

.empty-menu {
  min-height: 360px;
  padding: 36px 28px;
  display: grid;
  place-items: center;
  text-align: center;
  color: #9a3412;
}

.empty-menu h3 {
  margin: 14px 0 8px;
  font-size: 1.3rem;
}

.empty-menu p {
  margin: 0;
  color: #7c2d12;
  line-height: 1.5;
}

.menu-content {
  padding: 24px;
}

.menu-group {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px dashed #fdba74;
}

.menu-group:last-of-type {
  border-bottom: none;
}

.menu-group h3 {
  margin: 0 0 14px;
  color: #7c2d12;
  font-family: Georgia, serif;
  font-size: 1.35rem;
}

.menu-item {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 16px;
  padding: 12px 0;
}

.menu-item strong {
  color: #1f2937;
  font-size: 0.98rem;
}

.menu-item p {
  margin: 5px 0 0;
  color: #6b7280;
  font-size: 0.86rem;
  line-height: 1.45;
}

.menu-price {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  color: #7c2d12;
  font-weight: 900;
  white-space: nowrap;
}

.menu-price button {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 8px;
  background: #fee2e2;
  color: #dc2626;
  display: grid;
  place-items: center;
}

.menu-total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px;
  border-radius: 14px;
  background: #ffedd5;
  color: #7c2d12;
}

.menu-total span {
  font-size: 0.88rem;
  font-weight: 850;
}

.menu-total strong {
  font-size: 1.15rem;
}

.clear-button {
  width: 100%;
  border: 1px solid #334155;
  border-radius: 14px;
  background: #111827;
  color: #f8fafc;
  padding: 13px 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 850;
}

.clear-button:hover:not(:disabled) {
  background: #7f1d1d;
  border-color: #991b1b;
}

.clear-button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

@media (max-width: 1180px) {
  .menu-layout {
    grid-template-columns: 1fr;
  }

  .menu-panel {
    position: static;
  }
}

@media (max-width: 900px) {
  .toolbar {
    grid-template-columns: 1fr;
  }

  .page-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .date-card {
    width: 100%;
  }
}

@media (max-width: 680px) {
  .plato-card {
    grid-template-columns: 1fr;
  }

  .add-button {
    width: 100%;
    justify-content: center;
  }

  .menu-item {
    grid-template-columns: 1fr;
  }
}
</style>