import { describe, test } from 'mocha'
import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'

import {
  wrapScheduledAction,
  wrapScheduledActionCollection,
} from '../../../lib/entities/scheduled-action'
import {
  entityActionTest,
  entityCollectionWrappedTest,
  entityDeleteTest,
  entityUpdateTest,
  entityWrappedTest,
  failingActionTest,
} from '../test-creators/instance-entity-methods'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('scheduledAction'),
  }
}

describe('Entity ScheduledAction', () => {
  test('Scheduled action is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapScheduledAction,
    })
  })

  test('Scheduled action collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapScheduledActionCollection,
    })
  })

  test('Scheduled action get', async () => {
    return entityActionTest(setup, {
      wrapperMethod: wrapScheduledAction,
      actionMethod: 'get',
    })
  })

  test('Scheduled actions delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapScheduledAction,
    })
  })

  test('Schedule action delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapScheduledAction,
      actionMethod: 'delete',
    })
  })

  test('Scheduled action update', async () => {
    return entityUpdateTest(setup, {
      wrapperMethod: wrapScheduledAction,
    })
  })

  test('Scheduled action update fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapScheduledAction,
      actionMethod: 'update',
    })
  })
})
