<template>
  <div class="search-bar">
    <input
      v-model="search"
      @input="onInput"
      type="text"
      placeholder="Search movies by title..."
      data-testid="search-bar-input"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const emit = defineEmits<{ (e: 'search', value: string): void }>();
const search = ref('');
let debounceTimeout: ReturnType<typeof setTimeout>;

function onInput() {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    emit('search', search.value);
  }, 400);
}
</script>

<style scoped lang="scss">
.search-bar {
  input {
    width: 100%;
    padding: 0.7rem 0.1rem 0.7rem 0.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 1rem;
  }
}
</style>
