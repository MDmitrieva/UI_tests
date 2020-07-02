const I = actor()
const { expect } = require('chai')
const po = require('../common/calendar')

When('Я растягиваю область для колбаски у ресурса {string}', () => {
  I.drawSausage()
})
Then('Я вижу окно для создания события', () => {
  I.waitForVisible(po.formStartEvent)
  I.waitForVisible(po.formEndEvent)
  I.waitForVisible(po.formEventDays)
  I.waitForVisible(po.formEventHours)
  I.waitForVisible(po.formEventMinutes)
})
When('Я заполняю поля формы, выбрав тип события {string}', evType => {
  I.click('//div[text()="Выберите тип события"]')
  I.fillField(po.eventTypeSelect, evType)
  I.pressKey('Enter')
})
Then('Я вижу созданное событие {string} на календаре', event => {
  I.waitForVisible(`//div[contains(@class,"Calendar-Event-styles__custom-item")]//span[text()="${event}"]`)
})

When('Я ввожу в поиск название ресурса {string}', res => {
  I.click(po.calendarSearch)
  I.fillField(po.calendarSearch, res)
  I.click(po.searchButton)
})

Then('Я вижу только ресурс {string}', async res => {
  I.waitForVisible(po.exactRes(res))
  const num = await I.grabNumberOfVisibleElements(po.resPlate)
  expect(num).to.equal(1, 'Количество ресурсов на странице не равно 1')
})
