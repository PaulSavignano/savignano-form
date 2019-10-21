import getCheckedProps from './getCheckedProps'

describe('getCheckedProps', () => {
  it('should return checked prop of true when type is checkbox and stateValue is true', () => {
    const cProps = {
      stateValue: true,
      type: 'checkbox',
      value: ''
    }
    const checkedProps = getCheckedProps(cProps)
    expect(checkedProps).toEqual({ checked: true })
  })

  it('should return checked prop of false when type is checkbox and stateValue is false', () => {
    const cProps = {
      stateValue: false,
      type: 'checkbox',
      value: ''
    }
    const checkedProps = getCheckedProps(cProps)
    expect(checkedProps).toEqual({ checked: false })
  })

  it('should return checked prop of true when type is radio and stateValue equals value', () => {
    const cProps = {
      stateValue: 'test@testing.com',
      type: 'radio',
      value: 'test@testing.com'
    }
    const checkedProps = getCheckedProps(cProps)
    expect(checkedProps).toEqual({ checked: true })
  })

  it('should return checked prop of false when type is radio and stateValue is not equal to value', () => {
    const cProps = {
      stateValue: 'test@testing.com',
      type: 'radio',
      value: 'test2@testing.com'
    }
    const checkedProps = getCheckedProps(cProps)
    expect(checkedProps).toEqual({ checked: false })
  })

  it('should return undefined if not type radio or checkbox', () => {
    const cProps = {
      stateValue: 'test@testing.com',
      type: 'text',
      value: 'test@testing.com'
    }
    const checkedProps = getCheckedProps(cProps)
    expect(checkedProps).toEqual(undefined)
  })
})
