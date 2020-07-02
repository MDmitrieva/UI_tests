const I = actor()
const del = require('../common/delete')

When('Я нажимаю на кнопку удаления записи {string}', itemName => {
  I.click(del.getTrashButton(itemName))
})

Then('Я вижу модальное окно для подтверждения удаления', () => {
  I.seeElement('[class*="modal-wrapper"]')
})

// удаление плана вынесено отдельно т.к. есть лишняя кнопка в гриде, которая впоследствии будет убрана
Then('Я нажимаю на кнопку удаления плана {string}', planName => {
  I.click(del.getPlanTrashButton(planName))
})

// Удаление события отдельно т.к. другой xPath
Then('Я нажимаю на кнопку удаления типа события {string}', itemName => {
  I.click(del.getEventTypeTrash(itemName))
})

Then('Я не вижу удаленный пункт списка {string}', text => {
  I.waitForInvisible(`//*[text()="${text}"]`)
})

Then('Я вижу, что у ресурса {string} появилась дата удаления', res => {
  I.waitForVisible(`//div[@role='row' and ./div[1][text()="${res}"] and ./div[3][string-length(text()) > 0]]`)
})

Then('Я вижу, что ресурс {string} отображается как удаленный', res => {
  I.waitForVisible(del.deletedRes(res))
})
