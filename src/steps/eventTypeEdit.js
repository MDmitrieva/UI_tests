const I = actor()
const po = require('../common/eventTypeEdit')

When('Я очищаю все поля типа события', () => {
  I.waitForVisible(po.name)
  I.click(po.name)
  I.clearField('name')
  I.click(po.code)
  I.clearField('code')
  I.click(po.resTypeRemoval)
})

When('Я меняю наименование на {string} и выбираю тип ресурса {string} для типа события', (newName, newRType) => {
  I.fillField('name', newName)
  I.click(po.rtSelect)
  I.fillField(po.rtSelect, newRType)
  I.pressKey('Enter')
  I.pressKey('Escape')
})

Then('Я вижу обновленный тип события {string} в списке типов событий', newName => {
  I.waitForVisible(`//span[text()="${newName}"]`)
})

Then('Я не вижу тип события {string} в списке типов событий', oldName => {
  I.dontSee(`//div[contains(@class,"rt-td") and text()="${oldName}"]`)
})

Then('Я вижу, что наименование изменилось на {string} и появился тип ресурса {string}', (newName, newRType) => {
  I.waitForVisible(`//input[@name="name" and @value="${newName}"]`)
  I.waitForVisible(`//*[text()="${newRType}"]`)
})
