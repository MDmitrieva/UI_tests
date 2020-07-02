module.exports = {
  getPlanEditButton: planName => `//div[./div[text()="${planName}"]]//div[1]/button`,
  name: '=planner-plan-item-name',
  startDate: '=plans-start-date-time',
  durationCount: '=planner-plan-item-plan-duration-count',
  durationUnit: '=planner-plan-item-plan-duration-unit',
  endDate: '=plans-end-date-time',
  endDateFull: '//div[@data-testid="planner-plan-item-endDateTime"]',
  tags: '=planner-plan-item-tags',
  evTypeSelect: '=plans-event-types-select',
  evTypeSelectFull: '//div[@data-testid="plans-event-types-element"]',
  evTypes: '=plans-event-types-element',
  singleTag: '//span[contains(@class, "TagsInput")]',
}
