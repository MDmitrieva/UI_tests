const I = actor()
const po = require('../common/resTypeEdit')

When('Я очищаю все поля типа ресурса', () => {
  I.click(po.name)
  I.clearField('name')
  I.click(po.labelTemplate)
  I.clearField('labelTemplate')
  I.click(po.code)
  I.clearField('code')
})

When('Я указываю новые наименование {string}, лэйбл {string} и код {string} для типа ресурса', (newName, newLabel, newCode) => {
  I.fillField('name', newName)
  I.fillField('labelTemplate', newLabel)
  I.fillField('code', newCode)
})

When('Я нажимаю на кнопку добавления нового поля', () => {
  I.click(po.addFieldButton)
})

Then('Я вижу форму Создания нового поля', () => {
  I.waitForVisible(po.customFieldName)
  I.waitForVisible(po.customFieldLabel)
})

When('Я указываю наименование поля {string} и лэйбл {string}', (customName, customLabel) => {
  I.click(po.customFieldName)
  I.fillField(po.customFieldName, customName)
  I.click(po.customFieldLabel)
  I.fillField(po.customFieldLabel, customLabel)
})

When('Я делаю новое поле обязательным', () => {
  I.checkOption(po.mandatory)
})

Then('Я вижу кастомное поле {string} в списке полей', customName => {
  I.waitForVisible(`//div[contains(@class, "rt-td") and text()="${customName}"]`)
})

Then('Я вижу обновленный тип ресурса {string} в списке типов ресурсов', newName => {
  I.waitForVisible(`//div[contains(@class, "rt-td") and text()="${newName}"]`)
})

Then('Я не вижу тип ресурса {string} в списке типов ресурсов', oldName => {
  I.dontSee(`//div[contains(@class, "rt-td") and text()="${oldName}"]`)
})

Then('Я вижу новые наименование {string}, лэйбл {string} и код {string} для типа ресурса', (newName, newLabel, newCode) => {
  I.waitForVisible(`//input[@name="name" and @value="${newName}"]`)
  I.waitForVisible(`//input[@name="labelTemplate" and @value="${newLabel}"]`)
  I.waitForVisible(`//input[@name="code" and @value="${newCode}"]`)
})
