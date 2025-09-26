import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MovieCard from '../components/MovieCard.vue';
import type { Movie } from '../types/movie';

const movie: Movie = { Title: 'Test Movie', Year: '2022', imdbID: 'tt123' };

describe('MovieCard', () => {
  it('renders title, year, and IMDB ID', () => {
    const wrapper = mount(MovieCard, { props: { movie, isStarred: false } });
    expect(wrapper.text()).toContain('Test Movie');
    expect(wrapper.text()).toContain('2022');
    expect(wrapper.text()).toContain('tt123');
  });

  it('shows star/unstar state', async () => {
    const wrapper = mount(MovieCard, { props: { movie, isStarred: true } });
    expect(wrapper.find('.star-btn').text()).toContain('★');
    await wrapper.setProps({ isStarred: false });
    expect(wrapper.find('.star-btn').text()).toContain('☆');
  });

  it('emits toggle-star event on button click', async () => {
    const wrapper = mount(MovieCard, { props: { movie, isStarred: false } });
    await wrapper.find('.star-btn').trigger('click');
    expect(wrapper.emitted('toggle-star')).toBeTruthy();
    expect(wrapper.emitted('toggle-star')![0]).toEqual([movie]);
  });

  it('throws error if required movie prop is missing', () => {
    expect(() => {
      mount(MovieCard, { props: { isStarred: false } as unknown as { movie: Movie; isStarred: boolean } });
    }).toThrow();
  });
});
