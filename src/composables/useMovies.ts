import { ref } from 'vue';
import { fetchMovies } from '../services/movieService';
import type { Movie } from '../types/movie';

export function useMovies() {
  const movies = ref<Movie[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const total = ref(0);
  const totalPages = ref(0);

  async function searchMovies(title: string, page: number = 1) {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetchMovies(page, title);
      movies.value = res.data;
      total.value = res.total;
      totalPages.value = res.total_pages;
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : String(e);
    } finally {
      loading.value = false;
    }
  }

  return { movies, loading, error, total, totalPages, searchMovies };
}
