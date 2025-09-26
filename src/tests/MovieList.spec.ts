import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MovieList from '../components/MovieList.vue';
import type { Movie } from '../types/movie';

const movies: Movie[] = [
  { Title: 'A', Year: '2020', imdbID: '1' },
  { Title: 'B', Year: '2021', imdbID: '2' }
];

describe('MovieList', () => {
  it('renders correct number of MovieCard components', () => {
    const wrapper = mount(MovieList, {
      props: {
        movies,
        isStarred: () => false,
        onToggleStar: () => {}
      }
    });
    expect(wrapper.findAllComponents({ name: 'MovieCard' }).length).toBe(2);
  });

  it('shows empty state if no movies', () => {
    const wrapper = mount(MovieList, {
      props: {
        movies: [],
        isStarred: () => false,
        onToggleStar: () => {}
      }
    });
    expect(wrapper.text()).not.toContain('MovieCard');
  });

  it('passes props correctly to MovieCard', () => {
    const wrapper = mount(MovieList, {
      props: {
        movies,
        isStarred: (id: string) => id === '1',
        onToggleStar: () => {}
      }
    });
    const firstCard = wrapper.findComponent({ name: 'MovieCard' });
    expect(firstCard.props('isStarred')).toBe(true);
  });
});
