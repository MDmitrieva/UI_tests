const I = actor()
const po = require('../common/navigation')

When('Я перехожу в список планов', () => {
  I.waitForVisible(po.plans)
  I.click(po.plans)
})

When('Я перехожу в список типов планов', () => {
  I.waitForVisible(po.planTypes)
  I.click(po.planTypes)
})

When('Я перехожу в список ресурсов', () => {
  I.waitForVisible(po.res)
  I.click(po.res)
})

When('Я перехожу в список событий', () => {
  I.waitForVisible(po.events)
  I.click(po.events)
})

When('Я перехожу в список типов ресурсов', () => {
  I.waitForVisible(po.resTypes)
  I.click(po.resTypes)
})

When('Я перехожу в список типов событий', () => {
  I.waitForVisible(po.eventTypes)
  I.click(po.eventTypes)
})

When('Я перехожу в список шаблонов отчетов', () => {
  I.waitForVisible(po.repTemplates)
  I.click(po.repTemplates)
})

When('Я перехожу в календарь', () => {
  I.waitForVisible(po.calendar)
  I.click(po.calendar)
})
