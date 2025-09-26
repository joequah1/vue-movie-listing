import { storeToRefs } from 'pinia';
import { useFavoritesStore } from '../stores/useFavoritesStore';

export function useFavorites() {
  const store = useFavoritesStore();
  const { favorites } = storeToRefs(store);
  return {
    favorites,
    addFavorite: store.addFavorite,
    removeFavorite: store.removeFavorite,
    isFavorite: store.isFavorite,
    toggleFavorite: store.toggleFavorite,
  };
}
