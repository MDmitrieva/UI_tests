const po = require('../common/constraints')

const I = actor()

Then('Я вижу список доступных ограничений для плана', () => {
  I.waitForVisible('//span[contains(@class,"PlanConstraints-ConstraintTab")]')
})

When('Я выбираю ограничение {string}', constraint => {
  I.click(`//div[contains(@class,"components_grid__StrictBox") and text()="${constraint}"]`)
})

Then('Я вижу форму {string} с настройками ограничений', rules => {
  I.waitForVisible(`//header[contains(@class,"ConstraintLayout-styles__header") and text()="${rules}"]`)
})

When('Я выбираю опцию {string} при срабатывании ограничения', option => {
  I.checkOption(option)
})

When('Я открываю настройки плана', async () => {
  I.waitInUrl('/plans/')
  const url = await I.grabCurrentUrl()
  I.amOnPage(`${url}/settings`)
})

Then('Я вижу сообщение {string}', mes => {
  I.waitForVisible(`//div[contains(@class, "components_toasts__Body") and text()="${mes}"]`)
})

Then('Я вижу ограничение {string}, выводящее {string}', (constraint, icon) => {
  I.waitForVisible('//div[contains(@class, "ConstraintList-styles__violationIcon")]')
  I.waitForVisible(`//span[contains(@class, "ConstraintTab-ConstraintList-styles__labelSpan") and text()=" ${constraint}"]`)
  I.waitForVisible(`//span[contains(@class, "PlanConstraints-ConstraintTab-ConstraintList-styles__ArgumentValue") and text()="${icon}"]`)
})

Then('Я вижу уведомление о срабатывании ограничения', () => {
  I.waitForVisible(po.validateCounter)
})

Then('Я вижу, что событие {string} подсвечено желтым', eventName => {
  I.waitForVisible(`${po.eventWarningFull}//span[text()="${eventName}"]`)
})

Then('Я вижу, что событие {string} подсвечено красным', eventName => {
  I.waitForVisible(`${po.eventErrorFull}//span[text()="${eventName}"]`)
})

Then('Я вижу, что событие {string} не подсвечено красным или желтым', eventName => {
  I.dontSee(`${po.eventErrorFull}//span[text()="${eventName}"]`)
  I.dontSee(`${po.eventWarningFull}//span[text()="${eventName}"]`)
})

When('Я нажимаю кнопку {string}', buttonName => {
  I.waitForVisible(po.getAddConstraintButton(buttonName))
  I.click(po.getAddConstraintButton(buttonName))
})

Then('Я вижу, что ресурс {string} подсвечен желтым', res => {
  I.waitForVisible(`${po.resWarningFull}//strong[text()="${res}"]`)
})

Then('Я вижу, что ресурс {string} подсвечен красным', res => {
  I.waitForVisible(`${po.resErrorFull}//strong[text()="${res}"]`)
})

When('Я нажимаю на кнопку редактирования ограничения', () => {
  I.waitForVisible(po.box)
  I.moveCursorTo(po.box)
  I.waitForVisible(po.editConstraint)
  I.click(po.editConstraint)
})

When('Я нажимаю на кнопку удаления ограничения', () => {
  I.waitForVisible(po.box)
  I.moveCursorTo(po.box)
  I.waitForVisible(po.deleteConstraint)
  I.click(po.deleteConstraint)
})

Then('Я вижу, что ресурс {string} не подсвечен красным или желтым', res => {
  I.dontSee(`${po.resWarningFull}//strong[text()="${res}"]`)
  I.dontSee(`${po.resErrorFull}//strong[text()="${res}"]`)
})

Then('Я не вижу уведомлений о сработавших ограничениях', () => {
  I.dontSee(po.validateCounter)
})

When(
  'Я указываю, что для типа события {string} запрещается {string} {string} ресурсов с типом {string}',
  (evType, moreLess, number, resType) => {
    I.click(po.evTypeSelect)
    I.fillField(po.evTypeSelect, evType)
    I.pressKey('Enter')
    I.click(po.moreLessSelect)
    I.fillField(po.moreLessSelect, moreLess)
    I.pressKey('Enter')
    I.click(po.numInput)
    I.fillField(po.numInput, number)
    I.click(po.resTypeSelect)
    I.fillField(po.resTypeSelect, resType)
    I.pressKey('Enter')
  },
)

Then(
  'Я вижу текст ограничения {string} «resNumberForEvent» {string} «Меньше или равно» «1» {string} «resLimit», выводящее {string}',
  (text1, text2, text3, icon) => {
    I.waitForVisible(
      `//span[contains(@class,"ConstraintList-styles__labelSpan") and text()=" ${text1}" and text()=" ${text2}" and text()=" ${text3}"]`,
    )
    I.waitForVisible(`//span[contains(@class, "ConstraintList-styles__ArgumentValue") and text()="${icon}"]`)
  },
)
