
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { LobSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = LobSDK.test()
    equal(testsdk instanceof LobSDK, true,
      'LobSDK.test() must return a client synchronously')
  })

})
