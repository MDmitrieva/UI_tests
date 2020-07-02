const codeceptjs = require('codeceptjs')

const defaultConfig = {
  issueLabel: 'jira',
}
module.exports = config => {
  const { issueLabel } = { ...defaultConfig, ...config }
  const { event, recorder } = codeceptjs
  event.dispatcher.on(event.test.before, test => {
    if (test.tags.length > 0) {
      // removing tags from title to prevent test duplication in reports, sorry eslint
      /* eslint-disable */
      test.title = test.title.replace(/(\@[a-zA-Z0-9-_]+)/g, '').trim()

      recorder.add('add labels from tags', async () => {
        test.tags.forEach(tag => {
          if (tag.includes('=')) {
            // for making possible to use @epic=MainPage or @feature=Resource in titles
            const kv = tag.substr(1).split('=')
            codeceptjs.container.plugins('allure').addLabel(kv[0], kv[1])
          } else {
            // default tags to jira-issues
            codeceptjs.container.plugins('allure').addLabel(issueLabel, tag.substr(1))
          }
        })
      })
    }
  })
}
