import { defineStore } from 'pinia';
import type { Movie } from '../types/movie';

interface FavoritesState {
  favorites: Movie[];
}

const FAVORITES_KEY = 'favorites';

function loadFavorites(): Movie[] {
  const data = localStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
}

function saveFavorites(favorites: Movie[]) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export const useFavoritesStore = defineStore('favorites', {
  state: (): FavoritesState => ({
    favorites: loadFavorites(),
  }),
  actions: {
    addFavorite(movie: Movie) {
      if (!this.favorites.find(m => m.imdbID === movie.imdbID)) {
        this.favorites.push(movie);
        saveFavorites(this.favorites);
      }
    },
    removeFavorite(imdbID: string) {
      this.favorites = this.favorites.filter(m => m.imdbID !== imdbID);
      saveFavorites(this.favorites);
    },
    isFavorite(imdbID: string): boolean {
      return this.favorites.some(m => m.imdbID === imdbID);
    },
    toggleFavorite(movie: Movie) {
      if (this.isFavorite(movie.imdbID)) {
        this.removeFavorite(movie.imdbID);
      } else {
        this.addFavorite(movie);
      }
    },
    loadFromStorage() {
      this.favorites = loadFavorites();
    }
  },
});
