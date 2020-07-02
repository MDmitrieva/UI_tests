module.exports = {
  formStartEvent: '=planner_calendar_new_event_form_startDateTime',
  formEventDays: '=planner_calendar_new_event_form_days',
  formEventHours: '=planner_calendar_new_event_form_hours',
  formEventMinutes: '=planner_calendar_new_event_form_minutes',
  formEndEvent: '=planner_calendar_new_event_form_startDateTime',
  calendarSearch: '//input[contains(@class, "input__Input") and @placeholder="Поиск по ресурсам"]',
  searchButton: '//button[contains(@class, "components_button__SecondaryPrimary")]',
  resPlate: '//div[contains(@class,"Calendar-ResourceGroup-styles__GroupItem")]',
  exactRes: res => `//div[contains(@class,"Calendar-ResourceGroup-styles__GroupItem")]//strong[text()="${res}"]`,
  eventTypeSelect: '//div[contains(@class, "react-select__control")]',
}
