const I = actor()
const { expect } = require('chai')
const po = require('../common/search')

Then('Я вижу окно поиска элементов и список элементов на странице', async () => {
  I.waitForVisible(po.search)
  I.waitForVisible(po.list)
  const numOfElements = await I.grabNumberOfVisibleElements(po.list)
  expect(numOfElements).to.be.above(1, 'Количество элементов на странице меньше или равно 1')
})
When('Я ввожу в окно поиска слово {string}', lookFor => {
  I.click(po.search)
  I.fillField(po.search, lookFor)
  I.waitForResponse(request => request.url().includes('query') === true)
})
Then('в списке остается только пункт {string}', async elYouAreLookingFor => {
  const numOfElements = await I.grabNumberOfVisibleElements(po.list)
  expect(numOfElements).to.be.equal(1, 'Количество элементов на странице больше 1')
  I.see(elYouAreLookingFor)
})
