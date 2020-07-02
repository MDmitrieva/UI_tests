const fetch = require('node-fetch')
const { v4: uuidv4 } = require('uuid')
require('dotenv').config()

const moment = require('moment')

// TODO enable and fix
/* eslint-disable class-methods-use-this */

class Api extends Helper {
  // Аутентификация с кодом
  async logInWithAPI() {
    const response = await fetch(`${process.env.ACCOUNTS_API_URL}/oauth/login`, {
      method: 'POST',
      body: `&login=${process.env.LOGIN}&password=${process.env.PASSWORD}&clientId=${process.env.PLANNER_CLIENT_ID}&redirectUrl=${process.env.URL}calendar`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    return response
  }

  // Аутентификация для получения токена
  async logInWithToken() {
    const payload = {
      username: process.env.LOGIN,
      password: process.env.PASSWORD,
      grant_type: 'password',
      client_id: 'plannerclientid',
      client_secret: 'plannerclientsecret',
    }
    const response = await fetch(`${process.env.ACCOUNTS_API_URL}/oauth/access_token`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    })

    return response.json()
  }

  // Создание типа ресурса
  async createResType(name, token) {
    const payload = {
      name,
      labelTemplate: 'autoTestUI',
      code: uuidv4(),
    }
    const response = await fetch(`${process.env.API}resources/types`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const json = await response.json()
    return json
  }

  // Добавление кастомного поля к типу ресурса
  async addCustomField(index, name, label, isMandatory, resTypeId, token) {
    const payload = {
      index,
      name,
      label,
      type: 'string',
      required: isMandatory,
    }
    const response = await fetch(`${process.env.API}resources/types/${resTypeId}/fields`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const json = await response.json()
    return json
  }

  // Создание ресурса
  async createResource(name, resTypeId, token) {
    const payload = {
      name,
      resourceTypeId: resTypeId,
      fields: {},
    }
    const response = await fetch(`${process.env.API}resources`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const json = await response.json()
    return json
  }

  // создание типа события
  async createEventType(name, token, resTypeId) {
    const payload = {
      name,
      code: uuidv4(),
      maxExecutionTime: null,
      minExecutionTime: null,
      defExecutionTime: null,
      onlyDate: false,
      color: '#fff',
      allowedResourceTypes: [resTypeId],
    }
    const response = await fetch(`${process.env.API}events/types`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const json = await response.json()
    return json
  }

  // создание типа события Дата-только
  async createEventTypeOnlyDate(name, token, resTypeId) {
    const payload = {
      name,
      code: uuidv4(),
      maxExecutionTime: null,
      minExecutionTime: null,
      defExecutionTime: null,
      onlyDate: true,
      color: '#fff',
      allowedResourceTypes: [resTypeId],
    }
    const response = await fetch(`${process.env.API}events/types`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const json = await response.json()
    return json
  }

  // создание типа плана
  async createPlanType(name, token) {
    const payload = {
      name,
      code: uuidv4(),
      defaultPlanName: 'Plan: ',
      defaultPlanDurationValue: 1,
      defaultPlanDurationUnit: 'YEAR',
    }

    const response = await fetch(`${process.env.API}plan/types`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const json = await response.json()
    return json
  }

  // Создание плана

  async createPlan(name, plTypeId, token) {
    const payload = {
      startDateTime: moment()
        .startOf('day')
        .valueOf(),
      locked: false,
      name,
      tags: [],
      accessibleResources: [],
      planTypeId: plTypeId,
    }
    const response = await fetch(`${process.env.API}plans`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const json = await response.json()
    return json
  }

  // привязка типа события к типу плана
  async bindEvTypeToPlanType(plTypeId, evTypeId, token) {
    const payload = [evTypeId]

    const response = await fetch(`${process.env.API}plan/types/${plTypeId}/events/types`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  }

  // Создание события
  async createEvent(name, evTypeId, resUuid, token) {
    const payload = {
      startDateTime: moment()
        .seconds(0)
        .milliseconds(0)
        .valueOf(),
      endDateTime: moment()
        .add(1, 'days')
        .seconds(0)
        .milliseconds(0)
        .valueOf(),
      resourceUuids: [resUuid],
      name,
      eventTypeId: evTypeId,
      accessibleResources: [],
      planId: null,
    }
    const response = await fetch(`${process.env.API}events`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const json = await response.json()
    return json
  }

  // получение айди типа плана по имени
  async getPlanTypeByName(name, token) {
    const response = await fetch(`${process.env.API}plan/types?query=name=='${name}'`, {
      method: 'GET',
      headers: {
        'Accept-Encoding': 'gzip, deflate, br',
        Authorization: `Bearer ${token}`,
      },
    })
    const result = await response.json()
    return result[0].id
  }

  // получение айди типа события по имени
  async getEventTypeByName(name, token) {
    const response = await fetch(`${process.env.API}/events/types?query=name=='${name}'`, {
      method: 'GET',
      headers: {
        'Accept-Encoding': 'gzip, deflate, br',
        Authorization: `Bearer ${token}`,
      },
    })
    const result = await response.json()
    return result[0].id
  }

  // получение события по имени
  async getEventByName(name, token) {
    const response = await fetch(`${process.env.API}/events?query=name=='${name}'`, {
      method: 'GET',
      headers: {
        'Accept-Encoding': 'gzip, deflate, br',
        Authorization: `Bearer ${token}`,
      },
    })
    const result = await response.json()
    return result[0]
  }

  // получение ресурса по имени
  async getResByName(name, token) {
    const response = await fetch(`${process.env.API}/resources?query=name=='${name}'`, {
      method: 'GET',
      headers: {
        'Accept-Encoding': 'gzip, deflate, br',
        Authorization: `Bearer ${token}`,
      },
    })
    const result = await response.json()
    return result[0]
  }

  // получение плана по имени
  async getPlanByName(name, token) {
    const response = await fetch(`${process.env.API}/plans?query=name=='${name}'`, {
      method: 'GET',
      headers: {
        'Accept-Encoding': 'gzip, deflate, br',
        Authorization: `Bearer ${token}`,
      },
    })
    const result = await response.json()
    return result[0]
  }

  // привязка события к плану

  async bindEventToPlan(eventName, planName, token) {
    const event = await this.getEventByName(eventName, token)
    const plan = await this.getPlanByName(planName, token)
    const payload = {
      startDateTime: moment()
        .seconds(0)
        .milliseconds(0)
        .valueOf(),
      endDateTime: moment()
        .add(1, 'days')
        .seconds(0)
        .milliseconds(0)
        .valueOf(),
      resourceUuids: event.resourceUuids,
      name: eventName,
      eventTypeId: event.eventTypeId,
      accessibleResources: [],
      planUuid: plan.uuid,
    }
    const response = await fetch(`${process.env.API}/events/${event.uuid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
    return response
  }

  // привязка ресурса к плану

  async bindResToPlan(resName, planName, token) {
    const res = await this.getResByName(resName, token)
    const plan = await this.getPlanByName(planName, token)
    const payload = {
      startDateTime: moment()
        .seconds(0)
        .milliseconds(0)
        .valueOf(),
      endDateTime: moment()
        .add(1, 'days')
        .seconds(0)
        .milliseconds(0)
        .valueOf(),
      locked: false,
      name: planName,
      tags: [],
      planTypeId: plan.planTypeId,
      accessibleResources: res.uuid,
    }
    const response = await fetch(`${process.env.API}/plans/${plan.uuid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
    return response
  }

  // получение uuid ресурса по имени

  async getResUuidByName(name, token) {
    const response = await fetch(`${process.env.API}/resources?query=name=='${name}'`, {
      method: 'GET',
      headers: {
        'Accept-Encoding': 'gzip, deflate, br',
        Authorization: `Bearer ${token}`,
      },
    })
    const result = await response.json()
    return result[0].uuid
  }
}
module.exports = Api
