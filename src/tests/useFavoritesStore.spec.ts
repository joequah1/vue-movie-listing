import { setActivePinia, createPinia } from 'pinia';
import { useFavoritesStore } from '../stores/useFavoritesStore';
import { describe, it, expect, beforeEach } from 'vitest';

describe('useFavoritesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });
  it('adds and removes favorites', () => {
    const store = useFavoritesStore();
    const movie = { Title: 'Test', Year: '2020', imdbID: 'tt123' };
    store.addFavorite(movie);
    expect(store.favorites.length).toBe(1);
    store.removeFavorite('tt123');
    expect(store.favorites.length).toBe(0);
  });
  it('persists favorites to localStorage', () => {
    const store = useFavoritesStore();
    const movie = { Title: 'Test', Year: '2020', imdbID: 'tt123' };
    store.addFavorite(movie);
    const data = JSON.parse(localStorage.getItem('favorites')!);
    expect(data.length).toBe(1);
  });
});
