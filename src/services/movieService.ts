import axios from 'axios';
import type { MovieApiResponse } from '../types/movie';

const API_URL = 'https://jsonmock.hackerrank.com/api/movies/search/';

export async function fetchMovies(page: number, title?: string): Promise<MovieApiResponse> {
  const params: { page: number; Title?: string } = { page };
  if (title) params.Title = title;
  const response = await axios.get(API_URL, { params });
  return response.data;
}
