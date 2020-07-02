const I = actor()
const po = require('../common/plTypeEdit')

When('Я очищаю поле "Наименование" типа плана', () => {
  I.click(po.name)
  I.clearField('name')
})

When('Я меняю наименование типа плана на {string}', newName => {
  I.fillField('name', newName)
})

When('Я меняю длительность типа плана на {string} года', duration => {
  I.click(po.planTypeDuration)
  I.pressKey('Backspace')
  I.fillField(po.planTypeDuration, duration)
  I.click(po.planTypeDurationUnit)
  I.click('//*[text()="г."]')
})

When('Я добавляю в тип плана тип события {string}', evType => {
  I.click(po.evTypeSelect)
  I.fillField(po.evTypeSelect, evType)
  I.pressKey('Enter')
})

Then('Я вижу обновленный тип плана {string} в списке типов плана', newName => {
  I.waitForVisible(`//span[text()="${newName}"]`)
})

Then('Я не вижу тип плана {string} в списке типов плана', oldName => {
  I.dontSee(`//div[contains(@class, "rt-td") and text()="${oldName}"]`)
})

Then('Я вижу, что наименование типа плана изменилось на {string}', newName => {
  I.waitForVisible(`//input[@name="name" and @value="${newName}"]`)
})

Then('Я вижу, что в типе плана появился тип событий {string}', evType => {
  I.waitForVisible(`//*[text()="${evType}"]`)
})

Then('Я вижу, что длительность типа плана изменилась на {string} года', duration => {
  I.waitForVisible(`//input[@placeholder="" and @value="${duration}"]`)
  I.waitForVisible('//*[text()="г."]')
})
