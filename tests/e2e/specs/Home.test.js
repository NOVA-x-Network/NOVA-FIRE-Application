describe("Homepage",()=> {
    it("Go to home",()=>{
  cy.visit('/')
    })
    it("should test login",()=>{
      cy.contains('Login').click()
      cy.wait(5000)
      cy.visit('/')
    })
    it("should test sign up",()=>{
      cy.contains('Sign up').click()
      cy.wait(5000)
      cy.visit('/')
    })
    it("should test Continue your application",()=>{
      cy.contains('Continue your application').click()
      cy.wait(5000)
      cy.visit('/')
    })   
})
