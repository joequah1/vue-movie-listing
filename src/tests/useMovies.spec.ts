
import { describe, it, expect, vi } from 'vitest';
import { useMovies } from '../composables/useMovies';
import * as movieService from '../services/movieService';
import type { MovieApiResponse } from '../types/movie';

describe('useMovies', () => {
  it('fetches movies and updates state', async () => {
    const mockData: MovieApiResponse = {
      data: [{ Title: 'Test', Year: '2020', imdbID: 'tt123' }],
      total: 1,
      total_pages: 1,
      page: 1,
      per_page: 10
    };
    vi.spyOn(movieService, 'fetchMovies').mockResolvedValue(mockData);
    const { movies, searchMovies, total, totalPages } = useMovies();
    await searchMovies('Test', 1);
    expect(movies.value.length).toBe(1);
    expect(total.value).toBe(1);
    expect(totalPages.value).toBe(1);
  });
});
