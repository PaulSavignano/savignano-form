

import getSpiedValues from './getSpiedValues'

const testNames = ['email1', 'email2']

const testValues = {
  email1: 'test1@test.com',
  email2: 'test2@test.com',
  email3: 'test3@test.com'
}

describe('getSpied', () => {
  it('should return only the values for the names provided', () => {
    const spiedValues = getSpiedValues({ names: [...testNames], values: { ...testValues } })
    expect(spiedValues).toEqual({
      email1: testValues.email1,
      email2: testValues.email2
    })
  })
})