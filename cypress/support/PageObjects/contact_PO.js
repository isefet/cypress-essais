/*********************************************************************************
                  Page Object Model of contact-us form
**********************************************************************************/

class contact_PO     {

    firstNameInput() {
        return cy.get('[id="first-name"]')
    }
    
    lastNameInput() {
        return cy.get('[id="last-name"]')
    }

    messageInput() {
        return cy.get('[id="message"]')
    }

    messageTitleInput() {
        return cy.get('[id="message-title"]')
    }

    companyInput() {
        return cy.get('[id="company"]')
    }

    phoneInput() {
        return cy.get('[id="phone"]')
    }    

    genderList() {
        return cy.get('[id="gender"]')
    }   

    popupMessage() {
        return cy.get('.popin')
    }   

    submitButton() {
        return cy.get('[id="submit-button"]')
    }   

    contactForm(){
        return cy.get('[id="contact-form"]')
    }

    // Submit form by click
    contactForm_Submission(firstName,lastName, gender, phone, company, title, message) {
        this.firstNameInput().type(firstName)
        this.lastNameInput().type(lastName)
        this.genderList().select(gender)
        this.phoneInput().type(phone)
        this.companyInput().type(company)
        this.messageTitleInput().type(title)
        this.messageInput().type(message)
        this.submitButton().click();

        return this.popupMessage()
    }

};

export default contact_PO;