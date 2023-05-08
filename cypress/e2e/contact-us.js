/// <reference types="cypress" />
/*********************************************************************************
                  Contact-us Tests cases
**********************************************************************************/

// Loading tests data 
const TCoverride  = require('../fixtures/contact_fixture/overrides.json')
const Users  = require('../fixtures/users.json')

describe("Contact form testing", () => {

    beforeEach(() => {
        cy.visit(Cypress.env("baseUrl")+Cypress.env("contact_url"))   
    })

    
    // Generate tests cases for all user data contained in fixtures in two cases :
    // ALL FIELDS
    Users.forEach((user) => {
        //firstName : Valid Name & Last Name : Valid Name & Gender : Female/Male (One user Female and Other Male)
		//Phone : Valid phone number & Company : Valid Company Name & Title : Valid Title
		//Message : Multiline Valid Texte 
       it(`Successful submission via contact us form with all data ${user.data}`, () => {
        
        // Retrieve particular test data that will override the values returned by default during API calls       
            let overrideUser = TCoverride.Overrides.HappyPathAll.oUser
            let overrideText = TCoverride.Overrides.HappyPathAll.oText  

        
            cy.contact_sendMessage(user.id,overrideUser,overrideText).as("pop-message")
            
            cy.get("@popup-message").should("exist").contains("Le message a été envoyé.")
            cy.get("@popup-message").should('have.css', 'display', 'block')
            cy.get("@popup-message").should('have.class', 'popin-success')       
         
        })

        // ONLY MANDATORY FIELD
        // firstName : Valid Name & Last Name : Valid Name & Gender : Female/Male (One user Female and Other Male)
		//Phone : "" & Company"" : "" & Title : Valid ""
		//Message : Multiline Valid Texte     
        it(`Successful submission via contact us form with only mandatory data ${user.data}`, () => {

        // Retrieve particular test data that will override the values returned by default during API calls    
            let overrideUser = TCoverride.Overrides.HappyPathMandatory.oUser
            let overrideText = TCoverride.Overrides.HappyPathMandatory.oText 

           cy.contact_sendMessage(user.id,overrideUser,overrideText).as("pop-message")
           
           cy.get("@popup-message").should("exist").contains("Le message a été envoyé.")
           cy.get("@popup-message").should('have.css', 'display', 'block')
           cy.get("@popup-message").should('have.class', 'popin-success')       
        
       })
       
    })

    // ONLY MANDATORY FIELD
    // firstName : Valid Name & Last Name : Valid Name & Gender : Female/Male (One user Female and Other Male)
	//Phone : "" & Company"" : "" & Title : Valid ""
	//Message : Multiline Valid Texte   
    it(`Successful submission via contact us form with only mandatory data HappyOther`, () => {

    // Retrieve particular test data that will override the values returned by default during API calls    
        let overrideUser = TCoverride.Overrides.HappyPathMandatoryOther.oUser
        let overrideText = TCoverride.Overrides.HappyPathMandatoryOther.oText

     cy.contact_sendMessage(Users[0].id,overrideUser,overrideText).as("pop-message")
     
     cy.get("@popup-message").should("exist").contains("Le message a été envoyé.")
     cy.get("@popup-message").should('have.css', 'display', 'block')
     cy.get("@popup-message").should('have.class', 'popin-success')       
  
    })

    //firstName : Valid Name & Last Name : Valid Name & Gender : Other
	//Phone : Valid phone number & Company : Valid Company Name & Title : Valid Title
    //Message : Multiline Valid Texte 
    it(`Successful submission via contact us form with all data HappyOther`, () => {

        // Retrieve particular test data that will override the values returned by default during API calls
        let overrideUser = TCoverride.Overrides.HappyPathAllOther.oUser
        let overrideText = TCoverride.Overrides.HappyPathAllOther.oText
        
        cy.contact_sendMessage(Users[0].id,overrideUser,overrideText).as("pop-message")
            
        cy.get("@popup-message").should("exist").contains("Le message a été envoyé.")
        cy.get("@popup-message").should('have.css', 'display', 'block')
        cy.get("@popup-message").should('have.class', 'popin-success')       
         
    })
    
    
    //firstName : "" & Last Name : Valid Name & Gender : Male
	//Phone : Valid phone number & Company : "" & Title : ""
    //Message : Multiline Valid Texte 
    it(`Unsuccessful  submission via contact us form without First Name `, () => {

        // Retrieve particular test data that will override the values returned by default during API calls
        let overrideUser = TCoverride.Overrides.UHappyPathMissedFirstName.oUser
        let overrideText = TCoverride.Overrides.UHappyPathMissedFirstName.oText
        
        cy.contact_sendMessage(Users[0].id,overrideUser,overrideText).as("pop-message")
            
        cy.get("@popup-message").should("exist").contains("Veuillez remplir tous les champs obligatoires.")
        cy.get("@popup-message").should('have.css', 'display', 'block')
        cy.get("@popup-message").should('have.class', 'popin-error')       
         
    })

    //firstName : Valid Name & Last Name : "" & Gender : Other
	//Phone : Valid phone number & Company : "" & Title : Valid Title
    //Message : Multiline Valid Texte
    it(`Unsuccessful  submission via contact us form without Last Name `, () => {

        // Retrieve particular test data that will override the values returned by default during API calls
        let overrideUser = TCoverride.Overrides.UHappyPathMissedLastName.oUser
        let overrideText = TCoverride.Overrides.UHappyPathMissedLastName.oText
        
        cy.contact_sendMessage(Users[0].id,overrideUser,overrideText).as("pop-message")
            
        cy.get("@popup-message").should("exist").contains("Veuillez remplir tous les champs obligatoires.")
        cy.get("@popup-message").should('have.css', 'display', 'block')
        cy.get("@popup-message").should('have.class', 'popin-error')       
         
    })

    //firstName : Valid Name & Last Name : Valid Name & Gender : ""
	//Phone : "" & Company : Valid company & Title : ""
    //Message : Multiline Valid Texte
    it(`Unsuccessful  submission via contact us form without Gender `, () => {

        // Retrieve particular test data that will override the values returned by default during API calls
        let overrideUser = TCoverride.Overrides.UHappyPathMissedGender.oUser
        let overrideText = TCoverride.Overrides.UHappyPathMissedGender.oText
        
        cy.contact_sendMessage(Users[1].id,overrideUser,overrideText).as("pop-message")
        
        // Is it the desired beaviour ? 
        cy.get("@popup-message").should("exist").contains("Veuillez remplir tous les champs obligatoires.")
        cy.get("@popup-message").should('have.css', 'display', 'block')
        cy.get("@popup-message").should('have.class', 'popin-error')       
         
    })

    //firstName : Valid Name & Last Name : Valid Name & Gender : Female
	//Phone : Valid Phone & Company : "" & Title : Valid Title
    //Message : ""
    it(`Unsuccessful  submission via contact us form without Message `, () => {

        // Retrieve particular test data that will override the values returned by default during API calls
        let overrideUser = TCoverride.Overrides.UHappyPathMissedMessage.oUser
        let overrideText = TCoverride.Overrides.UHappyPathMissedMessage.oText
        
        cy.contact_sendMessage(Users[1].id,overrideUser,overrideText).as("pop-message")
        
        // Is it the desired beaviour ? 
        cy.get("@popup-message").should("exist").contains("Veuillez remplir tous les champs obligatoires.")
        cy.get("@popup-message").should('have.css', 'display', 'block')
        cy.get("@popup-message").should('have.class', 'popin-error')       
         
    })
        

});