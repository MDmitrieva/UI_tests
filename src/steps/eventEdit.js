const I = actor()
const { expect } = require('chai')
const po = require('../common/eventEdit')

Then('Я очищаю поле "Наименование"', () => {
  I.click(po.name)
  I.clearField('name')
})

Then('На обязательных полях формы редактирования события Я вижу надписи {string} и {string}', async (t1, t2) => {
  const warning = `//div[text()="${t1}"]`
  const message = `//div[text()="${t2}"]`
  I.waitForVisible(warning)
  I.waitForVisible(message)
  const warnNumOfElements = await I.grabNumberOfVisibleElements(warning)
  expect(warnNumOfElements).to.equal(1, 'Количество ошибок на странице не равно 1')
  const mesNumOfElements = await I.grabNumberOfVisibleElements(message)
  expect(mesNumOfElements).to.equal(1, 'Количество ошибок на странице не равно 1')
})

When('Я меняю наименование события на {string}', name => {
  I.click(po.name)
  I.clearField('name')
  I.fillField('name', name)
})

When('Я меняю длительность события на {string} дней', duration => {
  I.click(po.eventDays)
  I.pressKey('Backspace')
  I.fillField(po.eventDays, duration)
})

// оставить на кейсы с изменением типа события и ресурсов
When('Я меняю тип события на {string}', evType => {
  I.click(po.evTypeSelect)
  I.fillField(po.evTypeSelect, evType)
  I.pressKey('Enter')
})

// оставить на кейсы с изменением типа события и ресурсов
When('Я удаляю из события неактуальный ресурс', () => {
  I.click(po.resDelete)
})

When('Я добавляю в событие ресурс {string}', res => {
  I.click(po.resSelect)
  I.fillField(po.resSelect, res)
  I.pressKey('Enter')
})

Then('Я вижу обновленное событие {string} в списке событий', newName => {
  I.waitForVisible(`//div[contains(@class, "rt-td") and text()="${newName}"]`)
})

Then('Я не вижу событие {string} в списке событий', oldName => {
  I.dontSee(`//div[contains(@class, "rt-td") and text()="${oldName}"]`)
})

Then('Я вижу, что наименование события изменилось на {string}', newName => {
  I.waitForVisible(`//input[@name="name" and @value="${newName}"]`)
})

// оставить на кейсы с изменением типа события и ресурсов
Then('Я вижу, что тип события изменился на {string}', evType => {
  I.waitForVisible(`${po.fullEvTypeSelect}//span[text()="${evType}"]`)
})

Then('Я вижу, что длительность изменилась на {string} дней', duration => {
  I.waitForVisible(`//div[@data-testid="planner-events-item-days"]//input[@value="${duration}"]`)
})

// оставить на кейсы с изменением типа события и ресурсов
Then('Я вижу, что ресурс события изменился с {string} на {string}', (oldRes, newRes) => {
  I.dontSee(`//p[text()="${oldRes}"]`)
  I.waitForVisible(`//p[text()="${newRes}"]`)
})
