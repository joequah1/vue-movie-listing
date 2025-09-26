<template>
  <div class="movie-grid">
    <MovieCard
      v-for="movie in movies"
      :key="movie.imdbID"
      :movie="movie"
      :isStarred="isStarred(movie.imdbID)"
      @toggle-star="onToggleStar"
      :grid="true"
    />
  </div>
</template>

<script lang="ts" setup>
import MovieCard from './MovieCard.vue';
import type { Movie } from '../types/movie';

defineProps<{
  movies: Movie[];
  isStarred: (imdbID: string) => boolean;
  onToggleStar: (movie: Movie) => void;
}>();
</script>

<style scoped lang="scss">
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}
</style>
