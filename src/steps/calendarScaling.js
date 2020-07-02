const I = actor()
const moment = require('moment')
const po = require('../common/commonSteps')

When('Я выбираю значение {string} в поле выбора масштаба календаря', option => {
  I.click(`${po.periodSelect}//span[text()="${option}"]`)
})

Then('Я попадаю в просмотр календаря в масштабе "Год"', () => {
  I.waitInUrl(`/calendar/year/01-01-${moment().format('YYYY')}`)
  moment.locale('ru')
  const months = moment.months()
  months.forEach(month => I.waitForVisible(`//*[text()="${month}"]`))
})

Then('Я попадаю в просмотр календаря в масштабе "Месяц"', () => {
  I.waitInUrl(`/calendar/month/${moment().format('DD-MM-YYYY')}`)
  moment.locale('ru')
  I.waitForVisible(`//*[text()="${moment().format('MMMM YYYY')}"]`)
})

Then('Я попадаю в просмотр календаря в масштабе "Неделя"', () => {
  I.waitInUrl(`/calendar/week/${moment().format('DD-MM-YYYY')}`)
  moment.locale('ru')
  I.waitForVisible(
    `//div[contains(@class, " rct-day ") and contains(text(),'${moment().format('dd')}') and contains(text(),'${moment().format('D')}')]`,
  )
})

Then('Я вижу, что на календаре выбрана опция {string}', week => {
  I.waitForVisible(`${po.periodSelect}//div[contains(@class, "components_chips__selected")]//span[text()="${week}"]`)
})

Then('Я попадаю в просмотр календаря в масштабе "День"', () => {
  I.waitInUrl(`calendar/day/${moment().format('DD-MM-YYYY')}`)
})
