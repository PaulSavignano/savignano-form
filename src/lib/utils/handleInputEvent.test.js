import handleInputEvent from './handleInputEvent'

describe('handleInputEvent', () => {
  it('should return name, value, and checked from event', () => {
    const target = { name: 'testName', value: 'testValue' }
    const handled = handleInputEvent({ target })
    expect(handled).toEqual(target)
  })

  it('should return name, value from props if native', () => {
    const target = { name: 'testName', value: 'testValue' }
    const handled = handleInputEvent(target)
    expect(handled).toEqual(target)
  })
})