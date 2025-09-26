<template>
  <div class="favorites-view" data-testid="favorites-view">
    <h2 data-testid="favorites-title">Your Favorites</h2>
    <MovieList
      :movies="visibleFavorites"
      :isStarred="isFavorite"
      :onToggleStar="toggleFavorite"
      data-testid="favorites-movie-list"
    />
  <div v-if="favorites.length === 0" class="text-muted" data-testid="empty-state">No favorites yet.</div>
    <div v-else-if="favorites.length > visibleFavorites.length" class="load-more-row">
      <button class="load-more-btn" @click="loadMore" data-testid="load-more-btn">Load more</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MovieList from '../components/MovieList.vue';
import { useFavorites } from '../composables/useFavorites';
import { ref, computed } from 'vue';

const { favorites, isFavorite, toggleFavorite } = useFavorites();
const pageSize = 10;
const visibleCount = ref(pageSize);
const visibleFavorites = computed(() => favorites.value.slice(0, visibleCount.value));
function loadMore() {
  visibleCount.value += pageSize;
}
</script>

<style scoped lang="scss">
.favorites-view {
  min-height: 400px;
}
.load-more-row {
  display: flex;
  justify-content: center;
  margin: 2rem 0 1rem 0;
}
.load-more-btn {
  background: #f5b301;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #d4a000;
  }
}
</style>
