import getValue from './getValue'

const testProps = {
  type: 'text',
  value: 'testValue',
  onFormat: undefined,
}

describe('getValue', () => {
  it('should return value if value and no onFormat', () => {
    const value = getValue({ ...testProps })
    expect(value).toEqual(testProps.value)
  })
})