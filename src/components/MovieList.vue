<template>
  <div>
    <MovieCard
      v-for="movie in movies"
      :key="movie.imdbID"
      :movie="movie"
      :isStarred="isStarred(movie.imdbID)"
      @toggle-star="onToggleStar"
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
