import { ref } from 'vue';

export function usePagination(initialPage = 1) {
  const page = ref(initialPage);

  function nextPage(totalPages: number) {
    if (page.value < totalPages) page.value++;
  }

  function prevPage() {
    if (page.value > 1) page.value--;
  }

  function setPage(newPage: number) {
    page.value = newPage;
  }

  return { page, nextPage, prevPage, setPage };
}
