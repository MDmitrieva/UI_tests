const I = actor()
const { v4: uuidv4 } = require('uuid')
const { expect } = require('chai')
const moment = require('moment')
const po = require('../common/commonSteps')

// поиск общих компонентов или текста

Then('Я вижу текст {string}', text => {
  I.waitForVisible(`//*[text()="${text}"]`)
})

Then('Я вижу в заголовке календаря текущую дату', () => {
  moment.locale('ru')
  I.waitForVisible(`//*[text()="${moment().format('dddd, D MMMM YYYY г.')}"]`)
})

Then('Я вижу в заголовке календаря текущий месяц', () => {
  moment.locale('ru')
  I.waitForVisible(`//*[text()="${moment().format('MMMM YYYY')}"]`)
})

// Клики по кнопкам или  тексту

When('Я нажимаю на кнопку {string}', buttonName => {
  I.click(`//button[contains(., "${buttonName}")]`)
})

When('Я нажимаю на кнопку создания новой сущности', () => {
  I.click(po.plusButton)
})

When('Я нажимаю на кнопку выхода', () => {
  I.click(po.exitButton)
})

When('Я нажимаю на кнопку перехода назад', () => {
  I.click(po.goBack)
})

When('Я нажимаю на кнопку выхода из таба', () => {
  I.click(po.tabExitButton)
})

When('Я кликаю на текст {string}', text => {
  I.click(`//span[text()="${text}"]`)
})

// формы

Then('Открывается форма {string}', formHeaderTitle => {
  I.waitForVisible(`//*[text()="${formHeaderTitle}"]`)
})

Then('Я жду, пока закроется форма {string}', formHeaderTitle => {
  I.waitForInvisible(`//*[text()="${formHeaderTitle}"]`)
})

Then('Я вижу, что заголовок формы изменился на {string}', formHeader => {
  I.waitForVisible(`//*[text()="${formHeader}"]`)
})

Then('На обязательных полях формы Я вижу надпись {string} в количестве {string} шт.', async (warn, number) => {
  const text = `//div[text()="${warn}"]`
  const num = +number
  I.waitForVisible(text)
  const numOfElements = await I.grabNumberOfVisibleElements(text)
  expect(numOfElements).to.equal(num, 'Количество ошибок на странице не соответствует ожидаемому')
})

// для формы типов событий (новая форма - отдельные степы)

Then('Открывается форма {string} {string}', (t1, t2) => {
  I.waitForVisible(`//div[contains(@class,"EventType-Item-Modal-styles__EventTypeHeaderText") and text()="${t1}" and text()="${t2}"]`)
})

Then('Я жду, пока закроется форма {string} {string}', (t1, t2) => {
  I.waitForInvisible(`//div[contains(@class,"EventType-Item-Modal-styles__EventTypeHeaderText") and text()="${t1}" and text()="${t2}"]`)
})

// Переходы в сущность и внутри формы

When('Я перехожу в таб {string}', name => {
  I.click(`//div[contains(@class,"components_tabs__Label") and text()="${name}"]`)
})

When('Я открываю план {string}', plName => {
  const plan = `//div[contains(@class, "rt-td") and text()="${plName}"]`
  I.waitForVisible(plan)
  I.click(plan)
})

When('Я открываю тип ресурса {string}', resTypeName => {
  const resType = `//div[contains(@class,"rt-td") and text()="${resTypeName}"]`
  I.waitForVisible(resType)
  I.click(resType)
})

When('Я открываю ресурс {string}', resName => {
  const res = `//div[contains(@class,"rt-td") and text()="${resName}"]`
  I.waitForVisible(res)
  I.click(res)
})

When('Я открываю тип события {string}', evTypeName => {
  const evType = `//span[text()="${evTypeName}"]`
  I.waitForVisible(evType)
  I.click(evType)
})

When('Я открываю тип плана {string}', plTypeName => {
  const plType = `//div[contains(@class, "rt-td") and text()="${plTypeName}"]`
  I.waitForVisible(plType)
  I.click(plType)
})

When('Я открываю событие {string}', evName => {
  const event = `//div[contains(@class,"rt-td") and text()="${evName}"]`
  I.waitForVisible(event)
  I.click(event)
})

// для тостов
Then('Я вижу сообщение о том, что сущность {string} {string} {string}', (text1, resTName, text2) => {
  I.waitForVisible(`//div[text()=concat("${text1}", '"', "${resTName}", '"', "${text2}")]`)
})

// для кодов
Then('Я заполняю поле "Код"', () => {
  I.click('//input[@name="code"]')
  I.fillField('//input[@name="code"]', uuidv4())
})

Then('на поле "Код" Я вижу сообщение о требуемом формате кода', () => {
  I.waitForVisible(`//div[contains(@class,"input-error") and text()="${po.codeFormat}"]`)
})

// для дебага
When('Я жду {string}', num => {
  const sec = +num
  I.wait(sec)
})
