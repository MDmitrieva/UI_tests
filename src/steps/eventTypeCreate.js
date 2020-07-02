const I = actor()
const po = require('../common/eventTypeCreate')

Then('Я вижу в форме добавления типа события надпись {string} в поле "Наименование"', placeholder => {
  I.seeElement(`//input[@placeholder="${placeholder}"]`)
})

When('Я заполняю поле "Наименование" значением {string}', eventTypeName => {
  I.fillField('name', eventTypeName)
})

When('Я открываю выпадающий список типов ресурсов', () => {
  I.click(po.resTypeSelect)
})

When('Я выбираю тип ресурса {string}', resourceType => {
  I.fillField(po.resTypeSelect, resourceType)
  I.pressKey('Enter')
})

Then('Я вижу в списке созданный тип события {string}', eventTypeName => {
  I.waitForVisible(`//span[text()="${eventTypeName}"]`)
})
