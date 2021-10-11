/// <reference types="cypress"/>





describe ('Manual Login', () => {
    const email = "liam.deman@student.hogent.be";
    const password = "P@ssword1";


    it('logs in', function(){

        //login
        cy.visit('/account/login');
        cy.contains('Login').should('be.visible');
        
        cy.get('[data-cy=login-email]').type(email);
        cy.get('[data-cy=login-password]').type(password);
        cy.get('[data-cy=login-button]').click();
        cy.contains("logout").should('be.visible');

        

    }); 

    
});


describe ('Link tests', () => {
    beforeEach(function () {
        cy.login();
      });

    it('logs in', function(){

        cy.contains("logout");     

    }); 

    it('Links from user are fetched and displayed', function(){

        cy.visit('/link/list');
        cy.contains('boomerBook');     

    }); 

    it('Creates link', function(){

        it('create Link')
        const uuid = () => Cypress._.random(0, 1e6)
        const id = uuid()
        const testname = `testname${id}`
    
        cy.visit('/link/add');
        cy.get('[data-cy=newLinkExtension]').type(testname);
        cy.get('[data-cy=newDestination]').type("https://www.gmail.com/");
        cy.get('[data-cy=CreateLink]').click();

        cy.wait(1000);

        
        cy.contains(testname);

    }); 
   


    
});






describe('homepage', function() {
    it('Links are fetched and displayed', function(){

        cy.visit('');
        cy.get('[data-cy=Link]').should('be.visible');   
    });   

    it('mock Link get', function(){
        cy.server();
        cy.route({
             method: 'GET',
              url: '/api/Links',
              status: 200,
              response: 'fixture:links.json'
        }) 
        cy.visit('/');
        cy.get('[data-cy=Link]').should('be.visible');   

    });

    it('mock Link error handling', function(){
      cy.server();
      cy.route({
           method: 'GET',
            url: '/api/Links',
            status: 500,
            response: 'ERROR'
      })
      cy.visit('/');
      cy.get('[data-cy=errorMessage]').should('be.visible');   

  });
})

  describe('redirect when not logged in', function() {
    it('when trying to create link', function(){

        cy.visit('/link/add');
        cy.get('[data-cy=login-email]').should('be.visible');
    });
    it('when trying to see My Links', function(){

        cy.visit('/link/list');
        cy.get('[data-cy=login-email]').should('be.visible');
    });     

  });

  describe('redirect when not logged in', function() {
    it('when trying to create link', function(){

        //cy.visit('/googel');
        cy.wait(500);
    });
        

  });


