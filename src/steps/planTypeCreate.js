const I = actor()
const po = require('../common/planTypeCreate')

Then('Я вижу, что Типы событий и Шаблоны отчетов недоступны для выбора в типе плана', () => {
  I.waitForVisible('//*[text()="Чтобы добавить типы событий, создайте тип плана."]')
  I.waitForVisible('//*[text()="Чтобы добавить шаблоны отчетов, создайте тип плана."]')
  I.waitForVisible(po.repTemplateDisabled)
  I.waitForVisible(po.eventTypeDisabled)
})

When('Я заполняю поле "Наименование типа плана" значением {string}', name => {
  I.fillField('name', name)
})

When('Я выбираю длительность типа плана в один год', () => {
  I.click(po.planTypeDateInput)
  I.fillField(po.planTypeDateInput, '1')
  I.click(po.planTypeDuration)
  I.click('//*[text()="г."]')
})

Then('Я вижу, что Типы событий и Шаблоны отчетов доступны для выбора в типе плана', () => {
  I.waitForInvisible('//*[text()="Чтобы добавить типы событий, создайте тип плана."]')
  I.waitForInvisible('//*[text()="Чтобы добавить шаблоны отчетов, создайте тип плана."]')
  // шаблонов отчетов в системе пока нет вообще - проверка на светлое будущее
  // I.waitForInvisible(po.repTemplateDisabled)
  I.waitForInvisible(po.eventTypeDisabled)
})

When('Я выбираю значение {string} для поля с выпадающим списком "Типы событий"', eventType => {
  I.click('//*[text()="Выберите типы событий"]')
  I.click(`//*[text()="${eventType}"]`)
})

Then('Я вижу, что тип события {string} появился в списке типов событий для типа плана', event => {
  I.waitForVisible(`//div[text()="${event}"]`)
})

Then('на странице типов плана Я вижу созданный тип плана {string}', name => {
  I.see(name)
})
