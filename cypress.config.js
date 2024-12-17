const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {

    viewportWidth: 1200,
    viewportHeight: 990, 

    experimentalSessionAndOrigin: true,

    projectId: "hh6c1z",
  },
});
