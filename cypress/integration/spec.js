describe('Sapper template app', () => {
	beforeEach(() => {
		cy.visit('/')
		cy.wait(200);
	});

	it('has the correct <h1>', () => {
		cy.contains('h1', 'We Have Things!')
	});

	it('navigates to /about', () => {
		cy.get('nav a').contains('about').click();
		cy.url().should('include', '/about');
	});

	it('navigates to /admin', () => {
		cy.get('nav div').contains('admin').click();
		cy.url().should('include', '/admin');
	});
});