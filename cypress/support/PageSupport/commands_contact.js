/*********************************************************************************
                  Generic commands for contatc-us form
**********************************************************************************/

// Reference to Page model 
import contact_PO from '../../support/PageObjects/contact_PO'
const contact_Po_inst = new contact_PO();


// Retrieve data for the test case and send message with the contact form
// by using the standart retrieve user data command (cf commands.js)
// users could override or add fields to the retrieved data. This avoid to create
// all the case in API service (We use API data as seed for test data)

Cypress.Commands.add("contact_sendMessage", (user, overrideUser, overrideText) => {
    // Retrieve all user information    
    cy.getUserInformations (user).then (response => {
        
        overrideUser.forEach((mock) => {            
            let field = mock.field
            let value = mock.value
            response.body[field] = value
        })

        //ES2020 null/undefined testing
        response.body.company ??= "";
        response.body.firstName ??= "";
        response.body.lastName ??= ""; 
        response.body.gender ??= ""; 
        response.body.phone ??= ""; 
        response.body.company ??= ""; 
   
        
        // Retrieve random text to fill message text area          
        cy.randomLoremIpsum().then(message => {
                message.body["texte"] = message.body[0]        
                overrideText.forEach((mock) => {
                    let field = mock.field
                    let value = mock.value
                    message.body[field] = value            
                })

                message.body["title"] ??= ""; 
                message.body["texte"] ??= ""; 
                
                //Submit contact-us form through UI abstraction by using Page Object Model
                contact_Po_inst.contactForm_Submission(
                response.body.firstName,
                response.body.lastName, 
                response.body.gender, 
                response.body.phone, 
                response.body.company, 
                message.body["title"], 
                message.body["texte"])                    
                .as("popup-message")
            })
    //popup-message div contain error or sucess message
    return cy.get("@popup-message")
 })    
});