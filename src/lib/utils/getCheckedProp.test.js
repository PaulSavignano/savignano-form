import getCheckedProp from './getCheckedProp'

describe('getCheckedProp', () => {
  it('should return checked prop of true when type is checkbox and formValue is true', () => {
    const checkedProp = {
      formValue: true,
      type: 'checkbox',
    }
    const checkedProps = getCheckedProp(checkedProp)
    expect(checkedProps).toEqual({ checked: true })
  })

  it('should return checked prop of false when type is checkbox and formValue is false', () => {
    const checkedProp = {
      formValue: false,
      type: 'checkbox',
    }
    const checkedProps = getCheckedProp(checkedProp)
    expect(checkedProps).toEqual({ checked: false })
  })

  it('should return checked prop of true when type is radio and formValue equals radioValue', () => {
    const checkedProp = {
      formValue: 'test@testing.com',
      type: 'radio',
      radioValue: 'test@testing.com'
    }
    const checkedProps = getCheckedProp(checkedProp)
    expect(checkedProps).toEqual({ checked: true })
  })

  it('should return checked prop of false when type is radio and formValue is not equal to radioValue', () => {
    const checkedProp = {
      formValue: 'test@testing.com',
      type: 'radio',
      radioValue: 'test2@testing.com'
    }
    const checkedProps = getCheckedProp(checkedProp)
    expect(checkedProps).toEqual({ checked: false })
  })

  it('should return empty object if not type radio or checkbox', () => {
    const checkedProp = {
      formValue: 'test@testing.com',
      type: 'text',
      radioValue: 'test@testing.com'
    }
    const checkedProps = getCheckedProp(checkedProp)
    expect(checkedProps).toEqual({})
  })
})
