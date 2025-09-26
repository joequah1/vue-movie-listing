<template>
  <div class="movie-card" :class="{ grid }" data-testid="movie-card">
    <div class="movie-info">
      <h3 data-testid="movie-title">{{ movie.Title }}</h3>
      <p class="text-muted" data-testid="movie-year">Year: {{ movie.Year }}</p>
      <p class="text-muted" data-testid="movie-imdbid">IMDB ID: {{ movie.imdbID }}</p>
    </div>
  <button class="star-btn" :class="{ starred: isStarred }" @click="$emit('toggle-star', movie)" data-testid="star-btn">
      <span v-if="isStarred">★</span>
      <span v-else>☆</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import type { Movie } from '../types/movie';

defineProps<{ movie: Movie; isStarred: boolean; grid?: boolean }>();
defineEmits<{ (e: 'toggle-star', movie: Movie): void }>();
</script>

<style scoped lang="scss">
.movie-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 1rem;
  background: #fff;
  .movie-info {
    flex: 1;
  }
  .star-btn {
    font-size: 2rem;
    background: none;
    cursor: pointer;
    color: #ccc;
    &.starred {
      color: #f5b301;
    }
  }
  &.grid {
    margin-bottom: 0 !important;
    margin-top: 0 !important;
    .movie-info {
      margin-bottom: 1rem;
    }
    .star-btn {
      align-self: flex-end;
    }
  }
}
</style>
