<template>
  <div class="pagination flex-center">
  <button :disabled="page === 1" @click="$emit('prev')" data-testid="pagination-prev">Prev</button>
  <span data-testid="pagination-page">Page {{ page }} of {{ totalPages }}</span>
  <button :disabled="page === totalPages" @click="$emit('next')" data-testid="pagination-next">Next</button>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ page: number; totalPages: number }>();
defineEmits<{ (e: 'prev'): void; (e: 'next'): void }>();
</script>

<style scoped lang="scss">
.pagination {
  margin: 1rem 0;
  button {
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    background: #f9f9f9;
    cursor: pointer;
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
</style>
