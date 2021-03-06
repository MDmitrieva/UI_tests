module.exports = {
  validateCounter: '//span[contains(@class, "Calendar-Header-ValidateCounter")]',
  eventWarning: '=plan-calendar-kolbaska-warning',
  eventWarningFull: '//div[@data-testid="plan-calendar-kolbaska-warning"]',
  eventError: '=plan-calendar-kolbaska-error',
  eventErrorFull: '//div[@data-testid="plan-calendar-kolbaska-error"]',
  resWarning: '=calendar-resource-validate-warning',
  resWarningFull: '//div[@data-testid="calendar-resource-validate-warning"]',
  resError: '=calendar-resource-validate-error',
  resErrorFull: '//div[@data-testid="calendar-resource-validate-error"]',
  editConstraint: '//span[contains(@class," src-components-PlanConstraints-ConstraintTab-ConstraintList-styles__EditIcon")]',
  deleteConstraint:
    '//span[contains(@class,"uikit_6ae3ea6c_components_icon__Icon_3778264c src-components-PlanConstraints-ConstraintTab-ConstraintList-styles__Icons")]',
  getAddConstraintButton: buttonName => `//span[contains(@class,"components_button__Label") and text()="${buttonName}"]`,
  evTypeSelect: '//div[@data-testid="plan-constraints-event-type-select"]',
  moreLessSelect: '//div[contains(@class,"react-select__placeholder") and text()="Введите значение для поиска..."]',
  numInput: '//div[@data-testid="constraint-field-long"]',
  resTypeSelect: '//div[@data-testid="plan-constraints-resource-type-select"]',
  box: '//div[contains(@class, "src-components-PlanConstraints-ConstraintTab-ConstraintList-styles__violationIcon")]',
}
