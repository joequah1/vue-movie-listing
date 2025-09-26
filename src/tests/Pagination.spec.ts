import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Pagination from '../components/Pagination.vue';

describe('Pagination', () => {
  it('renders correct page numbers', () => {
    const wrapper = mount(Pagination, { props: { page: 2, totalPages: 5 } });
    expect(wrapper.text()).toContain('Page 2 of 5');
  });

  it('emits prev/next events', async () => {
    const wrapper = mount(Pagination, { props: { page: 2, totalPages: 5 } });
    await wrapper.find('button').trigger('click'); // Prev
    expect(wrapper.emitted('prev')).toBeTruthy();
    await wrapper.findAll('button')[1].trigger('click'); // Next
    expect(wrapper.emitted('next')).toBeTruthy();
  });

  it('disables prev on first page and next on last page', () => {
    const wrapperFirst = mount(Pagination, { props: { page: 1, totalPages: 5 } });
    expect(wrapperFirst.find('button').attributes('disabled')).toBeDefined();

    const wrapperLast = mount(Pagination, { props: { page: 5, totalPages: 5 } });
    expect(wrapperLast.findAll('button')[1].attributes('disabled')).toBeDefined();
  });
});
