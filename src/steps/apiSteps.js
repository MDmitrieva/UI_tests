const I = actor()

Given('Я авторизован в системе через API', async () => {
  const creds = await I.logInWithAPI()
  I.amOnPage(creds.url)
})

When('Я создаю через API событие {string} с типом {string} и ресурсом {string}', async (eventName, typeName, resName) => {
  const { access_token: token } = await I.logInWithToken()
  const evTypeId = await I.getEventTypeByName(typeName, token)
  const resUuid = await I.getResUuidByName(resName, token)
  I.createEvent(eventName, evTypeId, resUuid, token)
})

When('Я создаю план {string} с типом {string} через API', async (planName, typeName) => {
  const { access_token: token } = await I.logInWithToken()
  const plTypeId = await I.getPlanTypeByName(typeName, token)
  I.createPlan(planName, plTypeId, token)
})

When('Я привязываю событие {string} к плану {string}', async (eventName, planName) => {
  const { access_token: token } = await I.logInWithToken()
  I.bindEventToPlan(eventName, planName, token)
})

When('Я добавляю ресурс {string} в план {string} через API', async (resName, planName) => {
  const { access_token: token } = await I.logInWithToken()
  I.bindResToPlan(resName, planName, token)
})

When('Я создаю тип плана {string} через API', async typeName => {
  const { access_token: token } = await I.logInWithToken()
  I.createPlanType(typeName, token)
})
