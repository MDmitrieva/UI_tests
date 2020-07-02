const Api = require('./apiHelper')

const instance = new Api()

// для теста 004. Поиск

async function search() {
  const { access_token: token } = await instance.logInWithToken()
  const { id: resTypeId } = await instance.createResType('resTypeForSearch', token)
  // instance.createResType('neverFindRT', token)
  const { id: evTypeId } = await instance.createEventType('EvTypeSearch', token, resTypeId)
  // instance.createEventType('EvTypeNotforFinding', token, resTypeId)
  const { uuid: resUuid } = await instance.createResource('resForSearch', resTypeId, token)
  // instance.createResource('resToNeverFind', resTypeId, token)
  instance.createEvent('evToSearch', evTypeId, resUuid, token)
  // instance.createEvent('evToNotFind', evTypeId, resUuid, token)
  const { id: plTypeId } = await instance.createPlanType('planTypeForSearch', token)
  // instance.createPlanType('planTypeNotForYou', token)
  instance.createPlan('planToSearch', plTypeId, token)
  // instance.createPlan('planToNeverFind', plTypeId, token)
}
search()

// для теста 006.Создание ресурса
async function resCreate() {
  const { access_token: token } = await instance.logInWithToken()
  instance.createResType('ResTypeForResCreateTest', token)
}
resCreate()

// для теста 007. Создание типа события
async function etCreate() {
  const { access_token: token } = await instance.logInWithToken()
  instance.createResType('ResTypeForEventTypeCreateTest', token)
}
etCreate()

// для теста 008.Создание типа плана
async function ptCreate() {
  const { access_token: token } = await instance.logInWithToken()
  const { id: resTypeId } = await instance.createResType('RTforPlanTypeCreateTest', token)
  instance.createEventType('EvTForPlTypeCreateTest', token, resTypeId)
}
ptCreate()

// для теста 009. Создание плана
async function planCreate() {
  const { access_token: token } = await instance.logInWithToken()
  const { id: resTypeId } = await instance.createResType('forPlanCreateTest', token)
  const { id: evTypeId } = await instance.createEventType('EvTForPlanCreateTest', token, resTypeId)
  instance.createEventType('EvTForPlanCreateTest2', token, resTypeId)
  const { id: plTypeId } = await instance.createPlanType('planTypeForPlanCreateTest', token)
  instance.bindEvTypeToPlanType(plTypeId, evTypeId, token)
}
planCreate()

// для теста 010. Создание события
async function evCreate() {
  const { access_token: token } = await instance.logInWithToken()
  const { id: resTypeId } = await instance.createResType('resTypeForEventCreate', token)
  const { id: plTypeId } = await instance.createPlanType('plTypeForEv', token)
  instance.createPlan('planForEvent', plTypeId, token)
  instance.createEventType('EvTypeForEventCreateTest', token, resTypeId)
  instance.createResource('resForEventCreateTest', resTypeId, token)
}
evCreate()

// для теста 011. Удаление события
async function evDelete() {
  const { access_token: token } = await instance.logInWithToken()
  const { id: resTypeId } = await instance.createResType('resTypeForEvDel', token)
  const { id: evTypeId } = await instance.createEventType('forEvDelete', token, resTypeId)
  const { uuid: resUuid } = await instance.createResource('resForEventDeleting', resTypeId, token)
  instance.createEvent('evToDelete', evTypeId, resUuid, token)
}
evDelete()

// для теста 012. Удаление плана
async function planDelete() {
  const { access_token: token } = await instance.logInWithToken()
  const { id: plTypeId } = await instance.createPlanType('plTypeForPlanDel', token)
  instance.createPlan('planToDelete', plTypeId, token)
}
planDelete()

// для теста 013. Удаление ресурса
async function resDelete() {
  const { access_token: token } = await instance.logInWithToken()
  const { id: resTypeId } = await instance.createResType('RTforResDelete', token)
  instance.createResource('resToDelete', resTypeId, token)
}
resDelete()

// для теста 014. Удаление типа плана
async function ptDelete() {
  const { access_token: token } = await instance.logInWithToken()
  instance.createPlanType('plTypeToDelete', token)
}
ptDelete()

// для теста 015. Удаление типа события
async function etDelete() {
  const { access_token: token } = await instance.logInWithToken()
  const { id: resTypeId } = await instance.createResType('resTForEvTtoDe', token)
  instance.createEventType('evTypeToDe', token, resTypeId)
}
etDelete()

// для теста 016. Удаление типа ресурса
async function rtDelete() {
  const { access_token: token } = await instance.logInWithToken()
  instance.createResType('resTypeToDelete', token)
}
rtDelete()

