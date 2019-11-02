import getValue from './getValue'

describe('getValue', () => {
  it('should return empty string if !value and type text', () => {
    const value = getValue({
      type: 'text',
      onFormat: undefined,
      value: undefined
    })
    expect(value).toEqual('')
  })
  it('should return false if !value and type checkbox', () => {
    const value = getValue({
      type: 'checkbox',
      onFormat: undefined,
      value: undefined
    })
    expect(value).toEqual(false)
  })
  it('should return value if !value and NOT type checkbox or text', () => {
    const value = getValue({
      type: undefined,
      onFormat: undefined,
      value: undefined
    })
    expect(value).toEqual(undefined)
  })
  it('should call onFormat if onFormat and value', () => {
    const spy = jest.fn()
    getValue({
      type: 'text',
      onFormat: spy,
      value: 'test'
    })
    expect(spy).toHaveBeenCalledWith('test')
  })
  it('should return value if value', () => {
    const value = getValue({
      type: 'text',
      onFormat: undefined,
      value: 'test'
    })
    expect(value).toEqual('test')
  })
})