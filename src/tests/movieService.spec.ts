import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { fetchMovies } from '../services/movieService';

vi.mock('axios');

describe('movieService', () => {
  it('calls correct endpoint with title and page', async () => {
  vi.mocked(axios.get).mockResolvedValue({ data: { data: [], total: 0, total_pages: 0, page: 1, per_page: 10 } });
    await fetchMovies(2, 'Batman');
    expect(axios.get).toHaveBeenCalledWith(
      'https://jsonmock.hackerrank.com/api/movies/search/',
      { params: { Title: 'Batman', page: 2 } }
    );
  });

  it('parses successful response', async () => {
    const mockResponse = { data: { data: [{ Title: 'A', Year: '2020', imdbID: '1' }], total: 1, total_pages: 1, page: 1, per_page: 10 } };
  vi.mocked(axios.get).mockResolvedValue(mockResponse);
    const result = await fetchMovies(1, 'A');
    expect(result).toEqual(mockResponse.data);
  });

  it('handles network error', async () => {
  vi.mocked(axios.get).mockRejectedValue(new Error('Network error'));
    await expect(fetchMovies(1, 'A')).rejects.toThrow('Network error');
  });

  it('handles empty results', async () => {
  vi.mocked(axios.get).mockResolvedValue({ data: { data: [], total: 0, total_pages: 0, page: 1, per_page: 10 } });
    const result = await fetchMovies(1, 'NoMovie');
    expect(result.data).toEqual([]);
    expect(result.total).toBe(0);
  });
});
