const I = actor()
const { expect } = require('chai')
const po = require('../common/resEdit')

When('Я очищаю поле "Наименование"', () => {
  I.click(po.name)
  I.clearField('name')
})

When('Я меняю наименование на {string} и выбираю тип ресурса {string}', (newName, newRType) => {
  I.fillField('name', newName)
  I.click(po.rtSelect)
  I.fillField(po.rtSelect, newRType)
  I.pressKey('Enter')
})

Then('Я вижу обновленный ресурс {string} в списке ресурсов', newName => {
  I.waitForVisible(`//div[contains(@class, "rt-td") and text()="${newName}"]`)
})

Then('Я не вижу ресурс {string} в списке ресурсов', oldName => {
  I.dontSee(`//div[contains(@class, "rt-td") and text()="${oldName}"]`)
})

Then('Я вижу, что наименование изменилось на {string}, а тип ресурса на {string}', async (newName, newRType) => {
  I.waitForVisible(`//input[@name="name" and @value="${newName}"]`)
  const numOfElements = await I.grabNumberOfVisibleElements(`//*[text()="${newRType}"]`)
  expect(numOfElements).to.equal(2, 'Количество элементов на странице не равно 2')
})
