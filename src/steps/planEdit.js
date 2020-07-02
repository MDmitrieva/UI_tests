const I = actor()
const moment = require('moment')
const po = require('../common/planEdit')

When('Я нажимаю на кнопку редактирования плана {string}', planName => {
  I.waitForVisible(`//div[text()="${planName}"]`)
  I.click(po.getPlanEditButton(planName))
})

When('Я очищаю поле "Наименование" плана', () => {
  I.click(po.name)
  I.clearField('name')
})

When('Я меняю наименование плана на {string}', newName => {
  I.fillField('name', newName)
})

When('Я вижу, что длительность плана в годах {string}', duration => {
  moment.locale('ru')
  I.waitForVisible(
    `${po.endDateFull}//input[@value="${moment()
      .add(duration, 'Years')
      .subtract(1, 'Days')
      // вычитание 1-го дня требуется из-за особенностей формирования дат плана в планнере
      .format('DD.MM.YYYY')}"]`,
  )
})

When('Я меняю длительность плана на {string} года', duration => {
  I.click(po.durationCount)
  I.pressKey('Backspace')
  I.fillField(po.durationCount, duration)
})

When('Я добавляю в план тип события {string}', evType => {
  I.click(po.evTypeSelect)
  I.fillField(po.evTypeSelect, evType)
  I.pressKey('Enter')
})

// пока оставить - на случай тестов для разных стендов
When('Я добавляю тег {string}', tag => {
  I.click(po.tags)
  I.fillField(po.tags, tag)
  I.pressKey('Enter')
})

Then('Я вижу обновленный план {string} в списке планов', newName => {
  I.waitForVisible(`//div[contains(@class, "rt-td") and text()="${newName}"]`)
})

Then('Я не вижу план {string} в списке планов', oldName => {
  I.dontSee(`//div[contains(@class, "rt-td") and text()="${oldName}"]`)
})

Then('Я вижу, что наименование плана изменилось на {string}', newName => {
  I.waitForVisible(`//input[@name="name" and @value="${newName}"]`)
})

Then('Я вижу, что в плане появился тип событий {string}', evType => {
  I.waitForVisible(`${po.evTypeSelectFull} //div[text()="${evType}"]`)
})

// пока оставить - на случай тестов для разных стендов
Then('Я вижу, что в плане появился тег {string}', tag => {
  I.waitForVisible(`${po.singleTag}//span[text()="${tag}"]`)
})
