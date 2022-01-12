describe("Login Page",()=> {
    it("Go to login page",()=>{
  cy.visit('/login')
    })
    it("should test if form works correctly",()=>{
      cy.get('[data-test-id="email"]').type("Emeka-ugbanu")
      cy.get('[data-test-id="password"]').type("Emeka-ugbanu11111")
    })
    it("should test login for login page",()=>{
      cy.contains('Log in').click()
    })
    it("should check if error text is rendered",()=> {
      cy.get('[data-test-id="error"]').should('be.visible')
    })
    it("should check if sign up link is working",()=> {
        cy.get('[data-test-id="signup"]').click()
      })
  })