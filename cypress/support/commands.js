/*********************************************************************************
                  Generic commands for all the project
**********************************************************************************/

// Call the API to retrieve User Data information seed for tests case
Cypress.Commands.add("getUserInformations", userId => {
    return cy.request(
        {
            method : "GET", 
            url : Cypress.env("api_url_user") + userId,
            headers:{
                "app-id" : Cypress.env("api_access_key")
            }
        }
        ).then ((response) => {
          expect(response.status).to.eq(200);
          
        });     
});

// Call the API to retrieve random text to fill text area
Cypress.Commands.add("randomLoremIpsum", () => {
    return cy.request(
        {
            method : "GET", 
            url : Cypress.env("lorem_generator")

        }
        ).then ((response) => {
          expect(response.status).to.eq(200);
          return response ;
        });     
});

// Overxrite type() command for accepting null value
Cypress.Commands.overwrite('type', (originalFn, subject, str, options) => { 
    if (str !== '') {
      return originalFn(subject, str, options)
    }
    if (str !== '') {
        return originalFn(subject, str, options)
      }  
    return subject
  })
 


