
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  retries:1,

  expect: {
    timeout: 5000
  },

  reporter: 'html',

  projects: [
    {
      name: "Chrome",
      use: {
        browserName: "chromium",
        headless: false,
        screenshot: "only-on-failure",
        trace: 'retain-on-failure',
        ignoreHTTPSErrors:true,

        video:'off'
    
      }
    },
    {
      name: "Safari",
      use: {
        browserName: "webkit",
        headless: false,
        screenshot: "only-on-failure",
        trace: 'retain-on-failure',
        ...devices['iPhone 13 Pro Max'],
        permissions : ['geolocations'],
      }
    }


  ]


});

