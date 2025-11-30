describe('Movie Search', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('searches for a movie and displays results', () => {
        cy.get('[data-testid="search-input"]').type('Zootopia');
        cy.get('[data-testid="movie-card"]')
            .should('exist')
            .and('contain.text', 'Zootopia');
    });

    it('clears search results when input is cleared', () => {
        cy.get('[data-testid="search-input"]').type(
            'Zootopia{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}',
        );
        cy.get('[data-testid="movie-card"]').should('have.length', 0);
    });
});
