require('dotenv').config()

const I = actor()
const moment = require('moment')

Given('Я авторизуюсь в системе с ролью "Администратор"', () => {
  I.amOnPage(process.env.URL)
  I.fillField('login', process.env.LOGIN)
  I.fillField('password', process.env.PASSWORD)
  I.click('Войти')
})

When('Я попадаю на страницу "Календарь"', () => {
  I.waitInUrl(`calendar/month/${moment().format('DD-MM-YYYY')}`)
})
