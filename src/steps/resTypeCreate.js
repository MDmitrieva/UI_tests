const I = actor()
const po = require('../common/commonSteps')

When('Я заполняю поле "Наименование типа ресурса" значением {string}', name => {
  I.fillField('name', name)
})

When('Я заполняю поле "Шаблон параметров ресурса" значением {string}', template => {
  I.fillField('labelTemplate', template)
})

When('Я заполняю поле "код" значением {string}', code => {
  I.fillField('code', code)
})

Then('Я вижу, что заголовок формы изменился на "Редактирование типа ресурса"', () => {
  I.waitForVisible('//*[text()="Редактирование типа ресурса"]')
})

When('Я нажимаю на кнопку выхода в список типов ресурса', () => {
  I.click(po.exitButton)
})

Then('на странице типов ресурсов я вижу созданный тип ресурса {string}', name => {
  I.see(name)
})
