// Cypress E2E tests for Vue 3 + TypeScript movie listing app
// Uses data-testid for selectors where needed

describe('Movie Listing App E2E', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Search Flow: displays results for a movie title', () => {
    cy.get('[data-testid="search-bar-input"]').type('Batman');
    cy.get('[data-testid="movie-card"]').should('exist');
    cy.get('[data-testid="movie-card"]').first().within(() => {
      cy.get('[data-testid="movie-title"]').should('contain.text', 'Batman');
      cy.get('[data-testid="movie-year"]').should('exist');
      cy.get('[data-testid="movie-imdbid"]').should('exist');
    });
  });

  it('Pagination: loads next page and updates pagination', () => {
    cy.get('[data-testid="pagination-next"]').click();
    cy.get('[data-testid="pagination-page"]').should('not.contain.text', 'Page 1');
    cy.get('[data-testid="movie-card"]').should('exist');
  });

  it('Star/Unstar Movie: favorites flow', () => {
    cy.get('[data-testid="movie-card"]').first().within(() => {
      cy.get('[data-testid="star-btn"]').click();
      cy.get('[data-testid="star-btn"]').should('have.class', 'starred');
    });
    cy.visit('/favorites');
    cy.get('[data-testid="movie-card"]').should('exist');
    cy.get('[data-testid="movie-card"]').first().within(() => {
      cy.get('[data-testid="star-btn"]').click();
    });
    cy.get('[data-testid="movie-card"]').should('not.exist');
  });

  it('Favorites Persistence: persists favorites after reload', () => {
    cy.get('[data-testid="movie-card"]').first().within(() => {
      cy.get('[data-testid="star-btn"]').click();
    });
    cy.reload();
    cy.visit('/favorites');
    cy.get('[data-testid="movie-card"]').should('exist');
  });

  it('Empty State: shows message for no results', () => {
    cy.get('[data-testid="search-bar-input"]').clear().type('zzzzzzzz');
    cy.get('[data-testid="movie-card"]').should('not.exist');
    cy.get('[data-testid="empty-state"]').should('be.visible');
  });
});
