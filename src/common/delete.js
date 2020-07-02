module.exports = {
  getTrashButton: itemName => `//div[./div[text()="${itemName}"] and @role="row"]//button`,
  getEventTypeTrash: itemName => `//div[./div//div//span[text()="${itemName}"] and @role="row"]//button`,
  getPlanTrashButton: planName => `//div[./div[text()="${planName}"]]//div[2]/button`,
  deletedRes: res => `//div[contains(@class,"Calendar-ResourceGroup-styles__GroupItem_deleted")]//strong[text()="${res}"]`,
}
