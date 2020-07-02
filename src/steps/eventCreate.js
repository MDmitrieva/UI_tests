const I = actor()
const moment = require('moment')
const po = require('../common/eventCreate')

When('Я выбираю для события план {string}', planName => {
  I.click(po.planSelect)
  I.click(`//span[text()="${planName}"]`)
})

Then('Я вижу в поле "Окончание события" дату следующего календарного дня', () => {
  moment.locale('ru')
  I.waitForVisible(
    `${po.eventEndDateInput} and @value="${moment()
      .add(1, 'days')
      .format('DD.MM.YYYY, HH:mm')}"]`,
  )
})

When('Я выбираю тип события {string} в выпадающем списке типов событий', eventType => {
  I.click(po.eventTypeChoose)
  I.click(`//div[text()="${eventType}"]`)
})

When('Я заполняю поле "Наименование события" значением {string}', eventName => {
  I.clearField('name')
  I.fillField('name', eventName)
})

When('Я выбираю длительность события в 8 дней', () => {
  I.click(po.eventTimeDays)
  I.pressKey('Backspace')
  I.fillField(po.eventTimeDays, '8')
})

Then('Я вижу в поле "Окончание события" обновленную дату окончания события', () => {
  moment.locale('ru')
  I.waitForVisible(
    `${po.eventEndDateInput} and @value="${moment()
      .add(8, 'days')
      .format('DD.MM.YYYY, HH:mm')}"]`,
  )
})

When('Я выбираю ресурс {string} в выпадающем списке ресурсов', res => {
  I.click(po.eventResSelect)
  I.fillField(po.eventResSelect, res)
  I.pressKey('Enter')
})

Then('Я вижу созданное событие {string} в списке событий', event => {
  I.waitForVisible(`//div[contains(@class,"rt-td") and text()="${event}"]`)
})

Then('Я вижу событие {string} в плане', evName => {
  I.waitForVisible(`//span[text()="${evName}"]`)
})
