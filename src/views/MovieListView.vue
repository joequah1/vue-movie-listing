<template>
  <div class="movie-list-view" data-testid="movie-list-view">
    <div class="search-row" data-testid="search-row">
      <SearchBar @search="onSearch" />
      <button class="toggle-btn" @click="toggleView" :aria-label="isGrid ? 'Switch to list view' : 'Switch to grid view'" data-testid="toggle-view-btn">
        <span v-if="isGrid">🔲</span>
        <span v-else>≰</span>
      </button>
    </div>
    <component
      :is="isGrid ? MovieGrid : MovieList"
      :movies="movies"
      :isStarred="isFavorite"
      :onToggleStar="toggleFavorite"
      data-testid="movie-list-component"
    />
    <Pagination
      :page="page"
      :totalPages="totalPages"
      @prev="handlePrev"
      @next="handleNext"
      data-testid="pagination"
    />
    <div>
      <div v-if="error" class="text-muted" data-testid="error-message">{{ error }}</div>
      <div v-else-if="!loading && movies.length === 0" class="text-muted" data-testid="empty-state">No movies found.</div>
      <div v-if="loading" class="overlay-loading" data-testid="loading-overlay">
        <div class="spinner" data-testid="loading-spinner"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import SearchBar from '../components/SearchBar.vue';
import MovieList from '../components/MovieList.vue';
import MovieGrid from '../components/MovieGrid.vue';
import Pagination from '../components/Pagination.vue';
import { useMovies } from '../composables/useMovies';
import { useFavorites } from '../composables/useFavorites';
import { usePagination } from '../composables/usePagination';

const { movies, loading, error, totalPages, searchMovies } = useMovies();
const { isFavorite, toggleFavorite } = useFavorites();
const { page, nextPage, prevPage, setPage } = usePagination();
function handlePrev() {
  prevPage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function handleNext() {
  nextPage(totalPages.value);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


const isGrid = ref(false);
const searchTerm = ref('');

function toggleView() {
  isGrid.value = !isGrid.value;
}

function onSearch(term: string) {
  searchTerm.value = term;
  setPage(1);
  searchMovies(term, 1);
}


watch(page, (newPage) => {
  searchMovies(searchTerm.value, newPage);
});

onSearch('');
</script>

<style scoped lang="scss">
.movie-list-view {
  min-height: 400px;
  position: relative;
}
.overlay-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255,255,255,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.spinner {
  width: 48px;
  height: 48px;
  border: 5px solid #eee;
  border-top: 5px solid #f5b301;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.search-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
.search-row > *:first-child {
  flex: 1 1 0%;
}
.toggle-btn {
  background: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #eee;
  }
}
</style>
