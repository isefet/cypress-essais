const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "ikwxa4",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}"
  },
  env: {
    baseUrl: 'https://usptestqa.pages.dev/',
    contact_url: '/fake-contact',
    api_url_user : "https://dummyapi.io/data/v1/user/",
    api_access_key : "645698f2fd77a7f70a8ffd1b",
    lorem_generator : "https://baconipsum.com/api/?type=meat-and-filler&paras=1"
  },
});