// для теста 017. Создание события в календаре
async function kolbaska() {
  const { access_token: token } = await instance.logInWithToken()
  const { id: resTypeId } = await instance.createResType('calendarEventCreate', token)
  instance.createEventType('EvTypeForCalendar', token, resTypeId)
  instance.createResource('calendarEvCreate', resTypeId, token)
}
kolbaska()

// для теста 018. Редактирование типа ресурса
async function editRT() {
  const { access_token: token } = await instance.logInWithToken()
  instance.createResType('resTypeToEdit', token)
}
editRT()

// для теста 019. Редактирование ресурса
async function resEdit() {
  const { access_token: token } = await instance.logInWithToken()
  const { id: resTypeId } = await instance.createResType('RTforResEdit', token)
  instance.createResType('rtForEditedRes', token)
  instance.createResource('resToEdit', resTypeId, token)
}
resEdit()

// для теста 020. Редактирование типа события
async function editET() {
  const { access_token: token } = await instance.logInWithToken()
  const { id: resTypeId } = await instance.createResType('resTypeToEditEvT', token)
  instance.createResType('resTForEditedEvT', token)
  instance.createEventType('evTypeToEdit', token, resTypeId)
}
editET()

// для теста 021. Редактирование типа плана
async function editPT() {
  const { access_token: token } = await instance.logInWithToken()
  const { id: resTypeId } = await instance.createResType('resTypeToEditPlT', token)
  instance.createEventType('evTypeToEditPlT', token, resTypeId)
  instance.createPlanType('plTypeToEdit', token)
}
editPT()

// для теста 022. Редактирование плана
async function planEdit() {
  const { access_token: token } = await instance.logInWithToken()
  const { id: resTypeId } = await instance.createResType('resTypeToEditPlan', token)
  const { id: plTypeId } = await instance.createPlanType('plTypeForPlanEdit', token)
  instance.createEventType('evTypeToEditPlan', token, resTypeId)
  instance.createPlan('plToEdit', plTypeId, token)
}
planEdit()

// для теста 023. Редактирование события
async function editEvent() {
  const { access_token: token } = await instance.logInWithToken()
  const { id: resTypeId } = await instance.createResType('resTypeForEventEdit', token)
  const { id: newResTypeId } = await instance.createResType('resTypeForEditedEv', token)
  const { id: plTypeId } = await instance.createPlanType('plTypeForEvEdit', token)
  const { id: evTypeId } = await instance.createEventType('EvTypeForEventEditTest', token, resTypeId)
  const { uuid: resUuid } = await instance.createResource('resForEventEditTest', resTypeId, token)
  instance.createResource('resForEventEdition', newResTypeId, token)
  instance.createEventTypeOnlyDate('EvTypeForEventEdition', token, newResTypeId)
  instance.createPlan('planForEventEdit', plTypeId, token)
  instance.createEvent('evToEdit', evTypeId, resUuid, token)
}
editEvent()

// для теста 024. Кастомные поля
async function customFields() {
  const { access_token: token } = await instance.logInWithToken()
  const { id: resTypeId } = await instance.createResType('carsForFieldTest', token)
  instance.addCustomField(1, 'number', 'Номер', false, resTypeId, token)
  instance.addCustomField(1, 'model', 'Марка', true, resTypeId, token)
}
customFields()

// для теста 025. Допустимые типы событий в событиях плана
async function constraintEvType() {
  const { access_token: token } = await instance.logInWithToken()
  const { id: resTypeId } = await instance.createResType('constraintEvType', token)
  const { id: evTypeId } = await instance.createEventType('bindedEvType', token, resTypeId)
  const { id: plTypeId } = await instance.createPlanType('constraint', token)
  instance.bindEvTypeToPlanType(plTypeId, evTypeId, token)
  instance.createEventType('notBinded', token, resTypeId)
  instance.createResource('evTypesConstr', resTypeId, token)
}
constraintEvType()

// для теста 026. Допустимые типы событий в событиях плана
async function constraintRes() {
  const { access_token: token } = await instance.logInWithToken()
  const { id: resTypeId } = await instance.createResType('constraintRes', token)
  instance.createEventType('bindedEvType', token, resTypeId)
  instance.createPlanType('resConstraint', token)
  instance.createEventType('typeBinded', token, resTypeId)
  instance.createResource('resConstr', resTypeId, token)
}
constraintRes()

// для теста 027. количество ресурсов у событий
async function constraintResNumber() {
  const { access_token: token } = await instance.logInWithToken()
  const { id: resTypeId } = await instance.createResType('resLimit', token)
  instance.createEventType('resNumberForEvent', token, resTypeId)
  instance.createPlanType('resNumForEvCons', token)
  instance.createResource('resLimited', resTypeId, token)
}
constraintResNumber()
