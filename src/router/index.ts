import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import MovieListView from '../views/MovieListView.vue';
import FavoritesView from '../views/FavoritesView.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'MovieList',
    component: MovieListView,
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: FavoritesView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
