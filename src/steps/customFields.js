const I = actor()
const po = require('../common/customFields')

Then('Я вижу кастомное поле  с названием {string}, описанием {string} в списке под номером {string}', (name, label, number) => {
  I.waitForVisible(po.getGridcell(name))
  I.waitForVisible(po.getGridcell(label))
  I.waitForVisible(po.getGridcell(number))
})
When('Я открываю поле {string} на редактирование', name => {
  I.click(po.getEditFieldButton(name))
})

When('Я меняю значение в поле "Позиция поля" на {string}', position => {
  I.click(po.positionBox)
  I.clearField(po.positionBox)
  I.fillField(po.positionBox, position)
})

When('Я делаю поле "Номер" обязательным', () => {
  I.checkOption(po.mandatory)
})

When('Я нажимаю на кнопку {string} в форме редактирования поля', button => {
  I.click(po.getFieldSaveButton(button))
})

Then('в списке кастомных полей Я вижу, что номер поля {string} изменился на {string}', (name, position) => {
  I.waitForVisible(po.getFieldPosition(name, position))
})

When('Я изменяю шаблон параметров ресурса на {string}', template => {
  I.click('//input[@name="labelTemplate"]')
  I.clearField('labelTemplate')
  I.fillField('labelTemplate', template)
})

Then('Я вижу, что поле {string} находится на позиции {string}', (field, position) => {
  I.waitForVisible(po.checkFieldPosition(field, position))
})

When('Я указываю в поле {string} значение {string}', (field, value) => {
  I.fillField(`//input[@name="fields.${field}"]`, value)
})

Then('Я вижу карточку ресурса {string} с лейблом {string}', (res, label) => {
  I.waitForVisible(`//div[contains(@class,"Calendar-ResourceGroup")]//strong[text()="${res}"]`)
  I.waitForVisible(`//div[contains(@class, "ResourceLabel") and text()="${label}"]`)
})
