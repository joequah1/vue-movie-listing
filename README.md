# vue-movie-listing

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

---

# Project Structure & Documentation

## Components

### MovieGrid.vue
- **Purpose:** Displays a grid of movie cards.
- **Props:**
  - `movies` (Movie[]): Array of movie objects to display. **Required**
  - `isStarred` (function): Function `(imdbID: string) => boolean` to check if a movie is starred. **Required**
  - `onToggleStar` (function): Function `(movie: Movie) => void` to toggle favorite status. **Required**
- **Usage:**  
  ```vue
  <MovieGrid :movies="movies" :isStarred="isStarred" :onToggleStar="toggleFavorite" />
  ```

### MovieList.vue
- **Purpose:** Displays a vertical list of movie cards.
- **Props:**
  - `movies` (Movie[]): Array of movie objects to display. **Required**
  - `isStarred` (function): Function `(imdbID: string) => boolean` to check if a movie is starred. **Required**
  - `onToggleStar` (function): Function `(movie: Movie) => void` to toggle favorite status. **Required**
- **Usage:**  
  ```vue
  <MovieList :movies="movies" :isStarred="isStarred" :onToggleStar="toggleFavorite" />
  ```

### MovieCard.vue
- **Purpose:** Shows a single movie’s details and a star button for favoriting.
- **Props:**
  - `movie` (Movie): The movie object to display. **Required**
  - `isStarred` (boolean): Whether the movie is starred. **Required**
  - `grid` (boolean): If true, applies grid-specific styles. **Optional**
- **Emits:**  
  - `toggle-star` (movie: Movie): Emitted when the star button is clicked.

### SearchBar.vue
- **Purpose:** Input for searching movies by title.
- **Emits:**  
  - `search` (value: string): Emitted when the input changes.

### Pagination.vue
- **Purpose:** Pagination controls for navigating movie pages.
- **Props:**
  - `page` (number): Current page number. **Required**
  - `totalPages` (number): Total number of pages. **Required**
- **Emits:**  
  - `prev`: Emitted when the previous button is clicked.
  - `next`: Emitted when the next button is clicked.

### Layout.vue
- **Purpose:** Main layout with header, navigation, and slot for content.

---

## Composables

### useMovies.ts
- **Purpose:** Handles fetching and managing movie data.
- **Returns:**
  - `movies` (Ref<Movie[]>): List of movies.
  - `loading` (Ref<boolean>): Loading state.
  - `error` (Ref<string|null>): Error message.
  - `total` (Ref<number>): Total results.
  - `totalPages` (Ref<number>): Total pages.
  - `searchMovies(title: string, page?: number)`: Fetches movies by title and page.

### useFavorites.ts
- **Purpose:** Manages favorite movies using Pinia store.
- **Returns:**
  - `favorites` (Ref<Movie[]>): List of favorite movies.
  - `addFavorite(movie: Movie)`: Adds a movie to favorites.
  - `removeFavorite(imdbID: string)`: Removes a movie from favorites.
  - `isFavorite(imdbID: string)`: Checks if a movie is a favorite.
  - `toggleFavorite(movie: Movie)`: Toggles favorite status.

### usePagination.ts
- **Purpose:** Simple pagination state and helpers.
- **Returns:**
  - `page` (Ref<number>): Current page.
  - `nextPage(totalPages: number)`: Increments page if not at last page.
  - `prevPage()`: Decrements page if not at first page.
  - `setPage(newPage: number)`: Sets the current page.

---

## Views

### MovieListView.vue
- **Purpose:** Main view for searching and browsing movies.
- **Uses:**  
  - Components: `SearchBar`, `MovieList`/`MovieGrid`, `Pagination`
  - Composables: `useMovies`, `useFavorites`, `usePagination`
- **Features:**  
  - Search movies, toggle grid/list, pagination, loading/error/empty states, favorite/unfavorite.

### FavoritesView.vue
- **Purpose:** Shows the user’s favorite movies.
- **Uses:**  
  - Components: `MovieList`
  - Composables: `useFavorites`
- **Features:**  
  - Paginated favorites, load more, empty state.

---

## Services


### movieService.ts
- **fetchMovies(page: number, title?: string): Promise<MovieApiResponse>**
  - **Params:**
    - `page` (number): Page number to fetch. **Required**
    - `title` (string): Movie title to search for. **Optional**
  - **Returns:** Promise resolving to a `MovieApiResponse` object with movie data and pagination info.

---

## Stores

### useFavoritesStore.ts
- **State:**  
  - `favorites` (Movie[]): List of favorite movies (persisted in localStorage).
- **Actions:**
  - `addFavorite(movie: Movie)`: Adds a movie to favorites if not already present.
  - `removeFavorite(imdbID: string)`: Removes a movie by imdbID.
  - `isFavorite(imdbID: string)`: Returns true if the movie is in favorites.
  - `toggleFavorite(movie: Movie)`: Adds or removes a movie from favorites.
  - `loadFromStorage()`: Loads favorites from localStorage.

---

## Unit Tests (Vitest)

Each test checks the expected result for the component/composable/service:

- **movieService.spec.ts**:  
  - Tests that `fetchMovies` returns correct data for valid/invalid queries.

- **SearchBar.spec.ts**:  
  - Ensures input emits the correct `search` event.

- **useMovies.spec.ts**:  
  - Verifies movie fetching, loading, and error handling.

- **Pagination.spec.ts**:  
  - Checks page increment/decrement and boundary conditions.

- **MovieCard.spec.ts**:  
  - Tests rendering, star button, and event emission.

- **useFavoritesStore.spec.ts**:  
  - Ensures favorites are added/removed/toggled and persisted.

- **MovieList.spec.ts**:  
  - Verifies correct rendering of movie list and props.

---

## E2E Tests (Cypress)

- **movie-flow.cy.ts**:  
  - Simulates a user searching for movies, switching views, favoriting/unfavoriting, paginating, and viewing favorites.
  - **Expected Results:**  
    - Movies are fetched and displayed.
    - Grid/list toggle works.
    - Favoriting updates UI and persists.
    - Pagination navigates pages.
    - Favorites view shows correct movies and supports loading more.
    - Loading, empty, and error states are handled and shown correctly.

---
