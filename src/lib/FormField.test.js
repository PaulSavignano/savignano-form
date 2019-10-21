import React from 'react'
import { shallow } from 'enzyme'

import FormField from './FormField'

const testCtx = {
  errors: {},
  onBlur: jest.fn(),
  onChange: jest.fn(),
  onRegisterField: jest.fn(),
  onUnregisterField: jest.fn(),
  touched: {},
  values: {}
}

const testProps = {
  component: 'input',
  name: 'email',
  onFormat: undefined,
  type: 'text',
  value: 'test@testing.com'
}

describe('FormField', () => {

  it('should match snapshot', () => {
    const wrapper = shallow(<FormField {...testProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should pass context value to FormFieldRoot when no value prop exists', () => {
    const wrapper = shallow(<FormField {...testProps} value={undefined} />)
    const email = 'test2@testing.com'
    const contextWrapper = shallow(
      wrapper.prop('children')({
        ...testCtx,
        values: {
          ...testCtx.values,
          email
        }
      })
    )
    expect(contextWrapper.prop('value')).toEqual(email)
  })

})
