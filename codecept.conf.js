exports.config = {
  output: './output',
  helpers: {
    Puppeteer: {
      url: '',
      waitForTimeout: 10000,
      show: false,
      windowSize: '1920x1080',
      waitForNavigation: 'networkidle2',
      waitForAction: 100,
      restart: true,
      chrome: {
        args: ['--start-maximized', '--no-sandbox'],
      },
    },
    Api: {
      require: './src/helpers/apiHelper.js',
    },
    PupFunctions: {
      require: './src/helpers/pupFunctions.js',
    },
  },
  include: {},
  mocha: {},
  // bootstrapAll: './src/helpers/createItems.js',
  bootstrap: './src/helpers/createItems.js',
  teardown: './src/helpers/deleteItems.js',
  teardownAll: './src/helpers/deleteItems.js',
  hooks: [],
  gherkin: {
    features: './features/*.feature',
    steps: [
      './src/steps/apiSteps.js',
      './src/steps/auth.js',
      './src/steps/calendarScaling.js',
      './src/steps/commonSteps.js',
      './src/steps/navigation.js',
      './src/steps/planTypeCreate.js',
      './src/steps/planCreate.js',
      './src/steps/resTypeCreate.js',
      './src/steps/eventTypeCreate.js',
      './src/steps/eventCreate.js',
      './src/steps/resourceCreate.js',
      './src/steps/delete.js',
      './src/steps/search.js',
      './src/steps/calendar.js',
      './src/steps/resTypeEdit.js',
      './src/steps/resEdit.js',
      './src/steps/eventTypeEdit.js',
      './src/steps/plTypeEdit.js',
      './src/steps/planEdit.js',
      './src/steps/eventEdit.js',
      './src/steps/customFields.js',
      './src/steps/constraints.js',
    ],
  },
  multiple: {
    parallel: {
      // Splits tests into 2 chunks
      chunks: 2,
    },
  },
  plugins: {
    tagPlugin: {
      require: './src/plugins/tagPlugin.js',
      enabled: true,
      issueLabel: 'jira',
    },
    screenshotOnFail: {
      enabled: true,
    },
    allure: {
      enabled: true,
    },
    customLocator: {
      enabled: true,
      prefix: '=',
      attribute: 'data-testid',
    },
  },
  name: 'planner UI tests',
  translation: 'ru-RU',
}
