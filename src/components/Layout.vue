<template>
  <div data-testid="layout-root">
    <header class="app-header" data-testid="header">
      <div class="header-container">
        <h1 class="app-title" data-testid="app-title">Movies</h1>
        <nav class="nav-bar" data-testid="nav-bar">
          <router-link to="/" data-testid="nav-movies">Movies</router-link>
          <router-link to="/favorites" data-testid="nav-favorites">Favorites</router-link>
        </nav>
      </div>
    </header>
    <main class="main-container" data-testid="main-container">
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup>
</script>

. 
<style scoped lang="scss">
.app-header {
  background: #fff;
  border-bottom: 1px solid #eee;
  padding: 0.5rem 0;
  margin-bottom: 2rem;
}
.header-container {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 2rem;
  height: 64px;
}
.app-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #222;
  letter-spacing: 0.5px;
}
.nav-bar {
  display: flex;
  gap: 2rem;
  a {
    text-decoration: none;
    color: #333;
    font-weight: 600;
    transition: color 0.2s;
    &.router-link-exact-active {
      color: $primary;
    }
    &:hover {
        color: $primary;
    }
  }
}
.main-container {
  max-width: 900px;
  margin: 0 auto;
  min-height: 400px;
  padding: 2rem 1rem;
}
</style>
