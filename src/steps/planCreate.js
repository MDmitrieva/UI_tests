const I = actor()
const po = require('../common/planCreate')

Then('Я вижу, что выбор Типов событий и Шаблонов отчетов заблокирован', () => {
  I.waitForVisible('//*[text()="Чтобы добавить типы событий, создайте план."]')
  I.waitForVisible('//*[text()="Чтобы добавить шаблоны отчетов, создайте план."]')
  I.waitForVisible(`${po.repTemplateDisabled}`)
  I.waitForVisible(`${po.eventTypeDisabled}`)
})

When('Я выбираю значение {string} для поля с выпадающим списком "Тип плана"', planType => {
  I.click(po.planTypeSelect)
  I.click(`//*[text()="${planType}"]`)
})

Then('Я вижу, что в списке типов для этого плана появился тип событий {string}', eventType => {
  I.waitForVisible(`//div[text()="${eventType}"]`)
})

When('Я заполняю поле "Наименование плана" значением {string}', name => {
  I.clearField('name')
  I.fillField('name', name)
})

When('Я выбираю длительность плана в один год', () => {
  I.click(po.planDuration)
  I.click('//*[text()="дн."]')
})

// пока оставить - на случай тестов для разных стендов
When('Я заполняю поле "Список тегов" значением {string}', tag => {
  I.fillField(po.tags, tag)
})

Then('Я вижу, что выбор Типов событий и Шаблонов отчетов разблокирован', () => {
  I.waitForInvisible('//*[text()="Чтобы добавить типы событий, создайте план."]')
  I.waitForInvisible('//*[text()="Чтобы добавить шаблоны отчетов, создайте план."]')
  // когда будет несколько типов событий добавить проверку что разблокируются типы событий из типа плана и их можно удалить-добавить другие
  // шаблонов отчетов в системе пока нет вообще - проверка на светлое будущее
  // I.waitForInvisible(po.repTemplateDisabled)
  I.waitForInvisible(po.eventTypeDisabled)
})

When('Я выбираю тип событий {string}', evType => {
  I.click(po.evTypeEnabled)
  I.fillField(po.evTypeEnabled, evType)
  I.pressKey('Enter')
})

Then('Я вижу, что тип событий {string} появился в типах событий плана', evType => {
  I.waitForVisible(`//div[text()="${evType}"]`)
})

Then('на странице планов Я вижу созданный план {string}', name => {
  I.see(name)
})
