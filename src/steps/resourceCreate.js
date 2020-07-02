const I = actor()
const po = require('../common/resCreate')

Then('Я вижу в форме добавления ресурса в поле ввода надпись {string}', placeholder => {
  I.seeElement(`//input[@placeholder="${placeholder}"]`)
})

When('Я заполняю поле "Наименование ресурса" значением {string}', resourceName => {
  I.fillField('name', resourceName)
})

When('Я открываю выпадающий список выбора типа ресурса и выбираю в нем тип {string}', resourceTypeValue => {
  I.click(po.resTypeSelect)
  I.seeElement(po.resTypeList)
  I.fillField(po.resTypeSelect, resourceTypeValue)
  I.pressKey('Enter')
})

Then('Я вижу в списке созданный ресурс {string}', resourceName => {
  I.waitForVisible(`//*[text()="${resourceName}"]`)
})
