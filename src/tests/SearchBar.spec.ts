import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import SearchBar from '../components/SearchBar.vue';

describe('SearchBar', () => {
  it('accepts and updates input', async () => {
    const wrapper = mount(SearchBar);
    const input = wrapper.find('input');
    await input.setValue('Batman');
    expect((input.element as HTMLInputElement).value).toBe('Batman');
  });

  it('emits search event on input (debounced)', async () => {
    vi.useFakeTimers();
    const wrapper = mount(SearchBar);
    const input = wrapper.find('input');
    await input.setValue('Superman');
    vi.runAllTimers();
    expect(wrapper.emitted('search')).toBeTruthy();
    expect(wrapper.emitted('search')![0]).toEqual(['Superman']);
    vi.useRealTimers();
  });

  it('handles empty input', async () => {
    const wrapper = mount(SearchBar);
    const input = wrapper.find('input');
    await input.setValue('');
    expect((input.element as HTMLInputElement).value).toBe('');
  });
});
