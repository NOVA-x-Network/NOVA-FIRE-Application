describe('My First Test', () => {
    it('clicking "type" navigates to a new url', () => {
      cy.visit('http://localhost:8000')
  
      cy.contains('Login').click()
  
      // Should be on a new URL which includes '/commands/actions'
     
    })
  })