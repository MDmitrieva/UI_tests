module.exports = {
  plusButton: '=create-entity-button',
  exitButton: '=close-entity-modal-icon',
  tabExitButton: '=close-entity-tabs-modal-icon',
  getGridcell: itemName => `//div[contains(@class, "rt-td") and text()="${itemName}"]`,
  getEditFieldButton: fieldName => `//div[div[text()="${fieldName}"] and @role="row"]//div[1]/button`,
  positionBox: '//div[contains(@class, "_components_input__Input_")]//input[@placeholder=""]',
  mandatory: '=planner-resource-type-custom-field-required',
  getFieldPosition: (fieldName, position) =>
    `//div[div[text()="${fieldName}"] and @role="row"]//div[@role="gridcell" and text()="${position}"]`,
  getFieldSaveButton: button => `//div[contains(@class, "FieldFormBottom")]//button[contains(., "${button}")]`,
  checkFieldPosition: (field, position) =>
    `//div[@id="IdForResourceTypeDnDScroll"]//div[contains(@class, "_Box_")]//div//div[contains(@class, "_Fieldset_")][${position}] //div[text()="${field}"]`,
}
